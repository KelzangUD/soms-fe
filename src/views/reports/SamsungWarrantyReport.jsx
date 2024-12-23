import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Button,
  IconButton,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import BuildIcon from "@mui/icons-material/Build";
import { CustomDataTable, PrintSection } from "../../component/common/index";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Route from "../../routes/Route";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import { useCommon } from "../../contexts/CommonContext";
import { dateFormatterTwo } from "../../util/CommonUtil";

const SamsungWarrantyReport = () => {
  const { regionsOrExtensions } = useCommon();
  const access_token = localStorage.getItem("access_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [reports, setReports] = useState([]);
  const [params, setParams] = useState({
    extension: userDetails?.regionName,
    fromDate: dateFormatterTwo(new Date()),
    toDate: dateFormatterTwo(new Date()),
    posNo: "",
    serialNo: "",
  });
  const samsung_warranty_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.3 },
    { field: "pos_no", headerName: "POS No", flex: 1.4 },
    { field: "posting_date", headerName: "Posting Date", flex: 0.9 },
    {
      field: "customer_name",
      headerName: "Customer Name",
      flex: 1.5,
    },
    { field: "store_name", headerName: "Store Name", flex: 1.7 },
    { field: "mobile_number", headerName: "Mobile Number", flex: 1 },
    {
      field: "region_name",
      headerName: "Region Name",
      flex: 0.9,
    },
    {
      field: "bank_account_number",
      headerName: "Bank Account",
      flex: 1,
    },
    { field: "payment_type", headerName: "Payment Type", flex: 0.9 },
    { field: "cheque_number", headerName: "Cheque Number", flex: 1 },
    { field: "cheque_date", headerName: "Cheque Date", flex: 0.9 },
    { field: "payment_amount", headerName: "Payment Amount", flex: 1.2 },
    { field: "serial_number", headerName: "Serial Number", flex: 1.3 },
    { field: "created_by", headerName: "Created User", flex: 1 },
    { field: "warranty", headerName: "Warranty", flex: 0.8 },
    { field: "battery_warranty", headerName: "Battery Warranty", flex: 1.2 },
    {
      field: "replace",
      headerName: "Replace",
      flex: 0.6,
      renderCell: (params) => (
        <>
          <IconButton aria-label="view" color="primary">
            <FindReplaceIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
    {
      field: "repair",
      headerName: "Repair",
      width: 70,
      renderCell: (params) => (
        <>
          <IconButton aria-label="view" color="primary">
            <BuildIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
  const fetchSamsungWarrantyReport = async () => {
    const res = await Route(
      "GET",
      `/Report/samsungWarranty?extension=${params?.extension}&fromDate=${params?.fromDate}&toDate=${params?.toDate}&posNo=${params?.posNo}&serialNo=${params?.serialNo}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setReports(
        res?.data?.map((item, index) => ({
          id: index,
          sl: index + 1,
          pos_no: item?.pos_No,
          posting_date: item?.posting_date,
          customer_name: item?.customer_NAME,
          store_name: item?.store_name,
          mobile_number: item?.mobile_NUMBER,
          region_name: item?.region_NAME,
          bank_account_number: item?.bank_ACCOUNT_NUMBER,
          payment_type: item?.payment_TYPE,
          cheque_number: item?.cheque_NUMBER,
          cheque_date: item?.cheque_DATE,
          payment_amount: item?.payment_AMOUNT,
          serial_number: item?.serial_NUMBER,
          created_by: item?.created_by,
          warranty: item?.warranty,
          battery_warranty: item?.battery_Warranty,
        }))
      );
      setPrintData(
        res?.data?.map((item, index) => ({
          sl: index + 1,
          "POS No": item?.pos_No,
          "Posting Date": item?.posting_date,
          "Customer Name": item?.customer_NAME,
          "Store Name": item?.store_name,
          "Mobile Number": item?.mobile_NUMBER,
          "Region Name": item?.region_NAME,
          "Bank Account Number": item?.bank_ACCOUNT_NUMBER,
          "Payment Type": item?.payment_TYPE,
          "Cheque Number": item?.cheque_NUMBER,
          "Cheque Date": item?.cheque_DATE,
          "Payment Amount": item?.payment_AMOUNT,
          "Serial Number": item?.serial_NUMBER,
          "Created By": item?.created_by,
          Warranty: item?.warranty,
          "Battery Warranty": item?.battery_Warranty,
        }))
      );
    }
  };
  useEffect(() => {
    fetchSamsungWarrantyReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const regionOrExtensionHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      extension: e?.target?.value,
    }));
  };
  const fromDateHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      fromDate: dateFormatterTwo(e?.$d),
    }));
  };
  const toDateHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      toDate: dateFormatterTwo(e?.$d),
    }));
  };
  const posNoHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      posNo: e?.target?.value,
    }));
  };
  const serialNoHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      serialNo: e?.target?.value,
    }));
  };
  const exportJsonToPdfHandle = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });
    autoTable(doc, {
      head: [
        [
          "sl",
          "POS No",
          "Posting Date",
          "Customer Name",
          "Store Name",
          "Mobile Number",
          "Region Name",
          "Bank Account Number",
          "Payment Type",
          "Cheque Number",
          "Cheque Date",
          "Payment Amount",
          "Serial Number",
          "Created By",
          "Warranty",
          "Battery Warranty",
        ],
      ],
      body: printData?.map((item) => [
        item?.sl,
        item?.["POS No"],
        item?.["Posting Date"],
        item?.["Customer Name"],
        item?.["Store Name"],
        item?.["Mobile Number"],
        item?.["Region Name"],
        item?.["Bank Account Number"],
        item?.["Payment Type"],
        item?.["Cheque Number"],
        item?.["Cheque Date"],
        item?.["Payment Amount"],
        item?.["Serial Number"],
        item?.["Created By"],
        item?.Warranty,
        item?.["Battery Warranty"],
      ]),
      styles: {
        fontSize: 6,
        cellPadding: 5,
        overflow: "linebreak",
      },
      didDrawPage: (data) => {
        doc.setFontSize(12);
        doc.text("Samsung Warranty Report", data.settings.margin.left, 30);
      },
    });
    doc.save("Samsung Warranty Report");
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
                    <FormControl>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="From Date"
                          value={dayjs(params?.fromDate)}
                          onChange={fromDateHandle}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="To Date"
                          value={dayjs(params?.toDate)}
                          onChange={toDateHandle}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl
                      fullWidth
                      style={{ background: "#fff" }}
                      size="small"
                    >
                      <InputLabel id="region-or-extension-select-label">
                        Region/Extension
                      </InputLabel>
                      <Select
                        labelId="region-or-extension--select-label"
                        id="region-or-extension--select"
                        value={params?.extension}
                        label="Region/Extension"
                        onChange={regionOrExtensionHandle}
                      >
                        {regionsOrExtensions?.map((item) => (
                          <MenuItem value={item?.id} key={item?.id}>
                            {item?.extensionName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label="Pos No"
                      name="pos_no"
                      required
                      value={params?.posNo}
                      onChange={posNoHandle}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label="Serial No"
                      name="serial_no"
                      required
                      value={params?.serialNo}
                      onChange={serialNoHandle}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      variant="contained"
                      onClick={fetchSamsungWarrantyReport}
                      fullWidth
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <PrintSection
                    exportExcel={() =>
                      exportToExcel(printData, "Samsung_Warranty")
                    }
                    exportPdf={exportJsonToPdfHandle}
                    handlePrint={reactToPrintFn}
                  />
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  xs={12}
                  ref={contentRef}
                >
                  <CustomDataTable
                    rows={reports}
                    cols={samsung_warranty_columns}
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

export default SamsungWarrantyReport;
