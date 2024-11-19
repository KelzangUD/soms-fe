import React from "react";
import {
  Box,
  Paper,
  Grid,
  InputBase,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";


const Designation = () => {
  const designation_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "designation", headerName: "Designation", width: 350 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
  ];
  const designation_rows = [
    {
      id: 1,
      designation: "Human Resorce & Administration",
      status: "Active",
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
                </Grid>
                <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
                  <div style={{ height: "auto", width: "100%", background: "#fff" }}>
                    <DataGrid
                      rows={designation_rows?.map((row, index) => ({
                        ...row,
                        sl: index + 1,
                      }))}
                      columns={designation_columns}
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

export default Designation;
