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
  }, [transferOrderDetails]);
  const [transferOrderItemDTOList, setTransferOrderDTOList] = useState({
    transaction_Item_No: "",
    received_Qty: "",
    received_Remark: "",
  });

  const receivedQtyHandle = (e, params) => {
    if (parseInt(e?.target?.value) === 0) {
      // setParameters((prev) => ({
      //   ...prev,
      //   transferOrderItemDTOList: prev.transferOrderItemDTOList.map((item) =>
      //     item?.transaction_Item_No === params?.row?.transaction_Item_No
      //       ? { ...item, received_Qty: 0 }
      //       : item
      //   ),
      // }));
      setNotificationMsg("Received quantity should be greater than 0");
      setSeverity("error");
      setShowNofication(true);
    } else if (parseInt(e?.target?.value) > parseInt(params?.row?.qty)) {
      // setParameters((prev) => ({
      //   ...prev,
      //   transferOrderItemDTOList: prev.transferOrderItemDTOList.map((item) =>
      //     item?.transaction_Item_No === params?.row?.transaction_Item_No
      //       ? { ...item, received_Qty: 0 }
      //       : item
      //   ),
      // }));
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
            fullWidth
            size="small"
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
    // const allValid = parameters?.transferOrderItemDTOList?.every(
    //   (item) => item?.received_Qty !== null
    // );
    // if (allValid) {
    //   const allFulfilled = parameters?.transferOrderItemDTOList?.every(
    //     (item) => Number(item?.received_Qty) <= Number(item?.qty)
    //   );
    //   if (allFulfilled) {
    //     const res = await Route(
    //       "PUT",
    //       `/transferOrder/updateInwardTransferItemDetails`,
    //       access_token,
    //       parameters,
    //       null
    //     );
    //     if (res?.status === 200) {
    //       fetchInwardTrasnferOrderList();
    //       setSeverity("success");
    //       setNotificationMsg(
    //         res?.data?.responseText === null
    //           ? "Items Successfully Received"
    //           : res?.data?.responseText
    //       );
    //       setShowNofication(true);
    //     } else {
    //       setNotificationMsg(res?.response?.data?.message);
    //       setSeverity("error");
    //       setShowNofication(true);
    //     }
    //   } else {
    //     setNotificationMsg("Recevied Qty cannot be Greater than Actual Qty!");
    //     setSeverity("error");
    //     setShowNofication(true);
    //   }
    // } else {
    //   setNotificationMsg("Recevied Qty cannot be empty!");
    //   setSeverity("error");
    //   setShowNofication(true);
    // }
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
                  id="outlined-basic"
                  label="Transfer Order No"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={parameters?.transfer_Order_Number}
                  size="small"
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="Transfer Order Created Date"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={parameters?.transfer_Date}
                  size="small"
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="Transfer Type"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={parameters?.transfer_Type}
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="From Store"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={parameters?.transfer_From_Name}
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} paddingTop={2}>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="From Sub-Inventory"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={parameters?.transfer_From_SubInventory}
                  size="small"
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="From Locator"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={parameters?.transfer_From_Locator}
                  size="small"
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="To Store"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={parameters?.transfer_To_Name}
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="To Sub-Inventory"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={parameters?.transfer_To_SubInventory}
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} paddingY={2}>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="To Locator"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={parameters?.transfer_To_Locator}
                  size="small"
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="Mode Of Transport"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={parameters?.transfer_Mode}
                  size="small"
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="Vehicle No."
                  variant="outlined"
                  required
                  fullWidth
                  disabled
                  value={parameters?.vehicle_Number}
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Remarks"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={parameters?.remarks}
                  size="small"
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
              <Button variant="contained" onClick={updateHandle} size="small">
                Update
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
                color="error"
                size="small"
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
      {isLoading && <LoaderDialog open={isLoading} />}
    </>
  );
};

export default UpdateTransferOrderInward;
