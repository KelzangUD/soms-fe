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
const ApprovalRules = () => {
  const requisition_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "for", headerName: "For", width: 250 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "rule_name", headerName: "Rule Name", width: 300 },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 150,
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 150,
    },
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
  const requisition_rows = [
    {
      id: 1,
      for: "CC Executive Extension",
      type: "Etop Requisition",
      rule_name: "CCE to RM",
      start_date: "1-Aug-2020",
      end_date: "1-Mar-2024",
      status: "Active",
    },
  ];
  const transfer_order_columns = [
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
  const transfer_order_rows = [
    {
      id: 1,
      time_zone: "BST",
      name_and_abbreviation: "Requisition",
      country: "Bhutan",
      status: "Active",
    },
  ];
  const emi_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "for", headerName: "For", width: 250 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "rule_name", headerName: "Rule Name", width: 300 },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 150,
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 150,
    },
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
  const emi_rows = [
    {
      id: 1,
      for: "CC Executive Extension",
      type: "Etop Requisition",
      rule_name: "CCE to RM",
      start_date: "1-Aug-2020",
      end_date: "1-Mar-2024",
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
          {/* <SubHeader text="Approval Rules" /> */}
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
                  <Tab label="Requisition" {...a11yProps(0)} />
                  <Tab label="Transfer Order" {...a11yProps(1)} />
                  <Tab label="EMI" {...a11yProps(2)} />
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
                  <Grid
                    item
                    container
                    alignItems="center"
                    sx={{ px: 2 }}
                    xs={12}
                  >
                    <div style={{ height: "auto", width: "100%" }}>
                      <DataGrid
                        rows={requisition_rows?.map((row, index) => ({
                          ...row,
                          sl: index + 1,
                        }))}
                        columns={requisition_columns}
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
                    <Grid item>
                      <Button
                        variant="contained"
                        color="success"
                        endIcon={<FileDownloadIcon />}
                      >
                        Export
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    alignItems="center"
                    sx={{ px: 2 }}
                    xs={12}
                  >
                    <div style={{ height: "auto", width: "100%" }}>
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
                    <Grid item>
                      <Button
                        variant="contained"
                        color="success"
                        endIcon={<FileDownloadIcon />}
                      >
                        Export
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    alignItems="center"
                    sx={{ px: 2 }}
                    xs={12}
                  >
                    <div style={{ height: "auto", width: "100%" }}>
                      <DataGrid
                        rows={emi_rows?.map((row, index) => ({
                          ...row,
                          sl: index + 1,
                        }))}
                        columns={emi_columns}
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

export default ApprovalRules;
