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
  filterDataBasedOnYearAndHalf,
  getUniqueTestNames,
  reportColumns,
  yearlyReport,
} from "../../../util/CommonUtil";

const SixMonths = () => {
  const [results, setResults] = useState([]);
  const [columns, setColumns] = useState([]);
  const [halfYearData, setHalfYearData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [half, setHalf] = useState("first");
  const token = localStorage.getItem("token");
  const fetchResults = async () => {
    const res = await Route("GET", "/results", token, null, null);
    if (res?.status === 200) {
      setResults(res?.data?.results);
    }
  };
  useEffect(() => {
    fetchResults();
  }, []);
  const filterBasedOnHalf = () => {
    setHalfYearData(filterDataBasedOnYearAndHalf(results, new Date().getFullYear(), half));
  };
  const halfHandle = (e) => {
    setHalf(e.target.value);
  };
  useEffect(() => {
    filterBasedOnHalf();
  }, [results, half]);
  useEffect(() => {
    setColumns(reportColumns(getUniqueTestNames(halfYearData)));
    setReportData(yearlyReport(halfYearData));
  }, [halfYearData]);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Six Months Report" />
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
                      defaultValue={"first"}
                      label="Select"
                      onChange={halfHandle}
                    >
                      <MenuItem value={"first"}>1st Half</MenuItem>
                      <MenuItem value={"second"}>2nd Half</MenuItem>
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

export default SixMonths;
