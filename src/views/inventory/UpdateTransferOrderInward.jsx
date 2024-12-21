import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Dialog,
  TextField,
  Typography,
} from "@mui/material";
import { Notification, LoaderDialog } from "../../ui/index";
import Route from "../../routes/Route";
import { dateFormatterTwo } from "../../util/CommonUtil";
import { CustomDataTable, Transition } from "../../component/common";

const UpdateTransferOrderInward = ({
  open,
  setOpen,
  fetchInwardTrasnferOrderList,
  transferOrderDetails,
}) => {
  const empID = localStorage.getItem("username");
  const access_token = localStorage.getItem("access_token");
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [isLoading, setIsLoading] = useState(false);
  const [parameters, setParameters] = useState({
    transfer_Order_Id: "",
    transfer_Order_Number: "",
    transfer_Date: "",
    transfer_Type: "",
    transfer_From_Name: "",
    transfer_From: "",
    transfer_From_SubInventory: "",
    transfer_From_Locator: "",
    transfer_To_Name: "",
    transfer_To: "",
    transfer_To_SubInventory: "",
    transfer_To_Locator: "",
    transfer_Mode: "",
    vehicle_Number: "",
    remarks: "",
    transferOrderItemDTOList: [],
    last_Updated_By: "",
  });
  useEffect(() => {
    setParameters((prev) => ({
      ...prev,
      transfer_Order_Id: transferOrderDetails?.transfer_Order_Id,
      transfer_Order_Number: transferOrderDetails?.transfer_Order_Number,
      transfer_Date: dateFormatterTwo(transferOrderDetails?.transfer_Date),
      transfer_Type: transferOrderDetails?.transfer_Type,
      transfer_From_Name: transferOrderDetails?.transfer_From_Name,
      transfer_From: "",
      transfer_From_SubInventory:
        transferOrderDetails?.transfer_From_SubInventory,
      transfer_From_Locator: transferOrderDetails?.transfer_From_Locator,
      transfer_To_Name: transferOrderDetails?.transfer_To_Name,
      transfer_To: "",
      transfer_To_SubInventory: transferOrderDetails?.transfer_To_SubInventory,
      transfer_To_Locator: transferOrderDetails?.transfer_To_Locator,
      transfer_Mode: transferOrderDetails?.transfer_Mode,
      vehicle_Number: transferOrderDetails?.vehicle_Number,
      remarks: transferOrderDetails?.remarks,
      transferOrderItemDTOList: transferOrderDetails?.transferOrderItemDTOList,
      last_Updated_By: empID,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferOrderDetails]);

  const receivedQtyHandle = (e, params) => {
    if (parseInt(e?.target?.value) === 0) {
      setNotificationMsg("Received quantity should be greater than 0");
      setSeverity("error");
      setShowNofication(true);
    } else if (parseInt(e?.target?.value) > parseInt(params?.row?.qty)) {
      setNotificationMsg(
        "Received quantity should not be greater than Actual Quantity"
      );
      setSeverity("error");
      setShowNofication(true);
    } else {
      setParameters((prev) => ({
        ...prev,
        transferOrderItemDTOList: prev.transferOrderItemDTOList.map((item) =>
          item?.transaction_Item_No === params?.row?.transaction_Item_No
            ? { ...item, received_Qty: parseInt(e?.target?.value) }
            : item
        ),
      }));
    }
  };

  const descriptionHandle = (e, params) => {
    setParameters((prev) => ({
      ...prev,
      transferOrderItemDTOList: prev.transferOrderItemDTOList.map((item) =>
        item?.transaction_Item_No === params?.row?.transaction_Item_No
          ? { ...item, received_Remark: e?.target?.value }
          : item
      ),
    }));
  };
  const item_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.3 },
    { field: "item_Number", headerName: "Item Number", flex: 1.8 },
    {
      field: "item_Description",
      headerName: "Description",
      flex: 4,
    },
    {
      field: "item_Serial_Number",
      headerName: "Serial No",
      flex: 3,
    },
    { field: "uom", headerName: "UOM", flex: 1 },
    { field: "qty", headerName: "Quantity", flex: 1 },
    {
      field: "rec_qty",
      headerName: "Rec. Qty",
      flex: 1.5,
      renderCell: (params) => (
        <>
          <TextField
            id="outlined-basic"
            variant="outlined"
            required
            defaultValue={params?.row?.qty}
            type="number"
            onChange={(e) => receivedQtyHandle(e, params)}
          />
        </>
      ),
    },
    {
      field: "description",
      headerName: "Remarks",
      flex: 1.5,
      renderCell: (params) => (
        <>
          <TextField
            id="outlined-basic"
            variant="outlined"
            required
            fullWidth
            size="small"
            onChange={(e) => descriptionHandle(e, params)}
          />
        </>
      ),
    },
  ];

  const validateTransferOrderItems = () => {
    if (!parameters?.transferOrderItemDTOList) return false;
    const hasValidQuantities = parameters.transferOrderItemDTOList.every(
      (item) => item?.received_Qty !== null
    );
    if (!hasValidQuantities) {
      setNotificationMsg("Received Qty cannot be empty!");
      setSeverity("error");
      setShowNofication(true);
      return false;
    }
    const isWithinLimits = parameters.transferOrderItemDTOList.every(
      (item) => Number(item?.received_Qty) <= Number(item?.qty)
    );
    if (!isWithinLimits) {
      setNotificationMsg("Received Qty cannot be greater than Actual Qty!");
      setSeverity("error");
      setShowNofication(true);
      return false;
    }
    return true;
  };

  const updateHandle = async (e) => {
    e.preventDefault();
    if (!validateTransferOrderItems()) return;
    setIsLoading(true);
    try {
      const res = await Route(
        "PUT",
        `/transferOrder/updateInwardTransferItemDetails`,
        access_token,
        parameters,
        null
      );
      if (res?.status === 200) {
        fetchInwardTrasnferOrderList();
        setSeverity("success");
        setNotificationMsg(
          res?.data?.responseText ?? "Items Successfully Received"
        );
        setShowNofication(true);
      } else {
        setNotificationMsg(res?.response?.data?.message || "An error occurred");
        setSeverity("error");
        setShowNofication(true);
      }
    } catch (error) {
      setNotificationMsg(error?.message || "An unexpected error occurred");
      setSeverity("error");
      setShowNofication(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
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
                  backgroundColor: (theme) => theme.palette.bg.light,
                  color: "#fff",
                }}
              >
                <Grid item paddingX={2}>
                  <Typography variant="subtitle1">
                    Update Transfer Order Inward
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} paddingX={4}>
            <Grid item container xs={12} paddingTop={2}>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="transfer_order_no"
                  label="Transfer Order No"
                  required
                  disabled
                  value={parameters?.transfer_Order_Number}
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="transfer_order_created_date"
                  label="Transfer Order Created Date"
                  required
                  disabled
                  value={parameters?.transfer_Date}
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="transfer_type"
                  label="Transfer Type"
                  required
                  disabled
                  value={parameters?.transfer_Type}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="from_store"
                  label="From Store"
                  required
                  disabled
                  value={parameters?.transfer_From_Name}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} paddingTop={2}>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="from_sub_inv"
                  label="From Sub-Inventory"
                  required
                  disabled
                  value={parameters?.transfer_From_SubInventory}
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="from_sub"
                  label="From Locator"
                  required
                  disabled
                  value={parameters?.transfer_From_Locator}
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="to_store"
                  label="To Store"
                  required
                  disabled
                  value={parameters?.transfer_To_Name}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="to_sub_inv"
                  label="To Sub-Inventory"
                  required
                  disabled
                  value={parameters?.transfer_To_SubInventory}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} paddingY={2}>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="to_locator"
                  label="To Locator"
                  required
                  disabled
                  value={parameters?.transfer_To_Locator}
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="mode_of_transport"
                  label="Mode Of Transport"
                  required
                  disabled
                  value={parameters?.transfer_Mode}
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="vehicle_no"
                  label="Vehicle No."
                  required
                  disabled
                  value={parameters?.vehicle_Number}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="remarks"
                  label="Remarks"
                  disabled
                  value={parameters?.remarks}
                />
              </Grid>
            </Grid>
            <Grid item container alignItems="center" xs={12} paddingY={2}>
              <CustomDataTable
                rows={parameters?.transferOrderItemDTOList?.map(
                  (row, index) => ({
                    ...row,
                    sl: index + 1,
                    id: index,
                  })
                )}
                cols={item_columns}
              />
            </Grid>
            <Grid
              item
              xs={12}
              alignItems="right"
              marginBottom={2}
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
      {showNotification && severity === "error" && (
        <Notification
          open={showNotification}
          setOpen={setShowNofication}
          message={notificationMsg}
          severity={severity}
        />
      )}
      {showNotification && severity !== "error" && (
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
      {isLoading && <LoaderDialog open={isLoading} />}
    </>
  );
};

export default UpdateTransferOrderInward;
