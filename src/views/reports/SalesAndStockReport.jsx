import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Grid,
  Button,
  InputBase,
  IconButton,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Route from "../../routes/Route";

const SalesAndStockReport = () => {
  const sales_and_stock_report_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "item_code", headerName: "Item Code", width: 200 },
    {
      field: "item_details",
      headerName: "Particulars (Details of Item)",
      width: 300,
    },
    { field: "unit", headerName: "Unit", width: 80 },
    {
      field: "opening_balance",
      headerName: "Opening Balance (Qty)",
      width: 150,
    },
    { field: "stock_received", headerName: "Stock Received (Qty)", width: 150 },
    { field: "transfer_out", headerName: "Transfer Out (Qty)", width: 120 },
    { field: "sales_qty", headerName: "Sales Qty", width: 80 },
    {
      field: "amount",
      headerName: "Amount",
      width: 70,
    },
    {
      field: "closing_balance",
      headerName: "Closing Balance",
      width: 100,
    },
  ];
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const access_token = localStorage.getItem("access_token");
  const [params, setParams] = useState({
    fromDate: "2024-10-01",
    toDate: "2024-11-10",
    store: "",
    fieldAssistant: "",
    itemNo: "",
  });
  const [salesAndStocks, setSalesAndStock] = useState([]);
  const fetchSalesAndStockReport = async () => {
    const res = await Route(
      "GET",
      `/Report/salesAndStock?extension=${userDetails?.regionName}&fromDate=${params?.fromDate}&toDate=${params?.toDate}&itemNo&fieldAssistant`,
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
    }
  };
  useEffect(() => {
    fetchSalesAndStockReport();
  }, []);

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
                <Grid item container>
                  <Paper
                    sx={{
                      p: "2px 0",
                      display: "flex",
                      alignItems: "center",
                      maxWidth: 400,
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search"
                      inputProps={{ "aria-label": "search" }}
                    />
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
                <Grid item container spacing={1} alignItems="center">
                  <Grid item xs={2}>
                    <FormControl fullWidth>
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
                    <FormControl fullWidth>
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
                    <FormControl fullWidth size="small">
                      <InputLabel id="region-or-extension-select-label">
                        Region/Extension
                      </InputLabel>
                      <Select
                        labelId="region-or-extension-select-label"
                        id="region-or-extension-select"
                        // value={age}
                        label="Region/Extension"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>ALL</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth size="small">
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
                  <Grid item xs={2}>
                    <FormControl fullWidth size="small">
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
                  <Grid item xs={2}>
                    <Button variant="contained">Search</Button>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <IconButton aria-label="pdf" color="error">
                    <PictureAsPdfIcon />
                  </IconButton>
                  <IconButton aria-label="excel" color="success">
                    <FileDownloadIcon />
                  </IconButton>
                  <IconButton aria-label="print" color="primary">
                    <PrintIcon />
                  </IconButton>
                </Grid>
                <Grid item container alignItems="center" xs={12}>
                  <DataGrid
                      rows={salesAndStocks}
                      columns={sales_and_stock_report_columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                      sx={{
                        background: "#fff"
                      }}
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
