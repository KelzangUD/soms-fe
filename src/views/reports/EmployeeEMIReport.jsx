import React, { useState, useEffect, useRef } from "react";
import {
  Autocomplete,
  Box,
  Grid,
  Button,
  IconButton,
  FormControl,
  TextField,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { RenderStatus, LoaderDialog, Notification } from "../../ui/index";
import { CustomDataTable, PrintSection } from "../../component/common/index";
import Route from "../../routes/Route";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import { dateFormatterTwo } from "../../util/CommonUtil";
import { useCommon } from "../../contexts/CommonContext";

const EmployeeEMIReport = () => {
  const { regionsOrExtensions, isMdUp } = useCommon();
  const access_token = localStorage.getItem("access_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [regionOrExtension, setRegionOrExtension] = useState(
    userDetails?.regionName
  );
  const [fromDate, setFromDate] = useState(dateFormatterTwo(new Date()));
  const [toDate, setToDate] = useState(dateFormatterTwo(new Date()));
  const [employeeEMIReport, setEmployeeEMIReport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const employee_EMI_report_columns = [
    {
      field: "sl",
      headerName: "Sl.No",
      flex: isMdUp ? 0.4 : undefined,
      width: isMdUp ? undefined : 80,
    },
    {
      field: "description",
      headerName: "Description",
      flex: isMdUp ? 3.0 : undefined,
      width: isMdUp ? undefined : 350,
    },
    {
      field: "mrp",
      headerName: "MRP (Nu)",
      flex: isMdUp ? 1 : undefined,
      width: isMdUp ? undefined : 100,
    },
    {
      field: "quantity",
      headerName: "Qty",
      flex: isMdUp ? 0.7 : undefined,
      width: isMdUp ? undefined : 70,
    },
    {
      field: "serial_number",
      headerName: "IMEI Number",
      flex: isMdUp ? 1.8 : undefined,
      width: isMdUp ? undefined : 150,
    },
    {
      field: "pos_no",
      headerName: "POS No",
      flex: isMdUp ? 1.8 : undefined,
      width: isMdUp ? undefined : 150,
    },
    {
      field: "issue_date",
      headerName: "Issued Date",
      flex: isMdUp ? 1 : undefined,
      width: isMdUp ? undefined : 120,
    },
    {
      field: "staff_name",
      headerName: "Name",
      flex: isMdUp ? 1.6 : undefined,
      width: isMdUp ? undefined : 180,
    },
    {
      field: "employee_number",
      headerName: "Employee No",
      flex: isMdUp ? 1 : undefined,
      width: isMdUp ? undefined : 120,
    },
  ];

  const fetchEmployeeEMIReport = async () => {
    setIsLoading(true);
    try {
      const res = await Route(
        "GET",
        `/Report/getEmployeeEMIReport?fromDate=${fromDate}&toDate=${toDate}&extension=${regionOrExtension}`,
        access_token,
        null,
        null
      );
      if (res?.status === 200) {
        setEmployeeEMIReport(
          res?.data?.map((item, index) => ({
            id: index,
            sl: index + 1,
            mrp: Number(item?.mrp),
            ...item,
          }))
        );
        setPrintData(
          res?.data?.map((item, index) => ({
            sl: index + 1,
            Description: item?.description,
            MRP: item?.mrp,
            Qty: item?.quantity,
            "Serial Number": item?.serial_number,
            "POS No.": item?.pos_no,
            "Issued Date": item?.issue_date,
            "Staff Name": item?.staff_name,
            "Employee No.": item?.employee_number,
          }))
        );
      }
    } catch (err) {
      setNotificationMessage("Error Fetching Report");
      setSeverity("error");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchEmployeeEMIReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const regionOrExtensionHandle = (e, value) => {
    setRegionOrExtension(value?.id);
  };
  const fromDateHandle = (e) => {
    setFromDate(dateFormatterTwo(e?.$d));
  };
  const toDateHandle = (e) => {
    setToDate(dateFormatterTwo(e?.$d));
  };
  const exportJsonToPdfHandle = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "sl",
          "Description",
          "MRP",
          "Qty",
          "Serial Number",
          "POS No.",
          "Issued Date",
          "Staff Name",
          "Employee No.",
        ],
      ],
      body: printData?.map((item) => [
        item?.sl,
        item?.["Description"],
        item?.["MRP"],
        item?.["Qty"],
        item?.["Serial Number"],
        item?.["POS No."],
        item?.["Issued Date"],
        item?.["Staff Name"],
        item?.["Employee No."],
      ]),
      styles: {
        fontSize: 8,
      },
      margin: { top: 35 },
      didDrawPage: (data) => {
        doc.setFontSize(12);
        doc.text("Employee EMI Report", data.settings.margin.left, 30);
      },
    });
    doc.save("Employee_EMI_Report");
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
                  <Grid item xs={12} md={3}>
                    <Autocomplete
                      disablePortal
                      options={[
                        { label: "ALL", id: "ALL" },
                        ...(regionsOrExtensions?.map((item) => ({
                          label: item?.extensionName,
                          id: item?.id,
                        })) || []),
                      ]}
                      value={regionOrExtension}
                      onChange={regionOrExtensionHandle}
                      renderInput={(params) => (
                        <TextField {...params} label="Region/Extension" />
                      )}
                      disabled={
                        userDetails?.roleName === "Administrator" ||
                        userDetails?.roleName === "General Manager" ||
                        userDetails?.roleName === "Regional Manager" ||
                        userDetails?.roleName === "Regional Accountant"
                          ? false
                          : true
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="From Date"
                          value={dayjs(fromDate)}
                          onChange={fromDateHandle}
                          format="DD/MM/YYYY"
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="To Date"
                          value={dayjs(toDate)}
                          onChange={toDateHandle}
                          format="DD/MM/YYYY"
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={fetchEmployeeEMIReport}
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
                      exportToExcel(printData, "Employee EMI Report")
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
                    rows={employeeEMIReport}
                    cols={employee_EMI_report_columns}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {isLoading && <LoaderDialog open={isLoading} />}
      {showNotification && severity === "error" && (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={notificationMessage}
          severity={severity}
        />
      )}
    </>
  );
};

export default EmployeeEMIReport;
