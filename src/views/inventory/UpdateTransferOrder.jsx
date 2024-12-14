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
import DeleteIcon from "@mui/icons-material/Delete";
import TransferBulkUploader from "../../assets/files/TransferBulkUploader.csv";
import Route from "../../routes/Route";
import { dateFormatterTwo } from "../../util/CommonUtil";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateTransferOrder = ({
  open,
  setOpen,
  fetchTransferOrderList,
  transferOrderDetails,
}) => {
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
      transfer_Order_Number: transferOrderDetails?.transfer_Order_Number,
      transfer_Date:
        transferOrderDetails?.transfer_Date !== null
          ? dateFormatterTwo(transferOrderDetails?.transfer_Date)
          : null,
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
    id: "",
    item_Description: "",
    item_Number: "",
    item_Serial_Number: "",
    uom: "",
    qty: "",
    is_Received: 0,
  });
  const [serialInputDisabled, setSerialInputDisabled] = useState(true);
  const [fromSubInv, setFromSubInv] = useState(
    transferOrderDetails?.transfer_From_SubInventory
  );
  const [toSubInv, setToSubInv] = useState(
    transferOrderDetails?.transfer_To_SubInventory
  );

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
  const fetchFromLocator = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchLocator?userId=${empID}&subInventory=${fromSubInv}`,
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
      `/Common/FetchLocator?userId=${empID}&subInventory=${toSubInv}`,
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
  useEffect(() => {
    fetchFromLocator();
    fetchToLocator();
  }, [fromSubInv, toSubInv]);

  const transferOrderDateHandle = (e) => {
    setParameters((prev) => ({
      ...prev,
      transfer_Date: dateFormatterTwo(e?.$d),
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
        is_Received: 0,
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
  const deleteHandle = (params) => {
    setParameters((prev) => ({
      ...prev,
      transferOrderItemDTOList: prev.transferOrderItemDTOList.filter(
        (item) => item?.transaction_Item_No !== params?.row?.transaction_Item_No
      ),
    }));
  };
  const item_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "item_Number", headerName: "Item Number", width: 200 },
    {
      field: "item_Description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "serial_no",
      headerName: "Serial No",
      width: 250,
    },
    { field: "uom", headerName: "UOM", width: 100 },
    { field: "qty", headerName: "Quantity", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => deleteHandle(params)}
            color="error"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
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

  const updateHandle = async (e) => {
    e.preventDefault();
    const res = await Route(
      "PUT",
      `/transferOrder/updateTransferOrderDetails`,
      null,
      parameters,
      null
    );
    if (res?.status === 200 && res?.data?.success === true) {
      setSeverity("success");
      setNotificationMsg(res?.data?.responseText);
      setShowNofication(true);
      setParameters((prev) => ({
        ...prev,
        transfer_Date: dateFormatterTwo(new Date()),
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
                  color: "#eee",
                }}
              >
                <Grid item paddingX={2}>
                  <Typography variant="subtitle1">
                    Update Transfer Order
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
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Transfer Order Create Date"
                      value={dayjs(parameters?.transfer_Date)}
                      onChange={transferOrderDateHandle}
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>
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
                <FormControl fullWidth size="small">
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
                  size="small"
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
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                paddingY={1}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  backgroundColor: (theme) => theme.palette.bg.light,
                  color: "#eee",
                }}
              >
                <Grid item paddingX={2}>
                  <IconButton
                    aria-label="download"
                    onClick={fileDownloadHandle}
                    sx={{
                      color: "#fff",
                    }}
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton
                    aria-label="upload"
                    sx={{
                      color: "#fff",
                    }}
                  >
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
                    <TextField {...params} label="Description" size="small" />
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
                  size="small"
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
                  size="small"
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
                  size="small"
                />
              </Grid>
              <Grid item container xs={2} paddingRight={2} alignItems="center">
                <Grid item xs={11}>
                  <TextField
                    id="outlined-basic"
                    label="Quantity"
                    variant="outlined"
                    required
                    fullWidth
                    value={transferOrderItemDTOList?.qty}
                    onChange={qtyHandle}
                    size="small"
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton aria-label="add" onClick={addHandle}>
                    <AddBoxIcon
                      sx={{
                        color: (theme) => theme?.palette?.addBtnColor?.light,
                      }}
                    />
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
          setOpen={setShowNofication}
          message={notificationMsg}
          severity={severity}
        />
      )}
    </>
  );
};

export default UpdateTransferOrder;
