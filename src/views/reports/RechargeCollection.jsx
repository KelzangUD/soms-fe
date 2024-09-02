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
import Route from "../../routes/Route";

const RechargeCollection = () => {
  const recharge_collection_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "recharge_amount", headerName: "Recharge Amount (Nu)", width: 200 },
    {
      field: "payment_type",
      headerName: "Payment Type",
      width: 150,
    },
    { field: "ref_no", headerName: "Reference Number", width: 200 },
    { field: "created_date", headerName: "Created Date", width: 150 },
    { field: "created_user", headerName: "Created User", width: 450 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "old_print", headerName: "Old Print", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton aria-label="view" size="small">
            <PrintIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
  const recharge_collection_rows = [
    {
      id: 1,
      recharge_amount: "1630",
      payment_type: "Postpaid",
      ref_no: "MSISDN - 77100319",
      created_date: "02-08-2024",
      created_user: "Tshedup Gyeltshen (882)",
      status: "Success",
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
          {/* <SubHeader text="Recharge Collection" /> */}
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
                    xs={8}
                    direction="column-reverse"
                    spacing={2}
                  >
                    <Grid item container spacing={1} alignItems="center">
                      <Grid item xs={3}>
                        <FormControl fullWidth style={{ background: "#fff"}}>
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
                  <Grid item xs={4}>
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
                      rows={recharge_collection_rows?.map(
                        (row, index) => ({
                          ...row,
                          sl: index + 1,
                        })
                      )}
                      columns={recharge_collection_columns}
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

export default RechargeCollection;
