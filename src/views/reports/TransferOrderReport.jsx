import React, { useState, useEffect } from "react";
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
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { RenderStatus } from "../../ui/index";
import { CustomDataTable } from "../../component/common/index";
import { dateFormatterTwo } from "../../util/CommonUtil";
import Route from "../../routes/Route";
import { useCommon } from "../../contexts/CommonContext";

const TransferOrderReport = () => {
  const { regionsOrExtensions } = useCommon();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [transferOrders, setTransferOrders] = useState([]);
  const [params, setParams] = useState({
    transferType: "Store to Store",
    fromDate: dateFormatterTwo(new Date()),
    toDate: dateFormatterTwo(new Date()),
    fromStore: userDetails?.regionName,
    toStore: "",
    itemDesc: "",
  });
  const transfer_order_report_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    {
      field: "transferType",
      headerName: "Transfer Type",
      width: 100,
    },
    { field: "transferDate", headerName: "Transfer Date", width: 130 },
    {
      field: "transferOrderNo",
      headerName: "Transfer Order Number",
      width: 150,
    },
    { field: "transferFrom", headerName: "From Store Name", width: 200 },
    { field: "transferTo", headerName: "To Store Name", width: 200 },
    { field: "itemNumber", headerName: "Item Number", width: 180 },
    {
      field: "itemDescription",
      headerName: "Item Descripton",
      width: 250,
    },
    {
      field: "uom",
      headerName: "UOM",
      width: 80,
    },
    {
      field: "itemSerialNo",
      headerName: "Item Serial Number",
      width: 150,
    },
    {
      field: "qnty",
      headerName: "Qty Shifted",
      width: 80,
    },
    {
      field: "receivedQnty",
      headerName: "Received Qty",
      width: 90,
    },
    {
      field: "receivedDate",
      headerName: "Received Date",
      width: 130,
    },
    // {
    //   field: "created_by",
    //   headerName: "Transfer To Locator",
    //   flex: 1.5,
    // },
    {
      field: "txnStatus",
      headerName: "Transaction Status",
      width: 150,
      renderCell: (params) => <RenderStatus status={params?.row?.txnStatus} />,
    },
  ];

  const access_token = localStorage.getItem("access_token");
  const fetchTrasferOrdersReport = async () => {
    const res = await Route(
      "GET",
      `/Report/transferOrderReport?transferType=${params?.transferType}&fromDate=${params?.fromDate}&toDate=${params?.toDate}&fromStore=${params?.fromStore}&toStore=${params?.toStore}&itemDesc=${params?.itemDesc}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setTransferOrders(
        res?.data?.map((item, index) => ({
          ...item,
          id: index,
          sl: index + 1,
        }))
      );
    }
  };
  useEffect(() => {
    fetchTrasferOrdersReport();
  }, []);
  const transferTypeHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      transferType: e?.target?.value,
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
  const fromStoreHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      fromStore: e?.target?.value,
    }));
  };
  const toStoreHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      toStore: e?.target?.value,
    }));
  };
  const itemDesciptionHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      itemDesc: e?.target?.value,
    }));
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
                      <InputLabel id="transfer-type-select-label">
                        Transfer Type
                      </InputLabel>
                      <Select
                        labelId="transfer-type-select-label"
                        id="transfer-type-select"
                        value={params?.transferType}
                        label="Transfer Type"
                        onChange={transferTypeHandle}
                      >
                        <MenuItem value="Store to Store">
                          Store to Store
                        </MenuItem>
                        <MenuItem value="With In Store">With In Store</MenuItem>
                      </Select>
                    </FormControl>
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
                  <Grid item xs={3}>
                    <FormControl>
                      <InputLabel id="from-select-label">From Store</InputLabel>
                      <Select
                        labelId="from-select-label"
                        id="from-select"
                        value={params?.fromStore}
                        label="From Store"
                        onChange={fromStoreHandle}
                      >
                        {regionsOrExtensions?.map((item) => (
                          <MenuItem value={item?.id} key={item?.id}>
                            {item?.id}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl>
                      <InputLabel id="to-select-label">To Store</InputLabel>
                      <Select
                        labelId="to-select-label"
                        id="to-select"
                        value={params?.toStore}
                        label="To Store"
                        onChange={toStoreHandle}
                      >
                        {regionsOrExtensions?.map((item) => (
                          <MenuItem value={item?.id} key={item?.id}>
                            {item?.id}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Item Description"
                      name="item_description"
                      required
                      onChange={itemDesciptionHandle}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={fetchTrasferOrdersReport}
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
                  <IconButton aria-label="pdf" color="error">
                    <PictureAsPdfIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton aria-label="excel" color="success">
                    <FileDownloadIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton aria-label="print" color="primary">
                    <PrintIcon fontSize="inherit" />
                  </IconButton>
                </Grid>
                <Grid item container alignItems="center" xs={12}>
                  <CustomDataTable
                    rows={transferOrders}
                    cols={transfer_order_report_columns}
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

export default TransferOrderReport;
