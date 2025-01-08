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
import { CustomDataTable, PrintSection } from "../../component/common/index";
import Route from "../../routes/Route";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import { dateFormatterTwo } from "../../util/CommonUtil";
import { useCommon } from "../../contexts/CommonContext";

const PostedSalesInvoice = () => {
  const { regionsOrExtensions } = useCommon();
  const access_token = localStorage.getItem("access_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [params, setParams] = useState({
    extension: userDetails?.regionName,
    fromDate: dateFormatterTwo(new Date()),
    toDate: dateFormatterTwo(new Date()),
    customerName: "",
    posNo: "",
  });
  const [postedSales, setPostedSales] = useState([]);

  const posted_sales_invoice_columns = [
    { field: "sl", headerName: "Sl. No", flex: 40 },
    { field: "pos_no", headerName: "POS No", flex: 150 },
    {
      field: "posting_date",
      headerName: "POS Date",
      flex: 150,
    },
    { field: "customer_name", headerName: "Customer Name", flex: 250 },
    { field: "mobile_number", headerName: "Mobile No", flex: 150 },
    { field: "type", headerName: "Payment Terms", flex: 150 },
    { field: "bank_account_number", headerName: "Bank Name", flex: 150 },
    { field: "cheque_number", headerName: "Cheque No", flex: 150 },
    { field: "paymentDate", headerName: "Cheque Date", flex: 150 },
    { field: "payment_amount", headerName: "Payment Amount (Nu)", flex: 150 },
    { field: "created_by", headerName: "Created User", flex: 150 },
    { field: "invoice_type", headerName: "Invoice Type", flex: 150 },
    {
      field: "action",
      headerName: "Action",
      flex: 150,
      renderCell: (params) => (
        <>
          <IconButton aria-label="view" size="small" color="primary">
            <PrintIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];

  const fetchPostedSalesReport = async () => {
    const res = await Route(
      "GET",
      `/Report/PostedSalesInvoice?extension=${params?.extension}&fromDate=${params?.fromDate}&toDate=${params?.toDate}&customerName=${params?.customerName}&posNo=${params?.posNo}`,
      access_token,
      null,
      null
    );
    console.log(res);
    if (res?.status === 200) {
      setPostedSales(
        res?.data?.map((item, index) => ({
          id: index,
          sl: index + 1,
          ...item,
        }))
      );
    }
    setPrintData(
      res?.data?.map((item, index) => ({
        sl: index + 1,
        "POS No": item?.pos_no,
        "POS Date": item?.paymentDate,
        "Customer Name": item?.customer_name,
        "Mobile No": item?.mobile_number,
        "Payment Terms": item?.type,
        "Bank Name": item?.bank_account_number,
        "Cheque No": item?.cheque_number,
        "Cheque Date": item?.paymentDate,
      }))
    );
  };
  useEffect(() => {
    fetchPostedSalesReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const regionOrExtensionHandle = (e, value) => {
    setParams((prev) => ({
      ...prev,
      extension: value?.id,
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
  const customerNameHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      customerName: e?.target.value,
    }));
  };
  const posNoHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      posNo: e?.target.value,
    }));
  };
  const exportJsonToPdfHandle = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "sl",
          "POS No",
          "POS Date",
          "Customer Name",
          "Mobile No",
          "Payment Terms",
          "Bank Name",
          "Cheque No",
          "Cheque Date",
        ],
      ],
      body: printData?.map((item) => [
        item?.sl,
        item?.["POS No"],
        item?.["POS Date"],
        item?.["Customer Name"],
        item?.["Mobile No"],
        item?.["Payment Terms"],
        item?.["Bank Name"],
        item?.["Cheque No"],
        item?.["Cheque Date"],
      ]),
      styles: {
        fontSize: 8,
      },
      margin: { top: 35 },
      didDrawPage: (data) => {
        doc.setFontSize(12);
        doc.text("Posted Sales Report", data.settings.margin.left, 30);
      },
    });
    doc.save("Posted Sales Report");
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
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={2}>
                    <Autocomplete
                      disablePortal
                      options={regionsOrExtensions?.map((item) => ({
                        label: item?.extensionName,
                        id: item?.id,
                      }))}
                      value={params?.extension}
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
                  <Grid item xs={2}>
                    <TextField
                      label="Customer Name"
                      name="customer_name"
                      onChange={customerNameHandle}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label="POS No."
                      name="pos_no"
                      required
                      onChange={posNoHandle}
                    />
                  </Grid>
                  <Grid item xs={2} alignContent="center">
                    <Button
                      variant="contained"
                      onClick={fetchPostedSalesReport}
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
                      exportToExcel(printData, "Posted_Sales_Report")
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
                    rows={postedSales}
                    cols={posted_sales_invoice_columns}
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

export default PostedSalesInvoice;
