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

const SalesReportAll = () => {
  const sales_report_all_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "sales_type", headerName: "Sales Type", width: 150 },
    {
      field: "customer_name",
      headerName: "Customer Name",
      width: 250,
    },
    { field: "customer_no", headerName: "Customer Number", width: 100 },
    {
      field: "sales_order_no",
      headerName: "Sales Order No.",
      width: 150,
    },
    { field: "region", headerName: "Region", width: 150 },
    { field: "office", headerName: "Office", width: 150 },
    { field: "revenue_head", headerName: "Revenue Head", width: 150 },
    {
      field: "posting_date",
      headerName: "Posting Date",
      width: 150,
    },
    {
      field: "item_code",
      headerName: "Item Code",
      width: 150,
    },
    {
      field: "item_description",
      headerName: "Item Description",
      width: 150,
    },
  ];
  const sales_report_all_rows = [
    {
      id: 1,
      sales_type: "",
      customer_name: "",
      customer_no: "",
      sales_order_no: "",
      region: "",
      office: "",
      revenue_head: "",
      posting_date: "",
      item_code: "",
      item_description: "",
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
          {/* <SubHeader text="Sales Report-All" /> */}
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
                      <Grid item xs={2}>
                        <FormControl fullWidth>
                          <InputLabel id="sales-type-select-label">
                            Sales Type
                          </InputLabel>
                          <Select
                            labelId="sales-type-select-label"
                            id="sales-type-select"
                            // value={age}
                            label="Sales Type"
                            // onChange={handleChange}
                          >
                            <MenuItem value={1}>ALL</MenuItem>
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
                      <Grid item xs={2}>
                        <FormControl fullWidth>
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
                        <FormControl fullWidth>
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
                      rows={sales_report_all_rows?.map((row, index) => ({
                        ...row,
                        sl: index + 1,
                      }))}
                      columns={sales_report_all_columns}
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

export default SalesReportAll;
