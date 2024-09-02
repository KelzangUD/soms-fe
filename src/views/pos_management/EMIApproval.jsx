import React, { useState, useEffect } from "react";
import { Box, Paper, Grid, Button, InputBase, IconButton } from "@mui/material";
import SubHeader from "../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Route from "../../routes/Route";

const EMIApproval = () => {
  const emi_approval_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "emi_no", headerName: "EMI No", width: 200 },
    { field: "emi_type", headerName: "EMI Type", width: 100 },
    { field: "customer_name", headerName: "Customer Name", width: 200 },
    { field: "creation_date", headerName: "Creation Date", width: 150 },
    { field: "created_by", headerName: "Created By", width: 150 },
    { field: "item_description", headerName: "Item Description", width: 550 },
    { field: "emi_amount", headerName: "emi_amount", width: 100 },
    {
      field: "status",
      headerName: "Approval Status",
      width: 150,
    },
  ];
  const emi_approval_rows = [
    {
      id: 1,
      emi_no: "EM/DP1/2024/00001",
      emi_type: "Samsung",
      customer_name: "Kelzang Dorji",
      creation_date: "20-Aug-2024",
      created_by: "Kelzang Dorji",
      item_description:
        "Samsung Galaxy A04 4GB RAM 64GB, Copper (SM-A045FZCGINS)",
      emi_amount: 5500,
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
          {/* <SubHeader text="EMI Approval" /> */}
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
                    <Button variant="outlined" color="error" sx={{ mr: 2 }}>
                      Reject
                    </Button>
                    <Button variant="contained" color="success">
                      Approve
                    </Button>
                  </Grid>
                </Grid>
                <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
                  <div style={{ height: "auto", width: "100%", background: "#fff" }}>
                    <DataGrid
                      rows={emi_approval_rows?.map((row, index) => ({
                        ...row,
                        sl: index + 1,
                      }))}
                      columns={emi_approval_columns}
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

export default EMIApproval;
