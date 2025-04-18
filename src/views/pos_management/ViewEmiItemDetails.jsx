import React from "react";
import {
  Box,
  Grid,
  Button,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Title, RenderStatus } from "../../ui/index";

const ViewEmiItemDetails = ({ setOpen, details }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} alignItems="center" sx={{ px: 2 }}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ width: "100%" }}>
              <Grid container alignItems="center">
                <Grid item xs={12} px={2} mt={-2}>
                  <Paper sx={{ overflow: "hidden" }}>
                    <Title title="Customer Details" />
                    <Grid container spacing={2} p={2}>
                      <Grid item xs={3}>
                        <TextField
                          label="Customer Name"
                          name="customer_name"
                          defaultValue={details?.customerName}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="Customer Number"
                          name="customer_number"
                          defaultValue={details?.customerNo}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="Designation"
                          name="designation"
                          defaultValue={details?.designation}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="Mobile Number"
                          name="mobile_number"
                          defaultValue={details?.customerNo}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="Customer Email"
                          name="customer_email"
                          defaultValue={details?.emailAddress}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="Customer Type"
                          name="customer_type"
                          defaultValue={details?.customerType}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="Organization"
                          name="organization"
                          defaultValue={details?.organizationName}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="Address"
                          name="address"
                          defaultValue={details?.address}
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} px={2} mt={2}>
                  <Paper sx={{ overflow: "hidden" }}>
                    <Title title="EMI Details" />
                    <Grid container spacing={2} p={2}>
                      <Grid item xs={4}>
                        <TextField
                          label="Pos no"
                          name="pos_no"
                          defaultValue={details?.posNo}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Item Name"
                          name="item_name"
                          defaultValue={details?.itemDescription}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Item Code"
                          name="item_code"
                          defaultValue={details?.itemNo}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Serial Number"
                          name="serial_number"
                          defaultValue={details?.itemSerialNo}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          label="EMI Duration"
                          name="emi_duration"
                          defaultValue={details?.emiDuration}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          label="EMI From Date"
                          name="emi_from_date"
                          defaultValue={details?.fromDate}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          label="EMI To Date"
                          name="emi_to_date"
                          defaultValue={details?.toDate}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          label="Total Amount"
                          name="total_amount"
                          defaultValue={details?.grossTotalAmount}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          label="EMI Down Payment"
                          name="emi_down_payment"
                          defaultValue={details?.downPayment}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          label="Net Payable Amount"
                          name="net_payable_amount"
                          defaultValue={details?.payableAmount}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          label="Remaining Amount"
                          name="remaining_amount"
                          defaultValue={details?.remainingAmount}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          label="Installment Amount"
                          name="installment_amount"
                          defaultValue={details?.installmentAmount}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="EMI Remarks"
                          name="emi_to_date"
                          defaultValue={details?.remarks}
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} px={2} mt={2}>
                  <Paper sx={{ overflow: "hidden" }}>
                    <Title title="Installment Details" />
                    <Grid container spacing={2} p={2}>
                      <Grid item xs={12}>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Sl.No</TableCell>
                                <TableCell>Journal No</TableCell>
                                <TableCell>Payment Amount</TableCell>
                                <TableCell>Payment Date</TableCell>
                                <TableCell>Payment Type</TableCell>
                                <TableCell>Bank</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {details?.paymentLinesDtls?.map((row, index) => (
                                <TableRow key={index}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>{row?.emiMonthlyNo}</TableCell>
                                  <TableCell>
                                    {row?.paymentAmountPaid}
                                  </TableCell>
                                  <TableCell>{row?.paymentDate}</TableCell>
                                  <TableCell>{row?.paymentType}</TableCell>
                                  <TableCell>
                                    {row?.bankAccountNumber}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                alignItems="right"
                marginTop={2}
                marginX={2}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setOpen(false)}
                  color="error"
                  size="small"
                  sx={{
                    marginLeft: 2,
                  }}
                >
                  Close
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewEmiItemDetails;
