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

const TransferOrderReport = () => {
  const transfer_order_report_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    {
      field: "customer_name",
      headerName: "Customer Name",
      width: 250,
    },
    { field: "date", headerName: "Date", width: 100 },
    {
      field: "invoice_no",
      headerName: "Invoice No.",
      width: 150,
    },
    { field: "item_description", headerName: "Item Description", width: 350 },
    { field: "qty", headerName: "Quantity", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
    {
      field: "store_name",
      headerName: "Store Name",
      width: 150,
    },
    {
      field: "created_by",
      headerName: "Created By",
      width: 150,
    },
  ];
  const transfer_order_report_rows = [
    {
      id: 1,
      customer_name: "",
      date: "",
      invoice_no: "",
      item_description: "",
      qty: "",
      amount: "",
      store_name: "",
      created_by: "",
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
          {/* <SubHeader text="Transfer Order Report" /> */}
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
                        <FormControl fullWidth>
                          <InputLabel id="from-select-label">
                            From Store
                          </InputLabel>
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
                      <Grid item xs={2}>
                        <FormControl fullWidth>
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
                          // onChange={oldPasswordHandle}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <FormControl fullWidth>
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
                      rows={transfer_order_report_rows?.map((row, index) => ({
                        ...row,
                        sl: index + 1,
                      }))}
                      columns={transfer_order_report_columns}
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

export default TransferOrderReport;
