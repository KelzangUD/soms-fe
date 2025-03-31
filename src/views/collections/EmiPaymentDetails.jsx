import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Checkbox,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PaymentIcon from "@mui/icons-material/Payment";
import { PaymentDetailsTable } from "../../component/pos_management/index";
import { Title, RenderStatus } from "../../ui/index";
import EmiPayment from "./EmiPaymentDetails";

const EmiPaymentDetails = ({ open, setOpen, details }) => {
  useEffect(() => {
    console.log(details);
  }, []);
  const [viewEmiPayment, setViewEmiPayment] = useState(false);
  const [paymentLines, setPaymentLines] = useState([]);
  const [installmentDetails, setInstallmentDetails] = useState({
    emiDurationPaidCount: 0,
    installmentAmountPaid: 0,
    installmentId: 92,
    outstandingBalance: 82882,
    payFromDate: "",
    payToDate: "",
    payableAmount: 82882,
    paymentAmount: 0,
    paymentMethod: null,
    paymentStatus: "UnPaid",
    paymentType: null,
  });
  const paymentActionHandle = (e, row) => {
    console.log(e, row);
    setViewEmiPayment(true);
  };

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
                          label="Company Name"
                          name="company_name"
                          defaultValue={details?.address}
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
                      <Grid item xs={12}>
                        <TextField
                          label="Remarks"
                          name="remarks"
                          defaultValue={details?.remarks}
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
                          label="Item Name"
                          name="item_name"
                          defaultValue={details?.itemDescription}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          label="Item Code"
                          name="item_code"
                          defaultValue={details?.itemNo}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
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
                      <Grid item xs={3}>
                        <TextField
                          label="EMI From Date"
                          name="emi_from_date"
                          defaultValue={details?.fromDate}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="EMI To Date"
                          name="emi_to_date"
                          defaultValue={details?.toDate}
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
                                <TableCell>Pay From Date</TableCell>
                                <TableCell>Pay To Date</TableCell>
                                <TableCell>Payment Amount</TableCell>
                                <TableCell>Payment Status</TableCell>
                                <TableCell align="right">
                                  Payment Action
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {details?.paymentLinesDtls?.map((row, index) => (
                                <TableRow key={index}>
                                  <TableCell>{row?.payFromDate}</TableCell>
                                  <TableCell>{row?.payToDate}</TableCell>
                                  <TableCell>
                                    {row?.paymentStatus === "Paid"
                                      ? row?.installmentAmountPaid
                                      : row?.paymentAmount}
                                  </TableCell>
                                  <TableCell>
                                    <RenderStatus status={row?.paymentStatus} />
                                  </TableCell>
                                  <TableCell align="right">
                                    {row?.paymentStatus === "Paid" ? (
                                      <IconButton
                                        onClick={(e) =>
                                          paymentActionHandle(e, row)
                                        }
                                        color="primary"
                                      >
                                        <VisibilityIcon />
                                      </IconButton>
                                    ) : (
                                      <IconButton
                                        onClick={(e) =>
                                          paymentActionHandle(e, row)
                                        }
                                        color="primary"
                                      >
                                        <PaymentIcon />
                                      </IconButton>
                                    )}
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
                <Grid item xs={12} p={2}>
                  <PaymentDetailsTable
                  // paymentLines={paymentLines}
                  // deletePaymentItemHandle={deletePaymentItemHandle}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                alignItems="right"
                marginBottom={2}
                marginX={2}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="contained"
                  onClick={() => setOpen(false)}
                  color="primary"
                  size="small"
                >
                  Pay
                </Button>
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
      {viewEmiPayment && (
        <EmiPayment
          open={viewEmiPayment}
          setOpen={setViewEmiPayment}
          setPaymentLines={setPaymentLines}
        />
      )}
    </>
  );
};

export default EmiPaymentDetails;
