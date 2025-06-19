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
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { RenderStatus } from "../../ui/index";
import { CustomDataTable, PrintSection } from "../../component/common/index";
import { dateFormatterTwo } from "../../util/CommonUtil";
import Route from "../../routes/Route";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import { LoaderDialog, Notification } from "../../ui/index";

const TransferOrderReport = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [transferOrders, setTransferOrders] = useState([]);
  const [regionsOrExtensions, setRegionsOrExtensions] = useState([]);
  const [toStore, setToStore] = useState([]);
  const [params, setParams] = useState({
    transferType: "Store to Store",
    fromDate: dateFormatterTwo(new Date()),
    toDate: dateFormatterTwo(new Date()),
    fromStore: "ALL",
    fromStoreId: "ALL",
    toStore: "",
    itemDesc: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const transfer_order_report_columns = [
    {
      field: "sl",
      headerName: "Sl.No",
      width: 40,
    },
    {
      field: "transferType",
      headerName: "Transfer Type",
      width: 100,
    },
    {
      field: "transferDate",
      headerName: "Transfer Date",
      width: 110,
    },
    {
      field: "transferOrderNo",
      headerName: "Transfer Order Number",
      width: 180,
    },
    {
      field: "transferFrom",
      headerName: "From Store Name",
      width: 250,
    },
    {
      field: "transferFromLocator",
      headerName: "Transfer From Locator",
      width: 200,
    },
    {
      field: "transferTo",
      headerName: "To Store Name",
      width: 260,
    },
    {
      field: "transferToLocator",
      headerName: "Transfer To Locator",
      width: 200,
    },
    {
      field: "itemNumber",
      headerName: "Item Number",
      width: 180,
    },
    {
      field: "itemDescription",
      headerName: "Item Description",
      width: 450,
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
      width: 100,
    },
    {
      field: "receivedQnty",
      headerName: "Received Qty",
      width: 100,
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
  const fetchTransferOrdersReport = async () => {
    setIsLoading(true);
    try {
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
        setPrintData(
          res?.data?.map((item, index) => ({
            sl: index + 1,
            "Transfer Type": item?.transferType,
            "Transfer Date": item?.transferDate,
            "Transfer Order No": item?.transferOrderNo,
            "From Store Name": item?.transferFrom,
            "To Store Name": item?.transferTo,
            "Item Number": item?.itemNumber,
            "Item Description": item?.itemDescription,
            UOM: item?.uom,
            "Serial Number": item?.itemSerialNo,
            "Quantity Transferred": parseInt(item?.qnty),
            "Quantity Received": parseInt(item?.receivedQnty),
            "Received Date": item?.receivedDate,
            Status: item?.txnStatus,
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
    fetchTransferOrdersReport();
  }, []);
  const fetchStoreHandle = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchStore`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setRegionsOrExtensions(res?.data);
    }
  };
  useEffect(() => {
    fetchStoreHandle();
  }, []);
  const fetchToStoreHandle = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchTransferToStore?StoreID=${params?.fromStoreId}&storeName=${params?.fromStore}&transferType=With In Store`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setToStore(res?.data);
    }
  };
  useEffect(() => {
    fetchToStoreHandle();
  }, [params?.fromStore, params?.transferType]);
  const transferTypeHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      transferType: e?.target?.value,
      fromStore: userDetails?.regionName,
      fromStoreId: userDetails?.storeId,
      toStore: "",
      itemDesc: "",
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
  const fromStoreHandle = (e, value) => {
    setParams((prev) => ({
      ...prev,
      fromStore: value?.id,
      fromStoreId: parseInt(value?.storeId),
    }));
  };
  const toStoreHandle = (e, value) => {
    setParams((prev) => ({
      ...prev,
      toStore: value?.id,
    }));
  };
  const itemDescriptionHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      itemDesc: e?.target?.value,
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
          "Transfer Type",
          "Transfer Date",
          "Transfer Order No",
          "From Store Name",
          "To Store Name",
          "Item Number",
          "Item Description",
          "UOM",
          "Serial Number",
          "Quantity Transferred",
          "Quantity Received",
          "Received Date",
          "Status",
        ],
      ],
      body: printData?.map((item) => [
        item?.sl,
        item?.["Transfer Type"],
        item?.["Transfer Date"],
        item?.["Transfer Order No"],
        item?.["From Store Name"],
        item?.["To Store Name"],
        item?.["Item Number"],
        item?.["Item Description"],
        item?.["UOM"],
        item?.["Serial Number"],
        item?.["Quantity Transferred"],
        item?.["Quantity Received"],
        item?.["Received Date"],
        item?.["Status"],
      ]),
      styles: {
        fontSize: 6,
        cellPadding: 5,
        overflow: "linebreak",
      },
      // margin: { top: 35 },
      didDrawPage: (data) => {
        doc.setFontSize(12);
        doc.text("Transfer_Order_Report", data.settings.margin.left, 30);
      },
    });
    doc.save("Transfer_Order_Report");
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
                  <Grid item xs={12} md={2}>
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
                        <MenuItem value="ALL">ALL</MenuItem>
                        <MenuItem value="Store to Store">
                          Store to Store
                        </MenuItem>
                        <MenuItem value="With In Store">With In Store</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <FormControl>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="From Date"
                          value={dayjs(params?.fromDate)}
                          onChange={fromDateHandle}
                          format="DD/MM/YYYY"
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
                          format="DD/MM/YYYY"
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Autocomplete
                      disablePortal
                      options={[
                        { label: "ALL", id: "ALL" },
                        ...(regionsOrExtensions?.map((item) => ({
                          label: item?.name,
                          id: item?.name,
                          storeId: item?.id,
                        })) || []),
                      ]}
                      value={params?.fromStore}
                      onChange={fromStoreHandle}
                      renderInput={(params) => (
                        <TextField {...params} label="From Store" />
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
                  <Grid item xs={12} md={3}>
                    <Autocomplete
                      disablePortal
                      options={
                        params?.transferType === "Store to Store"
                          ? [
                              { label: "ALL", id: "ALL" },
                              ...(regionsOrExtensions?.map((item) => ({
                                label: item?.name,
                                id: item?.name,
                                storeId: item?.id,
                              })) || []),
                            ]
                          : [
                              { label: "ALL", id: "ALL" },
                              ...(toStore?.map((item) => ({
                                label: item?.toStoreName,
                                id: item?.toStoreName,
                              })) || []),
                            ]
                      }
                      value={params?.toStore}
                      onChange={toStoreHandle}
                      renderInput={(params) => (
                        <TextField {...params} label="To Store" />
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
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Item Description"
                      name="item_description"
                      required
                      onChange={itemDescriptionHandle}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      variant="contained"
                      onClick={fetchTransferOrdersReport}
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
                      exportToExcel(printData, "Transfer Order Report")
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
                    rows={transferOrders}
                    cols={transfer_order_report_columns}
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

export default TransferOrderReport;
