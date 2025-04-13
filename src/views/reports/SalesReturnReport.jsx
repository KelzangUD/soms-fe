import React, { useState, useEffect, useRef } from "react";
import {
  Autocomplete,
  Box,
  Grid,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CustomDataTable, PrintSection } from "../../component/common/index";
import Route from "../../routes/Route";
import { dateFormatterTwo } from "../../util/CommonUtil";
import { useCommon } from "../../contexts/CommonContext";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import { LoaderDialog, Notification } from "../../ui/index";

const SalesReturnReport = () => {
  const sales_return_report_columns = [
    { field: "sl", headerName: "Sl.No", width: 40 },
    { field: "sales_Type", headerName: "Sales Type", width: 100 },
    {
      field: "customer_name",
      headerName: "Customer Name",
      width: 250,
    },
    { field: "customer_number", headerName: "Customer Number", width: 200 },
    { field: "salesorderno", headerName: "Sales Order No", width: 150 },
    { field: "invoice_no", headerName: "Return Sales Order No", width: 150 },
    { field: "inventory_item_number", headerName: "Item Code", width: 150 },
    { field: "description", headerName: "Item Description", width: 250 },
    { field: "selling_price", headerName: "Gross Amount", width: 100 },
    { field: "discount_value", headerName: "Discount/Commission", width: 150 },
    { field: "additional_discount", headerName: "Add. Disc", width: 80 },
    {
      field: "line_discount_amount",
      headerName: "Lot of Sale Dis.",
      width: 120,
    },
    { field: "tds_amount", headerName: "TDS", width: 60 },
    { field: "tax_amount", headerName: "Tax Amount", width: 100 },
    { field: "line_item_amount", headerName: "Net Amount", width: 100 },
    { field: "paymentmode", headerName: "Payment Mode", width: 150 },
    { field: "status", headerName: "Remarks", width: 150 },
  ];
  const { locatorsList, itemsList, fetchLocatorsBasedOnExtension } =
    useCommon();

  const access_token = localStorage.getItem("access_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [regionsOrExtensions, setRegionsOrExtensions] = useState([]);
  const [details, setDetails] = useState({
    storeName: userDetails?.regionName,
    store: userDetails?.storeId,
    item: "ALL",
    fromDate: dateFormatterTwo(new Date()),
    toDate: dateFormatterTwo(new Date()),
    fieldAssistant: "",
    fieldAssistantLabel: "ALL",
    itemNo: "",
    itemNoLabel: "ALL",
  });
  const [returnSalesReports, setReturnSalesReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const fetchSalesReturnReports = async () => {
    setIsLoading(true);
    try {
      const res = await Route(
        "GET",
        `/Report/getSalesReturnReport?extension=${details?.store}&fromDate=${details?.fromDate}&toDate=${details?.toDate}&locator=${details?.fieldAssistant}&itemNo=${details?.itemNo}`,
        access_token,
        null,
        null
      );
      if (res?.status === 200) {
        setReturnSalesReports(
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
          "Sales Type": item?.sales_Type,
          "Customer Name": item?.customer_name,
          "Customer Number": item?.customer_number,
          "Sales Order No": item?.salesorderno,
          "Return Sales Order No": item?.invoice_no,
          "Item Code": item?.inventory_item_number,
          "Item Description": item?.description,
          "Gross Amount": item?.selling_price,
          "Discount/Commission": item?.discount_value,
          "Add. Disc": item?.additional_discount,
          "Lot of Sale Dis.": item?.line_discount_amount,
          TDS: item?.tds_amount,
          "Tax Amount": item?.tax_amount,
          "Net Amount": item?.line_item_amount,
          "Payment Mode": item?.paymentmode,
          Remarks: item?.status,
        }))
      );
    } catch (err) {
      setNotificationMessage("Error Fetching Report");
      setSeverity("error");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchRegionsOrExtensions = async () => {
    const res = await Route("GET", `/Common/FetchStore`, null, null, null);
    if (res?.status === 200) {
      setRegionsOrExtensions(res?.data);
    }
  };
  useEffect(() => {
    fetchSalesReturnReports();
    fetchRegionsOrExtensions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fromDateHandle = (e) => {
    setDetails((prev) => ({
      ...prev,
      fromDate: dateFormatterTwo(e?.$d),
    }));
  };
  const toDateHandle = (e) => {
    setDetails((prev) => ({
      ...prev,
      fromDate: dateFormatterTwo(e?.$d),
    }));
  };
  const regionOrExtensionHandle = (e, value) => {
    fetchLocatorsBasedOnExtension(value?.id);
    setDetails((prev) => ({
      ...prev,
      storeName: value?.label,
      store: value?.locationId,
    }));
  };
  const fieldAssistantHandle = (e, value) => {
    setDetails((prev) => ({
      ...prev,
      fieldAssistant: value?.id,
      fieldAssistantLabel: value?.label,
    }));
  };
  const itemNoHandle = (e, value) => {
    setDetails((prev) => ({
      ...prev,
      itemNo: value?.id,
      itemNoLabel: value?.label,
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
          "Sales Type",
          "Customer Name",
          "Customer Number",
          "Sales Order No",
          "Return Sales Order No",
          "Item Code",
          "Item Description",
          "Gross Amount",
          "Discount/Commission",
          "Add. Disc",
          "Lot of Sale Dis.",
          "TDS",
          "Tax Amount",
          "Net Amount",
          "Payment Mode",
          "Remarks",
        ],
      ],
      body: printData?.map((item) => [
        item?.sl,
        item?.["Sales Type"],
        item?.["Customer Name"],
        item?.["Customer Number"],
        item?.["Sales Order No"],
        item?.["Return Sales Order No"],
        item?.["Item Code"],
        item?.["Item Description"],
        item?.["Gross Amount"],
        item?.["Discount/Commission"],
        item?.["Add. Disc"],
        item?.["Lot of Sale Dis."],
        item?.["TDS"],
        item?.["Tax Amount"],
        item?.["Net Amount"],
        item?.["Payment Mode"],
        item?.["Remarks"],
      ]),
      styles: {
        fontSize: 6,
        cellPadding: 5,
        overflow: "linebreak",
      },
      didDrawPage: (data) => {
        doc.setFontSize(12);
        doc.text("Sales Return Report", data.settings.margin.left, 30);
      },
    });
    doc.save("Sales Return Report");
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
                          label="From Date*"
                          value={dayjs(details?.fromDate)}
                          onChange={fromDateHandle}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="To Date*"
                          value={dayjs(details?.toDate)}
                          onChange={toDateHandle}
                          minDate={dayjs(details?.fromDate)}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <Autocomplete
                      disablePortal
                      options={[
                        { label: "ALL", id: "ALL", locationId: "ALL" },
                        ...(regionsOrExtensions?.map((item) => ({
                          label: item?.name,
                          id: item?.id,
                          locationId: parseInt(item?.id),
                        })) || []),
                      ]}
                      value={details?.storeName}
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
                    <Autocomplete
                      disablePortal
                      options={[
                        { label: "ALL", id: "" },
                        ...(locatorsList?.map((item) => ({
                          label: item?.locator,
                          id: item?.locator,
                        })) || []),
                      ]}
                      value={details?.fieldAssistantLabel}
                      onChange={fieldAssistantHandle}
                      renderInput={(params) => (
                        <TextField {...params} label="Field Assistant" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Autocomplete
                      disablePortal
                      options={[
                        { label: "ALL", id: "" },
                        ...(itemsList?.map((item) => ({
                          label: item?.description,
                          id: item?.item_number,
                        })) || []),
                      ]}
                      value={details?.itemNoLabel}
                      onChange={itemNoHandle}
                      renderInput={(params) => (
                        <TextField {...params} label="Item" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      variant="contained"
                      onClick={fetchSalesReturnReports}
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
                      exportToExcel(printData, "Sales_Return_Report")
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
                    rows={returnSalesReports}
                    cols={sales_return_report_columns}
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

export default SalesReturnReport;
