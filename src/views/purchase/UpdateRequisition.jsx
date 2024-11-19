import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Dialog,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Notification from "../../ui/Notification";
import Route from "../../routes/Route";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateRequisition = ({
  open,
  setOpen,
  details,
  fetchRequisitionListByApprover,
}) => {
  const empID = localStorage.getItem("username");
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [itemDTOlist, setItemDTOList] = useState([]);
  const [updateRequisitionItems, setApproveRequisitionItems] = useState({
    requisitionNo: details?.requisitionNo,
    employeeCode: empID,
    itemDTOList: details?.itemDTOList?.map((item) => ({
      req_Item_No: item?.req_Item_No,
      received_Qty:
        details?.hierarchyLevel === "Level1"
          ? item?.level1_Qty
          : item?.level2_Qty,
      received_Remark: item?.received_Remark,
    })),
  });
  useEffect(() => {
    setItemDTOList(
      details?.itemDTOList?.map((item) => ({
        id: item?.req_Item_No,
        item_Number: item?.item_Number,
        item_Description: item?.item_Description,
        uom: item?.uom,
        qty: item?.qty,
        level1_Qty: item?.level1_Qty,
        received_Remark: item?.received_Remark,
      }))
    );
  }, [details]);
  const approveQtyHandle = (e, params) => {
    const { id } = params;
    const qty = e?.target?.value;
    if (qty > params?.row?.qty) {
      setNotificationMsg("Approve Qty should not be greater than Actual Qty!");
      setSeverity("info");
      setShowNofication(true);
    } else {
      setApproveRequisitionItems((prev) => ({
        ...prev,
        itemDTOList: prev?.itemDTOList?.map((item) =>
          item?.req_Item_No == id ? { ...item, received_Qty: qty } : item
        ),
      }));
    }
  };
  const remarksHandle = (e, params) => {
    const { id } = params;
    const remarks = e?.target?.value;
    setApproveRequisitionItems((prev) => ({
      ...prev,
      itemDTOList: prev?.itemDTOList?.map((item) =>
        item?.req_Item_No == id ? { ...item, received_Remark: remarks } : item
      ),
    }));
  };
  useEffect(() => {
    console.log(details);
  }, []);
  const requisiton_item_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "item_Number", headerName: "Item Number", width: 200 },
    {
      field: "item_Description",
      headerName: "Description",
      width: 350,
    },
    { field: "uom", headerName: "UOM", width: 90 },
    {
      field: "qty",
      headerName: "Actual Quantity",
      width: 110,
    },
    {
      field: "approve_quantity",
      headerName: "Approve Quantity",
      width: 130,
      renderCell: (params) => (
        <>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            defaultValue={
              details?.hierarchyLevel === "Level1"
                ? params?.row?.qty
                : params?.row?.level1_Qty
            }
            onChange={(e) => approveQtyHandle(e, params)}
          />
        </>
      ),
    },
    {
      field: "received_Remark",
      headerName: "Remarks",
      width: 500,
      renderCell: (params) => (
        <>
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={params?.row?.received_Remark}
            onChange={(e) => remarksHandle(e, params)}
            multiline
            InputProps={{
              inputProps: { style: { whiteSpace: "normal" } }, // Ensure multiline handling if needed
            }}
          />
        </>
      ),
    },
  ];
  const updateHandle = async () => {
    const res = await Route(
      "PUT",
      `/requisition/updateRequisitionItemDetails`,
      null,
      updateRequisitionItems,
      null
    );
    if (res?.status === 200) {
      setNotificationMsg(res?.data?.responseText);
      setSeverity("success");
      setShowNofication(true);
      setApproveRequisitionItems((prev) => ({
        ...prev,
        requisitionNo: details?.requisitionNo,
        employeeCode: empID,
        itemDTOList: details?.itemDTOList?.map((item) => ({
          req_Item_No: item?.req_Item_No,
          received_Qty:
            details?.hierarchyLevel === "Level1"
              ? item?.level1_Qty
              : item?.level2_Qty,
          received_Remark: "",
        })),
      }));
      fetchRequisitionListByApprover();
      setOpen(false);
    } else {
      setNotificationMsg(res?.data?.message);
      setSeverity("error");
      setShowNofication(true);
    }
  };
  return (
    <>
      <Dialog
        maxWidth="xl"
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Grid
                container
                padding={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#EEEDEB",
                  backgroundColor: "rgb(25, 118, 210)",
                  color: "#fff",
                }}
              >
                <Grid item>
                  <Typography variant="subtitle1">
                    Requisition Details
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingY={1} paddingX={2}>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    Requisition Number: {details?.requisitionNo}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    Employee Name: {details?.employeeName}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    Employee Code: {details?.employeeCode}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingX={2}>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    Store Name: {details?.requisitionStoreName}
                  </Typography>
                </Grid>
                <Grid item xs={4} display="flex">
                  <Typography variant="body1">
                    Region Name: {details?.regionName}
                  </Typography>
                </Grid>
                <Grid item xs={4} display="flex">
                  <Typography variant="body1">
                    Requisition Date: {details?.requisition_Date}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
              <div
                style={{
                  height: "auto",
                  width: "100%",
                  background: "#fff",
                }}
              >
                <DataGrid
                  rows={itemDTOlist?.map((row, index) => ({
                    ...row,
                    sl: index + 1,
                  }))}
                  columns={requisiton_item_columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  sx={{ marginX: 2 }}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              alignItems="right"
              paddingX={2}
              paddingBottom={2}
              sx={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
            >
              <Button variant="contained" onClick={updateHandle}>
                Update
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
                color="error"
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={setShowNofication}
          message={notificationMsg}
          severity={severity}
        />
      )}
    </>
  );
};

export default UpdateRequisition;
