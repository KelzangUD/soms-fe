import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Route from "../../routes/Route";

const CashReceipt = () => {
  const [cashReceiptDetails, setCashReceiptDetails] = useState({
    postingDate: "",
    documentNumber: "",
    paymentType: "",
    payment: "",
    postpaidNo: "",
    amount: "",
    bankAccountName: "",
    customerStatus: "",
  });
  const [paymentType, setPaymentType] = useState([]);
  const fetchPaymentType = async () => {
    const res = await Route("GET", "/Common/PaymentType", null, null, null);
    if (res?.status === 200) {
      setPaymentType(res?.data);
    }
  };
  useEffect(() => {
    fetchPaymentType();
  }, []);
  const postingDateHandle = (e) => {
    setCashReceiptDetails((prev) => ({
      ...prev,
      postingDate: e.target.value,
    }));
  };
  const paymentHandle = (e) => {
    setCashReceiptDetails((prev) => ({
      ...prev,
      paymentType: e.target.value,
    }));
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
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Posting Date"
                          value={dayjs(new Date())}
                          onChange={postingDateHandle}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={3}>
                    <TextField
                      label="Document Number"
                      variant="outlined"
                      fullWidth
                      name="document_number"
                      disabled
                      required
                      value={cashReceiptDetails?.documentNumber}
                    />
                  </Grid> */}
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="service-type-select-label">
                        Service Type
                      </InputLabel>
                      <Select
                        labelId="service-type-select-label"
                        id="service-type-select"
                        value={cashReceiptDetails?.paymentType}
                        label="Service Type"
                        onChange={paymentHandle}
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
                    <FormControl fullWidth>
                      <InputLabel id="payment-type-select-label">
                        Payment Type
                      </InputLabel>
                      <Select
                        labelId="payment-type-select-label"
                        id="payment-type-select"
                        value={cashReceiptDetails?.paymentType}
                        label="Payment Type"
                        onChange={paymentHandle}
                      >
                        <MenuItem value="1">Cash</MenuItem>
                        <MenuItem value="2">Bank</MenuItem>
                      </Select>
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
                        value={cashReceiptDetails?.paymentType}
                        label="Payment Type"
                        onChange={paymentHandle}
                      >
                        {paymentType?.map((item) => (
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
                    <FormControl fullWidth>
                      <InputLabel id="payment-select-label">Payment</InputLabel>
                      <Select
                        labelId="payment-select-label"
                        id="payment-select"
                        // value={age}
                        label="Payment"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Mobile No/Service No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Mobile Number"
                      variant="outlined"
                      fullWidth
                      name="mobile_no"
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Amount"
                      variant="outlined"
                      fullWidth
                      name="amount"
                      required
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
                        // value={age}
                        label="Bank Account Name"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>BOB</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={3}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Customer Status"
                      />
                    </FormGroup>
                  </Grid> */}
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
                      <Typography variant="subtitle1">
                        Customer Details
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container paddingY={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <TextField
                          label="Customer Name"
                          variant="outlined"
                          fullWidth
                          name="customer_name"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="Account Id"
                          variant="outlined"
                          fullWidth
                          name="account_id"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="Invoice No"
                          variant="outlined"
                          fullWidth
                          name="invoice_no"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="CBS Customer Status"
                          variant="outlined"
                          fullWidth
                          name="cbs_customer_status"
                          disabled
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={3}>
                        <TextField
                          label="Outstanding Balance"
                          variant="outlined"
                          fullWidth
                          name="outstanding_balance"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="Response Status"
                          variant="outlined"
                          fullWidth
                          name="response_status"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Response Message"
                          variant="outlined"
                          fullWidth
                          name="response_message"
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  aria-label="customer detail table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Customer Name</TableCell>
                      <TableCell align="right">Account ID</TableCell>
                      <TableCell align="right">From Date</TableCell>
                      <TableCell align="right">To Date</TableCell>
                      <TableCell align="right">Invoice Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
                     
                    </TableBody> */}
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" marginY={4}>
            <Button variant="outlined">Print</Button>
            <Button variant="contained" sx={{ ml: 2 }}>
              Create & Post
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CashReceipt;
