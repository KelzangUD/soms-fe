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
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LoaderDialog, Notification } from "../../ui/index";
import { CustomDataTable, PrintSection } from "../../component/common/index";
import { dateFormatterTwo } from "../../util/CommonUtil";
import Route from "../../routes/Route";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";

const FailedTransactionReport = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [failedTransaction, setFailedTransaction] = useState([]);
  const [params, setParams] = useState({
    fromDate: dateFormatterTwo(new Date()),
    toDate: dateFormatterTwo(new Date()),
    type: "SO",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const type = [
    {
      value: "SO",
      label: "Sales Order",
    },
    {
      value: "SR",
      label: "Sales Return",
    },
    {
      value: "BR",
      label: "Collection",
    },
    {
      value: "CR",
      label: "Recharge",
    },
  ];
  const updateHandle = (params) => {
    console.log(params?.row);
  };
  const failed_transaction_report_columns = [
    { field: "sl", headerName: "Sl.No", width: 40 },
    {
      field: "invoice_no",
      headerName: "Invoice No",
      width: 200,
    },
    { field: "error_message", headerName: "Error Message", width: 850 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button variant="contained" onClick={() => updateHandle(params)}>
            Update
          </Button>
        </Box>
      ),
    },
  ];

  const access_token = localStorage.getItem("access_token");
  const fetchFailedTransactionReport = async () => {
    setIsLoading(true);
    try {
      const res = await Route(
        "GET",
        `/EBS/Report/fetchPostFailedEBS?fromDate=${params?.fromDate}&toDate=${params?.toDate}&type=${params?.type}`,
        access_token,
        null,
        null
      );
      if (res?.status === 200) {
        setFailedTransaction(
          res?.data?.map((item, index) => ({
            ...item,
            id: index,
            sl: index + 1,
          }))
        );
        setPrintData(
          res?.data?.map((item, index) => ({
            sl: index + 1,
            "Invoice No": item?.invoice_no,
            "Error Message": item?.error_message,
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
    fetchFailedTransactionReport();
  }, []);
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
  const typeHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      type: e?.target?.value,
    }));
  };

  const exportJsonToPdfHandle = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["sl", "Invoice No", "Error Message"]],
      body: printData?.map((item) => [
        item?.sl,
        item?.["Invoice No"],
        item?.["Error Message"],
      ]),
      styles: {
        fontSize: 8,
      },
      margin: { top: 35 },
      didDrawPage: (data) => {
        doc.setFontSize(12);
        doc.text("Failed_Transaction_Report", data.settings.margin.left, 30);
      },
    });
    doc.save("Failed_Transaction_Report");
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
                    <FormControl>
                      <InputLabel id="from-select-label">Type</InputLabel>
                      <Select
                        labelId="from-select-label"
                        id="from-select"
                        value={params?.fromStore}
                        label="Type"
                        onChange={typeHandle}
                      >
                        {type?.map((item) => (
                          <MenuItem value={item?.value} key={item?.value}>
                            {item?.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={fetchFailedTransactionReport}
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
                      exportToExcel(printData, "Failed Transaction Report")
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
                    rows={failedTransaction}
                    cols={failed_transaction_report_columns}
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

export default FailedTransactionReport;
