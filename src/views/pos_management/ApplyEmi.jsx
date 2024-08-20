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
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SubHeader from "../../common/SubHeader";

const ApplyEmi = () => {
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <SubHeader text="Apply EMI" />
          <Grid item xs={12}>
            <Paper elevation={1}>
              <Grid container padding={2}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      label="EMI No"
                      variant="outlined"
                      fullWidth
                      name="emi_no"
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
                      disabled
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
                      label="Mobile No"
                      variant="outlined"
                      fullWidth
                      name="mobile_no"
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
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
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Date" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Item No"
                      variant="outlined"
                      fullWidth
                      name="item_no"
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Item Description"
                      variant="outlined"
                      fullWidth
                      name="item_description"
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ my: 1 }}>
                  <Grid item xs={3}>
                    <TextField
                      label="Price"
                      variant="outlined"
                      fullWidth
                      name="price"
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Discount"
                      variant="outlined"
                      fullWidth
                      name="discount"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Down Payment"
                      variant="outlined"
                      fullWidth
                      name="down_payment"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Advance Payment"
                      variant="outlined"
                      fullWidth
                      name="advance_payment"
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ my: 1 }}>
                  <Grid item xs={3}>
                    <TextField
                      label="Amount"
                      variant="outlined"
                      fullWidth
                      name="amount"
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
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
                      variant="outlined"
                      fullWidth
                      name="interest_amount"
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Final Amount"
                      variant="outlined"
                      fullWidth
                      name="final_amount"
                      disabled
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ my: 1 }}>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
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
                      variant="outlined"
                      fullWidth
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
                    <FormControl fullWidth>
                      <TextField
                        variant="outlined"
                        fullWidth
                        name="file"
                        type="file"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ my: 1 }}>
                  <Grid item xs={12}>
                    <TextField
                      label="Purpose"
                      variant="outlined"
                      fullWidth
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
            <Button variant="outlined">Reset</Button>
            <Button variant="contained" sx={{ ml: 2 }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ApplyEmi;
