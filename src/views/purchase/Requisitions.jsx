import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
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
import ClearIcon from "@mui/icons-material/Clear";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Notification from "../../ui/Notification";
import dayjs from "dayjs";
import { dateFormatter } from "../../util/CommonUtil";
import Route from "../../routes/Route";

const Requisitions = () => {
  const empId = localStorage.getItem("username");
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [userDetails, setUserDetails] = useState([]);
  const [requisitionType, setRquisitionType] = useState([]);
  const [requisitionItems, setRequisitionItems] = useState([]);
  const [requisitionData, setRequisitionData] = useState({
    requisitionType: null,
    createdBy: empId,
    needByDate: new Date(),
    requisitionDate: new Date(),
    itemDTOList: [],
  });
  const [itemDTOList, setItemDTOList] = useState({
    item_Description: null,
    item_Number: "",
    uom: "",
    amount: "",
    qty: "",
  });
  const fetchUserDetails = async () => {
    const res = await Route(
      "GET",
      `/Common/fetchUserDtls?userId=${empId}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setUserDetails(res?.data);
    }
  };
  const fetchRequisitionType = async () => {
    const res = await Route("GET", "/Common/RequisitionType", null, null, null);
    if (res?.status === 200) {
      setRquisitionType(res?.data);
    }
  };
  const fetchRequisitionItem = async () => {
    const res = await Route("GET", "/Common/RequisitionItem", null, null, null);
    if (res?.status === 200) {
      setRequisitionItems(res?.data);
    }
  };
  useEffect(() => {
    fetchUserDetails();
    fetchRequisitionType();
    fetchRequisitionItem();
  }, []);
  const requisitionTypeHandle = (e) => {
    setRequisitionData((prev) => ({
      ...prev,
      requisitionType: e?.target?.value,
    }));
  };
  const requisitionDateHandle = (e) => {
    setRequisitionData((prev) => ({
      ...prev,
      requisitionDate: e.$d,
    }));
  };
  const needByDateHandle = (e) => {
    setRequisitionData((prev) => ({
      ...prev,
      needByDate: e.$d,
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
  const itemDTOListqtyHandle = (e) => {
    setItemDTOList((prev) => ({
      ...prev,
      qty: e?.target?.value,
    }));
  };
  const addItemListButtonHandle = () => {
    setRequisitionData((prev) => ({
      ...prev,
      itemDTOList: [...prev.itemDTOList, itemDTOList],
    }));
    setItemDTOList((prev) => ({
      ...prev,
      item_Description: null,
      item_Number: "",
      uom: "",
      qty: "",
    }));
  };
  const removeItemHandle = (index) => {
    setRequisitionData((prev) => ({
      ...prev,
      itemDTOList: prev.itemDTOList.filter((_, i) => i !== index),
    }));
  };
  const createHandle = async (e) => {
    e.preventDefault();
    const res = await Route(
      "POST",
      `/requisition/createRequisition`,
      null,
      requisitionData,
      null
    );
    // console.log(res);
    if (res?.status === 201) {
      setNotificationMsg(res?.data?.responseText);
      setSeverity("success");
      setShowNofication(true);
      setRequisitionData((prev) => ({
        ...prev,
        requisitionType: null,
        createdBy: empId,
        needByDate: dateFormatter(new Date().toISOString()),
        requisitionDate: dateFormatter(new Date().toISOString()),
        itemDTOList: [],
      }));
      console.log(requisitionData);
    } else {
      setNotificationMsg(res?.data?.message);
      setSeverity("error");
      setShowNofication(true);
    }
  };
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12}>
            <Paper elevation={1}>
              <Grid container padding={2}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      label="Requisiton Number"
                      variant="outlined"
                      fullWidth
                      name="requisition_number"
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
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
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Requisition Date*"
                          value={dayjs(requisitionData?.requisitionDate)}
                          onChange={requisitionDateHandle}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} display="flex" alignItems="center">
                    <FormControl fullWidth>
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
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={3}>
                    <TextField
                      label="Employee Name"
                      variant="outlined"
                      fullWidth
                      name="employee_name"
                      disabled
                      value={userDetails?.userName}
                      required
                    />
                  </Grid>
                  <Grid item xs={3} display="flex">
                    <TextField
                      label="Region"
                      variant="outlined"
                      fullWidth
                      name="region"
                      disabled
                      value={userDetails?.region}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} marginTop={4}>
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
                      <Typography variant="subtitle1">Item Details</Typography>
                    </Grid>
                  </Grid>
                  <Grid container paddingY={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Autocomplete
                          disablePortal
                          options={requisitionItems?.map((item) => ({
                            label: item?.itemDescription,
                            value: item?.id,
                            item_Number: item?.itemNumber,
                            uom: item?.uom,
                          }))}
                          onChange={selectItemHandle}
                          value={itemDTOList?.item_Description}
                          renderInput={(params) => (
                            <TextField {...params} label="Description" />
                          )}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="Item Number"
                          variant="outlined"
                          fullWidth
                          name="item_number"
                          disabled
                          value={itemDTOList?.item_number}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="UOM"
                          variant="outlined"
                          fullWidth
                          name="uom"
                          disabled
                          value={itemDTOList?.uom}
                        />
                      </Grid>
                      <Grid item xs={3} display="flex">
                        <Grid>
                          <TextField
                            label="Required Quantity"
                            variant="outlined"
                            fullWidth
                            name="qty"
                            type="number"
                            onChange={itemDTOListqtyHandle}
                            value={itemDTOList?.qty}
                          />
                        </Grid>
                        <Grid>
                          <IconButton
                            aria-label="add"
                            onClick={addItemListButtonHandle}
                          >
                            <AddBoxIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }} padding={2}>
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: 650 }}
                      aria-label="customer detail table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Description</TableCell>
                          <TableCell>Item No</TableCell>
                          <TableCell>UOM</TableCell>
                          <TableCell>Required Qty</TableCell>
                          <TableCell alignItems="right"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {requisitionData?.itemDTOList?.length > 0 &&
                          requisitionData?.itemDTOList?.map((item, index) => (
                            <TableRow key={item?.index}>
                              <TableCell component="th" scope="row">
                                {item?.item_description}
                              </TableCell>
                              <TableCell>{item?.item_number}</TableCell>
                              <TableCell>{item?.uom}</TableCell>
                              <TableCell>{item?.qty}</TableCell>
                              <TableCell align="right">
                                <IconButton
                                  aria-label="remove"
                                  onClick={() => removeItemHandle(index)}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" marginY={6}>
            <Button variant="contained" sx={{ ml: 2 }} onClick={createHandle}>
              Create
            </Button>
          </Grid>
        </Grid>
      </Box>
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

export default Requisitions;
