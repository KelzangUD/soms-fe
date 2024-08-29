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
import AddBoxIcon from "@mui/icons-material/AddBox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SubHeader from "../../common/SubHeader";

const Requisitions = () => {
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          {/* <SubHeader text="Requisitions" /> */}
          <Grid item xs={12}>
            <Paper elevation={1}>
              <Grid container padding={2}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      label="Requisiton Number"
                      variant="outlined"
                      fullWidth
                      name="requisition_number"
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="requisition-type-select-label">
                        Requisition Type*
                      </InputLabel>
                      <Select
                        labelId="requisition-type-select-label"
                        id="requisition-type-select"
                        // value={age}
                        label="Requisition Type*"
                        required
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Store Requisition</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Requisition Date*" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} display="flex" alignItems="center">
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Need By Date*" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={3}>
                    <TextField
                      label="Employee Name"
                      variant="outlined"
                      fullWidth
                      name="employee_name"
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item xs={3} display="flex">
                    <TextField
                      label="Region"
                      variant="outlined"
                      fullWidth
                      name="region"
                      disabled
                      required
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
                          <TableCell>Item No</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>UOM</TableCell>
                          <TableCell>Required Qty</TableCell>
                          <TableCell alignItems="right"></TableCell>
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
            <Button variant="contained" sx={{ ml: 2 }}>
              Create
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Requisitions;
