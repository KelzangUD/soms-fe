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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CustomDataTable, PrintSection } from "../../component/common/index";
import Route from "../../routes/Route";
import { sales_and_stock_report_columns } from "../../data/static";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";

const SalesAndStockReport = () => {
  const access_token = localStorage.getItem("access_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [regionOrExtension, setRegionOrExtension] = useState(
    userDetails?.regionName
  );
  const [regionsOrExtensions, setRegionsOrExtensions] = useState([]);
  const [params, setParams] = useState({
    fromDate: "2024-10-01",
    toDate: "2024-12-10",
    store: "",
    fieldAssistant: "",
    itemNo: "",
  });
  const [salesAndStocks, setSalesAndStock] = useState([]);
  const fetchRegionsOrExtensions = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchAllRegionOrExtension`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setRegionsOrExtensions(res?.data);
    }
  };
  const fetchSalesAndStockReport = async () => {
    const res = await Route(
      "GET",
      `/Report/salesAndStock?extension=${regionOrExtension}&fromDate=${params?.fromDate}&toDate=${params?.toDate}&itemNo&fieldAssistant`,
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
          "Amount": item?.amount,
          "Closing Balance": item?.closing,
        }))
      );
    }
  };
  useEffect(() => {
    fetchRegionsOrExtensions();
    fetchSalesAndStockReport();
  }, []);

  const regionOrExtensionHandle = (e) => {
    console.log(e?.target?.value);
    setRegionOrExtension(e?.target?.value);
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
                    <FormControl fullWidth sx={{ background: "#fff" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="From Date"
                          slotProps={{
                            textField: {
                              size: "small",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth sx={{ background: "#fff" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="To Date"
                          slotProps={{
                            textField: {
                              size: "small",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{ background: "#fff" }}
                    >
                      <InputLabel id="region-or-extension-select-label">
                        Region/Extension
                      </InputLabel>
                      <Select
                        labelId="region-or-extension-select-label"
                        id="region-or-extension-select"
                        value={regionOrExtension}
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
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{ background: "#fff" }}
                    >
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
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{ background: "#fff" }}
                    >
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
