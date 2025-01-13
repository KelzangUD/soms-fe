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
import { useCommon } from "../../contexts/CommonContext";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import { dateFormatterTwo } from "../../util/CommonUtil";

const RechargeCollection = () => {
  const { regionsOrExtensions } = useCommon();
  const access_token = localStorage.getItem("access_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [regionOrExtension, setRegionOrExtension] = useState(
    userDetails?.regionName
  );
  const [fromDate, setFromDate] = useState(dateFormatterTwo(new Date()));
  const [toDate, setToDate] = useState(dateFormatterTwo(new Date()));
  const [rechargeCollection, setRechargeCollection] = useState([]);
  const recharge_collection_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.4 },
    {
      field: "payment_amount",
      headerName: "Recharge Amount",
      flex: 1.5,
    },
    {
      field: "recharge_type",
      headerName: "Payment Type",
      flex: 1.1,
    },
    { field: "payment_ref_number", headerName: "Reference Number", flex: 1.5 },
    { field: "created_date", headerName: "Created Date", flex: 1 },
    { field: "created_by", headerName: "Created User", flex: 1.8 },
    {
      field: "result_code",
      headerName: "Status",
      flex: 1.2,
      renderCell: (params) => (
        <RenderStatus status={params?.row?.result_code} />
      ),
    },
    {
      field: "old_print",
      headerName: "Old Print",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton aria-label="view" size="small" color="primary">
            <PrintIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton aria-label="view" size="small" color="primary">
            <PrintIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
  const fetchRechargeCollection = async () => {
    const res = await Route(
      "GET",
      `/Report/rechargeCollection?extension=${regionOrExtension}&fromDate=${fromDate}&toDate=${toDate}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setRechargeCollection(
        res?.data?.map((item, index) => ({
          id: index,
          sl: index + 1,
          type: item?.type,
          created_date: item?.created_date,
          message_seq: item?.message_seq,
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
          "Recharge Amount": item?.payment_amount,
          "Payment Type": item?.recharge_type,
          "Ref No.": item?.payment_ref_number,
          Status: item?.result_code,
          "Creation Date": item?.created_date,
          "Created User": item?.created_by,
        }))
      );
    }
  };
  useEffect(() => {
    fetchRechargeCollection();
  }, []);
  const regionOrExtensionHandle = (e, value) => {
    setRegionOrExtension(value?.id);
  };
  const fromDateHandle = (e) => {
    setFromDate(dateFormatterTwo(e?.$d));
  };
  const toDateHandle = (e) => {
    setToDate(dateFormatterTwo(e?.$d));
  };
  const exportJsonToPdfHandle = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "sl",
          "Recharge Amount",
          "Payment Type",
          "Ref No.",
          "Status",
          "Creation Date",
          "Created User",
        ],
      ],
      body: printData?.map((item) => [
        item?.sl,
        item?.["Recharge Amount"],
        item?.["Payment Type"],
        item?.["Ref No."],
        item?.Status,
        item?.["Creation Date"],
        item?.["Created User"],
      ]),
      didDrawPage: (data) => {
        doc.setFontSize(12);
        doc.text("Recharge Collection", data.settings.margin.left, 30);
      },
    });
    doc.save("Recharge_Collection");
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
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={fetchRechargeCollection}
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
                    rows={rechargeCollection}
                    cols={recharge_collection_columns}
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

export default RechargeCollection;
