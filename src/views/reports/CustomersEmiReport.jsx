import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Button, FormControl } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LoaderDialog, Notification, RenderStatus } from "../../ui/index";
import { CustomDataTable, PrintSection } from "../../component/common/index";
import Route from "../../routes/Route";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import { dateFormatterTwo } from "../../util/CommonUtil";

const CustomersEMIReport = () => {
  const access_token = localStorage.getItem("access_token");
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [fromDate, setFromDate] = useState(dateFormatterTwo(new Date()));
  const [toDate, setToDate] = useState(dateFormatterTwo(new Date()));
  const [customersEMIReport, setCustomersEMIReport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const customers_EMI_report_columns = [
    {
      field: "sl",
      headerName: "Sl.No",
      width: 50,
    },
    {
      field: "posNo",
      headerName: "Pos No",
      width: 150,
    },
    {
      field: "customerName",
      headerName: "Customer Name (CID)",
      width: 300,
    },
    {
      field: "organizationName",
      headerName: "Organization",
      width: 150,
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
    },
    {
      field: "itemNo",
      headerName: "Item Number",
      width: 120,
    },
    {
      field: "itemDescription",
      headerName: "Description",
      width: 420,
    },
    {
      field: "totalEmiDuration",
      headerName: "EMI Duration",
      width: 100,
    },
    {
      field: "emiStatus",
      headerName: "EMI Status",
      width: 100,
      renderCell: (params) => <RenderStatus status={params?.row?.emiStatus} />,
    },
    {
      field: "emiFromDate",
      headerName: "EMI Start Date",
      width: 110,
    },
    {
      field: "emiToDate",
      headerName: "EMI End Date",
      width: 110,
    },
    {
      field: "grossTotalAmount",
      headerName: "MRP",
      width: 90,
    },
    // {
    //   field: "installmentAmount",
    //   headerName: "Installment/Upfront Amount",
    //   width: 175,
    // },
    {
      field: "installmentAmountPaid",
      headerName: "Installment/Upfront Amount Paid",
      width: 210,
    },
    {
      field: "outstandingBalance",
      headerName: "Outstanding Balance",
      width: 135,
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 110,
      renderCell: (params) => <RenderStatus status={params?.row?.paymentStatus} />,
    },
    {
      field: "payFromDate",
      headerName: "Payment Start On",
      width: 120,
    },
    {
      field: "payToDate",
      headerName: "Payment End On",
      width: 120,
    },
    {
      field: "paymentDate",
      headerName: "Payment Paid On",
      width: 120,
    },
  ];

  const fetchCustomersEMIReport = async () => {
    setIsLoading(true);
    try {
      const res = await Route(
        "GET",
        `/Report/getCustomersEMIReport?fromDate=${fromDate}&toDate=${toDate}`,
        access_token,
        null,
        null
      );
      if (res?.status === 200) {
        setCustomersEMIReport(
          res?.data?.map((item, index) => ({
            id: index,
            sl: index + 1,
            mrp: Number(item?.grossTotalAmount),
            ...item,
          }))
        );
        setPrintData(
          res?.data?.map((item, index) => ({
            sl: index + 1,
            "Pos No": item?.posNo,
            "Customer Name (CID)": item?.customerName,
            Organization: item?.organizationName,
            Address: item?.address,
            "Item Number": item?.itemNo,
            Description: item?.itemDescription,
            "Total EMI Duration": item?.totalEmiDuration,
            "EMI Status": item?.emiStatus,
            "EMI Start Date": item?.emiFromDate,
            "EMI End Date": item?.emiToDate,
            MRP: item?.grossTotalAmount,
            // "Installment/Upfront Amount": item?.installmentAmount,
            "Installment/Upfront Amount Paid": item?.installmentAmountPaid,
            "Outstanding Balance": item?.outstandingBalance,
            "Payment Status": item?.paymentStatus,
            "Payment Start On": item?.payFromDate,
            "Payment End On": item?.payToDate,
            "Payment Paid On": item?.paymentDate,
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
    fetchCustomersEMIReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fromDateHandle = (e) => {
    setFromDate(dateFormatterTwo(e?.$d));
  };
  const toDateHandle = (e) => {
    setToDate(dateFormatterTwo(e?.$d));
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
          "Pos No",
          "Customer Name (CID)",
          "Organization",
          "Address",
          "Item Number",
          "Description",
          "Total EMI Duration",
          "EMI Status",
          "EMI Start Date",
          "EMI End Date",
          "MRP",
          // "Installment/Upfront Amount",
          "Installment/Upfront Amount Paid",
          "Outstanding Balance",
          "Payment Status",
          "Payment Start On",
          "Payment End On",
          "Payment Paid On",
        ],
      ],
      body: printData?.map((item) => [
        item?.sl,
        item?.["Pos No"],
        item?.["Customer Name (CID)"],
        item?.Organization,
        item?.Address,
        item?.["Item Number"],
        item?.Description,
        item?.["Total EMI Duration"],
        item?.["EMI Status"],
        item?.["EMI Start Date"],
        item?.["EMI End Date"],
        item?.MRP,
        // item?.["Installment/Upfront Amount"],
        item?.["Installment/Upfront Amount Paid"],
        item?.["Outstanding Balance"],
        item?.["Payment Status"],
        item?.["Payment Start On"],
        item?.["Payment End On"],
        item?.["Payment Paid On"],
      ]),
      styles: {
        fontSize: 8,
      },
      margin: { top: 35 },
      didDrawPage: (data) => {
        doc.setFontSize(12);
        doc.text("Customers EMI Report", data.settings.margin.left, 30);
      },
    });
    doc.save("Customers_EMI_Report");
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
                      onClick={fetchCustomersEMIReport}
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
                    rows={customersEMIReport}
                    cols={customers_EMI_report_columns}
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

export default CustomersEMIReport;
