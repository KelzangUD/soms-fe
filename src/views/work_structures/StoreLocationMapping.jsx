import React from "react";
import {
  Box,
  Paper,
  Grid,
  Button,
  InputBase,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const StoreLocationMapping = () => {
  const grade_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "store_name", headerName: "Store Name", width: 350 },
    { field: "region", headerName: "Region", width: 250 },
    { field: "latitude", headerName: "Latitude", width: 100 },
    { field: "longitude", headerName: "Longitude", width: 100 },
    { field: "map", headerName: "Map", width: 150 },
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
  const grade_rows = [
    {
      id: 1,
      store_name: "TICL_Thimphu Head Office",
      region: "Thimphu",
      latitude: "125",
      longitude: "225",
      map: "map"
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
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<AddIcon />}
                      sx={{ mr: 2 }}
                    >
                      Add New
                    </Button>
                  </Grid>
                </Grid>
                <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
                  <div style={{ height: "auto", width: "100%", background: "#fff" }}>
                    <DataGrid
                      rows={grade_rows?.map((row, index) => ({
                        ...row,
                        sl: index + 1,
                      }))}
                      columns={grade_columns}
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

export default StoreLocationMapping;
