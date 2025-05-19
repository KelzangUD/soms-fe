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
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CustomDataTable, PrintSection } from "../../component/common/index";
import Route from "../../routes/Route";
import { sales_and_stock_report_columns } from "../../data/static";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import { useCommon } from "../../contexts/CommonContext";
import { dateFormatterTwo } from "../../util/CommonUtil";
import { LoaderDialog, Notification } from "../../ui/index";

const SalesAndStockReport = () => {
  const {
    regionsOrExtensions,
    fetchLocatorsBasedOnExtension,
    locatorsList,
    itemsList,
    isMdUp,
  } = useCommon();
  const access_token = localStorage.getItem("access_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [params, setParams] = useState({
    fromDate: dateFormatterTwo(new Date()),
    toDate: dateFormatterTwo(new Date()),
    store: userDetails?.regionName,
    fieldAssistant: "",
    fieldAssistantLabel: "ALL",
    itemNo: "",
    itemNoLabel: "ALL",
  });
  const [salesAndStocks, setSalesAndStock] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  useEffect(() => {
    fetchLocatorsBasedOnExtension(userDetails?.regionName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails?.regionName]);
  const fetchSalesAndStockReport = async () => {
    setIsLoading(true);
    try {
      const res = await Route(
        "GET",
        `/Report/salesAndStock?extension=${params?.store}&fromDate=${params?.fromDate}&toDate=${params?.toDate}&itemNo=${params?.itemNo}&fieldAssistant=${params?.fieldAssistant}`,
        access_token,
        null,
        null
      );
      if (res?.status === 200) {
        setSalesAndStock(
          res?.data?.map((item, index) => ({
            id: item?.srNo,
            sl: index + 1,
            item_code: item?.item,
            item_details: item?.description,
            unit: item?.uom,
            opening_balance: parseInt(item?.opBal),
            stock_received: parseInt(item?.receiptIN),
            transfer_out: parseInt(item?.issueQty),
            sales_qty: parseInt(item?.saleQty),
            amount: parseInt(item?.amount),
            closing_balance: parseInt(item?.closing),
          }))
        );
        setPrintData(
          res?.data?.map((item, index) => ({
            sl: index + 1,
            "Item Code": item?.item,
            "Item Details": item?.description,
            Unit: item?.uom,
            "Opening Balance": parseInt(item?.opBal),
            "Stock Received": parseInt(item?.receiptIN),
            "Transfer Out": parseInt(item?.issueQty),
            "Sales Qty": parseInt(item?.saleQty),
            Amount: parseInt(item?.amount),
            "Closing Balance": parseInt(item?.closing),
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
    fetchSalesAndStockReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const regionOrExtensionHandle = (e, value) => {
    setParams((prev) => ({
      ...prev,
      store: value?.id,
    }));
  };
  const fieldAssistantHandle = (e, value) => {
    setParams((prev) => ({
      ...prev,
      fieldAssistant: value?.id,
      fieldAssistantLabel: value?.label,
    }));
  };
  const itemNoHandle = (e, value) => {
    setParams((prev) => ({
      ...prev,
      itemNo: value?.id,
      itemNoLabel: value?.label,
    }));
  };
  const exportJsonToPdfHandle = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "sl",
          "Item Code",
          "Item Details",
          "Unit",
          "Opening Balance",
          "Stock Received",
          "Transfer Out",
          "Sales Qty",
          "Amount",
          "Closing Balance",
        ],
      ],
      body: printData?.map((item) => [
        item?.sl,
        item?.["Item Code"],
        item?.["Item Details"],
        item?.Unit,
        item?.["Opening Balance"],
        item?.["Stock Received"],
        item?.["Transfer Out"],
        item?.["Sales Qty"],
        item?.["Amount"],
        item?.["Closing Balance"],
      ]),
      styles: {
        fontSize: 8,
      },
      margin: { top: 35 },
      didDrawPage: (data) => {
        doc.setFontSize(12);
        doc.text("Sales and Stock Report", data.settings.margin.left, 30);
      },
    });
    doc.save("Sales and Stock Report");
  };
  const columns = sales_and_stock_report_columns(isMdUp); 

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container alignItems="center" sx={{ px: 2 }}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ width: "100%" }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item container spacing={1} alignItems="center">
                  <Grid item xs={12} md={2}>
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
                  <Grid item xs={12} md={2}>
                    <FormControl>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="To Date"
                          value={dayjs(params?.toDate)}
                          onChange={toDateHandle}
                          minDate={dayjs(params?.fromDate)}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Autocomplete
                      disablePortal
                      options={[
                        { label: "ALL", id: "" },
                        ...(regionsOrExtensions?.map((item) => ({
                          label: item?.extensionName,
                          id: item?.id,
                        })) || []),
                      ]}
                      value={params?.store}
                      onChange={regionOrExtensionHandle}
                      renderInput={(params) => (
                        <TextField {...params} label="Region/Extension" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Autocomplete
                      disablePortal
                      options={[
                        { label: "ALL", id: "" },
                        ...(locatorsList?.map((item) => ({
                          label: item?.locator,
                          id: item?.locator,
                        })) || []),
                      ]}
                      value={params?.fieldAssistantLabel}
                      onChange={fieldAssistantHandle}
                      renderInput={(params) => (
                        <TextField {...params} label="Field Assistant" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Autocomplete
                      disablePortal
                      options={[
                        { label: "ALL", id: "" },
                        ...(itemsList?.map((item) => ({
                          label: item?.description,
                          id: item?.item_number,
                        })) || []),
                      ]}
                      value={params?.itemNoLabel}
                      onChange={itemNoHandle}
                      renderInput={(params) => (
                        <TextField {...params} label="Item" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      variant="contained"
                      onClick={fetchSalesAndStockReport}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <PrintSection
                    exportExcel={() =>
                      exportToExcel(printData, "Sales_and_Stock_Report")
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
                    rows={salesAndStocks}
                    cols={columns}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {showNotification && severity === "error" && (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={notificationMessage}
          severity={severity}
        />
      )}
      {isLoading && <LoaderDialog open={isLoading} />}
    </>
  );
};

export default SalesAndStockReport;
