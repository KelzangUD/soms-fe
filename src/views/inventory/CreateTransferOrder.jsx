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
import { dateFormatterTwo } from "../../util/CommonUtil";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateTransferOrder = ({ open, setOpen, fetchTransferOrderList }) => {
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
  const [itemList, setItemList] = useState([]);
  const [file, setFile] = useState(null);
  const [parameters, setParameters] = useState({
    transfer_Date: dateFormatterTwo(new Date()),
    transfer_Type: "",
    transfer_From: "",
    transfer_From_SubInventory: "",
    region_NAME: "",
    transfer_From_Locator: "",
    transfer_To: "",
    transfer_To_SubInventory: "",
    transfer_To_Locator: "",
    transfer_Mode: "",
    vehicle_Number: "",
    remarks: "",
    created_By: empID,
    transferOrderItemDTOList: [],
  });
  const [transferOrderItemDTOList, setTransferOrderDTOList] = useState({
    id: "",
    item_Description: "",
    item_Number: "",
    item_Serial_Number: "",
    uom: "",
    qty: "",
  });
  const [serialInputDisabled, setSerialInputDisabled] = useState(true);

  const fetchUserDetails = async () => {
    const res = await Route(
      "GET",
      `/Common/fetchUserDtls?userId=${empID}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setParameters((prev) => ({
        ...prev,
        transfer_From: res?.data?.storeId,
        region_NAME: res?.data?.region_NAME,
      }));
    }
  };

  const fetchTransferType = async () => {
    const res = await Route(
      "GET",
      "/Common/FetchTransferType",
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setTransferType(res?.data);
    }
  };
  const fetchModeOfTransport = async () => {
    const res = await Route(
      "GET",
      "/Common/fetchTransferMode",
      null,
      null,
      null
    );
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
  const fetchToLocator = async (id) => {
    const res = await Route(
      "GET",
      `/Common/FetchLocator?userId=${empID}&subInventory=${id}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setToLocator(res?.data);
    }
  };
  const fetchToStore = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchStore?userId=${empID}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setToStore(res?.data);
    }
  };
  const fetchAllItems = async () => {
    const res = await Route("GET", `/Common/FetchAllItems`, null, null, null);
    if (res?.status === 200) {
      setItemList(res?.data);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchTransferType();
    fetchModeOfTransport();
    fetchFromSubInventory();
    fetchToStore();
    fetchAllItems();
  }, []);

  const transferOrderDateHandle = (e) => {
    setParameters((prev) => ({
      ...prev,
      transfer_Date: dateFormatterTwo(e?.$d),
    }));
  };
  const transferTypeHandle = (e) => {
    setParameters((prev) => ({
      ...prev,
      transfer_Type: e?.target?.value,
    }));
  };
  const fromSubInventoryHandle = (e) => {
    fetchFromLocator(e?.target?.value);
    setParameters((prev) => ({
      ...prev,
      transfer_From_SubInventory: e?.target?.value,
    }));
  };
  const fromLocatorHandle = (e) => {
    setParameters((prev) => ({
      ...prev,
      transfer_From_Locator: e?.target?.value,
    }));
  };
  const toStoreHandle = (e) => {
    setParameters((prev) => ({
      ...prev,
      transfer_To: parseInt(e?.target?.value),
    }));
  };
  const transferToSubInvHandle = (e) => {
    fetchToLocator(e?.target?.value);
    setParameters((prev) => ({
      ...prev,
      transfer_To_SubInventory: e?.target?.value,
    }));
  };
  const toLocatorHandle = (e) => {
    setParameters((prev) => ({
      ...prev,
      transfer_To_Locator: e?.target?.value,
    }));
  };
  const transferModeHandle = (e) => {
    setParameters((prev) => ({
      ...prev,
      transfer_Mode: e?.target?.value,
    }));
  };
  const vehicleNoHandle = (e) => {
    setParameters((prev) => ({
      ...prev,
      vehicle_Number: e?.target?.value,
    }));
  };
  const remarksHandle = (e) => {
    setParameters((prev) => ({
      ...prev,
      remarks: e?.target?.value,
    }));
  };
  const descriptionHandle = (e, value) => {
    if (value === null) {
      setTransferOrderDTOList((prev) => ({
        ...prev,
        item_Description: "",
        item_Number: "",
        uom: "",
      }));
    } else {
      setTransferOrderDTOList((prev) => ({
        ...prev,
        item_Description: value?.label,
        item_Number: value?.item_Number,
        uom: value?.uom,
      }));
      setSerialInputDisabled(value?.serial_controlled === "N" ? true : false);
    }
  };
  const serialNumberHandle = (e) => {
    setTransferOrderDTOList((prev) => ({
      ...prev,
      item_Serial_Number: e?.target?.value,
    }));
  };
  const qtyHandle = (e) => {
    setTransferOrderDTOList((prev) => ({
      ...prev,
      qty: e?.target?.value,
    }));
  };
  const addHandle = () => {
    if (transferOrderItemDTOList?.qty === "") {
      setNotificationMsg("Please Enter Quantity");
      setSeverity("info");
      setShowNofication(true);
    } else {
      setParameters((prev) => ({
        ...prev,
        transferOrderItemDTOList: [
          ...prev.transferOrderItemDTOList,
          transferOrderItemDTOList,
        ],
      }));
      setTransferOrderDTOList((prev) => ({
        ...prev,
        item_Description: "",
        item_Number: "",
        item_Serial_Number: "",
        uom: "",
        qty: "",
      }));
    }
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

  const createHandle = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (file && file.length > 0) {
      formData.append("File", file);
    } else {
      const placeholderFile = new File([""], "file.csv");
      formData.append("File", placeholderFile);
    }
    const jsonDataBlob = new Blob([JSON.stringify(parameters)], {
      type: "application/json",
    });

    formData.append("data", jsonDataBlob, "data.json");
    const res = await Route(
      "POST",
      `/transferOrder/createTransferOrder`,
      null,
      formData,
      null,
      "multipart/form-data"
    );
    if (res?.status === 200 && res?.data?.success === true) {
      setSeverity("success");
      setNotificationMsg(res?.data?.responseText);
      setShowNofication(true);
      setParameters((prev) => ({
        ...prev,
        transfer_Date: dateFormatterTwo(new Date()),
        region_NAME: "",
        transfer_Type: "",
        transfer_From: "",
        transfer_From_SubInventory: "",
        transfer_From_Locator: "",
        transfer_To: "",
        transfer_To_SubInventory: "",
        transfer_To_Locator: "",
        transfer_Mode: "",
        vehicle_Number: "",
        remarks: "",
        created_By: empID,
        transferOrderItemDTOList: [],
      }));
      setSerialInputDisabled(true);
      fetchTransferOrderList();
      setOpen(false);
    } else {
      setNotificationMsg(res?.response?.data?.message);
      setSeverity("error");
      setShowNofication(true);
    }
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
                      value={dayjs(parameters?.transfer_Date)}
                      onChange={transferOrderDateHandle}
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
                    onChange={transferTypeHandle}
                    value={parameters?.transfer_Type}
                  >
                    {transferType?.map((item) => (
                      <MenuItem value={item?.type} key={item?.id}>
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
                  value={parameters?.region_NAME}
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
                      <MenuItem value={item?.id} key={item?.id}>
                        {item?.id}
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
                    onChange={fromLocatorHandle}
                    value={parameters?.transfer_From_Locator}
                  >
                    {fromLocator?.map((item) => (
                      <MenuItem value={item?.name} key={item?.id}>
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
                    onChange={toStoreHandle}
                    value={parameters?.transfer_To}
                  >
                    {toStore?.map((item) => (
                      <MenuItem value={item?.id} key={item?.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
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
                    onChange={transferToSubInvHandle}
                    value={parameters?.transfer_To_SubInventory}
                  >
                    {fromSubInventory?.map((item) => (
                      <MenuItem value={item?.id} key={item?.id}>
                        {item?.id}
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
                    onChange={toLocatorHandle}
                    value={parameters?.transfer_To_Locator}
                  >
                    {toLocator?.map((item) => (
                      <MenuItem value={item?.name} key={item?.id}>
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
                    onChange={transferModeHandle}
                    value={parameters?.transfer_Mode}
                  >
                    {modeOfTransport?.map((item) => (
                      <MenuItem value={item?.type} key={item?.id}>
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
                  onChange={vehicleNoHandle}
                  value={parameters?.vehicle_Number}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Remarks"
                  variant="outlined"
                  fullWidth
                  onChange={remarksHandle}
                  value={parameters?.remarks}
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
                  options={itemList?.map((item, index) => ({
                    label: item?.description,
                    value: item?.description,
                    item_Number: item?.item_number,
                    serial_controlled: item?.serial_controlled,
                    uom: item?.uom,
                    id: index,
                  }))}
                  value={transferOrderItemDTOList?.item_Description}
                  onChange={descriptionHandle}
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
                  value={transferOrderItemDTOList?.item_Number}
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="Serial Number"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={serialNumberHandle}
                  disabled={serialInputDisabled}
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
                  value={transferOrderItemDTOList?.uom}
                />
              </Grid>
              <Grid item container xs={2} paddingRight={1} alignItems="center">
                <Grid item>
                  <TextField
                    id="outlined-basic"
                    label="Quantity"
                    variant="outlined"
                    required
                    fullWidth
                    value={transferOrderItemDTOList?.qty}
                    onChange={qtyHandle}
                  />
                </Grid>
                <Grid>
                  <IconButton aria-label="add" onClick={addHandle}>
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
                  rows={parameters?.transferOrderItemDTOList?.map(
                    (row, index) => ({
                      ...row,
                      sl: index + 1,
                      id: index,
                    })
                  )}
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
              <Button variant="contained" onClick={createHandle}>
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
