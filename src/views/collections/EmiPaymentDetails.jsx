import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  IconButton,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { PaymentDetailsTable } from "../../component/pos_management/index";
import {
  Title,
  RenderStatus,
  LoaderDialog,
  Notification,
} from "../../ui/index";
import EmiPayment from "./EmiPayment";
import Route from "../../routes/Route";

const EmiPaymentDetails = ({ setOpen, details }) => {
  const access_token = localStorage.getItem("access_token");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [isLoading, setIsLoading] = useState(false);
  const [viewEmiPayment, setViewEmiPayment] = useState(false);
  const [paymentLines, setPaymentLines] = useState([]);
  const [emiPaymentDetails, setEmiPaymentDetails] = useState({
    installment_ID: "",
    emiMonthCount: "",
    paymentStatus: "",
    updatedBy: "",
    payableAmount: "",
    paymentLinesDetails: [],
  });
  const [paymentAmount, setPaymentAmount] = useState(null);
  const paymentAllActionHandle = (e, row) => {
    setEmiPaymentDetails((prev) => ({
      ...prev,
      installment_ID: row?.installmentId,
      emiMonthCount: parseInt(
        details?.remainingAmount / details?.installmentAmount
      ),
      paymentStatus: "Paid",
      payableAmount: details?.remainingAmount,
      updatedBy: localStorage?.getItem("username"),
      monthlyInstallment:
        row?.paymentStatus === "UnPaid"
          ? row?.payableAmount
          : row?.installmentAmountPaid,
    }));
    setPaymentAmount(details?.remainingAmount);
    setViewEmiPayment(true);
  };
  const paymentActionHandle = (e, row) => {
    setEmiPaymentDetails((prev) => ({
      ...prev,
      installment_ID: row?.installmentId,
      emiMonthCount: row?.pendingInstallmentNo,
      paymentStatus: "Paid",
      payableAmount: row?.payableAmount,
      updatedBy: localStorage?.getItem("username"),
      monthlyInstallment:
        row?.paymentStatus === "UnPaid"
          ? row?.payableAmount
          : row?.installmentAmountPaid,
    }));
    setPaymentAmount(row?.payableAmount);
    setViewEmiPayment(true);
  };
  const deletePaymentItemHandle = (e, indexToRemove) => {
    setPaymentLines((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const paymentHandle = async () => {
    const totalAmount = paymentLines?.reduce(
      (accumulator, currentObject) => {
        accumulator.paymentAmount +=
          parseInt(currentObject?.paymentAmount) || 0;
        return accumulator;
      },
      {
        paymentAmount: 0,
      }
    );

    if (
      emiPaymentDetails?.monthlyInstallment === totalAmount?.paymentAmount ||
      totalAmount?.paymentAmount === details?.remainingAmount
    ) {
      const data = {
        installment_ID: emiPaymentDetails?.installment_ID,
        emiMonthCount: emiPaymentDetails?.emiMonthCount,
        paymentStatus: emiPaymentDetails?.paymentStatus,
        updatedBy: emiPaymentDetails?.updatedBy,
        payableAmount: emiPaymentDetails?.payableAmount,
        paymentLinesDtls: paymentLines?.map((item) => ({
          ...item,
          installmentAmountPaid: item?.paymentAmount,
        })),
      };
      console.log(data);
      // setIsLoading(true);
      // try {
      //   let formData = new FormData();
      //   if (paymentLines && paymentLines.length > 0) {
      //     paymentLines?.forEach((item) => {
      //       if (parseInt(item?.paymentType) === 2) {
      //         formData.append("chequeFiles", item.chequeCopy);
      //       } else {
      //         const placeholderFile = new File([""], "cheque.png");
      //         formData.append("chequeFiles", placeholderFile);
      //       }
      //     });
      //   }
      //   const jsonDataBlob = new Blob([JSON.stringify(data)], {
      //     type: "application/json",
      //   });
      //   formData.append("details", jsonDataBlob, "data.json");
      //   const res = await Route(
      //     "POST",
      //     `/emi/updateInstallmentPayment`,
      //     access_token,
      //     formData,
      //     null,
      //     "multipart/form-data"
      //   );
      //   if (res?.status === 200) {
      //     setNotificationMsg("EMI Installment Successfully Paid!");
      //     setSeverity("success");
      //     setShowNotification(true);
      //     setOpen(false);
      //   } else {
      //     setNotificationMsg(res?.response?.data?.message);
      //     setSeverity("error");
      //     setShowNotification(true);
      //   }
      // } catch (err) {
      //   setNotificationMsg("Failed To Make Payment");
      //   setSeverity("error");
      //   setShowNotification(true);
      // } finally {
      //   setIsLoading(false);
      // }
    } else {
      setNotificationMsg(
        "Total Payment Amount is not equal to Installment Payment Amount"
      );
      setSeverity("info");
      setShowNotification(true);
    }
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
                          defaultValue={details?.mobileNo}
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
                                <TableCell>Pay From Date</TableCell>
                                <TableCell>Pay To Date</TableCell>
                                <TableCell>Payment Amount</TableCell>
                                <TableCell>
                                  Monthly Installment Pending
                                </TableCell>
                                <TableCell>Payment Status</TableCell>
                                <TableCell>Payment Date</TableCell>
                                <TableCell align="right">
                                  Payment Action
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {details?.monthlyInstallmentDetailsList?.map(
                                (row, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row?.payFromDate}</TableCell>
                                    <TableCell>{row?.payToDate}</TableCell>
                                    <TableCell>
                                      {row?.paymentStatus === "UnPaid"
                                        ? row?.payableAmount
                                        : row?.installmentAmountPaid}
                                    </TableCell>
                                    <TableCell>
                                      {row?.pendingInstallmentNo}
                                    </TableCell>
                                    <TableCell>
                                      <RenderStatus
                                        status={row?.paymentStatus}
                                      />
                                    </TableCell>
                                    <TableCell>{row?.paymentDate}</TableCell>
                                    <TableCell align="right">
                                      {row?.paymentStatus === "UnPaid" && (
                                        <>
                                          <Tooltip title="Pay All Remaining Amount">
                                            <Button
                                              onClick={(e) =>
                                                paymentAllActionHandle(e, row)
                                              }
                                              color="success"
                                              variant="contained"
                                            >
                                              Pay All
                                            </Button>
                                          </Tooltip>
                                          <Tooltip title="Monthly Payment">
                                            <Button
                                              onClick={(e) =>
                                                paymentActionHandle(e, row)
                                              }
                                              sx={{ marginLeft: 1 }}
                                              color="primary"
                                              variant="contained"
                                            >
                                              Pay Monthly
                                            </Button>
                                          </Tooltip>
                                        </>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                {paymentLines?.length > 0 && (
                  <Grid item xs={12} px={2} mt={2}>
                    <PaymentDetailsTable
                      paymentLines={paymentLines}
                      deletePaymentItemHandle={deletePaymentItemHandle}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                alignItems="right"
                margin={2}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="contained"
                  onClick={paymentHandle}
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
          paymentAmount={paymentAmount}
        />
      )}
      {isLoading && <LoaderDialog open={isLoading} />}
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={notificationMsg}
          severity={severity}
        />
      )}
    </>
  );
};

export default EmiPaymentDetails;
