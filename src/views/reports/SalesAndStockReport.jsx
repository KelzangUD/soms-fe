import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
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

const SalesAndStockReport = () => {
  const { regionsOrExtensions } = useCommon();
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
    itemNo: "",
  });
  const [salesAndStocks, setSalesAndStock] = useState([]);
  const fetchSalesAndStockReport = async () => {
    const res = await Route(
      "GET",
      `/Report/salesAndStock?extension=${params?.store}&fromDate=${params?.fromDate}&toDate=${params?.toDate}&itemNo&fieldAssistant`,
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
          opening_balance: item?.opBal,
          stock_received: item?.receiptIN,
          transfer_out: item?.issueQty,
          sales_qty: item?.saleQty,
          amount: item?.amount,
          closing_balance: item?.closing,
        }))
      );
      setPrintData(
        res?.data?.map((item, index) => ({
          sl: index + 1,
          "Item Code": item?.item,
          "Item Details": item?.description,
          Unit: item?.uom,
          "Opening Balance": item?.opBal,
          "Stock Received": item?.receiptIN,
          "Transfer Out": item?.issueQty,
          "Sales Qty": item?.saleQty,
          Amount: item?.amount,
          "Closing Balance": item?.closing,
        }))
      );
    }
  };
  useEffect(() => {
    fetchSalesAndStockReport();
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
  const regionOrExtensionHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      store: e?.target?.value,
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
                    <FormControl>
                      <InputLabel id="region-or-extension-select-label">
                        Region/Extension
                      </InputLabel>
                      <Select
                        labelId="region-or-extension-select-label"
                        id="region-or-extension-select"
                        value={params?.store}
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
                    <FormControl>
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
                  <Grid item xs={3}>
                    <FormControl>
                      <InputLabel id="item-select-label">Item</InputLabel>
                      <Select
                        labelId="item-select-label"
                        id="item-select"
                        // value={age}
                        label="Item"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>ALL</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={1}>
                    <Button variant="contained">Search</Button>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <PrintSection
                    exportExcel={() =>
                      exportToExcel(printData, "Recharge_Collection")
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
                    cols={sales_and_stock_report_columns}
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

export default SalesAndStockReport;
