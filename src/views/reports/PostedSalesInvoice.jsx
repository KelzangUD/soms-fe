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

const PostedSalesInvoice = () => {
  const posted_sales_invoice_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "pos_no", headerName: "POS No", width: 150 },
    {
      field: "pos_date",
      headerName: "POS Date",
      width: 150,
    },
    { field: "customer_name", headerName: "Customer Name", width: 250 },
    { field: "mobile_no", headerName: "Mobile No", width: 150 },
    { field: "payment_terms", headerName: "Payment Terms", width: 150 },
    { field: "bank_name", headerName: "Bank Name", width: 150 },
    { field: "cheque_no", headerName: "Cheque No", width: 150 },
    { field: "cheque_date", headerName: "Cheque Date", width: 150 },
    { field: "payment_amount", headerName: "Payment Amount (Nu)", width: 150 },
    { field: "created_user", headerName: "Created User", width: 150 },
    { field: "invoice_type", headerName: "Invoice Type", width: 150 },
    {
      field: "old_print",
      headerName: "Old Print",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton aria-label="view" size="small">
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
  const posted_sales_invoice_rows = [
    {
      id: 1,
      pos_no: "EM/DP1/2024/00001",
      pos_date: "20-Aug-2024",
      customer_name: "TIPL",
      mobile_no: "77007700",
      payment_terms: "",
      bank_name: "BOB",
      cheque_no: "",
      cheque_date: "20-Aug-2024",
      payment_amount: "",
      created_user: "",
      invoice_type: "",
      old_print: "",
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
          {/* <SubHeader text="Posted Sales Invoice" /> */}
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
                            <MenuItem value={1}>
                              TIPL_Dagapela Extension
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={2}>
                        <FormControl fullWidth>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="From*" />
                          </LocalizationProvider>
                        </FormControl>
                      </Grid>
                      <Grid item xs={2}>
                        <FormControl fullWidth>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="To*" />
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
                        />
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
                  <div style={{ height: "auto", width: "100%", background: "#fff" }}>
                    <DataGrid
                      rows={posted_sales_invoice_rows?.map((row, index) => ({
                        ...row,
                        sl: index + 1,
                      }))}
                      columns={posted_sales_invoice_columns}
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

export default PostedSalesInvoice;
