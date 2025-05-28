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
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CustomDataTable } from "../../component/common/index";
import Route from "../../routes/Route";

const SalesReturnList = () => {
  const return_posted_sales_invoice_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.4 },
    { field: "pos_credit_no", headerName: "POS Credit No", flex: 1.5 },
    {
      field: "pos_date",
      headerName: "POS Date",
      flex: 1.5,
    },
    { field: "customer_name", headerName: "Customer Name", flex: 2.5 },
    { field: "mobile_no", headerName: "Mobile No", flex: 1.5 },
    { field: "payment_amount", headerName: "Payment Amount (Nu)", flex: 1.5 },
    { field: "invoice_no", headerName: "Invoice No", flex: 1.5 },
    {
      field: "action",
      headerName: "Action",
      flex: 1.5,
      renderCell: (params) => (
        <>
          <IconButton aria-label="view" size="small" color="primary">
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
  const return_posted_sales_invoice_rows = [];

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
                  <Grid item xs={3}>
                    <FormControl
                      fullWidth
                      style={{ background: "#fff" }}
                      size="small"
                    >
                      <InputLabel id="region-or-extension-select-label">
                        Region/Extension
                      </InputLabel>
                      <Select
                        labelId="region-or-extension--select-label"
                        id="region-or-extension--select"
                        // value={age}
                        label="Region/Extension"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>TIPL_Dagapela Extension</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth style={{ background: "#fff" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="From*" format="DD/MM/YYYY" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth style={{ background: "#fff" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="To*" format="DD/MM/YYYY" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label="Customer Name"
                      variant="outlined"
                      fullWidth
                      name="customer_name"
                      required
                      // onChange={oldPasswordHandle}
                      style={{ background: "#fff" }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label="POS No."
                      variant="outlined"
                      fullWidth
                      name="pos_no"
                      required
                      // onChange={oldPasswordHandle}
                      style={{ background: "#fff" }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={1}>
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
                    rows={return_posted_sales_invoice_rows}
                    cols={return_posted_sales_invoice_columns}
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

export default SalesReturnList;
