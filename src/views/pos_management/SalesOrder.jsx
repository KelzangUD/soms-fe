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
  InputLabel,
  IconButton,
  Select,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Notification from "../../ui/Notification";
import AddLineItem from "./AddLineItem";
import EditLineItem from "./EditLineItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Route from "../../routes/Route";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { dateFormatter } from "../../util/CommonUtil";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
  outlineColor: "#fff",
});

const SalesOrder = () => {
  const user = localStorage.getItem("username");
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [openDialog, setOpenDialog] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editLineItemIndex, setEditLineItemIndex] = useState(null);
  const [editDetails, setEditDetails] = useState({});
  const [salesType, setSalesType] = useState([]);
  const [productsType, setProductsType] = useState([]);
  const [customersList, setCustomersList] = useState([]);
  const [salesOrderDetails, setSalesOrderDetails] = useState({
    pos_no: "",
    postingDate: dateFormatter(new Date().toDateString()),
    salesType: "",
    productType: "",
    mobileNo: "",
    customerNumber: "",
    customerName: "",
    address: "",
    address1: "",
    city: "",
    serviceRemarks: "",
    advanceNo: "",
    advanceAmt: 0,
    adjType: "",
    storeName: "",
  });
  const [paymentType, setPaymentType] = useState([]);
  const [paymentLines, setPaymentLines] = useState([]);
  const [paymentLinesItem, setPaymentLinesItem] = useState({
    paymentAmount: "",
    paymentType: "",
    paymentTypeName: "",
    bankAccountNumber: "",
    chequeNumber: "",
    chequeDate: "",
    cardNumber: "",
    emiRefrenceNo: "",
    chequeCopy: "",
  });
  const [bulkUpload, setBulkUpload] = useState(false);
  const [lineItems, setLineItems] = useState([]);
  const [fileName, setFileName] = useState("Upload File");
  const [file, setFile] = useState(null);
  const [banks, setbanks] = useState([]);
  const [responseData, setResponseData] = useState({});
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage?.getItem("userDetails"))
  );
  const fetchSalesType = async () => {
    const res = await Route("GET", "/Common/FetchSalesType", null, null, null);
    if (res?.status === 200) {
      setSalesType(res?.data);
    }
  };
  const fetchProductsType = async () => {
    const res = await Route("GET", "/Common/FetchProductType", null, null, 1);
    if (res?.status === 200) {
      setProductsType(res?.data);
    }
  };
  const fetchCustomersList = async () => {
    const res = await Route(
      "GET",
      `/Customer/Common/Fetch_All_Customers?salesType=${salesOrderDetails?.salesType}&userId=${user}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setCustomersList(res?.data);
    }
  };
  const fetchCustomersDetails = async (customerID) => {
    const res = await Route(
      "GET",
      `/Customer/Common/Fetch_Customer_Dtls?customerId=${customerID}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setSalesOrderDetails((prev) => ({
        ...prev,
        mobileNo: res?.data?.mobile_NUMBER,
        customerNumber: res?.data?.customer_NUMBER,
        address: res?.data?.address1,
        address1: res?.data?.address2,
        city: res?.data?.city,
      }));
    }
  };
  const fetchUserDetails = async () => {
    const res = await Route(
      "GET",
      `/Common/fetchUserDtls?userId=${user}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setSalesOrderDetails((prev) => ({
        ...prev,
        storeName: res?.data?.region_NAME,
      }));
    }
  };
  const fetchPaymentType = async () => {
    const res = await Route("GET", "/Common/PaymentType", null, null, null);
    if (res?.status === 200) {
      setPaymentType(res?.data);
    }
  };
  const fetchBankBasedOnPaymentType = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchBankDetails?userId=${user}&paymentType=${paymentLinesItem?.paymentType}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setbanks(res?.data);
    }
  };
  useEffect(() => {
    fetchSalesType();
    fetchProductsType();
    fetchPaymentType();
    fetchUserDetails();
  }, []);
  useEffect(() => {
    fetchCustomersList();
  }, [salesOrderDetails?.salesType, user]);
  useEffect(() => {
    fetchBankBasedOnPaymentType();
  }, [paymentLinesItem?.paymentType, user]);

  const salesTypeHandle = (e) => {
    setSalesOrderDetails((prev) => ({
      ...prev,
      salesType: parseInt(e.target.value),
    }));
    e?.target?.value === "2" ? setBulkUpload(true) : setBulkUpload(false);
  };
  const productsTypeHandle = (e) => {
    console.log(e?.target?.value);
    setSalesOrderDetails((prev) => ({
      ...prev,
      productType: parseInt(e.target.value),
    }));
  };
  const customerNameHandle = (e, value) => {
    fetchCustomersDetails(value?.id);
    setSalesOrderDetails((prev) => ({
      ...prev,
      customerName: value?.label,
    }));
  };
  const remarksHandle = (e) => {
    setSalesOrderDetails((prev) => ({
      ...prev,
      serviceRemarks: e?.target?.value,
    }));
  };
  const addButtonHandle = () => {
    if (
      salesOrderDetails?.salesType === "" ||
      salesOrderDetails?.productType === "" ||
      salesOrderDetails?.customerName === ""
    ) {
      setNotificationMsg("Please Fill Up Necessary Information!");
      setSeverity("info");
      setShowNofication(true);
    } else {
      setOpenDialog(true);
    }
  };
  const editLineItemHandle = (e, item, index) => {
    setEditLineItemIndex(index);
    setEditDetails(item);
    setEdit(true);
  };
  const deleteLineItemHandle = (e, indexToRemove) => {
    setLineItems((prev) => prev.filter((_, index) => index !== indexToRemove));
  };
  const paymentAmountHandle = (e) => {
    setPaymentLinesItem((prev) => ({
      ...prev,
      paymentAmount: e?.target?.value,
    }));
  };
  const paymentHandle = (e) => {
    setPaymentLinesItem((prev) => ({
      ...prev,
      paymentType: e?.target?.value?.id,
      paymentTypeName: e?.target?.value?.type,
    }));
  };
  const bankHandle = (e) => {
    setPaymentLinesItem((prev) => ({
      ...prev,
      bankAccountNumber: e?.target?.value?.bankName,
    }));
  };
  const cardNoHandle = (e) => {
    setPaymentLinesItem((prev) => ({
      ...prev,
      cardNumber: e?.target?.value,
    }));
  };
  const chequeNoHandle = (e) => {
    setPaymentLinesItem((prev) => ({
      ...prev,
      chequeNumber: e?.target?.value,
    }));
  };
  const chequeDateHandle = (e) => {
    setPaymentLinesItem((prev) => ({
      ...prev,
      chequeDate: dateFormatter(e?.$d),
    }));
  };
  const chequeCopyHandle = (e) => {
    setPaymentLinesItem((prev) => ({
      ...prev,
      chequeCopy: e?.target?.files[0],
    }));
  };
  const addPaymentItemHandle = () => {
    setPaymentLines((prev) => [...prev, paymentLinesItem]);
  };
  const deletePaymentItemHandle = (e, indexToRemove) => {
    setPaymentLines((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };
  const editPaymentItemHandle = (item) => {
    console.log(item);
  };
  const postHandle = async () => {
    let formData = new FormData();
    if (paymentLines && paymentLines.length > 0) {
      for (let i = 0; i < paymentLines?.length; i++) {
        formData.append("cheque", paymentLines[i].chequeCopy);
      }
    } else {
      const placeholderFile = new File([""], "cheque.png");
      formData.append("cheque", placeholderFile);
    }
    formData?.append("storeName", salesOrderDetails?.customerName);
    const data = {
      itemLines: lineItems,
      paymentLines,
      salesHeader: salesOrderDetails,
      linesAmount: {
        grossTotal:
          lineItems?.length > 0 &&
          lineItems?.reduce(
            (accumulator, currentObject) =>
              accumulator + currentObject?.sellingPrice,
            0
          ),
        taxAmount: 0,
        discountAmount: 0,
        additionalDiscount: 0,
        lotOfSaleDiscount: 0,
        tdsAmount:
          lineItems?.length > 0 &&
          lineItems?.reduce(
            (accumulator, currentObject) =>
              accumulator + currentObject?.tdsAmount,
            0
          ),
        netAmount:
          lineItems?.length > 0 &&
          lineItems?.reduce(
            (accumulator, currentObject) =>
              accumulator + currentObject?.sellingPrice,
            0
          ),
      },
      userId: user,
    };
    if (file && file.length > 0) {
      formData.append("file", file);
    } else {
      const placeholderFile = new File([""], "file.csv");
      formData.append("file", placeholderFile);
    }
    const jsonDataBlob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });

    formData.append("details", jsonDataBlob, "data.json");
    console.log(formData);
    console.log(data);
    const res = await Route(
      "POST",
      `/SalesOrder/UpdateItemSales`,
      null,
      formData,
      null,
      "multipart/form-data"
    );
    console.log(res);
    if (res?.status === 201) {
      setResponseData(res?.data);
      setSeverity("success");
      setNotificationMsg("Successfully Created");
      setShowNofication(true);
      setSalesOrderDetails((prev) => ({
        ...prev,
        postingDate: dateFormatter(dayjs(new Date())),
        salesType: "",
        productType: "",
        mobileNo: "",
        customerNumber: "",
        customerName: "",
        address: "",
        address1: "",
        city: "",
        serviceRemarks: "",
        advanceNo: "",
        advanceAmt: 0,
        adjType: "",
      }));
      setPaymentType([]);
      setPaymentLines([]);
      setPaymentLines((prev) => ({
        ...prev,
        paymentAmount: "",
        paymentType: "",
        paymentTypeName: "",
        bankAccountNumber: "",
        chequeNumber: "",
        chequeDate: "",
        cardNumber: "",
        emiRefrenceNo: "",
        chequeCopy: "",
      }));
      setBulkUpload(false);
      setLineItems([]);
    } else {
      setNotificationMsg(res?.response?.data?.message);
      setSeverity("error");
      setShowNofication(true);
    }
  };
  const cancelHandle = () => {
    setSalesOrderDetails((prev) => ({
      ...prev,
      postingDate: dateFormatter(dayjs(new Date())),
      salesType: "",
      productType: "",
      mobileNo: "",
      customerNumber: "",
      customerName: "",
      address: "",
      address1: "",
      city: "",
      serviceRemarks: "",
      advanceNo: "",
      advanceAmt: 0,
      adjType: "",
    }));
    setPaymentType([]);
    setPaymentLines([]);
    setPaymentLines((prev) => ({
      ...prev,
      paymentAmount: "",
      paymentType: "",
      paymentTypeName: "",
      bankAccountNumber: "",
      chequeNumber: "",
      chequeDate: "",
      cardNumber: "",
      emiRefrenceNo: "",
      chequeCopy: "",
    }));
    setBulkUpload(false);
    setLineItems([]);
  };
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12}>
            <Paper elevation={1}>
              <Grid
                container
                padding={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#007dc5",
                  paddingY: "24px",
                }}
              >
                <Grid item>
                  <Typography variant="subtitle1" color="#eee">
                    Header
                  </Typography>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      label="POS No"
                      variant="outlined"
                      fullWidth
                      name="pos_no"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Posting Date"
                      variant="outlined"
                      fullWidth
                      name="posting_date"
                      defaultValue={new Date().toDateString()}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="sales-type-select-label">
                        Sales Type
                      </InputLabel>
                      <Select
                        labelId="sales-type-select-label"
                        id="sales-type-select"
                        value={salesOrderDetails?.salesType}
                        label="Sales Type"
                        onChange={salesTypeHandle}
                      >
                        {salesType?.map((item) => (
                          <MenuItem value={item?.id} key={item?.id}>
                            {item?.type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="product-type-select-label">
                        Product Type
                      </InputLabel>
                      <Select
                        labelId="product-type-select-label"
                        id="product-type-select"
                        value={salesOrderDetails?.productType}
                        label="Product Type"
                        onChange={productsTypeHandle}
                      >
                        {productsType?.map((item) => (
                          <MenuItem value={item?.id} key={item?.id}>
                            {item?.type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={3}>
                    <Autocomplete
                      disablePortal
                      options={customersList?.map((item) => ({
                        id: item?.customerId,
                        label: item?.customer_NAME,
                      }))}
                      onChange={customerNameHandle}
                      value={salesOrderDetails?.customerName}
                      renderInput={(params) => (
                        <TextField {...params} label="Customer Name" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Mobile No"
                      variant="outlined"
                      fullWidth
                      name="mobile_no"
                      required
                      value={salesOrderDetails?.mobileNo}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Customer No"
                      variant="outlined"
                      fullWidth
                      name="customer_no"
                      required
                      value={salesOrderDetails?.customerNumber}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Address"
                      variant="outlined"
                      fullWidth
                      name="address"
                      value={salesOrderDetails?.address}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ my: 1 }}>
                  <Grid item xs={3}>
                    <TextField
                      label="Address 1"
                      variant="outlined"
                      fullWidth
                      name="address 1"
                      value={salesOrderDetails?.address1}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="City"
                      variant="outlined"
                      fullWidth
                      name="city"
                      value={salesOrderDetails?.city}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Remarks"
                      variant="outlined"
                      fullWidth
                      name="remarks"
                      onChange={remarksHandle}
                      value={salesOrderDetails?.serviceRemarks}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={1}>
              <Grid
                container
                padding={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#007dc5",
                }}
              >
                <Grid item>
                  <Typography variant="subtitle1" color="#eee">
                    Line
                  </Typography>
                </Grid>
                <Grid item>
                  {bulkUpload && (
                    <IconButton aria-label="upload" onClick={addButtonHandle}>
                      <FileUploadIcon sx={{ color: "#eee" }} />
                    </IconButton>
                  )}
                  {bulkUpload && (
                    <IconButton aria-label="download" onClick={addButtonHandle}>
                      <FileDownloadIcon sx={{ color: "#eee" }} />
                    </IconButton>
                  )}
                  <IconButton aria-label="add-line" onClick={addButtonHandle}>
                    <AddBoxIcon sx={{ color: "#eee" }} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid container spacing={2} sx={{ my: 1, px: 2 }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ width: "350px" }}>
                            Description
                          </TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Selling Price</TableCell>
                          <TableCell align="right">Tax Amount</TableCell>
                          <TableCell align="right">Disc/Comm Amount</TableCell>
                          <TableCell align="right">
                            Additional Discount
                          </TableCell>
                          <TableCell align="right">TDS Amount</TableCell>
                          <TableCell align="right">
                            Advance Tax Amount
                          </TableCell>
                          <TableCell align="right">Discounted Amount</TableCell>
                          <TableCell align="right">Line Item Amount</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {lineItems?.length > 0 &&
                          lineItems?.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item?.description}</TableCell>
                              <TableCell align="right">{item?.qty}</TableCell>
                              <TableCell align="right">
                                {item?.sellingPrice}
                              </TableCell>
                              <TableCell align="right">
                                {item?.taxAmt}
                              </TableCell>
                              <TableCell align="right">
                                {item?.discountedAmount}
                              </TableCell>
                              <TableCell align="right">
                                {item?.additionalDiscount}
                              </TableCell>
                              <TableCell align="right">
                                {item?.tdsAmount}
                              </TableCell>
                              <TableCell align="right">
                                {item?.advanceTaxAmount}
                              </TableCell>
                              <TableCell align="right">
                                {item?.discountedAmount}
                              </TableCell>
                              <TableCell align="right">
                                {item?.lineItemAmt}
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{ display: "flex", alignContent: "center" }}
                              >
                                <IconButton
                                  aria-label="delete"
                                  onClick={(e) =>
                                    deleteLineItemHandle(e, index)
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="edit"
                                  onClick={(e) =>
                                    editLineItemHandle(e, item, index)
                                  }
                                >
                                  <EditIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        <TableRow>
                          <TableCell colSpan={9} />
                          <TableCell colSpan={1}>Gross Total</TableCell>
                          <TableCell align="right">
                            {lineItems?.length > 0 &&
                              lineItems?.reduce(
                                (accumulator, currentObject) =>
                                  accumulator + currentObject?.sellingPrice,
                                0
                              )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={9} />
                          <TableCell colSpan={1}>Tax Amount</TableCell>
                          <TableCell align="right">
                            {lineItems?.length > 0 &&
                              lineItems?.reduce(
                                (accumulator, currentObject) =>
                                  accumulator + currentObject?.taxAmt,
                                0
                              )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={9} />
                          <TableCell colSpan={1}>Disc/Comm Amount</TableCell>
                          <TableCell align="right">
                            {lineItems?.length > 0 &&
                              lineItems?.reduce(
                                (accumulator, currentObject) =>
                                  accumulator + currentObject?.discountedAmount,
                                0
                              )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={9} />
                          <TableCell colSpan={1}>
                            Discretional Discount
                          </TableCell>
                          <TableCell align="right">0</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={9} />
                          <TableCell colSpan={1}>
                            Lots of Sales Discount
                          </TableCell>
                          <TableCell align="right">0</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={9} />
                          <TableCell colSpan={1}>TDS Amount</TableCell>
                          <TableCell align="right">
                            {lineItems?.length > 0 &&
                              lineItems?.reduce(
                                (accumulator, currentObject) =>
                                  accumulator + currentObject?.tdsAmount,
                                0
                              )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={9} />
                          <TableCell colSpan={1}>Advance Amount</TableCell>
                          <TableCell align="right">0</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={9} />
                          <TableCell colSpan={1}>Down Payment Amount</TableCell>
                          <TableCell align="right">0</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={9} />
                          <TableCell colSpan={1}>Advance Tax Amount</TableCell>
                          <TableCell align="right">
                            {lineItems?.length > 0 &&
                              lineItems?.reduce(
                                (accumulator, currentObject) =>
                                  accumulator + currentObject?.advanceTaxAmount,
                                0
                              )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={9} />
                          <TableCell colSpan={1}>Interest Amount</TableCell>
                          <TableCell align="right">0</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={9} />
                          <TableCell colSpan={1}>Net Total (Nu)</TableCell>
                          <TableCell align="right">
                            {lineItems?.length > 0 &&
                              lineItems?.reduce(
                                (accumulator, currentObject) =>
                                  accumulator + currentObject?.sellingPrice,
                                0
                              )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={1}>
              <Grid
                container
                padding={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#007dc5",
                }}
              >
                <Grid item>
                  <Typography variant="subtitle1" color="#eee">
                    Payment Details
                  </Typography>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <TextField
                      label="Payment Amount"
                      variant="outlined"
                      fullWidth
                      name="payment_amount"
                      required
                      onChange={paymentAmountHandle}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth>
                      <InputLabel id="payment-type-select-label">
                        Payment Type
                      </InputLabel>
                      <Select
                        labelId="payment-type-select-label"
                        id="payment-type-select"
                        // value={age}
                        label="Paymen Type"
                        onChange={paymentHandle}
                      >
                        {paymentType?.map((item) => (
                          <MenuItem value={item} key={item?.id}>
                            {item?.type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth>
                      <InputLabel id="bank-ac-name-select-label">
                        Bank A/C Name
                      </InputLabel>
                      <Select
                        labelId="bank-ac-name-select-label"
                        id="bank-ac-name-select"
                        // value={age}
                        label="Bank A/C Name"
                        onChange={bankHandle}
                      >
                        {banks?.map((item) => (
                          <MenuItem value={item} key={item?.id}>
                            {item?.bankName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {paymentLinesItem?.paymentType === "3" && (
                    <Grid item sx={2}>
                      <TextField
                        label="Card No"
                        variant="outlined"
                        name="card_no"
                        onChange={cardNoHandle}
                      />
                    </Grid>
                  )}
                  {paymentLinesItem?.paymentType === "2" && (
                    <Grid item sx={2}>
                      <TextField
                        label="Cheque No"
                        variant="outlined"
                        name="cheque_no"
                        onChange={chequeNoHandle}
                      />
                    </Grid>
                  )}
                  {paymentLinesItem?.paymentType === "2" && (
                    <Grid item sx={1}>
                      <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Cheque Date"
                            // value={dayjs(rechargeDetails?.postingDate)}
                            onChange={chequeDateHandle}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>
                  )}
                  {paymentLinesItem?.paymentType === "2" && (
                    <Grid item sx={2} display="flex">
                      <Button
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                        variant="outlined"
                        style={{
                          border: "1px solid #B4B4B8",
                          color: "#686D76",
                        }}
                      >
                        {fileName}
                        <VisuallyHiddenInput
                          type="file"
                          onChange={chequeCopyHandle}
                          multiple
                        />
                      </Button>
                    </Grid>
                  )}
                  <Grid
                    item
                    container
                    xs={1}
                    display="flex"
                    // justifyContent="space-between"
                    alignItems="center"
                  >
                    {/* <Grid item sx={11}>
                      <TextField
                        label="Remaining Amount"
                        variant="outlined"
                        name="remaining_amount"
                        disabled
                      />
                    </Grid> */}
                    <Grid item sx={1}>
                      <IconButton
                        aria-label="add"
                        onClick={addPaymentItemHandle}
                      >
                        <AddBoxIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650 }}
                    aria-label="payment detail table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Payment Amount</TableCell>
                        <TableCell align="right">Payment Type</TableCell>
                        <TableCell align="right">Bank A/C Name</TableCell>
                        <TableCell align="right">Cheque Number</TableCell>
                        <TableCell align="right">Cheque Date</TableCell>
                        <TableCell align="right">Cheque Copy</TableCell>
                        <TableCell align="right">Card Number</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paymentLines?.length > 0 &&
                        paymentLines?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item?.paymentAmount}</TableCell>
                            <TableCell align="right">
                              {item?.paymentTypeName}
                            </TableCell>
                            <TableCell align="right">
                              {item?.bankAccountNumber}
                            </TableCell>
                            <TableCell align="right">
                              {item?.chequeNumber}
                            </TableCell>
                            <TableCell align="right">
                              {item?.chequeDate}
                            </TableCell>
                            <TableCell align="right">
                              {item?.paymentType === "2" && (
                                <IconButton aria-label="image">
                                  <ImageIcon />
                                </IconButton>
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {item?.cardNumber}
                            </TableCell>
                            <TableCell align="right">
                              {" "}
                              <IconButton
                                aria-label="delete"
                                onClick={(e) =>
                                  deletePaymentItemHandle(e, index)
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                              <IconButton
                                aria-label="edit"
                                onClick={(item) => editPaymentItemHandle(item)}
                              >
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Paper>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" marginY={4}>
            <Button variant="contained" onClick={postHandle}>
              Post
            </Button>
            <Button variant="outlined" sx={{ ml: 2 }} onClick={cancelHandle}>
              Cancel
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
      {openDialog && (
        <AddLineItem
          open={openDialog}
          setOpen={setOpenDialog}
          storeName={salesOrderDetails?.storeName}
          user={user}
          salesType={salesOrderDetails?.salesType}
          setLineItems={setLineItems}
          userDetails={userDetails}
        />
      )}
      {edit && (
        <EditLineItem
          open={edit}
          setOpen={setEdit}
          storeName={salesOrderDetails?.storeName}
          user={user}
          salesType={salesOrderDetails?.salesType}
          setLineItems={setLineItems}
          userDetails={userDetails}
          editDetails={editDetails}
          lineItems={lineItems}
          editLineItemIndex={editLineItemIndex}
        />
      )}
    </>
  );
};

export default SalesOrder;
