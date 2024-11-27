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
  IconButton,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Notification from "../../ui/Notification";
import { Transition } from "../../component/common/index";
import dayjs from "dayjs";
import Route from "../../routes/Route";
import { dateFormatter, downloadSampleHandle } from "../../util/CommonUtil";

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

const Recharge = () => {
  const userID = localStorage.getItem("username");
  const access_token = localStorage.getItem("access_token");
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [responseData, setResponseData] = useState({});
  const [severity, setSeverity] = useState("info");
  const [paymentType, setPaymentType] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [rechargeDetails, setRechargeDetails] = useState({
    postingDate: dateFormatter(new Date().toISOString()),
    mobileNo: "",
    amount: "",
    paymentType: null,
    payment: "",
    bankId: null,
    bank: "",
    cardOrChequeNo: "",
    userId: userID,
    type: "S",
    chequeDate: dateFormatter(new Date().toISOString()),
  });
  const [disableFields, setDisabledFields] = useState({
    cardOrChequeNo: true,
    chequeDate: true,
    chequeCopy: true,
  });
  const [fileName, setFileName] = useState("Upload File");
  const [file, setFile] = useState(null);
  const [chequeCopy, setChequeCopy] = useState(null);
  const fetchPaymentType = async () => {
    const res = await Route("GET", "/Common/PaymentType", null, null, null);
    if (res?.status === 200) {
      setPaymentType(res?.data);
    }
  };
  const fetchBankAccount = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchBankDetails?userId=${userID}&paymentType=1`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setBankAccounts(res?.data);
    }
  };
  useEffect(() => {
    fetchPaymentType();
    fetchBankAccount();
  }, []);
  const postingDateHandle = (e) => {
    setRechargeDetails((prev) => ({
      ...prev,
      postingDate: dateFormatter(e?.$d),
    }));
  };
  const prepaidNumberHandle = (e) => {
    setRechargeDetails((prev) => ({
      ...prev,
      mobileNo: e?.target?.value,
    }));
  };
  const amountHandle = (e) => {
    setRechargeDetails((prev) => ({
      ...prev,
      amount: e?.target?.value,
    }));
  };
  const paymentTypeHandle = (e) => {
    setRechargeDetails((prev) => ({
      ...prev,
      paymentType: e?.target?.value,
      payment: e?.target?.value,
    }));
    // fetchBankAccount(e?.target?.value?.id);
    if (e?.target?.value?.id === "1") {
      setDisabledFields((prev) => ({
        ...prev,
        cardOrChequeNo: true,
        chequeDate: true,
        chequeCopy: true,
      }));
    } else if (e?.target?.value?.id === "2") {
      setDisabledFields((prev) => ({
        ...prev,
        cardOrChequeNo: false,
        chequeDate: false,
        chequeCopy: false,
      }));
    } else {
      setDisabledFields((prev) => ({
        ...prev,
        cardOrChequeNo: false,
        chequeDate: true,
        chequeCopy: true,
      }));
    }
  };
  const bankAccHandle = (e) => {
    setRechargeDetails((prev) => ({
      ...prev,
      bankId: e?.target?.value,
      bank: e?.target?.value,
    }));
  };
  const cardOrChequeNumberHandle = (e) => {
    setRechargeDetails((prev) => ({
      ...prev,
      cardOrChequeNo: e?.target?.value,
    }));
  };
  const chequeDateHandle = (e) => {
    setRechargeDetails((prev) => ({
      ...prev,
      chequeDate: dateFormatter(e?.$d),
    }));
  };
  const chequeCopyHandle = (e) => {
    setFileName(e?.target?.files[0]?.name);
    setChequeCopy(e?.target?.files[0]);
  };

  const uploadCSVFileHandle = (e) => {
    if (
      rechargeDetails?.paymentType === null ||
      rechargeDetails?.bankId === null
    ) {
      setNotificationMsg("Please select Payment Type and Bank");
      setSeverity("info");
      setShowNofication(true);
    } else {
      setRechargeDetails((prev) => ({
        ...prev,
        type: "B",
      }));
      setFile(e?.target?.files[0]);
    }
  };
  // const token = localStorage.getItem("access_token");
  const createHandle = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (chequeCopy && chequeCopy.length > 0) {
      formData.append("cheque", chequeCopy);
    } else {
      const placeholderFile = new File([""], "cheque.png");
      formData.append("cheque", placeholderFile);
    }
    if (file && file.length > 0) {
      formData.append("rechargeFile ", file);
    } else {
      const placeholderFile = new File([""], "file.csv");
      formData.append("rechargeFile ", placeholderFile);
    }
    const jsonDataBlob = new Blob([JSON.stringify(rechargeDetails)], {
      type: "application/json",
    });

    formData.append("recharge", jsonDataBlob, "data.json");
    const res = await Route(
      "POST",
      `/Recharge/eTop_Up`,
      access_token,
      formData,
      null,
      "multipart/form-data"
    );
    console.log(res);
    if (res?.status === 201) {
      setResponseData(res?.data);
      setSeverity("success");
      setNotificationMsg(res?.data?.status);
      setShowNofication(true);
      setRechargeDetails((prev) => ({
        ...prev,
        postingDate: new Date(),
        mobileNo: "",
        amount: "",
        paymentType: null,
        payment: "",
        bankId: null,
        bank: "",
        cardOrChequeNo: "",
        userId: userID,
        type: "",
        chequeDate: new Date(),
      }));
      setDisabledFields((prev) => ({
        ...prev,
        cardOrChequeNo: true,
        chequeDate: true,
        chequeCopy: true,
      }));
      setFileName("Upload File");
    } else {
      setNotificationMsg(res?.response?.data?.message);
      setSeverity("error");
      setShowNofication(true);
    }
  };
  const cancelHandle = () => {
    setRechargeDetails((prev) => ({
      ...prev,
      postingDate: new Date(),
      mobileNo: "",
      amount: "",
      paymentType: null,
      payment: "",
      bankId: null,
      bank: "",
      cardOrChequeNo: "",
      userId: userID,
      type: "",
      chequeDate: new Date(),
    }));
    setDisabledFields((prev) => ({
      ...prev,
      cardOrChequeNo: true,
      chequeDate: true,
      chequeCopy: true,
    }));
    setFileName("Upload File");
  };
  const openInNewTab = () => {
    const queryParams = new URLSearchParams(responseData).toString();
    const newWindow = window.open(
      `/recharge-receipt?${queryParams}`,
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
              <Grid container padding={1}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Posting Date"
                          value={dayjs(rechargeDetails?.postingDate)}
                          onChange={postingDateHandle}
                          slotProps={{
                            textField: {
                              size: "small",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Recharge Type"
                      variant="outlined"
                      fullWidth
                      name="payment_type"
                      defaultValue="E-Top Up"
                      required
                      disabled
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Prepaid Number"
                      variant="outlined"
                      fullWidth
                      name="prepaid_no"
                      onChange={prepaidNumberHandle}
                      required
                      value={rechargeDetails?.mobileNo}
                      size="small"
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
                paddingX={2}
                paddingY={1}
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
                <Grid item>
                  <IconButton
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                    fullWidth
                    variant="outlined"
                    style={{ border: "0 solid #B4B4B8", color: "#686D76" }}
                  >
                    {rechargeDetails?.paymentType === null ||
                    rechargeDetails?.bankId === null ? null : (
                      <>
                        <UploadIcon sx={{ color: "#eee" }} />
                        <VisuallyHiddenInput
                          type="file"
                          onChange={uploadCSVFileHandle}
                          multiple
                        />
                      </>
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => downloadSampleHandle("BulkRechargeFormat")}
                  >
                    <DownloadIcon sx={{ color: "#eee" }} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container padding={1}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <TextField
                      label="Payment Amount"
                      variant="outlined"
                      fullWidth
                      name="payment_amount"
                      onChange={amountHandle}
                      type="number"
                      value={rechargeDetails?.amount}
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="payment-type-select-label">
                        Payment Type*
                      </InputLabel>
                      <Select
                        labelId="payment-type-select-label"
                        id="payment-type-select"
                        label="Payment Type*"
                        onChange={paymentTypeHandle}
                        value={rechargeDetails?.payment}
                      >
                        {paymentType?.map((item) => (
                          <MenuItem value={item?.id} key={item?.id}>
                            {item?.type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="bank-ac-name-select-label">
                        Bank A/C Name*
                      </InputLabel>
                      <Select
                        labelId="bank-ac-name-select-label"
                        id="bank-ac-name-select"
                        label="Bank A/C Name*"
                        onChange={bankAccHandle}
                        value={rechargeDetails?.bankId}
                      >
                        {bankAccounts?.map((item) => (
                          <MenuItem value={item?.id} key={item?.id}>
                            {item.bankName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mt: 0.5 }}>
                  <Grid item xs={4} display="flex" alignItems="center">
                    <TextField
                      label="Card/Cheque Number"
                      variant="outlined"
                      fullWidth
                      name="cheque_no"
                      onChange={cardOrChequeNumberHandle}
                      value={rechargeDetails?.cardOrChequeNo}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Cheque Date"
                          disabled={disableFields?.chequeDate}
                          onChange={chequeDateHandle}
                          value={dayjs(rechargeDetails?.chequeDate)}
                          slotProps={{
                            textField: {
                              size: "small",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} display="flex">
                    <Button
                      component="label"
                      role={undefined}
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      fullWidth
                      variant="outlined"
                      disabled={disableFields?.chequeCopy}
                      style={{ border: "1px solid #B4B4B8", color: "#686D76" }}
                    >
                      {fileName}
                      <VisuallyHiddenInput
                        type="file"
                        onChange={chequeCopyHandle}
                        multiple
                      />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" marginY={2}>
            <Button
              variant="contained"
              sx={{ marginRight: 2 }}
              onClick={createHandle}
              size="small"
            >
              Create & Post
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={cancelHandle}
              style={{ background: "#fff" }}
              size="small"
            >
              Cancel
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
      {showNotification && (
        <React.Fragment>
          <Dialog
            open={showNotification}
            TransitionComponent={Transition}
            keepMounted
            fullWidth
            size="sm"
            aria-describedby="alert-dialog-slide-description"
            onClose={(event, reason) => {
              if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
                setShowNofication(false);
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
                onClick={() => setShowNofication(false)}
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

export default Recharge;
