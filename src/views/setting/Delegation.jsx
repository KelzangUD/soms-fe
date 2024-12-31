import React, { useState, useEffect } from "react";
import { Box, Grid, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import Route from "../../routes/Route";

const Delegation = () => {
  const columns = [
    { field: "sl", headerName: "Sl. No", flex: 40 },
    { field: "type", headerName: "Type", flex: 100 },
    { field: "delegate_to", headerName: "Delegate To", flex: 300 },
    { field: "from_date", headerName: "From Date", flex: 200 },
    { field: "to_date", headerName: "To Date", flex: 200 },
    { field: "status", headerName: "Status", flex: 200 },
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
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Grid item>
              <Button variant="contained" color="primary" endIcon={<AddIcon />}>
                Add New
              </Button>
            </Grid>
          </Grid>
          <Grid item container alignItems="center" xs={12}>
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Delegation;
