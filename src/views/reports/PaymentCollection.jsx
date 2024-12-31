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
import { RenderStatus } from "../../ui/index";
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

  const payment_collection_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.4 },
    { field: "payment_amount", headerName: "Payment Amount", flex: 1.1 },
    {
      field: "recharge_type",
      headerName: "Payment Type",
      flex: 0.9,
    },
    { field: "payment_ref_number", headerName: "Reference Number", flex: 1.2 },
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
    {
      field: "old_print",
      headerName: "Old Print",
      flex: 0.9,
      renderCell: (params) => (
        <>
          <IconButton aria-label="old_print" size="small" color="primary">
            <PrintIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.9,
      renderCell: (params) => (
        <>
          <IconButton aria-label="print" size="small" color="primary">
            <PrintIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
  const fetchPaymentCollection = async () => {
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
        }))
      );
      setPrintData(
        res?.data?.map((item, index) => ({
          sl: index + 1,
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
    }
  };
  const regionOrExtensionHandle = (e) => {
    setRegionOrExtension(e?.target?.value);
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
                        <TextField
                          {...params}
                          label="Region/Extension"
                          size="small"
                        />
                      )}
                      style={{ background: "#fff" }}
                      disabled={
                        userDetails?.roleName === "Administrator" ? false : true
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth sx={{ background: "#fff" }}>
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
                    <FormControl fullWidth sx={{ background: "#fff" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="To Date"
                          value={dayjs(toDate)}
                          onChange={toDateHandle}
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
    </>
  );
};

export default PaymentCollection;
