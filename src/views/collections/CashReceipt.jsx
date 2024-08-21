import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Paper,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  FormGroup,
  FormControlLabel,
  InputLabel,
  Select,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SubHeader from "../../common/SubHeader";

const CashReceipt = () => {
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <SubHeader text="Cash Receipt" />
          <Grid item xs={12}>
            <Paper elevation={1}>
              <Grid container padding={2}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Posting Date" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Document Number"
                      variant="outlined"
                      fullWidth
                      name="document_number"
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="payment-type-select-label">
                        Payment Type
                      </InputLabel>
                      <Select
                        labelId="payment-type-select-label"
                        id="payment-type-select"
                        // value={age}
                        label="Payment Type"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Postpaid</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
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
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
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
                  <Grid item xs={3}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Customer Status"
                      />
                    </FormGroup>
                  </Grid>
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
