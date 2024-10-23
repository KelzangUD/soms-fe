import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Grid,
  Button,
  InputBase,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import SubHeader from "../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Route from "../../routes/Route";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Geography = () => {
  const country_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "code", headerName: "Code", width: 250 },
    { field: "country_name", headerName: "Country Name", width: 350 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
  ];
  const country_rows = [
    {
      id: 1,
      code: "BT",
      country_name: "Bhutan",
      status: "Active",
    },
  ];
  const time_zone_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "time_zone", headerName: "Time Zone", width: 100 },
    {
      field: "name_and_abbreviation",
      headerName: "Name & Abbreviation",
      width: 350,
    },
    { field: "country", headerName: "Country", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
  ];
  const time_zone_rows = [
    {
      id: 1,
      time_zone: "UTC +6",
      name_and_abbreviation: "Bhutan Time (BST)",
      country: "Bhutan",
      status: "Active",
    },
  ];
  const region_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "code", headerName: "Code", width: 250 },
    { field: "region_name", headerName: "Region Name", width: 150 },
    { field: "country", headerName: "Country", width: 300 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
  ];
  const region_rows = [
    {
      id: 1,
      code: "BT-33",
      region_name: "Bumthang",
      country: "Bhutan",
      status: "Active",
    },
  ];
  const dzongkag_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "code", headerName: "Code", width: 250 },
    { field: "dzongkhag_name", headerName: "Dzongkhag Name", width: 150 },
    { field: "region", headerName: "region", width: 300 },
    { field: "country", headerName: "Country", width: 300 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
  ];
  const dzongkhag_rows = [
    {
      id: 1,
      code: "BT-33",
      dzongkhag_name: "Thimphu",
      region: "Thimphu",
      country: "Bhutan",
      status: "Active",
    },
  ];
  const store_location_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "store_name", headerName: "Store Name", width: 250 },
    { field: "dzongkhag", headerName: "Dzongkhag", width: 150 },
    { field: "region", headerName: "region", width: 300 },
    { field: "country", headerName: "Country", width: 300 },
    { field: "time_zone", headerName: "Time Zone", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
  ];
  const store_location_rows = [
    {
      id: 1,
      store_name: "TICL_Authso Extension",
      dzongkhag: "Thimphu",
      region: "Thimphu",
      country: "Bhutan",
      time_zone: "UTC +6",
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          {/* <SubHeader text="Geography" /> */}
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Country" {...a11yProps(0)} />
                  <Tab label="Time Zone" {...a11yProps(1)} />
                  <Tab label="Region" {...a11yProps(2)} />
                  <Tab label="Dzongkhag" {...a11yProps(3)} />
                  <Tab label="Store Location" {...a11yProps(4)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
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
                  <Grid
                    item
                    container
                    alignItems="center"
                    sx={{ px: 2 }}
                    xs={12}
                  >
                    <div style={{ height: "auto", width: "100%", background: "#fff" }}>
                      <DataGrid
                        rows={country_rows?.map((row, index) => ({
                          ...row,
                          sl: index + 1,
                        }))}
                        columns={country_columns}
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
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
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
                  <Grid
                    item
                    container
                    alignItems="center"
                    sx={{ px: 2 }}
                    xs={12}
                  >
                    <div style={{ height: "auto", width: "100%", background: "#fff" }}>
                      <DataGrid
                        rows={time_zone_rows?.map((row, index) => ({
                          ...row,
                          sl: index + 1,
                        }))}
                        columns={time_zone_columns}
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
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
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
                  <Grid
                    item
                    container
                    alignItems="center"
                    sx={{ px: 2 }}
                    xs={12}
                  >
                    <div style={{ height: "auto", width: "100%", background: "#fff" }}>
                      <DataGrid
                        rows={region_rows?.map((row, index) => ({
                          ...row,
                          sl: index + 1,
                        }))}
                        columns={region_columns}
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
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
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
                  <Grid
                    item
                    container
                    alignItems="center"
                    sx={{ px: 2 }}
                    xs={12}
                  >
                    <div style={{ height: "auto", width: "100%", background: "#fff" }}>
                      <DataGrid
                        rows={dzongkhag_rows?.map((row, index) => ({
                          ...row,
                          sl: index + 1,
                        }))}
                        columns={dzongkag_columns}
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
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>
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
                  <Grid
                    item
                    container
                    alignItems="center"
                    sx={{ px: 2 }}
                    xs={12}
                  >
                    <div style={{ height: "auto", width: "100%", background: "#fff" }}>
                      <DataGrid
                        rows={store_location_rows?.map((row, index) => ({
                          ...row,
                          sl: index + 1,
                        }))}
                        columns={store_location_columns}
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
              </CustomTabPanel>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Geography;
