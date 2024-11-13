import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Slide,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Notification from "../../ui/Notification";
import Route from "../../routes/Route";

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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PaymentReceipt = () => {
  const userId = localStorage?.getItem("username");
  const [responseData, setResponseData] = useState({});
  const [showNotification, setShowNofication] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [incorrectFormant, setIncorrectFormat] = useState(false);
  const [paymentReceiptDetails, setPaymentReceiptDetails] = useState({
    serviceType: "",
    mobileNo: "",
    postingDate: new Date().toString(),
    paymentType: "",
    accountCode: "",
    bankId: null,
    userId: userId,
    name: "",
    amount: "",
    accountId: "",
    acctKey: "",
    billAmount: "",
    chequeNo: "",
    chequeDate: new Date().toString(),
    remarks: "",
    payment: "",
    outstandingBalance: "",
  });
  const [disablePaymentSelect, setDisablePaymentSelect] = useState(true);
  const [disableFields, setDisabledFields] = useState({
    chequeNoField: true,
    chequeDateField: true,
    chequeCopyField: true,
  });
  const [fileName, setFileName] = useState("Upload File");
  const [chequeCopy, setChequeCopy] = useState(null);
  const [serviceType, setServiceType] = useState([]);
  const [paymentType, setPaymentType] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("1");
  const [bankAccountNames, setBankAccountNames] = useState([]);
  const fetchServiceType = async () => {
    const res = await Route("GET", "/Common/ServiceType", null, null, null);
    if (res?.status === 200) {
      setServiceType(res?.data);
    }
  };
  const fetchPaymentType = async () => {
    const res = await Route("GET", "/Common/PaymentType", null, null, null);
    if (res?.status === 200) {
      setPaymentType(res?.data);
    }
  };
  const fetchPaymentOptions = async () => {
    const res = await Route("GET", "/Common/PaymentOption", null, null, null);
    if (res?.status === 200) {
      setPaymentOptions(res?.data);
    }
  };
  const fetchBankAccountName = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchBankDetails?userId=${userId}&paymentType=${paymentMethod}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setBankAccountNames(res?.data);
    }
  };
  useEffect(() => {
    fetchServiceType();
    fetchPaymentType();
    fetchPaymentOptions();
    fetchBankAccountName();
  }, []);
  useEffect(() => {
    fetchBankAccountName();
  }, [paymentMethod]);
  const serviceTypeHandle = (e) => {
    e?.target?.value === "1"
      ? setDisablePaymentSelect(false)
      : setDisablePaymentSelect(true);
    setPaymentReceiptDetails((prev) => ({
      ...prev,
      serviceType: e?.target?.value,
    }));
    e?.target?.value !== "1" &&
      setPaymentReceiptDetails((prev) => ({
        ...prev,
        payment: "1",
      }));
  };
  const mobileNoHandle = (e) => {
    setIncorrectFormat(false);
    setPaymentReceiptDetails((prev) => ({
      ...prev,
      mobileNo: e?.target?.value,
    }));
  };
  const fetchCustomerDetailsHandle = async () => {
    if (
      (paymentReceiptDetails?.serviceType == "1" &&
        paymentReceiptDetails?.mobileNo?.length == 8) ||
      (paymentReceiptDetails?.serviceType == "1" &&
        paymentReceiptDetails?.mobileNo?.startsWith("77")) ||
      (paymentReceiptDetails?.serviceType == "2" &&
        paymentReceiptDetails?.mobileNo?.length == 9)
    ) {
      const res = await Route(
        "GET",
        `/Billing/getOutstandingDetail?serviceNo=${paymentReceiptDetails?.mobileNo}&type=${paymentReceiptDetails?.serviceType}&payment=${paymentReceiptDetails?.payment}`,
        null,
        null,
        null
      );
      if (res?.status === 200) {
        setNotificationMsg("Customer Detail Fetch Successfully");
        setSeverity("success");
        setShowNofication(true);
        setPaymentReceiptDetails((prev) => ({
          ...prev,
          accountCode: res?.data?.accountCode,
          name: res?.data?.name,
          accountId: res?.data?.accountId,
          acctKey: res?.data?.acctKey,
          outstandingBalance: res?.data?.billAmount,
        }));
      }
    } else {
      setIncorrectFormat(true);
    }
  };
  useEffect(() => {
    if (
      paymentReceiptDetails?.serviceType !== "" &&
      paymentReceiptDetails?.mobileNo !== "" &&
      paymentReceiptDetails?.payment !== ""
    ) {
      fetchCustomerDetailsHandle();
    }
  }, [
    paymentReceiptDetails?.serviceType,
    paymentReceiptDetails?.mobileNo,
    paymentReceiptDetails?.payment,
  ]);
  const postingDateHandle = (e) => {
    setPaymentReceiptDetails((prev) => ({
      ...prev,
      postingDate: e.$d.toString(),
    }));
  };
  const paymentMethodHandle = (e) => {
    setPaymentReceiptDetails((prev) => ({
      ...prev,
      paymentType: e?.target?.value,
      accountCode: e?.target?.value === "1" ? "1" : "2",
    }));
    setPaymentMethod(e?.target?.value);
    e?.target?.value === "2"
      ? setDisabledFields((prev) => ({
          ...prev,
          chequeNoField: false,
          chequeDateField: false,
          chequeCopyField: false,
        }))
      : setDisabledFields((prev) => ({
          ...prev,
          chequeNoField: true,
          chequeDateField: true,
          chequeCopyField: true,
        }));
  };
  const paymentHandle = (e) => {
    setPaymentReceiptDetails((prev) => ({
      ...prev,
      payment: e?.target?.value,
    }));
  };
  const amountHandle = (e) => {
    setPaymentReceiptDetails((prev) => ({
      ...prev,
      amount: e?.target?.value,
    }));
  };
  const bankHandle = (e) => {
    setPaymentReceiptDetails((prev) => ({
      ...prev,
      bankId: e?.target?.value,
    }));
  };
  const chequeNoHandle = (e) => {
    setPaymentReceiptDetails((prev) => ({
      ...prev,
      chequeNo: e?.target?.value,
    }));
  };
  const chequeDateHandle = (e) => {
    setPaymentReceiptDetails((prev) => ({
      ...prev,
      postingDate: e.$d.toString(),
    }));
  };
  const chequeCopyHandle = (e) => {
    setFileName(e?.target?.files[0]?.name);
    setChequeCopy(e?.target?.files[0]);
  };
  const remarksHandle = (e) => {
    setPaymentReceiptDetails((prev) => ({
      ...prev,
      remarks: e?.target?.value,
    }));
  };
  // const token = localStorage.getItem("access_token");
  const createHandle = async (e) => {
    e.preventDefault();
    console.log(paymentReceiptDetails?.mobileNo?.length);
    if (
      (paymentReceiptDetails?.serviceType == "1" &&
        paymentReceiptDetails?.mobileNo?.length !== 8) ||
      (paymentReceiptDetails?.serviceType == "2" &&
        paymentReceiptDetails?.mobileNo?.length !== 9)
    ) {
      setIncorrectFormat(true);
    } else {
      let formData = new FormData();
      formData.append("cheque", chequeCopy);
      if (chequeCopy && chequeCopy.length > 0) {
        formData.append("cheque", chequeCopy);
      } else {
        const placeholderFile = new File([""], "cheque.png");
        formData.append("cheque", placeholderFile);
      }
      const jsonDataBlob = new Blob([JSON.stringify(paymentReceiptDetails)], {
        type: "application/json",
      });
      formData.append("billingDetails", jsonDataBlob, "data.json");
      const res = await Route(
        "POST",
        `/Billing/outStandingBillPayment`,
        null,
        formData,
        null,
        "multipart/form-data"
      );
      console.log(paymentReceiptDetails);
      console.log(res);
      if (res?.status === 200) {
        console.log(res?.data);
        setResponseData(res?.data);
        setNotificationMsg(
          `Successfully Paid and your Application No is ${res?.data?.applicationNo}`
        );
        setSeverity("success");
        setShowDialog(true);
        setPaymentReceiptDetails((prev) => ({
          ...prev,
          serviceType: "",
          mobileNo: "",
          postingDate: new Date().toString(),
          paymentType: "",
          accountCode: "",
          bankId: null,
          userId: userId,
          name: "",
          amount: "",
          accountId: "",
          acctKey: "",
          billAmount: "",
          chequeNo: "",
          chequeDate: new Date().toString(),
          remarks: "",
          payment: "",
          outstandingBalance: "",
        }));
        setDisabledFields((prev) => ({
          ...prev,
          chequeNoField: true,
          chequeDateField: true,
          chequeCopyField: true,
        }));
        setFileName("Upload File");
      } else {
        setNotificationMsg(res?.response?.data?.message);
        setSeverity("error");
        setShowNofication(true);
      }
    }
  };
  const openInNewTab = () => {
    const queryParams = new URLSearchParams(responseData).toString();
    const newWindow = window.open(
      `/bank-receipt?${queryParams}`,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12}>
            <Paper elevation={1}>
              <Grid container padding={2} spacing={2}>
                <Grid item xs={9} container>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel id="service-type-select-label">
                          Service Type*
                        </InputLabel>
                        <Select
                          labelId="service-type-select-label"
                          id="service-type-select"
                          label="Service Type*"
                          onChange={serviceTypeHandle}
                          value={paymentReceiptDetails?.serviceType}
                        >
                          {serviceType?.map((item) => (
                            <MenuItem value={item?.id} key={item?.id}>
                              {item?.type}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel id="payment-select-label">
                          Payment
                        </InputLabel>
                        <Select
                          labelId="payment-select-label"
                          id="payment-select"
                          value={paymentReceiptDetails?.payment}
                          label="Payment"
                          onChange={paymentHandle}
                          disabled={disablePaymentSelect}
                        >
                          {paymentOptions?.map((item) => (
                            <MenuItem value={item?.id} key={item?.id}>
                              {item?.type}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        error={incorrectFormant}
                        label="Mobile Number/Account Code"
                        variant="outlined"
                        fullWidth
                        name="mobile_no"
                        required
                        onChange={mobileNoHandle}
                        value={paymentReceiptDetails?.mobileNo}
                        helperText={incorrectFormant && "Incorrect Entry"}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Posting Date"
                            value={dayjs(paymentReceiptDetails?.postingDate)}
                            onChange={postingDateHandle}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel id="payment-method-select-label">
                          Payment Method
                        </InputLabel>
                        <Select
                          labelId="payment-method-select-label"
                          id="payment-method-select"
                          label="Payment Type"
                          onChange={paymentMethodHandle}
                          value={paymentReceiptDetails?.paymentType}
                        >
                          {paymentType?.map((item) => (
                            <MenuItem value={item?.id} key={item?.id}>
                              {item?.type}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="Amount"
                        variant="outlined"
                        fullWidth
                        name="amount"
                        required
                        onChange={amountHandle}
                        value={paymentReceiptDetails?.amount}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel id="bank-acc-select-label">
                          Bank Account Name
                        </InputLabel>
                        <Select
                          labelId="bank-acc-select-label"
                          id="bank-acc-select"
                          value={paymentReceiptDetails?.bankId}
                          label="Bank Account Name"
                          onChange={bankHandle}
                        >
                          {bankAccountNames?.map((item) => (
                            <MenuItem value={item?.id} key={item?.id}>
                              {item?.bankName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={3}>
                      <TextField
                        label="Cheque No"
                        variant="outlined"
                        fullWidth
                        name="cheque_no"
                        onChange={chequeNoHandle}
                        disabled={disableFields?.chequeNoField}
                        value={paymentReceiptDetails?.chequeNo}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Cheque Date"
                            value={dayjs(paymentReceiptDetails?.chequeDate)}
                            onChange={chequeDateHandle}
                            disabled={disableFields?.chequeDateField}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3} display="flex">
                      <Button
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        // endIcon={<CloudUploadIcon />}
                        fullWidth
                        variant="outlined"
                        style={{
                          border: "1px solid #B4B4B8",
                          color: "#686D76",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "8px",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            flexGrow: 1,
                          }}
                        >
                          {fileName}
                        </span>
                        <CloudUploadIcon />
                        <VisuallyHiddenInput
                          type="file"
                          onChange={chequeCopyHandle}
                          multiple
                          disabled={disableFields?.chequeNoField}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <TextField
                        label="Remarks"
                        variant="outlined"
                        fullWidth
                        name="remarks"
                        required
                        onChange={remarksHandle}
                        value={paymentReceiptDetails?.remarks}
                        multiline
                        maxRows={3}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={3} container>
                  <Paper>
                    <Grid item xs={12}>
                      <Grid
                        container
                        padding={2}
                        sx={{
                          backgroundColor: "#1976d2",
                        }}
                      >
                        <Grid item>
                          <Typography variant="subtitle1" color="#fff">
                            Customer Details
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        paddingY={2}
                        spacing={2}
                        sx={{
                          display: "flex",
                          flexFlow: "column",
                        }}
                      >
                        <Grid item marginX={2}>
                          <TextField
                            label="Customer Name"
                            variant="outlined"
                            fullWidth
                            name="customer_name"
                            disabled
                            value={paymentReceiptDetails?.name}
                          />
                        </Grid>
                        <Grid item marginX={2}>
                          <TextField
                            label="Account Id"
                            variant="outlined"
                            fullWidth
                            name="account_id"
                            disabled
                            value={paymentReceiptDetails?.accountId}
                          />
                        </Grid>
                        <Grid item marginX={2}>
                          <TextField
                            label="Outstanding Balance"
                            variant="outlined"
                            fullWidth
                            name="outstanding_balance"
                            disabled
                            value={paymentReceiptDetails?.outstandingBalance}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" marginY={4}>
            {/* <Button variant="outlined">Print</Button> */}
            <Button variant="contained" sx={{ ml: 2 }} onClick={createHandle}>
              Create & Post
            </Button>
          </Grid>
        </Grid>
      </Box>
      {showNotification && severity === "error" && (
        <Notification
          open={showNotification}
          setOpen={setShowNofication}
          message={notificationMsg}
          severity={severity}
        />
      )}
      {showDialog && (
        <React.Fragment>
          <Dialog
            open={showDialog}
            TransitionComponent={Transition}
            keepMounted
            fullWidth
            size="sm"
            aria-describedby="alert-dialog-slide-description"
            onClose={(event, reason) => {
              if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
                setShowDialog(false);
              }
            }}
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <DialogTitle>{notificationMsg}</DialogTitle>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={openInNewTab} variant="contained">
                View Receipt
              </Button>
              <Button
                onClick={() => setShowDialog(false)}
                variant="outlined"
                color="error"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
    </>
  );
};

export default PaymentReceipt;
