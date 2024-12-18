import React, { useState } from "react";
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
  Card,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Transition } from "../../component/common/index";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Notification,
  LoaderDialog,
  SuccessNotification,
} from "../../ui/index";
import { dateFormatterTwo } from "../../util/CommonUtil";
import Route from "../../routes/Route";
import { useCommon } from "../../contexts/CommonContext";

const CreateRequisition = ({ open, setOpen, fetchRequisitionList }) => {
  const { requisitionType, itemsList } = useCommon();
  const empId = localStorage.getItem("username");
  const userDetails = JSON.parse(localStorage?.getItem("userDetails"));
  const access_token = localStorage.getItem("access_token");
  const [showNotification, setShowNofication] = useState(false);
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
  const addItemListButtonHandle = () => {
    setRequisitionData((prev) => ({
      ...prev,
      itemDTOList: [...prev.itemDTOList, itemDTOList],
    }));
    setItemDTOList((prev) => ({
      ...prev,
      item_Description: "",
      item_Number: "",
      uom: "",
      amount: "",
    }));
  };
  const removeItemHandle = (index) => {
    setRequisitionData((prev) => ({
      ...prev,
      itemDTOList: prev.itemDTOList.filter((_, i) => i !== index),
    }));
  };
  const createHandle = async () => {
    if (
      requisitionData?.requisitionType === "" ||
      requisitionData?.needByDate === "" ||
      requisitionData?.itemDTOList?.length === 0
    ) {
      setNotificationMsg("Please Fill up All the Necessary infomation");
      setSeverity("info");
      setShowNofication(true);
    } else {
      setIsLoading(true);
      try {
        const res = await Route(
          "POST",
          `/requisition/createRequisition`,
          access_token,
          requisitionData,
          null
        );
        console.log(requisitionData);
        console.log(res);
        if (res?.status === 201) {
          fetchRequisitionList();
          setIsETop(false);
          setRequisitionData((prev) => ({
            ...prev,
            requisitionType: "",
            createdBy: empId,
            needByDate: dateFormatterTwo(new Date().toISOString()),
            requisitionDate: dateFormatterTwo(new Date().toISOString()),
            itemDTOList: [],
          }));
          setItemDTOList((prev) => ({
            ...prev,
            item_Description: "",
            item_Number: "",
            uom: "",
            amount: "",
          }));
          setNotificationMsg(res?.data?.responseText);
          setSeverity("success");
          setShowNofication(true);
        } else {
          setNotificationMsg(res?.response?.data?.detail);
          setSeverity("error");
          setShowNofication(true);
        }
      } catch (err) {
        setNotificationMsg(`Failed Creating Requisition: ${err}`);
        setSeverity("error");
        setShowNofication(true);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const cancelHandle = () => {
    setRequisitionData((prev) => ({
      ...prev,
      requisitionType: "",
      createdBy: empId,
      needByDate: dateFormatterTwo(new Date().toISOString()),
      requisitionDate: dateFormatterTwo(new Date().toISOString()),
      itemDTOList: [],
    }));
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
                <Typography variant="subtitle1">Create Requisition</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container px={2} mt={2}>
          <Grid item container xs={12}>
            <Card sx={{ width: "100%" }}>
              <Grid
                container
                p={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: (theme) => theme.palette.bg.light,
                  color: "#fff",
                }}
              >
                <Grid item>
                  <Typography variant="subtitle1">
                    Requsition Details
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} my={1} px={2}>
                <Grid item xs={3}>
                  <TextField
                    label="Requisiton Number"
                    variant="outlined"
                    fullWidth
                    name="requisition_number"
                    disabled
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth size="small">
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
                        disabled
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={3} display="flex">
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
              <Grid container spacing={1} mt={1} mb={2} px={2}>
                <Grid item xs={3}>
                  <TextField
                    label="Employee Name"
                    variant="outlined"
                    fullWidth
                    name="employee_name"
                    value={userDetails?.userName}
                    required
                    disabled
                    size="small"
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
                    size="small"
                  />
                </Grid>
              </Grid>
            </Card>
            <Grid item xs={12} marginTop={2}>
              <Card>
                <Grid
                  container
                  padding={2}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: (theme) => theme.palette.bg.light,
                    color: "#fff",
                  }}
                >
                  <Grid item>
                    <Typography variant="subtitle1">Item Details</Typography>
                  </Grid>
                </Grid>
                <Grid container padding={2}>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
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
                          <TextField
                            {...params}
                            label="Description"
                            size="small"
                          />
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
                        value={itemDTOList?.item_Number}
                        size="small"
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
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={3} display="flex">
                      <Grid>
                        <TextField
                          label={isETop ? "Amount" : "Required Quantity"}
                          variant="outlined"
                          fullWidth
                          name="amount"
                          type="number"
                          onChange={itemDTOListAmountHandle}
                          value={itemDTOList?.amount}
                          size="small"
                        />
                      </Grid>
                      <Grid alignContent="center">
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
                        <TableRow key={item?.index}>
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
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Dialog>
      {showNotification && severity === "success" && (
        <SuccessNotification
          showNotification={showNotification}
          setShowNofication={() => {
            setOpen(false);
            setShowNofication(false);
          }}
          notificationMsg="Successfully Requested"
          alertMessange={notificationMsg}
        />
      )}
      {showNotification && severity !== "success" && (
        <Notification
          open={showNotification}
          setOpen={setShowNofication}
          message={notificationMsg}
          severity={severity}
        />
      )}
      {isLoading && <LoaderDialog open={isLoading} />}
    </>
  );
};

export default CreateRequisition;
