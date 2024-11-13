import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Grid,
  Button,
  InputBase,
  IconButton,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Route from "../../routes/Route";

const SalesOrderReport = () => {
  const sales_order_report_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "sales_type", headerName: "Sales Type", width: 150 },
    {
      field: "customer_name",
      headerName: "Customer Name",
      width: 250,
    },
    { field: "customer_number", headerName: "customer_no", width: 100 },
    { field: "order_no", headerName: "Order No", width: 150 },
    { field: "item_no", headerName: "Item_no", width: 150 },
    { field: "item_description", headerName: "Item Description", width: 150 },
    { field: "discount", headerName: "Discount", width: 150 },
    {
      field: "additional_discount",
      headerName: "Additional Discount",
      width: 150,
    },
    { field: "lot_of_sale_dis", headerName: "Lot Of Sale Dis", width: 150 },
    { field: "tds", headerName: "TDS", width: 150 },
    { field: "sales_tax_amount", headerName: "Sales Tax Amount", width: 150 },
    { field: "total_sale_amount", headerName: "Total Sale Amount", width: 150 },
    { field: "payment_mode", headerName: "Payment Mode", width: 150 },
    { field: "created_user", headerName: "Created User", width: 150 },
    { field: "ebs_status", headerName: "EBS Status", width: 150 },
  ];
  const sales_order_report_rows = [
    {
      id: 1,
      sales_type: "",
      customer_name: "",
      customer_no: "",
      order_no: "",
      item_no: "",
      item_description: "",
      discount: "",
      additional_discount: "",
      lot_of_sale_dis: "",
      tds: "",
      sales_tax_amount: "",
      total_sale_amount: "",
      payment_mode: "",
      created_user: "",
      ebs_status: "",
    },
  ];

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
                <Grid item container>
                  <Paper
                    sx={{
                      p: "2px 0",
                      display: "flex",
                      alignItems: "center",
                      maxWidth: 400,
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search"
                      inputProps={{ "aria-label": "search" }}
                    />
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
                <Grid item container spacing={1} alignItems="center">
                  <Grid item xs={2}>
                    <TextField
                      label="Store Name"
                      variant="outlined"
                      fullWidth
                      name="store_name"
                      required
                      disabled
                      style={{ background: "#fff" }}
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
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth style={{ background: "#fff" }}>
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
                        <DatePicker label="From Date" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth style={{ background: "#fff" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="To Date" />
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
                  <div
                    style={{
                      height: "auto",
                      width: "100%",
                      background: "#fff",
                    }}
                  >
                    <DataGrid
                      rows={sales_order_report_rows?.map((row, index) => ({
                        ...row,
                        sl: index + 1,
                      }))}
                      columns={sales_order_report_columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                    />
                  </div>
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
