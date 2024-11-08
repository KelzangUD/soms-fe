import React, { useState, useEffect } from "react";
import { Box, Paper, Grid, Button, InputBase, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Route from "../../routes/Route";

const Delegation = () => {
  const columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "type", headerName: "Type", width: 100 },
    { field: "delegate_to", headerName: "Delegate To", width: 300 },
    { field: "from_date", headerName: "From Date", width: 200 },
    { field: "to_date", headerName: "To Date", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
  ];
  const rows = [
    {
      id: 1,
      type: "EMI RM",
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
            <Grid item>
              <Paper
                sx={{
                  p: "2px 4px",
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
              <Button
                variant="contained"
                color="primary"
                endIcon={<AddIcon />}
                sx={{ mr: 2 }}
              >
                Add New
              </Button>
              <Button
                variant="contained"
                color="success"
                endIcon={<FileDownloadIcon />}
              >
                Export
              </Button>
            </Grid>
          </Grid>
          <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
            <div style={{ height: "auto", width: "100%", background: "#fff" }}>
              <DataGrid
                rows={rows?.map((row, index) => ({
                  ...row,
                  sl: index + 1,
                }))}
                columns={columns}
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
    </>
  );
};

export default Delegation;
