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

const EBSLogForRecharge = () => {
  const ebs_log_for_recharge_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    {
      field: "pos_no",
      headerName: "POS Number",
      width: 200,
    },
    { field: "amount", headerName: "Amount", width: 100 },
    {
      field: "receipt_date",
      headerName: "Receipt Date",
      width: 150,
    },
    { field: "bank_acc_no", headerName: "Bank Account Number", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "prepaid_number", headerName: "Prepaid Number", width: 150 },
    { field: "store_keeper", headerName: "Store Keeper", width: 150 },
    { field: "store_locator", headerName: "Store Locator", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "error_message", headerName: "Error Message", width: 350 },
  ];
  const ebs_log_for_recharge_rows = [
    {
      id: 1,
      item_code: "",
      qty: "",
      store_locator: "",
      need_by_date: "",
      requisition_type: "",
      nav_indent_no: "",
      store_keeper: "",
      status: "",
      error_message: ""
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
                      rows={ebs_log_for_recharge_rows?.map((row, index) => ({
                        ...row,
                        sl: index + 1,
                      }))}
                      columns={ebs_log_for_recharge_columns}
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

export default EBSLogForRecharge;
