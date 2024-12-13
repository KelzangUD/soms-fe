import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Dialog,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Notification } from "../../ui/index";
import { Transition } from "../../component/common";
import Route from "../../routes/Route";

const ApproveRequisition = ({
  open,
  setOpen,
  details,
  fetchRequisitionListByApprover,
}) => {
  const empID = localStorage.getItem("username");
  const access_token = localStorage.getItem("access_token");
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [itemDTOlist, setItemDTOList] = useState([]);
  useEffect(() => {
    setItemDTOList(
      details?.itemDTOList?.map((item) => ({
        id: item?.req_Item_No,
        item_Number: item?.item_Number,
        item_Description: item?.item_Description,
        uom: item?.uom,
        qty: item?.qty,
        level1_Qty: item?.level1_Qty,
        level2_Qty: item?.level2_Qty,
        received_Remark: item?.received_Remark,
      }))
    );
  }, [details]);
  const requisiton_item_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "item_Number", headerName: "Item Number", width: 200 },
    {
      field: "item_Description",
      headerName: "Description",
      width: 500,
    },
    { field: "uom", headerName: "UOM", width: 150 },
    {
      field: "qty",
      headerName: "Actual Quantity",
      width: 150,
    },
    {
      field: "approve_quantity",
      headerName: "Approve Quantity",
      width: 150,
      renderCell: (params) => (
        <>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            disabled
            defaultValue={
              details?.hierarchyLevel === "Level1"
                ? params?.row?.level1_Qty
                : params?.row?.level2_Qty
            }
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
            id="outlined-basic"
            variant="outlined"
            size="small"
            disabled
            defaultValue={params?.row?.received_Remark}
          />
        </>
      ),
    },
  ];
  const updateHandle = async () => {
    const res = await Route(
      "PUT",
      `/requisition/approveRequisitionDetails?requisitionNo=${details?.requisitionNo}&empID=${empID}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setNotificationMsg(res?.data?.responseText);
      setSeverity("success");
      setShowNofication(true);
      fetchRequisitionListByApprover();
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
                }}
              >
                <Grid item>
                  <Typography variant="subtitle1">
                    Requisition Details
                  </Typography>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">
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
              </Grid>
              <Grid container padding={2}>
                <Grid container spacing={2}>
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
                  sx={{ mx: 2 }}
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
                Approve
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
          setOpen={() => {
            setShowNofication(false);
            setOpen(false);
          }}
          message={notificationMsg}
          severity={severity}
        />
      )}
    </>
  );
};

export default ApproveRequisition;
