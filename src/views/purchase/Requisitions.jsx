import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Paper,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Notification,
  LoaderDialog,
  SuccessNotification,
  Title,
} from "../../ui/index";
import dayjs from "dayjs";
import { dateFormatterTwo } from "../../util/CommonUtil";
import Route from "../../routes/Route";
import { useCommon } from "../../contexts/CommonContext";

const Requisitions = () => {
  const { requisitionType, itemsList } = useCommon();
  const empId = localStorage.getItem("username");
  const userDetails = JSON.parse(localStorage?.getItem("userDetails"));
  const access_token = localStorage.getItem("access_token");
  // const [itemsList, setItemsList] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [isETop, setIsETop] = useState(false);
  const [requisitionData, setRequisitionData] = useState({
    requisitionType: "",
    createdBy: empId,
    needByDate: new Date(),
    requisitionDate: new Date(),
    itemDTOList: [],
  });
  const [itemDTOList, setItemDTOList] = useState({
    item_Description: "",
    item_Number: "",
    uom: "",
    amount: "",
  });
  // const fetchItemsList = async () => {
  //   const res = await Route("GET", `/Common/FetchAllItems`, null, null, null);
  //   console.log(res);
  //   console.log(res?.data);
  //   if (res?.status === 200) {
  //     setItemsList(res?.data);
  //   }
  // };
  // useEffect(() => {
  //   fetchItemsList();
  // },[]);
  const [isLoading, setIsLoading] = useState(false);
  const requisitionTypeHandle = (e) => {
    setIsETop(e?.target?.value === "3" ? true : false);
    setRequisitionData((prev) => ({
      ...prev,
      requisitionType: parseInt(e?.target?.value),
    }));
  };
  const requisitionDateHandle = (e) => {
    setRequisitionData((prev) => ({
      ...prev,
      requisitionDate: dateFormatterTwo(e.$d),
    }));
  };
  const needByDateHandle = (e) => {
    setRequisitionData((prev) => ({
      ...prev,
      needByDate: dateFormatterTwo(e.$d),
    }));
  };
  const selectItemHandle = (e, value) => {
    setItemDTOList((prev) => ({
      ...prev,
      item_Description: value?.label,
      item_Number: value?.item_Number,
      uom: value?.uom,
    }));
  };
  const itemDTOListAmountHandle = (e) => {
    setItemDTOList((prev) => ({
      ...prev,
      amount: e?.target?.value,
    }));
  };
  const resetItemDTOList = () => {
    setItemDTOList({
      item_Description: "",
      item_Number: "",
      uom: "",
      amount: "",
    });
  };
  const addItemListButtonHandle = () => {
    if (!itemDTOList?.item_Description || !itemDTOList?.amount) {
      setNotificationMsg("Please complete the item details before adding.");
      setSeverity("warning");
      setShowNotification(true);
      return;
    }
    setRequisitionData((prev) => ({
      ...prev,
      itemDTOList: [...prev.itemDTOList, { ...itemDTOList }],
    }));
    resetItemDTOList();
  };
  const removeItemHandle = (index) => {
    setRequisitionData((prev) => ({
      ...prev,
      itemDTOList: prev.itemDTOList.filter((_, i) => i !== index),
    }));
  };
  const resetStates = () => {
    setIsETop(false);
    setRequisitionData({
      requisitionType: "",
      createdBy: empId,
      needByDate: new Date(),
      requisitionDate: new Date(),
      itemDTOList: [],
    });
    resetItemDTOList();
  };
  const createHandle = async () => {
    if (
      requisitionData?.requisitionType === "" ||
      requisitionData?.needByDate === "" ||
      requisitionData?.itemDTOList?.length === 0
    ) {
      setNotificationMsg("Please Fill up All the Necessary information");
      setSeverity("info");
      setShowNotification(true);
    } else {
      setIsLoading(true);
      try {
        const payload = { ...requisitionData };
        const res = await Route(
          "POST",
          `/requisition/createRequisition`,
          access_token,
          payload,
          null
        );
        if (res?.status === 201) {
          resetStates();
          setNotificationMsg(res?.data?.responseText);
          setSeverity("success");
          setShowNotification(true);
        } else {
          setNotificationMsg(res?.response?.data?.detail);
          setSeverity("error");
          setShowNotification(true);
        }
      } catch (err) {
        setNotificationMsg(`Failed Creating Requisition: ${err}`);
        setSeverity("error");
        setShowNotification(true);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container>
          <Grid item container xs={12}>
            <Card sx={{ width: "100%" }}>
              <Title title="Requisition Details" />
              <Grid container spacing={1} my={1} px={2}>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Requisition Number"
                    name="requisition_number"
                    disabled
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl>
                    <InputLabel id="requisition-type-select-label">
                      Requisition Type*
                    </InputLabel>
                    <Select
                      labelId="requisition-type-select-label"
                      id="requisition-type-select"
                      value={requisitionData?.requisitionType}
                      label="Requisition Type*"
                      required
                      onChange={requisitionTypeHandle}
                    >
                      {requisitionType?.map((item) => (
                        <MenuItem value={item?.id} key={item?.id}>
                          {item?.type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Requisition Date*"
                        value={dayjs(requisitionData?.requisitionDate)}
                        onChange={requisitionDateHandle}
                        disabled
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Need By Date*"
                        value={dayjs(requisitionData?.needByDate)}
                        onChange={needByDateHandle}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={1} mt={{xs: 0, md: 1}} mb={2} px={2}>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Employee Name"
                    name="employee_name"
                    value={userDetails?.userName}
                    required
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={3} display="flex">
                  <TextField
                    label="Region"
                    name="region"
                    disabled
                    value={userDetails?.region}
                    required
                  />
                </Grid>
              </Grid>
            </Card>
            <Grid item xs={12} marginTop={2}>
              <Card>
                <Title title="Item Details" />
                <Grid container padding={2} spacing={1}>
                  <Grid item xs={12} md={3}>
                    <Autocomplete
                      disablePortal
                      options={itemsList?.map((item) => ({
                        label: item?.description,
                        value: item?.item_number,
                        item_Number: item?.item_number,
                        uom: item?.uom,
                      }))}
                      onChange={selectItemHandle}
                      value={itemDTOList?.item_Description}
                      renderInput={(params) => (
                        <TextField {...params} label="Description" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      label="Item Number"
                      name="item_number"
                      disabled
                      value={itemDTOList?.item_Number}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      label="UOM"
                      name="uom"
                      disabled
                      value={itemDTOList?.uom}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sx={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}>
                    <Grid xs={11}>
                      <TextField
                        label={isETop ? "Amount" : "Required Quantity"}
                        name="amount"
                        type="number"
                        onChange={itemDTOListAmountHandle}
                        value={itemDTOList?.amount}
                      />
                    </Grid>
                    <Grid alignContent="center" xs={1}>
                      <IconButton
                        aria-label="add"
                        onClick={addItemListButtonHandle}
                      >
                        <AddBoxIcon
                          sx={{
                            color: (theme) =>
                              theme?.palette?.addBtnColor?.light,
                          }}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2 }} paddingLeft={2}>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  aria-label="customer detail table"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell>Item No</TableCell>
                      <TableCell>UOM</TableCell>
                      <TableCell>
                        {isETop ? "Amount" : "Required Qty"}
                      </TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requisitionData?.itemDTOList?.length > 0 &&
                      requisitionData?.itemDTOList?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {item?.item_Description}
                          </TableCell>
                          <TableCell>{item?.item_Number}</TableCell>
                          <TableCell>{item?.uom}</TableCell>
                          <TableCell>{item?.amount}</TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="remove"
                              onClick={() => removeItemHandle(index)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" marginY={2}>
            <Button
              variant="contained"
              sx={{ marginRight: 1 }}
              onClick={createHandle}
            >
              Create
            </Button>
            <Button variant="outlined" color="error" onClick={resetStates}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
      {showNotification && severity === "success" ? (
        <SuccessNotification
          showNotification={showNotification}
          setShowNotification={setShowNotification}
          notificationMsg="Successfully Requested"
          alertMessage={notificationMsg}
        />
      ) : (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={notificationMsg}
          severity={severity}
        />
      )}
      {isLoading && <LoaderDialog open={isLoading} />}
    </>
  );
};

export default Requisitions;
