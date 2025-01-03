import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  IconButton,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CustomDataTable } from "../../component/common/index";
import Route from "../../routes/Route";

const SalesOrderReport = () => {
  const sales_order_report_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.4 },
    { field: "sales_type", headerName: "Sales Type", flex: 1.5 },
    {
      field: "customer_name",
      headerName: "Customer Name",
      flex: 2.5,
    },
    { field: "customer_number", headerName: "customer_no", flex: 1.0 },
    { field: "order_no", headerName: "Order No", flex: 1.5 },
    { field: "item_no", headerName: "Item_no", flex: 1.5 },
    { field: "item_description", headerName: "Item Description", flex: 1.5 },
    { field: "discount", headerName: "Discount", flex: 1.5 },
    {
      field: "additional_discount",
      headerName: "Additional Discount",
      flex: 1.5,
    },
    { field: "lot_of_sale_dis", headerName: "Lot Of Sale Dis", flex: 1.5 },
    { field: "tds", headerName: "TDS", flex: 1.5 },
    { field: "sales_tax_amount", headerName: "Sales Tax Amount", flex: 1.5 },
    { field: "total_sale_amount", headerName: "Total Sale Amount", flex: 1.5 },
    { field: "payment_mode", headerName: "Payment Mode", flex: 1.5 },
    { field: "created_user", headerName: "Created User", flex: 1.5 },
    { field: "ebs_status", headerName: "EBS Status", flex: 1.5 },
  ];
  const sales_order_report_rows = [];

  //   const token = localStorage.getItem("token");
  //   const fetchResults = async () => {
  //     const res = await Route("GET", "/results", token, null, null);
  //     if (res?.status === 200) {
  //       setResults(res?.data?.results);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchResults();
  //   }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ width: "100%" }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item container spacing={1} alignItems="center">
                  <Grid item xs={2}>
                    <TextField
                      label="Store Name"
                      name="store_name"
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label="Region Name"
                      variant="outlined"
                      fullWidth
                      name="region_name"
                      required
                      disabled
                      style={{ background: "#fff" }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label="As Of Date"
                      variant="outlined"
                      fullWidth
                      name="as_of_date"
                      required
                      disabled
                      style={{ background: "#fff" }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl
                      fullWidth
                      style={{ background: "#fff" }}
                      size="small"
                    >
                      <InputLabel id="employee-select-label">
                        Employee
                      </InputLabel>
                      <Select
                        labelId="employee-select-label"
                        id="employee-select"
                        // value={age}
                        label="Employee"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>ALL</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth style={{ background: "#fff" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="From Date"
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
                    <FormControl fullWidth style={{ background: "#fff" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="To Date"
                          slotProps={{
                            textField: {
                              size: "small",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="contained">Search</Button>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton aria-label="pdf" color="error">
                    <PictureAsPdfIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton aria-label="excel" color="success">
                    <FileDownloadIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton aria-label="print" color="primary">
                    <PrintIcon fontSize="inherit" />
                  </IconButton>
                </Grid>
                <Grid item container alignItems="center" xs={12}>
                  <CustomDataTable
                    rows={sales_order_report_rows}
                    cols={sales_order_report_columns}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SalesOrderReport;
