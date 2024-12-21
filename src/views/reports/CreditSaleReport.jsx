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

const CreditSaleReport = () => {
  const credit_sale_report_columns = [
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
  const credit_sale_report_rows = [];

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
                    <FormControl>
                      <InputLabel id="report-type-select-label">
                        Report Type
                      </InputLabel>
                      <Select
                        labelId="report-type-select-label"
                        id="report-type-select"
                        // value={age}
                        label="Report Type"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Sales Summary</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="From Date" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="To Date" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl>
                      <InputLabel id="region-or-extension-select-label">
                        Region/Extension
                      </InputLabel>
                      <Select
                        labelId="region-or-extension-select-label"
                        id="region-or-extension-select"
                        // value={age}
                        label="Region/Extension"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>ALL</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl>
                      <InputLabel id="field-assistant-select-label">
                        Field Assistant
                      </InputLabel>
                      <Select
                        labelId="field-assistant-select-label"
                        id="field-assistant-select"
                        // value={age}
                        label="Field Assistant"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>ALL</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl>
                      <InputLabel id="item-select-label">Item</InputLabel>
                      <Select
                        labelId="item-select-label"
                        id="item-select"
                        // value={age}
                        label="Item"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>ALL</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Customer Name"
                      name="customer_name"
                      required
                      // onChange={oldPasswordHandle}
                    />
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
                    rows={credit_sale_report_rows}
                    cols={credit_sale_report_columns}
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

export default CreditSaleReport;
