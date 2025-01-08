import React, { useEffect, useState } from "react";
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
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Notification } from "../../ui/index";
import { Transition } from "../../component/common/index";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import TransferBulkUploader from "../../assets/files/TransferBulkUploader.xls";
import Route from "../../routes/Route";
import { useCommon } from "../../contexts/CommonContext";
import { dateFormatterTwo } from "../../util/CommonUtil";
import { SuccessNotification, Title } from "../../ui/index";
import { v4 as uuidv4 } from "uuid";

const CreateTransferOrder = ({
  open,
  setOpen,
  fetchTransferOrderList,
  userDetails,
}) => {
  const {
    transferType,
    modeOfTransport,
    fromSubInventory,
    fetchFromLocator,
    fromLocator,
    fetchToLocator,
    toLocator,
    fetchLocatorBasedOExtension,
    faToLocator,
    // toStore,
    onHandsTransferOrderItems,
    fetchAllItems,
    validateSerialNumberWithLocator,
    fetchTrasnferOrderToLocator,
    transferOrderToLocator,
  } = useCommon();

  const empID = localStorage.getItem("username");
  const access_token = localStorage.getItem("access_token");
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [withinStoreLocator, setWithinStoreLocator] = useState([]);
  const [enableToLocator, setEnableToLocator] = useState(false);
  const [file, setFile] = useState(null);
  const [parameters, setParameters] = useState({
    transfer_Date: dateFormatterTwo(new Date()),
    transfer_Type: "",
    transfer_From: userDetails?.storeId,
    transfer_From_SubInventory: "",
    region_NAME: userDetails?.regionName,
    transfer_From_Locator: "",
    selectedStore: "",
    transfer_To: "",
    transfer_To_Store: "",
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
    availaibleQty: "",
    qty: "",
  });
  const [serialInputDisabled, setSerialInputDisabled] = useState(true);
  const [disabledToSubInv, setDisabledToSubInv] = useState(true);
  const [toStore, setToStore] = useState([]);
  const fetchToStore = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchTransferToStore?StoreID=${userDetails?.storeId}&storeName=${userDetails?.regionName}&transferType=${parameters?.transfer_Type}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setToStore(res?.data);
    }
  };

  useEffect(() => {
    fetchToStore();
  }, [userDetails, parameters?.transfer_Type]);

  useEffect(() => {
    fetchTrasnferOrderToLocator(
      parameters?.transfer_To,
      parameters.transfer_To_SubInventory
    );
  }, [parameters?.transfer_To, parameters.transfer_To_SubInventory]);

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
      transfer_From_SubInventory: "",
      transfer_From_Locator: "",
      transfer_To_SubInventory: "",
      transfer_To_Locator: "",
    }));
    e?.target?.value === "With In Store" &&
      setParameters((prev) => ({
        ...prev,
        transfer_To: userDetails?.storeId,
        transfer_To_Store: userDetails?.region_NAME,
        transfer_From_Locator: "",
        transfer_To_Locator: "",
      }));
    e?.target?.value === "With In Store"
      ? setDisabledToSubInv(false)
      : setDisabledToSubInv(true);
  };
  const fromSubInventoryHandle = (e) => {
    console.log(e?.target?.value);
    fetchFromLocator(e?.target?.value);
    // fetchTrasnferOrderToLocator(e?.target.value);
    setParameters((prev) => ({
      ...prev,
      transfer_From_SubInventory: e?.target?.value,
      transfer_To_SubInventory: e?.target?.value,
    }));
    e?.target?.value !== "FA" && parameters?.transfer_Type !== "With In Store"
      ? setEnableToLocator(false)
      : setEnableToLocator(true);
  };
  const fromLocatorHandle = (e) => {
    fetchAllItems(
      userDetails?.regionName,
      parameters?.transfer_From_SubInventory,
      e?.target?.value
    );
    setParameters((prev) => ({
      ...prev,
      transfer_From_Locator: e?.target?.value,
    }));
    parameters?.transfer_From_SubInventory !== "FA" &&
      parameters?.transfer_Type !== "With In Store" &&
      setParameters((prev) => ({
        ...prev,
        transfer_To_Locator: e?.target?.value,
      }));
    setWithinStoreLocator(
      transferOrderToLocator?.filter((item) => item?.name !== e?.target?.value)
    );
  };
  const toStoreHandle = (value) => {
    const { toStoreId, toStoreName } = value;
    setParameters((prev) => ({
      ...prev,
      selectedStore: value,
      transfer_To: parseInt(toStoreId),
      transfer_To_Store: toStoreName,
    }));
    fetchLocatorBasedOExtension(toStoreName);
  };
  const transferToSubInvHandle = (e) => {
    // fetchTrasnferOrderToLocator(e?.target?.value);
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
        availaibleQty: "",
      }));
    } else {
      setTransferOrderDTOList((prev) => ({
        ...prev,
        item_Description: value?.label,
        item_Number: value?.item_Number,
        uom: value?.uom,
        id: value?.id,
        availaibleQty: value?.availaibleQty,
      }));
      setSerialInputDisabled(value?.serial_controlled === "N" ? true : false);
    }
  };
  const serialNumberHandle = (e) => {
    setTransferOrderDTOList((prev) => ({
      ...prev,
      item_Serial_Number: e?.target?.value,
      qty: 1,
    }));
  };
  const qtyHandle = (e) => {
    setTransferOrderDTOList((prev) => ({
      ...prev,
      qty: e?.target?.value,
    }));
  };
  const addHandle = async () => {
    if (transferOrderItemDTOList?.qty === "") {
      setNotificationMsg("Please Enter Quantity");
      setSeverity("info");
      setShowNofication(true);
    } else {
      if (serialInputDisabled) {
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
      } else {
        const validation = await validateSerialNumberWithLocator(
          transferOrderItemDTOList?.item_Serial_Number
        );
        if (validation === "False") {
          setNotificationMsg("Please Valid Serial Number");
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
      }
    }
  };
  const removeItemHandle = (params) => {
    setParameters((prev) => ({
      ...prev,
      transferOrderItemDTOList: prev.transferOrderItemDTOList.filter(
        (item) => item?.id !== params?.row?.id
      ),
    }));
  };
  const item_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.4 },
    { field: "item_Number", headerName: "Item Number", flex: 2 },
    {
      field: "item_Description",
      headerName: "Description",
      flex: 4,
    },
    {
      field: "item_Serial_Number",
      headerName: "Serial No",
      flex: 2,
    },
    { field: "uom", headerName: "UOM", flex: 1 },
    { field: "qty", headerName: "Quantity", flex: 1 },
    {
      field: "action",
      headerName: "Delete",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton>
            <DeleteIcon
              color="error"
              onClick={() => removeItemHandle(params)}
            />
          </IconButton>
        </>
      ),
    },
  ];
  const fileDownloadHandle = () => {
    const fileUrl = TransferBulkUploader;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "TransferBulkUploader.xls";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleFileUpload = async (e) => {
    let formData = new FormData();
    formData.append("File", e?.target?.files[0]);
    formData.append("empID", empID);
    const res = await Route(
      "POST",
      `/transferOrder/getBulkTransferItems`,
      access_token,
      formData,
      null,
      "multipart/form-data"
    );
    if (res?.status === 200) {
      setParameters((prev) => ({
        ...prev,
        transferOrderItemDTOList: [
          ...(prev.transferOrderItemDTOList || []),
          ...res?.data?.map((item) => ({
            item_Description: item?.item_Description,
            item_Number: item?.item_Number,
            item_Serial_Number: item?.item_Serial_Number,
            uom: item?.uom,
            qty: item?.qty,
          })),
        ],
      }));
    } else {
      setNotificationMsg(res?.response?.data?.message);
      setSeverity("error");
      setShowNofication(true);
    }
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
      access_token,
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
        selectedStore: "",
        transfer_To: "",
        transfer_To_Store: "",
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
          <Title title="Transfer Order" />
          <Grid item container xs={12} paddingX={2}>
            <Grid item container xs={12} mt={1} spacing={1}>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Transfer Order No"
                  required
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Transfer Order Create Date"
                      value={dayjs(parameters?.transfer_Date)}
                      onChange={transferOrderDateHandle}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl>
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
                  required
                  disabled
                  value={userDetails?.regionName}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} paddingTop={2} spacing={1}>
              <Grid item xs={3}>
                <FormControl>
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
              <Grid item xs={3}>
                <FormControl>
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
              <Grid item xs={3}>
                {/* {parameters?.transfer_Type === "With In Store" ? (
                  <TextField
                    id="outlined-basic"
                    label="To Store"
                    required
                    value={parameters?.transfer_To_Store}
                    disabled
                  />
                ) : (
                  <FormControl>
                    <InputLabel id="to-store-select-label">To Store</InputLabel>
                    <Select
                      labelId="to-store-select-label"
                      id="to-store-select"
                      label="To Store"
                      onChange={(event) => toStoreHandle(event.target.value)}
                      value={parameters?.selectedStore}
                    >
                      {toStore?.map((item) => (
                        <MenuItem value={item} key={item?.id}>
                          {item?.toStoreName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )} */}
                <FormControl>
                  <InputLabel id="to-store-select-label">To Store</InputLabel>
                  <Select
                    labelId="to-store-select-label"
                    id="to-store-select"
                    label="To Store"
                    onChange={(event) => toStoreHandle(event.target.value)}
                    value={parameters?.selectedStore}
                  >
                    {toStore?.map((item) => (
                      <MenuItem value={item} key={item?.toStoreId}>
                        {item?.toStoreName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl>
                  <InputLabel id="to-sub-inventory-select-label">
                    To Sub-Inventry
                  </InputLabel>
                  <Select
                    labelId="to-sub-inventory-select-label"
                    id="to-sub-inventory-select"
                    label="To Sub-Inventory"
                    onChange={transferToSubInvHandle}
                    value={parameters?.transfer_To_SubInventory}
                    disabled={disabledToSubInv}
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
            <Grid item container xs={12} paddingY={2} spacing={1}>
              <Grid item xs={3}>
                <FormControl>
                  <InputLabel id="to-locator-select-label">
                    To Locator
                  </InputLabel>
                  {parameters?.transfer_Type === "With In Store" ? (
                    <Select
                      labelId="to-locator-select-label"
                      id="to-locator-select"
                      label="To Locator"
                      onChange={toLocatorHandle}
                      value={parameters?.transfer_To_Locator}
                      disabled={!enableToLocator}
                    >
                      {parameters?.transfer_From_SubInventory ===
                      parameters?.transfer_To_SubInventory
                        ? withinStoreLocator?.map((item) => (
                            <MenuItem value={item?.id} key={item?.id}>
                              {item?.id}
                            </MenuItem>
                          ))
                        : transferOrderToLocator?.map((item) => (
                            <MenuItem value={item?.id} key={item?.id}>
                              {item?.id}
                            </MenuItem>
                          ))}
                    </Select>
                  ) : (
                    <Select
                      labelId="to-locator-select-label"
                      id="to-locator-select"
                      label="To Locator"
                      onChange={toLocatorHandle}
                      value={parameters?.transfer_To_Locator}
                      disabled={!enableToLocator}
                    >
                      {parameters?.transfer_From_SubInventory !== "FA"
                        ? transferOrderToLocator?.map((item) => (
                            <MenuItem value={item?.id} key={item?.id}>
                              {item?.id}
                            </MenuItem>
                          ))
                        : transferOrderToLocator?.map((item) => (
                            <MenuItem value={item?.id} key={item?.id}>
                              {item?.id}
                            </MenuItem>
                          ))}
                    </Select>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl>
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
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Vehicle No."
                  required
                  onChange={vehicleNoHandle}
                  value={parameters?.vehicle_Number}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Remarks"
                  onChange={remarksHandle}
                  value={parameters?.remarks}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                padding={1}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  backgroundColor: "bg.light",
                }}
              >
                <IconButton
                  aria-label="download"
                  onClick={fileDownloadHandle}
                  style={{
                    color: "#eee",
                  }}
                >
                  <DownloadIcon />
                </IconButton>
                <FormControl
                  sx={{
                    backgroundColor: "#0277bd",
                    width: "2%",
                    color: "#eee",
                  }}
                >
                  <TextField
                    type="file"
                    id="file-upload"
                    variant="outlined"
                    style={{
                      display: "none",
                    }}
                    onChange={(e) => handleFileUpload(e)}
                  />
                  <label
                    htmlFor="file-upload"
                    style={{
                      cursor: "pointer",
                      marginTop: 1,
                    }}
                  >
                    <UploadIcon />
                  </label>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item container xs={12} paddingY={2} spacing={1}>
              <Grid item xs={3}>
                <Autocomplete
                  disablePortal
                  options={onHandsTransferOrderItems?.map((item) => ({
                    label: item?.item_description,
                    value: item?.item_description,
                    item_Number: item?.item,
                    serial_controlled: item?.serial_controlled,
                    uom: item?.uom,
                    id: uuidv4(),
                    availaibleQty: parseInt(item?.transaction_quantity),
                  }))}
                  sx={{
                    zIndex: 1500,
                  }}
                  value={transferOrderItemDTOList?.item_Description}
                  onChange={descriptionHandle}
                  renderInput={(params) => (
                    <TextField {...params} label="Description" size="small" />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="outlined-basic"
                  label="Item Number"
                  required
                  disabled
                  value={transferOrderItemDTOList?.item_Number}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="outlined-basic"
                  label="Serial Number"
                  required
                  onChange={serialNumberHandle}
                  disabled={serialInputDisabled}
                />
              </Grid>
              <Grid item xs={1.5}>
                <TextField
                  id="outlined-basic"
                  label="UOM"
                  required
                  disabled
                  value={transferOrderItemDTOList?.uom}
                />
              </Grid>
              <Grid item xs={1.5}>
                <TextField
                  id="outlined-basic"
                  label="Availiable Qty"
                  required
                  disabled
                  value={transferOrderItemDTOList?.availaibleQty}
                />
              </Grid>
              <Grid item container xs={2} alignItems="center">
                <Grid item xs={9}>
                  <TextField
                    id="outlined-basic"
                    label="Quantity"
                    required
                    value={transferOrderItemDTOList?.qty}
                    onChange={qtyHandle}
                  />
                </Grid>
                <Grid item xs={3} alignContent="center">
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
            {parameters?.transferOrderItemDTOList?.length > 0 && (
              <Grid item container alignItems="center" xs={12} paddingY={2}>
                <DataGrid
                  rows={parameters?.transferOrderItemDTOList?.map(
                    (row, index) => ({
                      ...row,
                      id: index,
                      sl: index + 1,
                    })
                  )}
                  columns={item_columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  sx={{
                    background: "#fff",
                    "--DataGrid-overlayHeight": "300px",
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#F5F7F8",
                    },
                    "& .MuiDataGrid-row": {
                      padding: "4px 0",
                    },
                  }}
                  getRowHeight={() => "auto"}
                  disableColumnFilter
                  disableColumnSelector
                />
              </Grid>
            )}

            <Grid
              item
              xs={12}
              alignItems="right"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                mb: 2,
              }}
            >
              <Button variant="contained" onClick={createHandle}>
                Create
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
      {showNotification && severity === "success" && (
        <SuccessNotification
          showNotification={showNotification}
          setShowNofication={() => {
            setShowNofication(false);
            setOpen(false);
          }}
          notificationMsg="Successfully Created Transfer Order"
          alertMessange={notificationMsg}
        />
      )}
      {showNotification && severity === "info" && (
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
