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
              variant="outlined"
              fullWidth
              name="customer_name"
              disabled
              value={paymentReceiptDetails?.name}
              size="small"
            />
          </Grid>
          <Grid item marginX={1.5}>
            <TextField
              label="Account Id"
              variant="outlined"
              fullWidth
              name="account_id"
              disabled
              value={paymentReceiptDetails?.accountId}
              size="small"
            />
          </Grid>
          <Grid item marginX={1.5}>
            <TextField
              label="Invoice No"
              variant="outlined"
              fullWidth
              name="invoice_no"
              disabled
              value="---"
              size="small"
            />
          </Grid>
          <Grid item marginX={1.5}>
            <TextField
              label="CBS Customer Status"
              variant="outlined"
              fullWidth
              name="cbs_customer_status"
              disabled
              value="---"
              size="small"
            />
          </Grid>
          <Grid item marginX={1.5}>
            <TextField
              label="Outstanding Balance"
              variant="outlined"
              fullWidth
              name="outstanding_balance"
              disabled
              value={paymentReceiptDetails?.outstandingBalance}
              size="small"
            />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PaymentReceiptCustomerDetails;
