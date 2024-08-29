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

const EBSLogForTransferOrder = () => {
  const ebs_log_for_transfer_order_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    {
      field: "transfer_type",
      headerName: "Transfer Type",
      width: 200,
    },
    { field: "transfer_date", headerName: "Transfer Date", width: 100 },
    {
      field: "from_store",
      headerName: "From Store",
      width: 150,
    },
    { field: "to_store", headerName: "To Store", width: 150 },
    { field: "item_no", headerName: "Item Number", width: 150 },
    { field: "item_des", headerName: "Item Description", width: 250 },
    { field: "uom", headerName: "UOM", width: 150 },
    { field: "from_sub_inv", headerName: "From Sub-Inv", width: 150 },
    { field: "from_loc_name", headerName: "From Loc Name", width: 150 },
    { field: "to_sub_inv", headerName: "To Sub-Inv", width: 150 },
    { field: "to_loc_name", headerName: "To Loc Name", width: 150 },
    { field: "qty", headerName: "Qty", width: 250 },
    { field: "serial_no", headerName: "Serial Number", width: 150 },
    { field: "employee_no", headerName: "Employee Number", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "error_msg", headerName: "Error Message", width: 150 },
  ];
  const ebs_log_for_transfer_order_rows = [
    {
      id: 1,
      transfer_type: "",
      transfer_date: "",
      from_date: "",
      to_store: "",
      item_no: "",
      item_des: "",
      uom: "",
      from_sub_inv: "",
      from_loc_name: "",
      to_sub_inv: "",
      to_loc_name: "",
      qty: "",
      serial_no: "",
      employee_name: "",
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
          {/* <SubHeader text="EBS Log for Transfer Order" /> */}
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
                      rows={ebs_log_for_transfer_order_rows?.map((row, index) => ({
                        ...row,
                        sl: index + 1,
                      }))}
                      columns={ebs_log_for_transfer_order_columns}
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

export default EBSLogForTransferOrder;
