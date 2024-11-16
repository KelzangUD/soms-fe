import React, { useState, useEffect } from "react";
import { Box, Paper, Grid, Button, InputBase, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Route from "../../routes/Route";

const EMIHistory = () => {
  const emi_history_columns = [
    { field: "sl", headerName: "Sl. No", width: 30 },
    { field: "emi_no", headerName: "EMI No", width: 170 },
    { field: "emi_date", headerName: "EMI Date", width: 100 },
    { field: "customer_name", headerName: "Customer Name", width: 200 },
    { field: "emi_amount", headerName: "EMI Amount", width: 100 },
    {
      field: "monthly_emi_amount",
      headerName: "Monthly EMI Amount",
      width: 150,
    },
    { field: "no_of_emi", headerName: "No. Of EMI", width: 100 },
    { field: "item_name", headerName: "Item Name", width: 550 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
  ];
  const emi_history__rows = [
    {
      id: 1,
      emi_no: "EM/DP1/2024/00001",
      emi_date: "11-Jul-2024",
      customer_name: "Kelzang Dorji",
      emi_amount: 9500,
      monthly_emi_amount: 791.67,
      no_of_emi: 12,
      item_name: "Samsung Galaxy A04 4GB RAM 64GB, Copper (SM-A045FZCGINS)",
      status: "Submitted",
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
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid item>
                    <Paper
                      sx={{
                        p: "2px 0",
                        display: "flex",
                        alignItems: "center",
                        width: 400,
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
                  <Grid item>
                    <IconButton type="button" aria-label="export" color="error">
                      <PictureAsPdfIcon />
                    </IconButton>
                    <IconButton
                      type="button"
                      aria-label="excel"
                      color="success"
                    >
                      <FileDownloadIcon />
                    </IconButton>
                    <IconButton
                      type="button"
                      aria-label="print"
                      color="primary"
                    >
                      <PrintIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item container alignItems="center" sx={{ px: 1 }} xs={12}>
                  <div
                    style={{
                      height: "auto",
                      width: "100%",
                      background: "#fff",
                    }}
                  >
                    <DataGrid
                      rows={emi_history__rows?.map((row, index) => ({
                        ...row,
                        sl: index + 1,
                      }))}
                      columns={emi_history_columns}
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

export default EMIHistory;
