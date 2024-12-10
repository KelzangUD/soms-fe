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
                    <TextField
                      label="EMI No"
                      variant="outlined"
                      fullWidth
                      name="emi_no"
                      disabled
                      required
                      size="small"
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
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Customer No"
                      variant="outlined"
                      fullWidth
                      name="customer_no"
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Mobile No"
                      variant="outlined"
                      fullWidth
                      name="mobile_no"
                      required
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ my: 0.5 }}>
                  <Grid item xs={3}>
                    <FormControl fullWidth size="small">
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
                        <DatePicker
                          label="Date"
                          slotProps={{
                            textField: {
                              size: "small",
                            },
                          }}
                        />
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
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Item Description"
                      variant="outlined"
                      fullWidth
                      name="item_description"
                      required
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ my: 0.5 }}>
                  <Grid item xs={3}>
                    <TextField
                      label="Price"
                      variant="outlined"
                      fullWidth
                      name="price"
                      required
                      disabled
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Discount"
                      variant="outlined"
                      fullWidth
                      name="discount"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Down Payment"
                      variant="outlined"
                      fullWidth
                      name="down_payment"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Advance Payment"
                      variant="outlined"
                      fullWidth
                      name="advance_payment"
                      disabled
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ my: 0.5 }}>
                  <Grid item xs={3}>
                    <TextField
                      label="Amount"
                      variant="outlined"
                      fullWidth
                      name="amount"
                      required
                      disabled
                      size="small"
                    />
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
                      variant="outlined"
                      fullWidth
                      name="interest_amount"
                      disabled
                      required
                      size="small"
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
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ my: 0.5 }}>
                  <Grid item xs={3}>
                    <FormControl fullWidth size="small">
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
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Deduction From Period"
                          slotProps={{
                            textField: {
                              size: "small",
                            },
                          }}
                        />
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
                        size="small"
                        // label="File"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ my: 0.5 }}>
                  <Grid item xs={12}>
                    <TextField
                      label="Purpose"
                      variant="outlined"
                      fullWidth
                      name="purpose"
                      multiline
                      rows={3}
                      size="small"
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
              size="small"
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
