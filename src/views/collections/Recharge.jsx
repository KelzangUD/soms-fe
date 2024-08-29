import React from "react";
import {
  Box,
  Button,
  Paper,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SubHeader from "../../common/SubHeader";

const Recharge = () => {
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          {/* <SubHeader text="Recharge" /> */}
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
                      label="Payment Type"
                      variant="outlined"
                      fullWidth
                      name="payment_type"
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Prepaid Number"
                      variant="outlined"
                      fullWidth
                      name="prepaid_no"
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={3}>
                    <TextField
                      label="Amount"
                      variant="outlined"
                      fullWidth
                      name="amount"
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
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
                        <Typography variant="subtitle1">
                          Transaction Details
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container paddingY={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <TextField
                            label="Response Status"
                            variant="outlined"
                            fullWidth
                            name="response_status"
                            disabled
                          />
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            label="Response Message"
                            variant="outlined"
                            fullWidth
                            name="response_message"
                            disabled
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={1}>
              <Grid
                container
                padding={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#007dc5",
                }}
              >
                <Grid item>
                  <Typography variant="subtitle1" color="#eee">
                    Payment Details
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton>
                    <UploadIcon sx={{ color: "#eee" }} />
                  </IconButton>
                  <IconButton>
                    <DownloadIcon sx={{ color: "#eee" }} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      label="Payment Amount"
                      variant="outlined"
                      fullWidth
                      name="payment_amount"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="payment-type-select-label">
                        Payment Type
                      </InputLabel>
                      <Select
                        labelId="payment-type-select-label"
                        id="payment-type-select"
                        // value={age}
                        label="Payment Type"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Postpaid</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="bank-ac-name-select-label">
                        Bank A/C Name
                      </InputLabel>
                      <Select
                        labelId="bank-ac-name-select-label"
                        id="bank-ac-name-select"
                        // value={age}
                        label="Bank A/C Name"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>BOB</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} display="flex" alignItems="center">
                    <TextField
                      label="Card Number"
                      variant="outlined"
                      fullWidth
                      name="card_no"
                    />
                    <IconButton>
                      <AddBoxIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Cheque Date" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} display="flex">
                    <Typography>Cheque Copy: </Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="file"
                      type="file"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }} padding={2}>
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: 650 }}
                      aria-label="customer detail table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Payment Amount</TableCell>
                          <TableCell align="right">Payment Type</TableCell>
                          <TableCell align="right">Bank A/C Name</TableCell>
                          <TableCell align="right">Cheque Number</TableCell>
                          <TableCell align="right">Cheque Date</TableCell>
                          <TableCell align="right">Cheque Copy</TableCell>
                          <TableCell align="right">Cheque Number</TableCell>
                        </TableRow>
                      </TableHead>
                      {/* <TableBody>
                     
                    </TableBody> */}
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" marginY={6}>
            <Button variant="outlined" disabled>
              Print
            </Button>
            <Button variant="contained" sx={{ ml: 2 }}>
              Create & Post
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Recharge;
