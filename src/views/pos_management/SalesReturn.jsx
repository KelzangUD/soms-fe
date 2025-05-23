import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
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
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import GetAppIcon from "@mui/icons-material/GetApp";
// import dayjs from "dayjs";
import { Notification, LoaderDialog, Title } from "../../ui/index";
import AddLineItem from "./AddLineItem";
import { useCommon } from "../../contexts/CommonContext";

const SalesReturn = () => {
  const { paymentType, fetchBankBasedOnPaymentType, banks } = useCommon();
  const user = localStorage.getItem("username");
  const access_token = localStorage.getItem("access_token");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [responseData, setResponseData] = useState({});
  const [invoiceNo, setInvoiceNo] = useState("");
  const [emptyInvoiceNo, setEmptyInvoiceNo] = useState(false);
  const [salesData, setSalesData] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
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
    paymentAmount: netTotal,
    paymentType: "",
    paymentTypeName: "",
    bankAccountNumber: "",
    chequeNumber: "",
    chequeDate: "",
    cardNumber: "",
    emiRefrenceNo: "",
    chequeCopy: "",
  });
  const [salesHeaderDtls, setSalesHeaderDtls] = useState({
    sales_Type: "",
    product_Type: "",
    mobileNo: "",
    customerNumber: "",
    customerName: "",
    address: "",
    address1: "",
    city: "",
  });

  const setSalesInvoice = (e) => {
    setEmptyInvoiceNo(false);
    setInvoiceNo(e?.target?.value);
  };

  useEffect(() => {
    fetchBankBasedOnPaymentType(paymentLinesItem?.paymentType);
  }, [paymentLinesItem?.paymentType]);

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
    setIsFileUploaded(true);
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
          setShowNotification(true);
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
                setShowNotification(true);
              }
            } else {
              setNotificationMsg("Cheque date can't be empty");
              setSeverity("info");
              setShowNotification(true);
            }
          } else {
            setNotificationMsg("Cheque number can't be empty");
            setSeverity("info");
            setShowNotification(true);
          }
        } else {
          setNotificationMsg("Bank A/C can't be empty");
          setSeverity("info");
          setShowNotification(true);
        }
      } else {
        if (paymentLinesItem.bankAccountNumber !== "") {
          if (paymentLinesItem.cardNumber !== "") {
            setPaymentLines((prev) => [...prev, paymentLinesItem]);
          } else {
            setNotificationMsg("Card No. can't be empty");
            setSeverity("info");
            setShowNotification(true);
          }
        } else {
          setNotificationMsg("Bank A/C can't be empty");
          setSeverity("info");
          setShowNotification(true);
        }
      }
    } else {
      setNotificationMsg("Refund amount and refund type can't be empty");
      setSeverity("info");
      setShowNotification(true);
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
          access_token,
          null,
          null
        );
        if (res?.status === 200) {
          if (res?.data?.status === "Y") {
            setSalesData(res?.data);
            setSalesHeaderDtls((prev) => ({
              ...prev,
              sales_Type: res?.data?.salesHeaderDtls?.sales_Type,
              product_Type: res?.data?.salesHeaderDtls?.product_Type,
              mobileNo: res?.data?.salesHeaderDtls?.mobileNo,
              customerNumber: res?.data?.salesHeaderDtls?.customerNumber,
              customerName: res?.data?.salesHeaderDtls?.customerName,
              address: res?.data?.salesHeaderDtls?.address,
              address1: res?.data?.salesHeaderDtls?.address1,
              city: res?.data?.salesHeaderDtls?.city,
            }));
            setGrossTotal(res?.data?.linesAmountDtls?.gross_Total);
            setTaxAmount(res?.data?.linesAmountDtls?.tax_Amount);
            setDiscountAmt(res?.data?.linesAmountDtls?.discount_Amount);
            setAdditionalDisAmt(
              res?.data?.linesAmountDtls?.additional_Discount
            );
            setLotOfSaleDiscount(
              res?.data?.linesAmountDtls?.lotOfSale_Discount
            );
            setTdsAmount(res?.data?.linesAmountDtls?.tds_Amount);
            setNetTotal(res?.data?.linesAmountDtls?.net_Amount);
            setSalesLines(res?.data?.itemLinesDtls);
          } else {
            setNotificationMsg(
              "This POS_No is already return. Check the POS_No"
            );
            setSeverity("info");
            setShowNotification(true);
          }
        } else {
          setNotificationMsg(res?.response?.data?.message);
          setSeverity("error");
          setShowNotification(true);
        }
      } catch (error) {
        setNotificationMsg("Error fetching invoice:", error);
        setSeverity("error");
        setShowNotification(true);
      } finally {
        setLoading(false);
      }
    } else {
      setEmptyInvoiceNo(true);
    }
  };

  const resetHandle = () => {
    setInvoiceNo("");
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
    setSalesHeaderDtls((prev) => ({
      ...prev,
      sales_Type: "",
      product_Type: "",
      mobileNo: "",
      customerNumber: "",
      customerName: "",
      address: "",
      address1: "",
      city: "",
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
    if (
      paymentLinesItem?.paymentAmount === "" ||
      paymentLinesItem?.paymentAmount === 0
    ) {
      setSeverity("info");
      setNotificationMsg("Please Enter Refund Amount");
      setShowNotification(true);
      return;
    }
    setLoading(true);
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
        itemLinesDtls: salesLines,
        paymentLinesDtls: paymentLines,
        salesHeaderDtls: {
          invoiceNo: invoiceNo,
        },
        linesAmountDtls: {
          grossTotal: parseInt(grossTotal),
          taxAmount: parseInt(taxAmount),
          discountAmount: parseInt(discountAmt),
          additionalDiscount: parseInt(additionalDisAmt),
          lotOfSaleDiscount: parseInt(lotOfSaleDiscount),
          tdsAmount: parseInt(tdsAmount),
          netAmount: parseInt(netTotal),
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
        access_token,
        formData,
        null,
        "multipart/form-data"
      );

      if (res?.status === 201) {
        setResponseData(res?.data);
        setSeverity("success");
        setNotificationMsg("Successfully Posted Sales Return");
        setShowNotification(true);
        resetHandle();
      } else {
        setNotificationMsg(res?.response?.data?.message);
        setSeverity("error");
        setShowNotification(true);
      }
    } catch (error) {
      setNotificationMsg("Error posting the:", error);
      setSeverity("error");
      setShowNotification(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12}>
            <Card>
              <Title title="Header" />
              <Grid container spacing={1} p={2}>
                <Grid item xs={12} md={3}>
                  <TextField label="POS No" name="pos_no" disabled />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Posting Date"
                    name="posting_date"
                    defaultValue={new Date().toDateString()}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    error={emptyInvoiceNo}
                    label="Invoice No"
                    name="invoice_no"
                    onChange={setSalesInvoice}
                    value={invoiceNo}
                    required
                    helperText={emptyInvoiceNo ? "Invoice No is Empty" : null}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    variant="contained"
                    onClick={fetchSalesInvoice}
                    disabled={loading}
                    sx={{
                      padding: "8px 0",
                    }}
                    endIcon={<GetAppIcon />}
                    fullWidth
                  >
                    Fetch Details
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={1} px={2}>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Sales Type"
                    value={salesHeaderDtls?.sales_Type}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Product Type"
                    value={salesHeaderDtls?.product_Type}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Mobile No"
                    value={salesHeaderDtls?.mobileNo}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Customer No"
                    value={salesHeaderDtls?.customerNumber}
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} px={2} py={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Customer Name"
                    value={salesHeaderDtls?.customerName}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Address"
                    value={salesHeaderDtls?.address}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Address 1"
                    value={salesHeaderDtls?.address1}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="City"
                    value={salesHeaderDtls?.city}
                    disabled
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Title title="Line" />
              <Grid container>
                <TableContainer>
                  <Table
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                    size="small"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontSize: "13px" }}>
                          Description
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: "13px" }}>
                          Quantity
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: "13px" }}>
                          Selling Price
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: "13px" }}>
                          Tax Amount
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: "13px" }}>
                          Disc/Comm Amount
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: "13px" }}>
                          Additional Discount
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: "13px" }}>
                          TDS Amount
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: "13px" }}>
                          Line Item Amount
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: "13px" }}>
                          Action
                        </TableCell>
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
                            <TableCell align="right">{item?.tax_Amt}</TableCell>
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
                                color="error"
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
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Title title="Refund Details" />
              <Grid container spacing={1} padding={2}>
                <Grid item xs={12} md={2}>
                  <TextField
                    label="Refund Amount"
                    type="number"
                    name="refund_amount"
                    value={paymentLinesItem?.paymentAmount}
                    required
                    onChange={paymentAmountHandle}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl>
                    <InputLabel id="refund-type-select-label">
                      Refund Type
                    </InputLabel>
                    <Select
                      labelId="refund-type-select-label"
                      id="refund-type-select"
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
                <Grid item xs={12} md={3}>
                  <FormControl>
                    <InputLabel id="bank-ac-name-select-label">
                      Bank A/C Name
                    </InputLabel>
                    <Select
                      labelId="bank-ac-name-select-label"
                      id="bank-ac-name-select"
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
                  <Grid item xs={12} md={2}>
                    <TextField
                      label="Card No"
                      name="card_no"
                      onChange={cardNoHandle}
                    />
                  </Grid>
                )}
                {paymentLinesItem?.paymentType === "2" && (
                  <Grid item xs={12} md={2}>
                    <TextField
                      label="Cheque No"
                      name="cheque_no"
                      onChange={chequeNoHandle}
                    />
                  </Grid>
                )}
                {paymentLinesItem?.paymentType === "2" && (
                  <Grid item xs={12} md={1}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Cheque Date"
                          onChange={chequeDateHandle}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                )}
                {paymentLinesItem?.paymentType === "2" && (
                  <Grid item xs={12} md={1}>
                    <TextField
                      type="file"
                      label={isFileUploaded ? "File" : ""}
                      InputLabelProps={{ shrink: true }}
                      onChange={chequeCopyHandle}
                    />
                  </Grid>
                )}
                <Grid item container xs={1} display="flex" alignItems="center">
                  <Grid item xs={12} md={1}>
                    <IconButton aria-label="add" onClick={addPaymentItemHandle}>
                      <AddBoxIcon
                        sx={{
                          color: (theme) => theme?.palette?.addBtnColor?.light,
                        }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container px={2} mb={2}>
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
                                size="small"
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
            </Card>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" my={2}>
            <Button variant="contained" onClick={postSalesReturn}>
              Create & Post
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ ml: 2 }}
              onClick={resetHandle}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
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
      {loading && <LoaderDialog open={loading} />}
    </>
  );
};

export default SalesReturn;
