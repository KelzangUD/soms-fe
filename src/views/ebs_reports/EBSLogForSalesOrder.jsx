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
  MenuList,
} from "@mui/material";
import SubHeader from "../../common/SubHeader";
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

const EBSLogForSalesOrder = () => {
  const ebs_log_for_sales_order_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    {
      field: "sales_type",
      headerName: "Sales Type",
      width: 250,
    },
    { field: "customer_name", headerName: "Customer Name", width: 100 },
    {
      field: "customer_no",
      headerName: "Customer Number",
      width: 150,
    },
    { field: "invoice_date", headerName: "Invoice Date", width: 150 },
    { field: "gl_date", headerName: "GL Date", width: 150 },
    { field: "line_number", headerName: "Line Number", width: 150 },
    { field: "pos_number", headerName: "POS Number", width: 150 },
    { field: "store_location", headerName: "Store Location", width: 150 },
    { field: "sub_inv", headerName: "Sub-Inventory", width: 150 },
    { field: "locator", headerName: "Locator", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "item_code", headerName: "Item Code", width: 150 },
    { field: "qty", headerName: "Qty", width: 150 },
    { field: "line_amt", headerName: "Line Amount", width: 150 },
    { field: "rev_amt", headerName: "Rev Amount", width: 150 },
    { field: "sales_tax", headerName: "Sales Tax", width: 150 },
    { field: "commission", headerName: "Commission", width: 150 },
    { field: "tds", headerName: "TDS", width: 150 },
    { field: "additional_dis", headerName: "Additional Discount", width: 150 },
    { field: "lot_of_dis", headerName: "Lot of Dis", width: 150 },
    { field: "store_keeper", headerName: "Store Keeper", width: 150 },
    { field: "imei_number", headerName: "IMEI Number", width: 150 },
    { field: "serial_number", headerName: "Serial Number", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "error_message", headerName: "Error Message", width: 350 },
  ];
  const ebs_log_for_sales_order_rows = [
    {
      id: 1,
      sales_type: "",
      customer_name: "",
      customer_no: "",
      invoice_date: "",
      gl_date: "",
      line_number: "",
      pos_number: "",
      store_location: "",
      sub_inv: "",
      locator: "",
      description: "",
      item_code: "",
      qty: "",
      line_amt: "",
      rev_amt: "",
      sales_tax: "",
      commission: "",
      tds: "",
      additional_dis: "",
      lot_of_dis: "",
      store_keeper: "",
      imei_number: "",
      serial_number: "",
      status: "",
      error_message: "",
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
          <SubHeader text="EBS Log for Sales Report" />
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ width: "100%" }}>
              <Grid container spacing={2} alignItems="center">
                <Grid
                  item
                  xs={12}
                  spacing={2}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid
                    item
                    container
                    xs={9}
                    direction="column-reverse"
                    spacing={2}
                  >
                    <Grid item container spacing={1} alignItems="center">
                      <Grid item xs={2}>
                        <FormControl fullWidth>
                          <InputLabel id="status-select-label">
                            Status
                          </InputLabel>
                          <Select
                            labelId="status-select-label"
                            id="status-select"
                            // value={age}
                            label="Status"
                            // onChange={handleChange}
                          >
                            <MenuItem value={1}>
                              <MenuList>ALL</MenuList>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={2}>
                        <FormControl fullWidth>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="From Date" />
                          </LocalizationProvider>
                        </FormControl>
                      </Grid>
                      <Grid item xs={2}>
                        <FormControl fullWidth>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="To Date" />
                          </LocalizationProvider>
                        </FormControl>
                      </Grid>
                      <Grid item xs={2}>
                        <Button variant="contained">Search</Button>
                      </Grid>
                    </Grid>
                    <Grid item>
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
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      color="error"
                      endIcon={<PictureAsPdfIcon />}
                      sx={{ mr: 2 }}
                    >
                      Export
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      endIcon={<FileDownloadIcon />}
                      sx={{ mr: 2 }}
                    >
                      Export
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<PrintIcon />}
                    >
                      Print
                    </Button>
                  </Grid>
                </Grid>
                <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
                  <div style={{ height: "auto", width: "100%" }}>
                    <DataGrid
                      rows={ebs_log_for_sales_order_rows?.map((row, index) => ({
                        ...row,
                        sl: index + 1,
                      }))}
                      columns={ebs_log_for_sales_order_columns}
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

export default EBSLogForSalesOrder;
