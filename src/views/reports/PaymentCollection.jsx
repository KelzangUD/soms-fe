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
import { useCommon } from "../../contexts/CommonContext";
import { dateFormatterTwo } from "../../util/CommonUtil";

const PaymentCollection = () => {
  const { regionsOrExtensions } = useCommon();
  const access_token = localStorage.getItem("access_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [paymentCollection, setPaymentCollection] = useState([]);
  const [regionOrExtension, setRegionOrExtension] = useState(
    userDetails?.regionName
  );
  const [fromDate, setFromDate] = useState(dateFormatterTwo(new Date()));
  const [toDate, setToDate] = useState(dateFormatterTwo(new Date()));
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const printReceiptHandle = async (params) => {
    setIsLoading(true);
    try {
      const res = await Route(
        "GET",
        `/Receipt/fetchPaymentDetails?receiptNo=${params?.row?.message_seq}`,
        null,
        null,
        null
      );
      if (res?.status === 200) {
        const queryParams = new URLSearchParams();
        queryParams.append("advance", res?.data?.advance === null ? 0 : res?.data?.advance);
        queryParams.append("amount", res?.data?.amount);
        queryParams.append("applicationNo", res?.data?.applicationNo);
        queryParams.append("billing", res?.data?.billing);
        queryParams.append("companyName", res?.data?.companyName);
        queryParams.append("createdBy", res?.data?.createdBy);
        queryParams.append("customerName", res?.data?.customerName);
        queryParams.append("customerNo", res?.data?.customerNo);
        queryParams.append("discount", res?.data?.discount === null ? 0 : res?.data?.discount);
        queryParams.append("downPayment", res?.data?.downPayment === null ? 0 : res?.data?.downPayment);
        queryParams.append("grossTotal", res?.data?.grossTotal === null ? 0 : res?.data?.grossTotal);
        queryParams.append("paymentDate", res?.data?.posting_date);
        queryParams.append("phone", res?.data?.phone);
        queryParams.append("receiptType", res?.data?.receiptType);
        queryParams.append("rechargeDate", res?.data?.rechargeDate);
        queryParams.append("tax", res?.data?.tax);
        queryParams.append("totalAmount", res?.data?.totalAmount);
        res?.data?.itemDetails?.forEach((item) =>
          queryParams.append("itemDetails", JSON.stringify(item))
        );
        const queryString = queryParams.toString();
        const newWindow = window.open(
          `/sales-order-receipt?${queryString}`,
          "_blank",
          "noopener,noreferrer"
        );
        if (newWindow) newWindow.opener = null;
      }
    } catch (err) {
      setNotificationMessage("Error Fetching Report");
      setSeverity("error");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };

  const payment_collection_columns = [
    { field: "sl", headerName: "Sl.No", flex: 0.4 },
    { field: "payment_amount", headerName: "Payment Amount", flex: 1.1 },
    {
      field: "recharge_type",
      headerName: "Payment Type",
      flex: 0.9,
    },
    { field: "payment_ref_number", headerName: "Reference Number", flex: 1.5 },
    {
      field: "result_code",
      headerName: "Status",
      flex: 1.1,
      renderCell: (params) => (
        <RenderStatus status={params?.row?.result_code} />
      ),
    },
    { field: "created_date", headerName: "Created Date", flex: 0.9 },
    { field: "created_by", headerName: "Created User", flex: 1.5 },
    // {
    //   field: "old_print",
    //   headerName: "Old Print",
    //   flex: 0.9,
    //   renderCell: (params) => (
    //     <>
    //       <IconButton aria-label="old_print" size="small" color="primary">
    //         <PrintIcon fontSize="inherit" />
    //       </IconButton>
    //     </>
    //   ),
    // },
    {
      field: "action",
      headerName: "Action",
      flex: 0.9,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="print"
            size="small"
            color="primary"
            onClick={() => printReceiptHandle(params)}
          >
            <PrintIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
  const fetchPaymentCollection = async () => {
    setIsLoading(true);
    try {
      const res = await Route(
        "GET",
        `/Report/paymentCollection?extension=${regionOrExtension}&fromDate=${fromDate}&toDate=${toDate}`,
        access_token,
        null,
        null
      );
      if (res?.status === 200) {
        setPaymentCollection(
          res?.data?.map((item, index) => ({
            id: index,
            sl: index + 1,
            created_date: item?.created_date,
            payment_amount: item?.payment_amount,
            result_code: item?.result_code,
            created_by: item?.created_by,
            payment_ref_number: item?.payment_ref_number,
            cheque: item?.cheque,
            cheque_date: item?.cheque_date,
            bank_name: item?.bank_name,
            recharge_type: item?.recharge_type,
            message_seq: item?.message_seq,
          }))
        );
        setPrintData(
          res?.data?.map((item, index) => ({
            sl: index + 1,
            "POS No.": item?.message_seq,
            "Payment Amount": item?.payment_amount,
            "Recharge Type": item?.recharge_type,
            "Ref No.": item?.payment_ref_number,
            Status: item?.result_code,
            "Created Date": item?.created_date,
            "Created By": item?.created_by,
            Cheque: item?.cheque,
            "Cheque Date": item?.cheque_date,
            "Bank Name": item?.bank_name,
          }))
        );
        setIsLoading(false);
      }
    } catch (err) {
      setNotificationMessage("Error Fetching Report");
      setSeverity("error");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };
  const regionOrExtensionHandle = (e, value) => {
    setRegionOrExtension(value?.id);
  };
  const fromDateHandle = (e) => {
    setFromDate(dateFormatterTwo(e?.$d));
  };
  const toDateHandle = (e) => {
    setToDate(dateFormatterTwo(e?.$d));
  };
  useEffect(() => {
    fetchPaymentCollection();
  }, []);
  const exportJsonToPdfHandle = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "sl",
          "POS No",
          "Payment Amount",
          "Recharge Type",
          "Ref No.",
          "Status",
          "Created Date",
          "Created By",
          "Cheque",
          "Cheque Date",
          "Bank Name",
        ],
      ],
      body: printData?.map((item) => [
        item?.sl,
        item?.["Payment Amount"],
        item?.["Recharge Type"],
        item?.["Ref No."],
        item?.Status,
        item?.["Created Date"],
        item?.["Created By"],
        item?.Cheque,
        item?.["Cheque Date"],
        item?.["Bank Name"],
      ]),
      styles: {
        fontSize: 8,
      },
      margin: { top: 35 },
      didDrawPage: (data) => {
        doc.setFontSize(12);
        doc.text("Payment Collection", data.settings.margin.left, 30);
      },
    });
    doc.save("Payment_Collection");
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
                  <Grid item xs={3}>
                    <Autocomplete
                      disablePortal
                      options={regionsOrExtensions?.map((item) => ({
                        label: item?.extensionName,
                        id: item?.id,
                      }))}
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
                  <Grid item xs={3}>
                    <FormControl>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="From Date"
                          value={dayjs(fromDate)}
                          onChange={fromDateHandle}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="To Date"
                          value={dayjs(toDate)}
                          onChange={toDateHandle}
                          minDate={dayjs(fromDate)}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={fetchPaymentCollection}
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
                      exportToExcel(printData, "Payment_Collection")
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
                    rows={paymentCollection}
                    cols={payment_collection_columns}
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

export default PaymentCollection;
