import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Grid,
  Button,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Notification from "../../ui/Notification";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import TransferBulkUploader from "../../assets/files/TransferBulkUploader.csv";
import Route from "../../routes/Route";
import { dateFormatter } from "../../util/CommonUtil";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateTransferOrder = ({ open, setOpen }) => {
  const empID = localStorage.getItem("username");
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [transferType, setTransferType] = useState([]);
  const [fromSubInventory, setFromSubInventory] = useState([]);
  const [fromLocator, setFromLocator] = useState([]);
  const [toStore, setToStore] = useState([]);
  const [toSubInventory, setToSubInventory] = useState([]);
  const [toLocator, setToLocator] = useState([]);
  const [modeOfTransport, setModeOfTransport] = useState([]);
  const [parameters, setParameters] = useState({
    transfer_Type: "",
    transfer_From: "",
    transfer_From_SubInventory: "",
    transfer_From_Locator: "",
    transfer_To: "",
    transfer_To_Locator: "",
    transfer_Mode: "",
    vehicle_Number: "",
    remarks: "",
    created_By: empID,
    transferOrderItemDTOList: [],
  });
  const [transferOrderItemDTOList, setTransferOrderDTOList] = useState({
    item_Description: "",
    item_Number: "",
    item_Serial_Number: "",
    uom: "",
    qty: "",
  });

  const fetchTransferType = async () => {
    const res = await Route("GET", "/Common/FetchTransferType", null, null, null);
    if (res?.status === 200) {
      setTransferType(res?.data);
    }
  };
  const fetchModeOfTransport = async () => {
    const res = await Route("GET", "/Common/fetchTransferMode", null, null, null);
    if (res?.status === 200) {
      setModeOfTransport(res?.data);
    }
  };
  const fetchFromSubInventory = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchSubInventory?userId=${empID}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setFromSubInventory(res?.data);
    }
  };
  const fetchFromLocator = async (id) => {
    const res = await Route(
      "GET",
      `/Common/FetchLocator?userId=${empID}&subInventory=${id}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setFromLocator(res?.data);
    }
  };
  useEffect(() => {
    fetchTransferType();
    fetchModeOfTransport();
    fetchFromSubInventory();
  }, []);

  const fromSubInventoryHandle = (e) => {
    fetchFromLocator(e?.target?.value);
    setParameters((prev) => ({
      ...prev,
      transfer_From_SubInventory: e?.target?.value,
    }));
  };

  const item_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "item_Number", headerName: "Item Number", width: 200 },
    {
      field: "item_Description",
      headerName: "Description",
      width: 500,
    },
    {
      field: "serial_no",
      headerName: "Serial No",
      width: 400,
    },
    { field: "uom", headerName: "UOM", width: 150 },
    { field: "qty", headerName: "Quantity", width: 150 },
    {
      field: "level1_Qty",
      headerName: "Actual Quantity",
      width: 150,
    },
  ];
  const fileDownloadHandle = () => {
    const fileUrl = TransferBulkUploader;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "TransferBulkUploader.csv"; // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the link element
  };

  const updateHandle = async () => {
    // const res = await Route(
    //   "PUT",
    //   `/requisition/approveRequisitionDetails?requisitionNo=${details?.requisitionNo}&empID=${approver}`,
    //   null,
    //   null,
    //   null
    // );
    // if (res?.status === 200) {
    //   setNotificationMsg(res?.data?.responseText);
    //   setSeverity("success");
    //   setShowNofication(true);
    //   fetchRequisitionListByApprover();
    //   setOpen(false);
    // } else {
    //   setNotificationMsg(res?.data?.message);
    //   setSeverity("error");
    //   setShowNofication(true);
    // }
  };
  return (
    <>
      <Dialog
        fullScreen
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
                <Grid item paddingX={2}>
                  <Typography variant="subtitle1">Transfer Order</Typography>
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
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Transfer Order Create Date"
                      //   value={dayjs(paymentReceiptDetails?.postingDate)}
                      //   onChange={postingDateHandle}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <FormControl fullWidth>
                  <InputLabel id="transfer-type-select-label">
                    Transfer Type*
                  </InputLabel>
                  <Select
                    labelId="transfer-type-select-label"
                    id="transfer-type-select"
                    label="Transfer Type*"
                    // onChange={paymentTypeHandle}
                    // value={rechargeDetails?.payment}
                  >
                    {transferType?.map((item) => (
                          <MenuItem value={item} key={item?.id}>
                            {item?.type}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="From Store"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} paddingTop={2}>
              <Grid item xs={3} paddingRight={1}>
                <FormControl fullWidth>
                  <InputLabel id="from-sub-inventory-select-label">
                    From Sub-inventoy
                  </InputLabel>
                  <Select
                    labelId="from-sub-inventory-select-label"
                    id="from-sub-inventory-select"
                    label="From Sub-Inventory"
                    onChange={fromSubInventoryHandle}
                    value={parameters?.transfer_From_SubInventory}
                  >
                    {fromSubInventory?.map((item) => (
                      <MenuItem value={item?.sub_inv} key={item?.id}>
                        {item?.sub_inv}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <FormControl fullWidth>
                  <InputLabel id="from-locator-select-label">
                    From Locator
                  </InputLabel>
                  <Select
                    labelId="from-locator-select-label"
                    id="from-locator-select"
                    label="From Locator"
                    // onChange={paymentTypeHandle}
                    // value={rechargeDetails?.payment}
                  >
                    {fromLocator?.map((item) => (
                      <MenuItem value={item} key={item?.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <FormControl fullWidth>
                  <InputLabel id="to-store-select-label">To Store</InputLabel>
                  <Select
                    labelId="to-store-select-label"
                    id="to-store-select"
                    label="To Store"
                    // onChange={paymentTypeHandle}
                    // value={rechargeDetails?.payment}
                  >
                    {/* {paymentType?.map((item) => (
                          <MenuItem value={item} key={item?.id}>
                            {item?.type}
                          </MenuItem>
                        ))} */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="to-sub-inventory-select-label">
                    To Sub-Inventry
                  </InputLabel>
                  <Select
                    labelId="to-sub-inventory-select-label"
                    id="to-sub-inventory-select"
                    label="To Sub-Inventory"
                    // onChange={paymentTypeHandle}
                    // value={rechargeDetails?.payment}
                  >
                    {fromSubInventory?.map((item) => (
                      <MenuItem value={item?.sub_inv} key={item?.id}>
                        {item?.sub_inv}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item container xs={12} paddingY={2}>
              <Grid item xs={3} paddingRight={1}>
                <FormControl fullWidth>
                  <InputLabel id="to-locator-select-label">
                    To Locator
                  </InputLabel>
                  <Select
                    labelId="to-locator-select-label"
                    id="to-locator-select"
                    label="To Locator"
                    // onChange={paymentTypeHandle}
                    // value={rechargeDetails?.payment}
                  >
                    {fromLocator?.map((item) => (
                      <MenuItem value={item} key={item?.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <FormControl fullWidth>
                  <InputLabel id="mode-of-transport-select-label">
                    Mode Of Transport
                  </InputLabel>
                  <Select
                    labelId="mode-of-transport-select-label"
                    id="mode-of-transport-select"
                    label="Mode Of Transport"
                    // onChange={paymentTypeHandle}
                    // value={rechargeDetails?.payment}
                  >
                    {modeOfTransport?.map((item) => (
                          <MenuItem value={item} key={item?.id}>
                            {item?.type}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="Vehicle No."
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Remarks"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                padding={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  backgroundColor: "#EEEDEB",
                }}
              >
                <Grid item paddingX={2}>
                  <IconButton
                    aria-label="download"
                    onClick={fileDownloadHandle}
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton aria-label="upload">
                    <UploadIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12} paddingY={2}>
              <Grid item xs={3} paddingRight={1}>
                <Autocomplete
                  disablePortal
                  options={[]}
                  renderInput={(params) => (
                    <TextField {...params} label="Description" />
                  )}
                />
              </Grid>
              <Grid item xs={2} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="Item Number"
                  variant="outlined"
                  required
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <Autocomplete
                  disablePortal
                  options={[]}
                  renderInput={(params) => (
                    <TextField {...params} label="Serial Number" />
                  )}
                />
              </Grid>
              <Grid item xs={2} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="UOM"
                  variant="outlined"
                  required
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item container xs={2} paddingRight={1} alignItems="center">
                <Grid item>
                  <TextField
                    id="outlined-basic"
                    label="Item Number"
                    variant="outlined"
                    required
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid>
                  <IconButton aria-label="delete">
                    <AddBoxIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" xs={12} paddingY={2}>
              <div
                style={{
                  height: "auto",
                  width: "100%",
                  background: "#fff",
                }}
              >
                <DataGrid
                  //   rows={itemDTOlist?.map((row, index) => ({
                  //     ...row,
                  //     sl: index + 1,
                  //   }))}
                  rows={[]}
                  columns={item_columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              alignItems="right"
              paddingX={2}
              sx={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
            >
              <Button variant="contained" onClick={updateHandle}>
                Create
              </Button>
              <Button variant="outlined" onClick={() => setOpen(false)}>
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

export default CreateTransferOrder;
