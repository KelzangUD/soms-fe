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
  Select,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const ApplyEmi = () => {
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12}>
            <Paper elevation={1}>
              <Grid container padding={2}>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <TextField label="EMI No" name="emi_no" disabled required />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Customer Name"
                      name="customer_name"
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Customer No"
                      name="customer_no"
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField label="Mobile No" name="mobile_no" required />
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ my: 0.5 }}>
                  <Grid item xs={3}>
                    <FormControl>
                      <InputLabel id="emi-type-select-label">
                        EMI Type
                      </InputLabel>
                      <Select
                        labelId="emi-type-select-label"
                        id="emi-type-select"
                        // value={age}
                        label="EMI Type"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Samsung EMI</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Date" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Item No"
                      name="item_no"
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Item Description"
                      name="item_description"
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ my: 0.5 }}>
                  <Grid item xs={3}>
                    <TextField label="Price" name="price" required disabled />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField label="Discount" name="discount" />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField label="Down Payment" name="down_payment" />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Advance Payment"
                      name="advance_payment"
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ my: 0.5 }}>
                  <Grid item xs={3}>
                    <TextField label="Amount" name="amount" required disabled />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="interest-select-label">
                        Interest
                      </InputLabel>
                      <Select
                        labelId="interest-select-label"
                        id="interest-type-select"
                        // value={age}
                        label="Interest"
                        required
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>10</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Interest Amount"
                      name="interest_amount"
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Final Amount"
                      name="final_amount"
                      disabled
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ my: 0.5 }}>
                  <Grid item xs={3}>
                    <FormControl>
                      <InputLabel id="no-of-emi-select-label">
                        No of EMI
                      </InputLabel>
                      <Select
                        labelId="interest-select-label"
                        id="interest-type-select"
                        // value={age}
                        label="Interest"
                        required
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>6</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Monthly EMI Amount"
                      name="amount"
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Deduction From Period" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl>
                      <TextField
                        variant="outlined"
                        name="file"
                        type="file"

                        // label="File"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ my: 0.5 }}>
                  <Grid item xs={12}>
                    <TextField
                      label="Purpose"
                      name="purpose"
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" marginY={4}>
            <Button variant="contained" sx={{ mr: 2 }} size="small">
              Submit
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{
                background: "#fff",
              }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ApplyEmi;
