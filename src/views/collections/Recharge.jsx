import React, { useState, useEffect } from "react";
import {
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
  Typography,
  // Table,
  // TableContainer,
  // TableHead,
  // TableRow,
  // TableBody,
  // TableCell,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ImageIcon from "@mui/icons-material/Image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Notification from "../../ui/Notification";
import dayjs from "dayjs";
// import DialogUi from "../../ui/DialogUi";
import Route from "../../routes/Route";
import BulkRechargeFormat from "../../assets/files/BulkRechargeFormat.csv";

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
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [paymentType, setPaymentType] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [rechargeDetails, setRechargeDetails] = useState({
    postingDate: new Date(),
    mobileNo: "",
    amount: "",
    paymentType: null,
    bankId: null,
    cardOrChequeNo: "",
    userId: userID,
    type: "",
    chequeDate: new Date(),
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
  const fetchBankAccount = async (type) => {
    const res = await Route(
      "GET",
      `/Common/FetchBankDetails?userId=${userID}&paymentType=${type}`,
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
  }, []);
  const postingDateHandle = (e) => {
    setRechargeDetails((prev) => ({
      ...prev,
      postingDate: e?.$d,
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
    }));
    fetchBankAccount(e?.target?.value?.id);
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
      chequeDate: e?.$d,
    }));
  };
  const chequeCopyHandle = (e) => {
    setFileName(e?.target?.files[0]?.name);
    setChequeCopy(e?.target?.files[0]);
  };

  const sampleFileDownload = () => {
    const fileUrl = BulkRechargeFormat;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "BulkRechargeFormat.csv"; // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the link element
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
      setFile(e?.target?.files[0]);
    }
  };
  const token = localStorage.getItem("access_token");
  const createHandle = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("cheque", chequeCopy);
    formData.append("file", file);
    formData.append("billingDetails", rechargeDetails, {
      contentType: "application/json",
    });
    const res = await Route("POST", `Recharge/eTop_Up`, token, formData, null);
    if (res?.status === 201) {
      setNotificationMsg(res?.data?.message);
      setSeverity("success");
      setShowNofication(true);
      setRechargeDetails((prev) => ({
        ...prev,
        postingDate: new Date(),
        mobileNo: "",
        amount: "",
        paymentType: null,
        bankId: null,
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
                      variant="outlined"
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
                      variant="outlined"
                      fullWidth
                      name="prepaid_no"
                      onChange={prepaidNumberHandle}
                      required
                      value={rechargeDetails?.mobileNo}
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
                    Payment Details
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={sampleFileDownload}>
                    <DownloadIcon sx={{ color: "#eee" }} />
                  </IconButton>
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
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid container spacing={2}>
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
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="payment-type-select-label">
                        Payment Type*
                      </InputLabel>
                      <Select
                        labelId="payment-type-select-label"
                        id="payment-type-select"
                        label="Payment Type*"
                        onChange={paymentTypeHandle}
                        value={rechargeDetails?.paymentType}
                      >
                        {paymentType?.map((item) => (
                          <MenuItem value={item} key={item?.id}>
                            {item?.type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
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
                          <MenuItem value={item} key={item?.id}>
                            {item.bankName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={4} display="flex" alignItems="center">
                    <TextField
                      label="Card/Cheque Number"
                      variant="outlined"
                      fullWidth
                      name="cheque_no"
                      onChange={cardOrChequeNumberHandle}
                      value={rechargeDetails?.cardOrChequeNo}
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
                  {/* <Grid item xs={3} display="flex" alignItems="center">
                    <IconButton onClick={paymentDetailsHandle}>
                      <AddBoxIcon />
                    </IconButton>
                  </Grid> */}
                </Grid>
                {/* <Grid container spacing={2} sx={{ mt: 1 }} padding={2}>
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: 650 }}
                      aria-label="customer detail table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Payment Amount</TableCell>
                          <TableCell>Payment Type</TableCell>
                          <TableCell>Bank A/C Name</TableCell>
                          <TableCell>Card Number</TableCell>
                          <TableCell>Cheque Number</TableCell>
                          <TableCell>Cheque Date</TableCell>
                          <TableCell align="right">Cheque Copy</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      {rechargeDetails?.payment?.length > 0 && (
                        <TableBody>
                          {rechargeDetails?.payment.map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row?.amount}
                              </TableCell>
                              <TableCell>
                                {row.paymentTypeName}
                              </TableCell>
                              <TableCell>
                                {row.bankName}
                              </TableCell>
                              <TableCell>
                                {row.cardNumber}
                              </TableCell>
                              <TableCell>
                                {row.chequeNumber}
                              </TableCell>
                              <TableCell>
                                {row.chaqueDate}
                              </TableCell>
                              <TableCell align="right">
                                {row?.chequeCopy !== null && (
                                  <Button
                                    // variant="outlined"
                                    endIcon={<ImageIcon />}
                                    color="primary"
                                  >
                                    File
                                  </Button>
                                )}
                              </TableCell>
                              <TableCell align="right">
                                <IconButton
                                  onClick={() => deleteItemHandle(row)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                </Grid> */}
              </Grid>
            </Paper>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" marginY={6}>
            <Button variant="outlined" disabled style={{ background: "#fff" }}>
              Print
            </Button>
            <Button variant="contained" sx={{ ml: 2 }} onClick={createHandle}>
              Create & Post
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Recharge;
