import React from "react";
import { Card, Grid, TextField, Typography } from "@mui/material";

const PaymentReceiptCustomerDetails = ({ paymentReceiptDetails }) => {
  return (
    <Card sx={{ width: "100%" }}>
      <Grid item xs={12}>
        <Grid
          container
          padding={2}
          sx={{
            background: (theme) => theme.palette.bg.light,
          }}
        >
          <Typography variant="subtitle1" color="#eee">
            Customer Details
          </Typography>
        </Grid>
        <Grid
          container
          paddingY={2}
          spacing={3.5}
          sx={{
            display: "flex",
            flexFlow: "column",
          }}
        >
          <Grid item marginX={1.5}>
            <TextField
              label="Customer Name"
              name="customer_name"
              disabled
              value={paymentReceiptDetails?.name}
            />
          </Grid>
          <Grid item marginX={1.5}>
            <TextField
              label="Account Id"
              name="account_id"
              disabled
              value={paymentReceiptDetails?.accountId}
            />
          </Grid>
          <Grid item marginX={1.5}>
            <TextField
              label="Invoice No"
              name="invoice_no"
              disabled
              value="---"
            />
          </Grid>
          <Grid item marginX={1.5}>
            <TextField
              label="CBS Customer Status"
              name="cbs_customer_status"
              disabled
              value="---"
            />
          </Grid>
          <Grid item marginX={1.5}>
            <TextField
              label="Outstanding Balance"
              name="outstanding_balance"
              disabled
              value={paymentReceiptDetails?.outstandingBalance}
            />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PaymentReceiptCustomerDetails;
