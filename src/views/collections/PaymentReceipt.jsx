import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Card,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Notification,
  LoaderDialog,
  SuccessNotification,
} from "../../ui/index";
import { PaymentReceiptCustomerDetails } from "../../component/collections/index";
import Route from "../../routes/Route";
import { useCommon } from "../../contexts/CommonContext";

const PaymentReceipt = () => {
  const {
    serviceType,
    paymentType,
    paymentOptions,
    bankAccountNames,
    fetchBankAccountName,
  } = useCommon();
  const userId = localStorage?.getItem("username");
  const access_token = localStorage.getItem("access_token");
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
    bankId: "",
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
    invoiceNo: "",
  });
  const [disablePaymentSelect, setDisablePaymentSelect] = useState(true);
  const [disableFields, setDisabledFields] = useState({
    chequeNoField: true,
    chequeDateField: true,
    chequeCopyField: true,
  });
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [chequeCopy, setChequeCopy] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchBankAccountName(paymentMethod);
  }, [paymentMethod]);
  const serviceTypeHandle = (e) => {
    setIncorrectFormat(false);
    e?.target?.value === "1"
      ? setDisablePaymentSelect(false)
      : setDisablePaymentSelect(true);
    setPaymentReceiptDetails((prev) => ({
      ...prev,
      serviceType: e?.target?.value,
      mobileNo: "",
    }));

    e?.target?.value !== "1" &&
      setPaymentReceiptDetails((prev) => ({
        ...prev,
        payment: "1",
      }));
  };
  const paymentHandle = (e) => {
    setIncorrectFormat(false);
    setPaymentReceiptDetails((prev) => ({
      ...prev,
      payment: e?.target?.value,
      mobileNo: ""
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
    const res = await Route(
      "GET",
      `/Billing/getOutstandingDetail?serviceNo=${paymentReceiptDetails?.mobileNo}&type=${paymentReceiptDetails?.serviceType}&payment=${paymentReceiptDetails?.payment}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setNotificationMsg("Customer Details Fetch Successfully");
      setSeverity("success");
      setShowNofication(true);
      setPaymentReceiptDetails((prev) => ({
        ...prev,
        accountCode: res?.data?.accountCode,
        name: res?.data?.name,
        accountId: res?.data?.accountId,
        acctKey: res?.data?.acctKey,
        outstandingBalance: res?.data?.billAmount,
        invoiceNo: res?.data?.invoiceNo,
        amount: res?.data?.billAmount,
      }));
    } else {
      setNotificationMsg("Customer Details not Found!");
      setSeverity("error");
      setShowNofication(true);
    }
  };
  useEffect(() => {
    if (
      paymentReceiptDetails?.serviceType &&
      paymentReceiptDetails?.payment &&
      paymentReceiptDetails?.mobileNo
    ) {
      const { serviceType, payment, mobileNo } = paymentReceiptDetails;
      const isServiceType1Valid =
        serviceType === "1" &&
        ((payment === "1" && mobileNo.startsWith("77")) || payment === "2");
      const isServiceType2Valid = serviceType === "2" && mobileNo.length === 9;
      const isServiceType3Valid = serviceType === "3" && mobileNo.length === 5;
      if (isServiceType1Valid || isServiceType2Valid || isServiceType3Valid) {
        fetchCustomerDetailsHandle();
      } else {
        setIncorrectFormat(true);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    e?.target?.value !== "1"
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
    setIsFileUploaded(true);
    setChequeCopy(e?.target?.files[0]);
  };
  const remarksHandle = (e) => {
    setPaymentReceiptDetails((prev) => ({
      ...prev,
      remarks: e?.target?.value,
    }));
  };
  const resetState = () => {
    setPaymentReceiptDetails((prev) => ({
      ...prev,
      serviceType: "",
      mobileNo: "",
      postingDate: new Date().toString(),
      paymentType: "",
      accountCode: "",
      bankId: "",
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
    setIsFileUploaded(false);
  };
  const createHandle = async (e) => {
    e.preventDefault();
    if (
      (paymentReceiptDetails?.serviceType === "1" &&
        paymentReceiptDetails?.mobileNo?.length !== 8) ||
      (paymentReceiptDetails?.serviceType === "2" &&
        paymentReceiptDetails?.mobileNo?.length !== 9)
    ) {
      setIncorrectFormat(true);
    } else {
      setIsLoading(true);
      try {
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
          access_token,
          formData,
          null,
          "multipart/form-data"
        );
        if (res?.status === 200) {
          resetState();
          setResponseData(res?.data);
          setNotificationMsg(
            `Successfully Paid and your Application No is ${res?.data?.applicationNo}`
          );
          setSeverity("success");
          setShowDialog(true);
        } else {
          setNotificationMsg("Failed to update payment collection. Try again!");
          setSeverity("error");
          setShowNofication(true);
        }
      } catch (error) {
        setNotificationMsg("Error", error);
        setSeverity("error");
        setShowNofication(true);
      } finally {
        setIsLoading(false);
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
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item container xs={9}>
                <Card sx={{ width: "100%" }}>
                  <Grid
                    padding={2}
                    sx={{
                      background: (theme) => theme.palette.bg.light,
                    }}
                  >
                    <Typography variant="subtitle1" color="#eee">
                      Service Details
                    </Typography>
                  </Grid>
                  <Grid container spacing={1} mt={1} mb={2} paddingX={2}>
                    <Grid item xs={3}>
                      <FormControl>
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
                      <FormControl>
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
                        name="mobile_no"
                        required
                        onChange={mobileNoHandle}
                        value={paymentReceiptDetails?.mobileNo}
                        helperText={incorrectFormant && "Incorrect Entry"}
                      />
                    </Grid>
                  </Grid>
                </Card>
                <Card sx={{ width: "100%", marginTop: 2 }}>
                  <Grid
                    container
                    padding={2}
                    sx={{
                      background: (theme) => theme.palette.bg.light,
                    }}
                  >
                    <Typography variant="subtitle1" color="#eee">
                      Payment Details
                    </Typography>
                  </Grid>
                  <Grid container spacing={1} marginY={1} paddingX={2}>
                    <Grid item xs={3}>
                      <FormControl>
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
                      <FormControl>
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
                        name="amount"
                        required
                        onChange={amountHandle}
                        value={paymentReceiptDetails?.amount}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl>
                        <InputLabel id="bank-acc-select-label">
                          Bank Account
                        </InputLabel>
                        <Select
                          labelId="bank-acc-select-label"
                          id="bank-acc-select"
                          value={paymentReceiptDetails?.bankId}
                          label="Bank Account"
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
                  <Grid container spacing={1} marginY={1} paddingX={2}>
                    <Grid item xs={3}>
                      <TextField
                        label="Cheque No"
                        name="cheque_no"
                        onChange={chequeNoHandle}
                        disabled={disableFields?.chequeNoField}
                        value={paymentReceiptDetails?.chequeNo}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl>
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
                    <Grid item xs={3}>
                      <TextField
                        type="file"
                        label={isFileUploaded ? "File" : ""}
                        InputLabelProps={{ shrink: true }}
                        onChange={chequeCopyHandle}
                        disabled={disableFields?.chequeNoField}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} marginY={2} paddingX={2}>
                    <TextField
                      label="Remarks"
                      name="remarks"
                      required
                      onChange={remarksHandle}
                      value={paymentReceiptDetails?.remarks}
                      multiline
                      rows={1}
                    />
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={3} container>
                <PaymentReceiptCustomerDetails
                  paymentReceiptDetails={paymentReceiptDetails}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" marginY={2}>
            <Button variant="contained" sx={{ mr: 2 }} onClick={createHandle}>
              Create & Post
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => resetState()}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
      {isLoading && <LoaderDialog open={isLoading} />}
      {showNotification && severity === "error" && (
        <Notification
          open={showNotification}
          setOpen={setShowNofication}
          message={notificationMsg}
          severity={severity}
        />
      )}
      {showDialog && (
        <SuccessNotification
          showNotification={showDialog}
          setShowNofication={setShowDialog}
          notificationMsg="Successully Notification!"
          alertMessange={notificationMsg}
          openInNewTab={openInNewTab}
        />
      )}
    </>
  );
};

export default PaymentReceipt;
