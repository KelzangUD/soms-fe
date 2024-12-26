import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  Typography,
  Card,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Notification,
  LoaderDialog,
  SuccessNotification,
} from "../../ui/index";
import dayjs from "dayjs";
import Route from "../../routes/Route";
import { dateFormatter, downloadSampleHandle } from "../../util/CommonUtil";
import { useCommon } from "../../contexts/CommonContext";

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
  const { paymentType, bankAccountNames, fetchBankAccountName } = useCommon();
  const userID = localStorage.getItem("username");
  const access_token = localStorage.getItem("access_token");
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [responseData, setResponseData] = useState({});
  const [severity, setSeverity] = useState("info");
  const [rechargeDetails, setRechargeDetails] = useState({
    postingDate: dateFormatter(new Date().toISOString()),
    mobileNo: "",
    amount: "",
    paymentType: "",
    payment: "",
    bankId: "",
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
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const [chequeCopy, setChequeCopy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchBankAccountName(rechargeDetails?.paymentType);
  }, [rechargeDetails?.paymentType]);
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
    if (e?.target?.value === "1") {
      setDisabledFields((prev) => ({
        ...prev,
        cardOrChequeNo: true,
        chequeDate: true,
        chequeCopy: true,
      }));
    } else if (e?.target?.value === "2") {
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
    setIsFileUploaded(true);
    setChequeCopy(e?.target?.files[0]);
  };

  const uploadCSVFileHandle = (e) => {
    if (rechargeDetails?.paymentType === "" || rechargeDetails?.bankId === "") {
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
  const resetHandle = () => {
    setRechargeDetails((prev) => ({
      ...prev,
      postingDate: new Date(),
      mobileNo: "",
      amount: "",
      paymentType: "",
      payment: "",
      bankId: "",
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
    setIsFileUploaded(false);
  };
  const createHandle = async (e) => {
    e.preventDefault();
    if (rechargeDetails?.amount < 10) {
      setNotificationMsg(`Recharge Amount should be not be less than Nu.10`);
      setSeverity("info");
      setShowNofication(true);
    } else {
      setIsLoading(true);
      try {
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
        if (res?.status === 201) {
          setResponseData(res?.data);
          setSeverity("success");
          setNotificationMsg(res?.data?.status);
          setShowNofication(true);
          resetHandle();
        } else {
          setNotificationMsg(res?.response?.data?.message);
          setSeverity("error");
          setShowNofication(true);
        }
      } catch (err) {
        setNotificationMsg(`Recharge Failed: ${err}`);
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
            <Card>
              <Grid
                container
                padding={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: (theme) => theme.palette.bg.light,
                }}
              >
                <Grid item>
                  <Typography variant="subtitle1" color="#eee">
                    Recharge Details
                  </Typography>
                </Grid>
              </Grid>
              <Grid container padding={2} py={2}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Posting Date"
                          value={dayjs(rechargeDetails?.postingDate)}
                          onChange={postingDateHandle}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Recharge Type"
                      fullWidth
                      name="payment_type"
                      defaultValue="E-Top Up"
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Prepaid Number"
                      fullWidth
                      name="prepaid_no"
                      onChange={prepaidNumberHandle}
                      required
                      value={rechargeDetails?.mobileNo}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Grid
                container
                paddingX={2}
                paddingY={1}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: (theme) => theme.palette.bg.light,
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
              <Grid container>
                <Grid item xs={12}>
                  <Alert severity="info">
                    The minimum recharge amount is Nu.10.
                  </Alert>
                </Grid>
              </Grid>
              <Grid container padding={2} py={2} spacing={1}>
                <Grid item xs={4}>
                  <TextField
                    label="Payment Amount"
                    name="payment_amount"
                    onChange={amountHandle}
                    type="number"
                    value={rechargeDetails?.amount}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl>
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
                  <FormControl>
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
                      {bankAccountNames?.map((item) => (
                        <MenuItem value={item?.id} key={item?.id}>
                          {item.bankName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid container pl={1} spacing={1} sx={{ mt: 0.5 }}>
                  <Grid item xs={4}>
                    <TextField
                      label="Card/Cheque Number"
                      name="cheque_no"
                      onChange={cardOrChequeNumberHandle}
                      value={rechargeDetails?.cardOrChequeNo}
                      disabled={disableFields?.cardOrChequeNo}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Cheque Date"
                          disabled={disableFields?.chequeDate}
                          onChange={chequeDateHandle}
                          value={dayjs(rechargeDetails?.chequeDate)}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      type="file"
                      label={isFileUploaded ? "File" : ""}
                      InputLabelProps={{ shrink: true }}
                      onChange={chequeCopyHandle}
                      disabled={disableFields?.chequeCopy}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" marginY={2}>
            <Button
              variant="contained"
              sx={{ marginRight: 2 }}
              onClick={createHandle}
            >
              Create & Post
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={resetHandle}
              style={{ background: "#fff" }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
      {isLoading && <LoaderDialog opne={isLoading} />}
      {showNotification && (severity === "error" || severity === "info") && (
        <Notification
          open={showNotification}
          setOpen={setShowNofication}
          message={notificationMsg}
          severity={severity}
        />
      )}
      {showNotification && severity === "success" && (
        <SuccessNotification
          showNotification={showNotification}
          setShowNofication={setShowNofication}
          notificationMsg="Succssfully Recharge"
          alertMessange={notificationMsg}
          openInNewTab={openInNewTab}
        />
      )}
    </>
  );
};

export default Recharge;
