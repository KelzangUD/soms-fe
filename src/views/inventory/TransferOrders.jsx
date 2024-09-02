import React, { useState, useEffect } from "react";
import { Box, Paper, Grid, Button, InputBase, IconButton } from "@mui/material";
import SubHeader from "../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Route from "../../routes/Route";

const TransferOrders = () => {
  const transfer_order_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "transfer_order_no", headerName: "Transfer Order No", width: 250 },
    { field: "transfer_from_code", headerName: "Transfer From Code", width: 250 },
    { field: "transfer_to_code", headerName: "Tansfer To Code", width: 250 },
    { field: "posted_date", headerName: "Posted Date", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" size="small">
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton aria-label="view" size="small">
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
  const transfer_order_rows = [
    {
      id: 1,
      transfer_order_no: 1,
      transfer_from_code: "EM/DP1/2024/00001",
      transfer_to_code: "EM/DP1/2024/00001",
      posted_date: "20-Aug-2024",
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
          {/* <SubHeader text="Transfer Order" /> */}
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
                    <Button variant="contained" color="primary" endIcon={<AddIcon />}>
                      Add New
                    </Button>
                  </Grid>
                </Grid>
                <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
                  <div style={{ height: "auto", width: "100%", background: "#fff" }}>
                    <DataGrid
                      rows={transfer_order_rows?.map((row, index) => ({
                        ...row,
                        sl: index + 1,
                      }))}
                      columns={transfer_order_columns}
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

export default TransferOrders;
