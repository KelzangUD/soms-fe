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

const EBSLogForSalesReceipt = () => {
  const ebs_log_for_sales_receipt_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    {
      field: "sales_type",
      headerName: "Sales Type",
      width: 250,
    },
    { field: "payment_type", headerName: "Payment Type", width: 100 },
    {
      field: "customer_no",
      headerName: "Customer Number",
      width: 150,
    },
    { field: "pos_no", headerName: "POS Number", width: 150 },
    { field: "receipt_method", headerName: "Receipt Method", width: 150 },
    { field: "receipt_no", headerName: "Receipt Number", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "receipt_date", headerName: "Receipt_date", width: 150 },
    { field: "bank_account_no", headerName: "Bank Account No", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "store_keeper", headerName: "Store Keeper", width: 150 },
    { field: "store_locator", headerName: "Store Locator", width: 150 },
    { field: "cheque_no", headerName: "Cheque Number", width: 150 },
    { field: "card_no", headerName: "Card Number", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "error_message", headerName: "Error Message", width: 350 },
  ];
  const ebs_log_for_sales_receipt_rows = [
    {
      id: 1,
      sales_type: "",
      payment_type: "",
      customer_no: "",
      pos_no: "",
      receipt_method: "",
      receipt_no: "",
      amount: "",
      receipt_date: "",
      bank_account_no: "",
      description: "",
      store_keeper: "",
      store_locator: "",
      cheque_no: "",
      card_no: "",
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
          {/* <SubHeader text="EBS Log for Sales Receipt" /> */}
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
                      rows={ebs_log_for_sales_receipt_rows?.map((row, index) => ({
                        ...row,
                        sl: index + 1,
                      }))}
                      columns={ebs_log_for_sales_receipt_columns}
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

export default EBSLogForSalesReceipt;
