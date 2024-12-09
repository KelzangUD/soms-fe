import React, { useState, useEffect, useRef } from "react";
import {
  Autocomplete,
  Box,
  Grid,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CustomDataTable, PrintSection } from "../../component/common/index";
import Route from "../../routes/Route";
import { sales_report_all_columns } from "../../data/static";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import { dateFormatterTwo } from "../../util/CommonUtil";

const SalesReportAll = () => {
  const access_token = localStorage.getItem("access_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [regionOrExtension, setRegionOrExtension] = useState(
    userDetails?.regionName
  );
  const [salesType, setSalesType] = useState([]);
  const [reportsType, setReportsType] = useState([]);
  const [regionsOrExtensions, setRegionsOrExtensions] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [params, setParams] = useState({
    extension: userDetails?.storeId,
    fromDate: "2024-10-01",
    toDate: "2024-12-10",
    itemNo: "",
    fieldAssistant: "",
    reportType: 2,
    roleId: 52,
    saleType: 1,
  });
  const [salesAllReport, setSalesAllReport] = useState([]);
  const fetchSalesType = async () => {
    const res = await Route(
      "GET",
      `/Common/fetchAllReportType`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setSalesType(res?.data);
    }
  };
  const fetchReportsType = async () => {
    const res = await Route("GET", `/Common/fetchReportType`, null, null, null);
    if (res?.status === 200) {
      setReportsType(res?.data);
    }
  };
  const fetchRegionsOrExtensions = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchAllRegionOrExtension`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setRegionsOrExtensions(res?.data);
    }
  };
  const fetchItemsList = async () => {
    const res = await Route("GET", `/Common/FetchAllItems`, null, null, null);
    if (res?.status === 200) {
      setItemsList(res?.data);
    }
  };
  const fetchSalesAllReport = async () => {
    const res = await Route(
      "GET",
      `/Report/getSalesAllReport?extension=${params?.extension}&fromDate=${params?.fromDate}&toDate=${params?.toDate}&itemNo=${params?.itemNo}&fieldAssistant=${params?.fieldAssistant}&reportType=${params?.reportType}&roleId=${params?.roleId}&saleType=${params?.saleType}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      // setSalesAllReport(res?.data);
    }
  };
  useEffect(() => {
    fetchSalesType();
    fetchReportsType();
    fetchRegionsOrExtensions();
    fetchItemsList();
  }, []);
  useEffect(() => {
    fetchSalesAllReport();
  }, [params]);
  const salesTypeHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      saleType: parseInt(e?.target?.value),
    }));
  };
  const reportsTypeHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      reportType: parseInt(e?.target?.value),
    }));
  };
  const fromDateHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      fromDate: dateFormatterTwo(e.$d),
    }));
  };
  const toDateHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      toDate: dateFormatterTwo(e.$d),
    }));
  };
  const regionOrExtensionHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      extension: e?.target?.value,
    }));
  };
  const itemHandle = (e) => {
    console.log(e?.target?.value);
  };

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
                <Grid item container spacing={1} alignItems="center">
                  <Grid item xs={2}>
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{ background: "#fff" }}
                    >
                      <InputLabel id="report-type-select-label">
                        Report Type
                      </InputLabel>
                      <Select
                        labelId="report-type-select-label"
                        id="report-type-select"
                        value={params?.saleType}
                        label="Report Type"
                        onChange={salesTypeHandle}
                      >
                        {salesType?.map((item) => (
                          <MenuItem value={item?.id} key={item?.id}>
                            {item?.type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{ background: "#fff" }}
                    >
                      <InputLabel id="sales-type-select-label">
                        Sales Type
                      </InputLabel>
                      <Select
                        labelId="sales-type-select-label"
                        id="sales-type-select"
                        value={params?.reportType}
                        label="Sales Type"
                        onChange={reportsTypeHandle}
                      >
                        {reportsType?.map((item) => (
                          <MenuItem value={item?.id}>{item?.type}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth sx={{ background: "#fff" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="From Date"
                          slotProps={{
                            textField: {
                              size: "small",
                            },
                          }}
                          onChange={fromDateHandle}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth sx={{ background: "#fff" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="To Date"
                          slotProps={{
                            textField: {
                              size: "small",
                            },
                          }}
                          onChange={toDateHandle}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <Autocomplete
                      disablePortal
                      onChange={regionOrExtensionHandle}
                      value={params?.extension}
                      options={regionsOrExtensions?.map((item) => ({
                        id: item?.id,
                        label: item?.id,
                      }))}
                      size="small"
                      sx={{
                        background: "#fff"
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Region/Extension" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{ background: "#fff" }}
                    >
                      <InputLabel id="field-assistant-select-label">
                        Field Assistant
                      </InputLabel>
                      <Select
                        labelId="field-assistant-select-label"
                        id="field-assistant-select"
                        // value={age}
                        label="Field Assistant"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>ALL</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      disablePortal
                      onChange={regionOrExtensionHandle}
                      value={params?.itemNo}
                      options={itemsList?.map((item) => ({
                        id: item?.item_number,
                        label: item?.description,
                      }))}
                      size="small"
                      sx={{
                        background: "#fff"
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Item" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={0.5}>
                    <Button variant="contained">Search</Button>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <PrintSection />
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  xs={12}
                  ref={contentRef}
                >
                  <CustomDataTable
                    rows={salesAllReport}
                    cols={sales_report_all_columns}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SalesReportAll;
