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

const EBSLogForCashCollectionReport = () => {
  const ebs_log_for_cash_collection_report_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    {
      field: "particuler",
      headerName: "Particular",
      width: 200,
    },
    { field: "gross_amount", headerName: "Gross Amount", width: 200 },
    {
      field: "commission",
      headerName: "Commission",
      width: 150,
    },
    { field: "net_amount", headerName: "Net Amount (A)", width: 150 },
    { field: "amount", headerName: "Amount (B)", width: 250 },
    {
      field: "total_cash_sale",
      headerName: "Total Cash Sale (A+B)",
      width: 250,
    },
  ];
  const columnGroupingModel = [
    {
      groupId: "dealer",
      headerName: "Dealer",
      description: "",
      children: [
        { field: "gross_amount" },
        { field: "commission" },
        { field: "net_amount" },
      ],
    },
    {
      groupId: "counter",
      headerName: "Counter",
      description: "",
      children: [{ field: "amount" }],
    },
  ];
  const ebs_log_for_cash_collection_report_rows = [
    {
      id: 1,
      particular: "",
      gross_amount: "",
      commision: "",
      net_amount: "",
      amount: "",
      total_cash_sale: "",
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
          {/* <SubHeader text="EBS Log for Cash Collection Report" /> */}
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
                      experimentalFeatures={{ columnGrouping: true }}
                      rows={ebs_log_for_cash_collection_report_rows?.map(
                        (row, index) => ({
                          ...row,
                          sl: index + 1,
                        })
                      )}
                      columns={ebs_log_for_cash_collection_report_columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      columnGroupingModel={columnGroupingModel}
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

export default EBSLogForCashCollectionReport;
