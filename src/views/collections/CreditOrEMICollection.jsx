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
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SubHeader from "../../common/SubHeader";

const CreditOrEMICollection = () => {
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <SubHeader text="Credit/EMI Collection" />
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
                    <TextField
                      label="Customer Name"
                      variant="outlined"
                      fullWidth
                      name="customer_name"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Customer Number"
                      variant="outlined"
                      fullWidth
                      name="customer_no"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="collection-type-select-label">
                        Collection Type
                      </InputLabel>
                      <Select
                        labelId="collection-type-select-label"
                        id="collection-type-select"
                        // value={age}
                        label="Collection Type"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Mobile No/Service No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="referenc-no-select-label">
                        Reference No
                      </InputLabel>
                      <Select
                        labelId="referenc-no-select-label"
                        id="referenc-no-select"
                        // value={age}
                        label="Reference No."
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Mobile No/Service No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Amount"
                      variant="outlined"
                      fullWidth
                      name="amount"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="payment-mode-select-label">
                        Payment Mode
                      </InputLabel>
                      <Select
                        labelId="payment-mode-select-label"
                        id="payment-mode-select"
                        // value={age}
                        label="Payment Mode"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>BOB</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="bank-acc-name-select-label">
                        Bank Account Name
                      </InputLabel>
                      <Select
                        labelId="bank-acc-name-select-label"
                        id="bank-acc-name-select"
                        // value={age}
                        label="Bank Account Name"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Mobile No/Service No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      label="Remarks"
                      variant="outlined"
                      fullWidth
                      name="remarks"
                    />
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
                      <Typography variant="subtitle1">Order Details</Typography>
                    </Grid>
                  </Grid>
                  <Grid container paddingY={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <TextField
                          label="Reference No."
                          variant="outlined"
                          fullWidth
                          name="reference_no"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="Total Invoice Amount"
                          variant="outlined"
                          fullWidth
                          name="total_invoice_amount"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="Remaining Amount"
                          variant="outlined"
                          fullWidth
                          name="remaining_amount"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="No. of EMI's"
                          variant="outlined"
                          fullWidth
                          name="no_of_emis"
                          disabled
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={3}>
                        <TextField
                          label="Paid EMI's"
                          variant="outlined"
                          fullWidth
                          name="paid_emis"
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" marginY={4}>
            <Button variant="contained">Create & Print</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CreditOrEMICollection;
