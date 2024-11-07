import React, { useEffect, useState } from "react";
import {
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
import Route from "../../routes/Route";
import { dateFormatter } from "../../util/CommonUtil";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import CircularProgress from "@mui/material/CircularProgress";
import GetAppIcon from "@mui/icons-material/GetApp";
import dayjs from "dayjs";
import Notification from "../../ui/Notification";
import AddLineItem from "./AddLineItem";

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

const SalesReturn = () => {
  const user = localStorage.getItem("username");
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [responseData, setResponseData] = useState({});
  const [invoiceNo, setInoiceNo] = useState("");
  const [emptyInvoiceNo, setEmptyInvoiceNo] = useState(false);
  const [salesData, setSalesData] = useState(null);
  const [paymentType, setPaymentType] = useState([]);
  const [banks, setBanks] = useState([]);
  const [fileName, setFileName] = useState("Upload File");
  const [paymentLines, setPaymentLines] = useState([]);
  const [grossTotal, setGrossTotal] = useState("");
  const [taxAmount, setTaxAmount] = useState("");
  const [discountAmt, setDiscountAmt] = useState("");
  const [additionalDisAmt, setAdditionalDisAmt] = useState("");
  const [lotOfSaleDiscount, setLotOfSaleDiscount] = useState("");
  const [tdsAmount, setTdsAmount] = useState("");
  const [netTotal, setNetTotal] = useState("");
  const [salesLines, setSalesLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
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

  const setSalesInvoice = (e) => {
    setEmptyInvoiceNo(false);
    setInoiceNo(e?.target?.value);
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
      setBanks(res?.data);
    }
  };

  useEffect(() => {
    fetchPaymentType();
  }, []);

  useEffect(() => {
    fetchBankBasedOnPaymentType();
  }, [paymentLinesItem?.paymentType, user]);

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
    if (paymentLinesItem.paymentAmount && paymentLinesItem.paymentType) {
      if (parseInt(paymentLinesItem.paymentType) === 1) {
        if (paymentLinesItem.bankAccountNumber !== "") {
          setPaymentLines((prev) => [...prev, paymentLinesItem]);
        } else {
          setNotificationMsg("Bank A/C can't be empty");
          setSeverity("info");
          setShowNofication(true);
        }
      } else if (parseInt(paymentLinesItem.paymentType) === 2) {
        if (paymentLinesItem.bankAccountNumber !== "") {
          if (paymentLinesItem.chequeNumber !== "") {
            if (paymentLinesItem.chequeDate !== "") {
              if (paymentLinesItem.chequeCopy !== "") {
                setPaymentLines((prev) => [...prev, paymentLinesItem]);
              } else {
                setNotificationMsg("Cheque copy can't be empty");
                setSeverity("info");
                setShowNofication(true);
              }
            } else {
              setNotificationMsg("Cheque date can't be empty");
              setSeverity("info");
              setShowNofication(true);
            }
          } else {
            setNotificationMsg("Cheque number can't be empty");
            setSeverity("info");
            setShowNofication(true);
          }
        } else {
          setNotificationMsg("Bank A/C can't be empty");
          setSeverity("info");
          setShowNofication(true);
        }
      } else {
        if (paymentLinesItem.bankAccountNumber !== "") {
          if (paymentLinesItem.cardNumber !== "") {
            setPaymentLines((prev) => [...prev, paymentLinesItem]);
          } else {
            setNotificationMsg("Card No. can't be empty");
            setSeverity("info");
            setShowNofication(true);
          }
        } else {
          setNotificationMsg("Bank A/C can't be empty");
          setSeverity("info");
          setShowNofication(true);
        }
      }
    } else {
      setNotificationMsg("Refund amount and refund type can't be empty");
      setSeverity("info");
      setShowNofication(true);
    }
  };

  const deletePaymentItemHandle = (e, indexToRemove) => {
    setPaymentLines((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const fetchSalesInvoice = async () => {
    if (invoiceNo !== "") {
      setLoading(true);
      try {
        const res = await Route(
          "GET",
          `/SalesOrder/GetInvoiceList?salesId=${invoiceNo}&userId=${user}`,
          null,
          null,
          null
        );
        if (res?.status === 200) {
          if (res?.data?.status === "Y") {
            setSalesData(res?.data);
            setGrossTotal(res?.data?.linesAmount?.gross_Total);
            setTaxAmount(res?.data?.linesAmount?.tax_Amount);
            setDiscountAmt(res?.data?.linesAmount?.discount_Amount);
            setAdditionalDisAmt(res?.data?.linesAmount?.additional_Discount);
            setLotOfSaleDiscount(res?.data?.linesAmount?.lotOfSale_Discount);
            setTdsAmount(res?.data?.linesAmount?.tds_Amount);
            setNetTotal(res?.data?.linesAmount?.net_Amount);
            setSalesLines(res?.data?.itemLines);
          } else {
            setNotificationMsg(
              "This POS_No is already return. Check the POS_No"
            );
            setSeverity("info");
            setShowNofication(true);
          }
        }
      } catch (error) {
        setNotificationMsg("Error fetching invoice:", error);
        setSeverity("error");
        setShowNofication(true);
      } finally {
        setLoading(false);
      }
    } else {
      setEmptyInvoiceNo(true);
    }
  };

  const cancelHandle = () => {
    setInoiceNo("");
    setSalesData(null);
    setPaymentLines([]);
    setGrossTotal("");
    setTaxAmount("");
    setDiscountAmt("");
    setAdditionalDisAmt("");
    setLotOfSaleDiscount("");
    setTdsAmount("");
    setNetTotal("");
    setSalesLines([]);
    setPaymentLinesItem((prev) => ({
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
  };

  const deleteLineItemHandle = (e, salesIdToRemove) => {
    const itemToDelete = salesLines.find(
      (item) => item.salesId === salesIdToRemove
    );
    if (itemToDelete) {
      setGrossTotal(
        (prevGrossTotal) =>
          prevGrossTotal - parseFloat(itemToDelete.line_ItmAmt)
      );
      setTaxAmount(
        (prevTaxAmount) => prevTaxAmount - parseFloat(itemToDelete.tax_Amt)
      );
      setDiscountAmt(
        (prevDiscountAmt) =>
          prevDiscountAmt - parseFloat(itemToDelete.discounted_Amount)
      );
      setAdditionalDisAmt(
        (prevAdditionalDisAmt) =>
          prevAdditionalDisAmt - parseFloat(itemToDelete.additional_Discount)
      );
      setLotOfSaleDiscount(
        (prevLotOfSaleDiscount) =>
          prevLotOfSaleDiscount - parseFloat(itemToDelete.lineDiscountAmt)
      );
      setTdsAmount(
        (prevTdsAmount) => prevTdsAmount - parseFloat(itemToDelete.tds_Amount)
      );
      setNetTotal(
        (prevNetTotal) => prevNetTotal - parseFloat(itemToDelete.line_ItmAmt)
      );
      setSalesLines((prev) =>
        prev.filter((item) => item.salesId !== salesIdToRemove)
      );
    }
  };

  const postSalesReturn = async () => {
    try {
      let formData = new FormData();
      if (paymentLines && parseInt(paymentLinesItem.paymentType) === 2) {
        for (let i = 0; i < paymentLines?.length; i++) {
          formData.append("cheque", paymentLines[i].chequeCopy);
        }
      } else {
        const placeholderFile = new File([""], "cheque.png");
        formData.append("cheque", placeholderFile);
      }

      const data = {
        itemLines: salesLines,
        paymentLines,
        salesHeader: {
          invoiceNo: invoiceNo,
        },
        linesAmount: {
          grossTotal: Number(grossTotal),
          taxAmount: Number(taxAmount),
          discountAmount: Number(discountAmt),
          additionalDiscount: Number(additionalDisAmt),
          lotOfSaleDiscount: Number(lotOfSaleDiscount),
          tdsAmount: Number(tdsAmount),
          netAmount: Number(netTotal),
        },
        userId: user,
      };

      const jsonDataBlob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });

      formData.append("details", jsonDataBlob, "data.json");
      const res = await Route(
        "POST",
        `/SalesOrder/UpdateSalesReturn`,
        null,
        formData,
        null,
        "multipart/form-data"
      );

      if (res?.status === 201) {
        setResponseData(res?.data);
        setSeverity("success");
        setNotificationMsg("Successfully Posted Sales Return");
        setShowNofication(true);
      } else {
        setNotificationMsg(res?.response?.data?.message);
        setSeverity("error");
        setShowNofication(true);
      }
    } catch (error) {
      setNotificationMsg("Error posting the:", error);
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
                    <TextField
                      error={emptyInvoiceNo}
                      label="Invoice No"
                      variant="outlined"
                      fullWidth
                      name="invoice_no"
                      onChange={setSalesInvoice}
                      value={invoiceNo}
                      required
                      helperText={emptyInvoiceNo ? "Invoice No is Empty" : null}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={fetchSalesInvoice}
                      disabled={loading}
                      style={{
                        padding: "14px 0",
                      }}
                      endIcon={<GetAppIcon />}
                    >
                      {loading ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Fetch Details"
                      )}
                    </Button>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={3}>
                    <TextField
                      label="Sales Type"
                      variant="outlined"
                      fullWidth
                      defaultValue="Sales Type"
                      value={salesData?.salesHeader?.sales_Type}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Product Type"
                      variant="outlined"
                      fullWidth
                      defaultValue="Product Type"
                      value={salesData?.salesHeader?.product_Type}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Mobile No"
                      variant="outlined"
                      fullWidth
                      defaultValue="Mobile No"
                      value={salesData?.salesHeader?.mobileNo}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Customer No"
                      variant="outlined"
                      fullWidth
                      defaultValue="Customer No"
                      value={salesData?.salesHeader?.customerNumber}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ my: 1 }}>
                  <Grid item xs={3}>
                    <TextField
                      label="Customer Name"
                      variant="outlined"
                      fullWidth
                      defaultValue="Customer Name"
                      value={salesData?.salesHeader?.customerName}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Address"
                      variant="outlined"
                      fullWidth
                      defaultValue="Address"
                      value={salesData?.salesHeader?.address}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Address 1"
                      variant="outlined"
                      fullWidth
                      defaultValue="Address1"
                      value={salesData?.salesHeader?.address1}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="City"
                      variant="outlined"
                      fullWidth
                      defaultValue="city"
                      value={salesData?.salesHeader?.city}
                      disabled
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
              </Grid>
              <Grid container padding={2}>
                <Grid container spacing={2} sx={{ my: 1, px: 2 }}>
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: 650 }}
                      aria-label="simple table"
                      size="small"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Description</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Selling Price</TableCell>
                          <TableCell align="right">Tax Amount</TableCell>
                          <TableCell align="right">Disc/Comm Amount</TableCell>
                          <TableCell align="right">
                            Additional Discount
                          </TableCell>
                          <TableCell align="right">TDS Amount</TableCell>
                          <TableCell align="right">Line Item Amount</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {salesLines?.length > 0 &&
                          salesLines?.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item?.description}</TableCell>
                              <TableCell align="right">
                                {item?.quantity}
                              </TableCell>
                              <TableCell align="right">
                                {item?.selling_Price}
                              </TableCell>
                              <TableCell align="right">
                                {item?.tax_Amt}
                              </TableCell>
                              <TableCell align="right">
                                {item?.discounted_Amount}
                              </TableCell>
                              <TableCell align="right">
                                {item?.additional_Discount}
                              </TableCell>
                              <TableCell align="right">
                                {item?.tdsAmount}
                              </TableCell>
                              <TableCell align="right">
                                {item?.line_ItmAmt}
                              </TableCell>
                              <TableCell align="right">
                                <IconButton
                                  aria-label="delete"
                                  onClick={(e) =>
                                    deleteLineItemHandle(e, item?.salesId)
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        <TableRow>
                          <TableCell colSpan={6} />
                          <TableCell colSpan={2} align="right">
                            Gross Total
                          </TableCell>
                          <TableCell align="right" colSpan={2}>
                            {grossTotal}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={6} />
                          <TableCell colSpan={2} align="right">
                            Tax Amount
                          </TableCell>
                          <TableCell align="right" colSpan={2}>
                            {taxAmount}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={6} />
                          <TableCell colSpan={2} align="right">
                            Disc/Comm Amount
                          </TableCell>
                          <TableCell align="right" colSpan={2}>
                            {discountAmt}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={6} />
                          <TableCell colSpan={2} align="right">
                            Additional Discount
                          </TableCell>
                          <TableCell align="right" colSpan={2}>
                            {additionalDisAmt}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={6} />
                          <TableCell colSpan={2} align="right">
                            Lots of Sales Discount
                          </TableCell>
                          <TableCell align="right" colSpan={2}>
                            {lotOfSaleDiscount}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={6} />
                          <TableCell colSpan={2} align="right">
                            TDS Amount
                          </TableCell>
                          <TableCell align="right" colSpan={2}>
                            {tdsAmount}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={6} />
                          <TableCell colSpan={2} align="right">
                            Net Total (Nu)
                          </TableCell>
                          <TableCell align="right" colSpan={2}>
                            {netTotal}
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
                    Refund Details
                  </Typography>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <TextField
                      label="Refund Amount"
                      variant="outlined"
                      fullWidth
                      type="number"
                      name="refund_amount"
                      defaultValue="refund_amount"
                      value={paymentLinesItem?.paymentAmount}
                      required
                      onChange={paymentAmountHandle}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth>
                      <InputLabel id="refund-type-select-label">
                        Refund Type
                      </InputLabel>
                      <Select
                        labelId="refund-type-select-label"
                        id="refund-type-select"
                        // value={age}
                        label="refund Type"
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
                    alignItems="center"
                  >
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
                    aria-label="refund detail table"
                    size="small"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Refund Amount</TableCell>
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
            <Button
              variant="contained"
              onClick={postSalesReturn}
              sx={{ ml: 2 }}
            >
              Create & Post
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ ml: 2 }}
              style={{
                background: "#fff",
              }}
              onClick={cancelHandle}
            >
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
          storeName={responseData?.customerName}
          user={user}
          salesType={responseData?.salesType}
          setLineItems={salesLines}
        />
      )}
    </>
  );
};

export default SalesReturn;
