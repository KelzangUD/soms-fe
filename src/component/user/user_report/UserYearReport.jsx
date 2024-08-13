import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Grid,
  Button,
  InputBase,
  IconButton,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import Route from "../../../routes/Route";
import {
  filterDataBasedOnYear,
  getUniqueTestNames,
  reportColumns,
  yearlyReport,
} from "../../../util/CommonUtil";

const UserYearReport = () => {
  const [results, setResults] = useState([]);
  const [columns, setColumns] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const fetchResults = async () => {
    const res = await Route("GET", `/results/${user?.id}`, token, null, null);
    if (res?.status === 200) {
      setResults(res?.data?.results);
    }
  };
  useEffect(() => {
    fetchResults();
  }, []);
  const filterBasedOnYear = () => {
    setYearlyData(filterDataBasedOnYear(results, year.toString()));
  };
  const yearHandle = (e) => {
    setYear(e.target.value);
  };
  useEffect(() => {
    filterBasedOnYear();
  }, [results, year]);
  useEffect(() => {
    setColumns(reportColumns(getUniqueTestNames(yearlyData)));
    setReportData(yearlyReport(yearlyData));
  }, [yearlyData]);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="One Year Report" />
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
            <Grid
              item
              con
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid item sx={{ mr: 2 }}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="select-label">Select</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      defaultValue={new Date().getFullYear()}
                      label="Select"
                      onChange={yearHandle}
                    >
                      <MenuItem value={2023}>2023</MenuItem>
                      <MenuItem value={2024}>2024</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
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
          </Grid>
          <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
            <div style={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={reportData?.map((row, index) => ({
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

export default UserYearReport;
