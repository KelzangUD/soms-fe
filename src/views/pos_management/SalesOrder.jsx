import React from "react";
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
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SubHeader from "../../common/SubHeader";

const SalesOrder = () => {
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          {/* <SubHeader text="Sales Order" /> */}
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
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="sales-type-select-label">
                        Sales Type
                      </InputLabel>
                      <Select
                        labelId="sales-type-select-label"
                        id="sales-type-select"
                        // value={age}
                        label="Sales Type"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Walkin Customer</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="product-type-select-label">
                        Product Type
                      </InputLabel>
                      <Select
                        labelId="product-type-select-label"
                        id="product-type-select"
                        // value={age}
                        label="Product Type"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Phone</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={3}>
                    <TextField
                      label="Mobile No"
                      variant="outlined"
                      fullWidth
                      name="mobile_no"
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Customer No"
                      variant="outlined"
                      fullWidth
                      name="customer_no"
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Customer Name"
                      variant="outlined"
                      fullWidth
                      name="customer_name"
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Address"
                      variant="outlined"
                      fullWidth
                      name="address"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ my: 1 }}>
                  <Grid item xs={3}>
                    <TextField
                      label="Address 1"
                      variant="outlined"
                      fullWidth
                      name="address_1"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="City"
                      variant="outlined"
                      fullWidth
                      name="city"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="repair-or-replacement-select-label">
                        Repair/Replacement
                      </InputLabel>
                      <Select
                        labelId="repair-or-replacement-select-label"
                        id="repair-or-replacement-select"
                        // value={age}
                        label="Repair/Replacement"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>RM/TH2/2021/00001</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
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
                    Line
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton aria-label="delete">
                    <AddBoxIcon sx={{ color: "#eee" }} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid container spacing={2} sx={{ my: 1, px: 2 }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                          <TableCell align="right">
                            Advance Tax Amount
                          </TableCell>
                          <TableCell align="right">Discounted Amount</TableCell>
                          <TableCell align="right">Line Item Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      {/* <TableBody>
                      </TableBody> */}
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  sx={{ px: 2 }}
                >
                  <Grid item xs={4}>
                    <TextField
                      label="Gross Total"
                      variant="outlined"
                      fullWidth
                      name="gross_total"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  sx={{ mt: 1, px: 2 }}
                >
                  <Grid item xs={4}>
                    <TextField
                      label="Tax Amount"
                      variant="outlined"
                      fullWidth
                      name="tax_amount"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  sx={{ mt: 1, px: 2 }}
                >
                  <Grid item xs={4}>
                    <TextField
                      label="Disc/Comm Amount"
                      variant="outlined"
                      fullWidth
                      name="disc_or_comm_amount"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  sx={{ mt: 1, px: 2 }}
                >
                  <Grid item xs={4}>
                    <TextField
                      label="Discretional Discount"
                      variant="outlined"
                      fullWidth
                      name="discretional_discount"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  sx={{ mt: 1, px: 2 }}
                >
                  <Grid item xs={4}>
                    <TextField
                      label="Lots of Sales Discount"
                      variant="outlined"
                      fullWidth
                      name="lots_of_sales_discount"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  sx={{ mt: 1, px: 2 }}
                >
                  <Grid item xs={4}>
                    <TextField
                      label="TDS Amount"
                      variant="outlined"
                      fullWidth
                      name="tds_amount"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  sx={{ mt: 1, px: 2 }}
                >
                  <Grid item xs={4}>
                    <TextField
                      label="Advance Amount"
                      variant="outlined"
                      fullWidth
                      name="advance_amount"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  sx={{ mt: 1, px: 2 }}
                >
                  <Grid item xs={4}>
                    <TextField
                      label="Down Payment Amount"
                      variant="outlined"
                      fullWidth
                      name="down_payment_amount"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  sx={{ mt: 1, px: 2 }}
                >
                  <Grid item xs={4}>
                    <TextField
                      label="Advance Tax Amount"
                      variant="outlined"
                      fullWidth
                      name="advance_tax_amount"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  sx={{ mt: 1, px: 2 }}
                >
                  <Grid item xs={4}>
                    <TextField
                      label="Interest Amount"
                      variant="outlined"
                      fullWidth
                      name="interest_amount"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  sx={{ my: 1, px: 2 }}
                >
                  <Grid item xs={4}>
                    <TextField
                      label="Net Total (Nu)"
                      variant="outlined"
                      fullWidth
                      name="tax_amount"
                      size="small"
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
                        label="Paymen Type"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Cash</MenuItem>
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
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>BOB</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    container
                    xs={3}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item sx={11}>
                      <TextField
                        label="Remaining Amount"
                        variant="outlined"
                        fullWidth
                        name="remaining_amount"
                        disabled
                      />
                    </Grid>
                    <Grid item sx={1}>
                      <IconButton aria-label="add">
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
                    aria-label="payment detail table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Payment Amount</TableCell>
                        <TableCell align="right">Payment Type</TableCell>
                        <TableCell align="right">Bank A/C Name</TableCell>
                        <TableCell align="right">Cheque Number</TableCell>
                        <TableCell align="right">Cheque Date</TableCell>
                        <TableCell align="right">Cheque Copy</TableCell>
                        <TableCell align="right">Card Number</TableCell>
                      </TableRow>
                    </TableHead>
                    {/* <TableBody>
         
        </TableBody> */}
                  </Table>
                </TableContainer>
              </Grid>
            </Paper>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" marginY={4} >
            <Button variant="outlined" disabled>Save As Draft</Button>
            <Button variant="contained" disabled sx={{ ml: 2 }}>Post & Print</Button>
            <Button variant="contained" sx={{ ml: 2 }}>Close</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SalesOrder;
