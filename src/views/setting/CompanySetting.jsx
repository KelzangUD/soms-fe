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
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SubHeader from "../../common/SubHeader";

const CompanySetting = () => {
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          {/* <SubHeader text="Company Setting" /> */}
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ px: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ my: 1 }}>
                  <TextField
                    label="Company Name"
                    variant="outlined"
                    fullWidth
                    name="company_name"
                    required
                    // onChange={oldPasswordHandle}
                  />
                </Grid>
                <Grid item container spacing={2} sx={{ mb: 1 }}>
                  <Grid item xs={4}>
                    <TextField
                      label="Company Short Name"
                      variant="outlined"
                      fullWidth
                      name="company_short_name"
                      required
                      // onChange={newPasswordHandle}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Incorporation Date" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="TPN Number"
                      variant="outlined"
                      fullWidth
                      name="tpn_number"
                      required
                      // onChange={confirmPasswordHandle}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ mb: 1 }}>
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    name="address"
                    required
                    // onChange={oldPasswordHandle}
                  />
                </Grid>
                <Grid item container spacing={2} sx={{ mb: 1 }}>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="country-select-label">Country</InputLabel>
                      <Select
                        labelId="country-select-label"
                        id="country-simple-select"
                        // value={age}
                        label="Country"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Bhutan</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="region-select-label">Region</InputLabel>
                      <Select
                        labelId="region-select-label"
                        id="region-simple-select"
                        // value={age}
                        label="Region"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Thimphu</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="dzongkhag-select-label">
                        Dzongkhag
                      </InputLabel>
                      <Select
                        labelId="dzongkhag-select-label"
                        id="dzongkhag-simple-select"
                        // value={age}
                        label="Dzongkhag"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Thimphu</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="location-select-label">
                        Location
                      </InputLabel>
                      <Select
                        labelId="location-select-label"
                        id="location-simple-select"
                        // value={age}
                        label="Location"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>TICL_Thimphu Head Office</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item container spacing={2} sx={{ mb: 1 }}>
                  <Grid item xs={3}>
                    <TextField
                      label="Postal Code"
                      variant="outlined"
                      fullWidth
                      name="postal_code"
                      required
                      // onChange={newPasswordHandle}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Company Email"
                      variant="outlined"
                      fullWidth
                      name="company_email"
                      required
                      // onChange={newPasswordHandle}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      name="phone_number"
                      required
                      // onChange={confirmPasswordHandle}
                    />
                  </Grid>
                </Grid>
                <Grid item container spacing={2} sx={{ mb: 1 }}>
                  <Grid item xs={3}>
                    <TextField
                      label="Contact Person"
                      variant="outlined"
                      fullWidth
                      name="contact_person"
                      required
                      // onChange={newPasswordHandle}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Contact Email"
                      variant="outlined"
                      fullWidth
                      name="contact_email"
                      required
                      // onChange={newPasswordHandle}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Mobile Number"
                      variant="outlined"
                      fullWidth
                      name="mobile_number"
                      required
                      // onChange={confirmPasswordHandle}
                    />
                  </Grid>
                </Grid>
                <Grid item container spacing={2} sx={{ mb: 1 }}>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Financial Year From"
                          views={["month"]}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Financial Year To"
                          views={["month"]}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Calender Year From"
                          views={["month"]}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Calender Year To"
                          views={["month"]}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ mb: 1 }}>
                  <TextField
                    label="Website"
                    variant="outlined"
                    fullWidth
                    name="website"
                    required
                    // onChange={oldPasswordHandle}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                sx={{ my: 2, display: "flex", justifyContent: "flex-end" }}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ mr: 2 }}
                    // onClick={updateHandle}
                  >
                    Save & Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="large"
                    // onClick={cancleHandle}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CompanySetting;
