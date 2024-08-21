import React from "react";
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
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SubHeader from "../../common/SubHeader";

const AdvanceRefund = () => {
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <SubHeader text="Advance Refund" />
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
                    Advance Details
                  </Typography>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Invoice Date" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Advance Refund Number"
                      variant="outlined"
                      fullWidth
                      name="advance_refund_number"
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Advance Number"
                      variant="outlined"
                      fullWidth
                      name="advance_number"
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="advance-type-select-label">
                        Advance Type
                      </InputLabel>
                      <Select
                        labelId="advance-type-select-label"
                        id="advance-type-select"
                        // value={age}
                        label="Advance Type"
                        required
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Postpaid</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={3}>
                    <TextField
                      label="Customer Type"
                      variant="outlined"
                      fullWidth
                      name="customer_type"
                      disabled
                    />
                  </Grid>
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
                      label="Customer Number"
                      variant="outlined"
                      fullWidth
                      name="customer_number"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Mobile Number"
                      variant="outlined"
                      fullWidth
                      name="mobile_number"
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={3}>
                    <TextField
                      label="Advance Amount"
                      variant="outlined"
                      fullWidth
                      name="advance_amount"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Refund Amount"
                      variant="outlined"
                      fullWidth
                      name="refund_amount"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Remarks"
                      variant="outlined"
                      fullWidth
                      name="remarks"
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
              </Grid>
              <Grid container padding={2}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      label="Payment Amount"
                      variant="outlined"
                      fullWidth
                      name="payment_amount"
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
                        label="Payement Type"
                        required
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Postpaid</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="bank-ac-name-select-label">
                        Bank A/C Name
                      </InputLabel>
                      <Select
                        labelId="bank-ac-name-select-label"
                        id="bank-ac-name-select"
                        // value={age}
                        label="Bank A/C Name"
                        required
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>BOB</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} display="flex" alignItems="center">
                    <TextField
                      label="Card Number"
                      variant="outlined"
                      fullWidth
                      name="card_number"
                      disabled
                      required
                    />
                    <IconButton>
                      <AddBoxIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Cheque Date" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} display="flex">
                    <Typography>Cheque Copy: </Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="file"
                      type="file"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }} padding={2}>
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: 650 }}
                      aria-label="customer detail table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Payment Ampount</TableCell>
                          <TableCell>Payment Type</TableCell>
                          <TableCell>Bank A/C Name</TableCell>
                          <TableCell>Cheque Number</TableCell>
                          <TableCell>Cheque Date</TableCell>
                          <TableCell>Cheque Copy</TableCell>
                          <TableCell>Card Number</TableCell>
                        </TableRow>
                      </TableHead>
                      {/* <TableBody>
                     
                    </TableBody> */}
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" marginY={6}>
            <Button variant="contained" sx={{ ml: 2 }}>
              Create & Post
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AdvanceRefund;
