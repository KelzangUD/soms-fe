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
import { CustomDataTable } from "../../component/common/index";
import Route from "../../routes/Route";

const TransferOrderReport = () => {
  const transfer_order_report_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.4 },
    {
      field: "customer_name",
      headerName: "Customer Name",
      flex: 2.5,
    },
    { field: "date", headerName: "Date", flex: 1.0 },
    {
      field: "invoice_no",
      headerName: "Invoice No.",
      flex: 1.5,
    },
    { field: "item_description", headerName: "Item Description", flex: 3.5 },
    { field: "qty", headerName: "Quantity", flex: 1.5 },
    { field: "amount", headerName: "Amount", flex: 1.5 },
    {
      field: "store_name",
      headerName: "Store Name",
      flex: 1.5,
    },
    {
      field: "created_by",
      headerName: "Created By",
      flex: 1.5,
    },
  ];
  const transfer_order_report_rows = [];

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
                    <FormControl
                      fullWidth
                      style={{ background: "#fff" }}
                      size="small"
                    >
                      <InputLabel id="transfer-type-select-label">
                        Transfer Type
                      </InputLabel>
                      <Select
                        labelId="transfer-type-select-label"
                        id="transfer-type-select"
                        // value={age}
                        label="Transfer Type"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Store to Store</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth style={{ background: "#fff" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="From Date" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2} style={{ background: "#fff" }}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="To Date" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl
                      fullWidth
                      style={{ background: "#fff" }}
                      size="small"
                    >
                      <InputLabel id="from-select-label">From Store</InputLabel>
                      <Select
                        labelId="from-select-label"
                        id="from-select"
                        // value={age}
                        label="From Store"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>ALL</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl
                      fullWidth
                      style={{ background: "#fff" }}
                      size="small"
                    >
                      <InputLabel id="to-select-label">To Store</InputLabel>
                      <Select
                        labelId="to-select-label"
                        id="to-select"
                        // value={age}
                        label="To Store"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>ALL</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Item Description"
                      variant="outlined"
                      fullWidth
                      name="item_description"
                      required
                      style={{ background: "#fff" }}
                      // onChange={oldPasswordHandle}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl
                      fullWidth
                      style={{ background: "#fff" }}
                      size="small"
                    >
                      <InputLabel id="transaction-status-select-label">
                        Transaction Status
                      </InputLabel>
                      <Select
                        labelId="transaction-status--select-label"
                        id="transaction-status-select"
                        // value={age}
                        label="Transaction Status"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>ALL</MenuItem>
                      </Select>
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
                    rows={transfer_order_report_rows}
                    cols={transfer_order_report_columns}
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

export default TransferOrderReport;
