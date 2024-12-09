import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Button,
  IconButton,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { RenderStatus } from "../../ui/index";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import BuildIcon from "@mui/icons-material/Build";
import { CustomDataTable, PrintSection } from "../../component/common/index";
import Route from "../../routes/Route";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";

const SamsungWarrantyReport = () => {
  const access_token = localStorage.getItem("access_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [regionOrExtension, setRegionOrExtension] = useState(
    userDetails?.storeId
  );
  const [regionsOrExtensions, setRegionsOrExtensions] = useState([]);
  const [reports, setReports] = useState([]);
  const samsung_warranty_columns = [
    { field: "sl", headerName: "Sl. No", width: 20 },
    { field: "pos_no", headerName: "POS No", width: 140 },
    { field: "posting_date", headerName: "Posting Date", width: 90 },
    {
      field: "customer_name",
      headerName: "Customer Name",
      width: 150,
    },
    { field: "store_name", headerName: "Store Name", width: 170 },
    { field: "mobile_number", headerName: "Mobile Number", width: 100 },
    {
      field: "region_name",
      headerName: "Region Name",
      width: 90,
    },
    {
      field: "bank_account_number",
      headerName: "Bank Account",
      width: 100,
    },
    { field: "payment_type", headerName: "Payment Type", width: 90 },
    { field: "cheque_number", headerName: "Cheque Number", width: 100 },
    { field: "cheque_date", headerName: "Cheque Date", width: 90 },
    { field: "payment_amount", headerName: "Payment Amount", width: 120 },
    { field: "serial_number", headerName: "Serial Number", width: 130 },
    { field: "created_by", headerName: "Created User", width: 100 },
    { field: "warranty", headerName: "Warranty", width: 80 },
    { field: "battery_warranty", headerName: "Battery Warranty", width: 120 },
    {
      field: "replace",
      headerName: "Replace",
      width: 60,
      renderCell: (params) => (
        <>
          <IconButton aria-label="view" color="primary">
            <FindReplaceIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
    {
      field: "repair",
      headerName: "Repair",
      width: 70,
      renderCell: (params) => (
        <>
          <IconButton aria-label="view" color="primary">
            <BuildIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
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
  const fetchSamsungWarrantyReport = async () => {
    const res = await Route(
      "GET",
      `/Report/samsungWarranty?extension=${regionOrExtension}&fromDate=2024-08-01&toDate=2024-12-31&posNo&serialNo`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setReports(
        res?.data?.map((item, index) => ({
          id: index,
          sl: index + 1,
          pos_no: item?.pos_No,
          posting_date: item?.posting_date,
          customer_name: item?.customer_NAME,
          store_name: item?.store_name,
          mobile_number: item?.mobile_NUMBER,
          region_name: item?.region_NAME,
          bank_account_number: item?.bank_ACCOUNT_NUMBER,
          payment_type: item?.payment_TYPE,
          cheque_number: item?.cheque_NUMBER,
          cheque_date: item?.cheque_DATE,
          payment_amount: item?.payment_AMOUNT,
          serial_number: item?.serial_NUMBER,
          created_by: item?.created_by,
          warranty: item?.warranty,
          battery_warranty: item?.battery_Warranty,
        }))
      );
      setPrintData(
        res?.data?.map((item, index) => ({
          sl: index + 1,
          "POS No": item?.pos_No,
          "Posting Date": item?.posting_date,
          "Customer Name": item?.customer_NAME,
          "Store Name": item?.store_name,
          "Mobile Number": item?.mobile_NUMBER,
          "Region Name": item?.region_NAME,
          "Bank Account Number": item?.bank_ACCOUNT_NUMBER,
          "Payment Type": item?.payment_TYPE,
          "Cheque Number": item?.cheque_NUMBER,
          "Cheque Date": item?.cheque_DATE,
          "Payment Amount": item?.payment_AMOUNT,
          "Serial Number": item?.serial_NUMBER,
          "Created By": item?.created_by,
          Warranty: item?.warranty,
          "Battery Warranty": item?.battery_Warranty,
        }))
      );
    }
  };
  useEffect(() => {
    fetchRegionsOrExtensions();
    fetchSamsungWarrantyReport();
  }, []);
  const regionOrExtensionHandle = (e) => {
    console.log(e?.target?.value);
    setRegionOrExtension(e?.target?.value);
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
          "POS No",
          "Posting Date",
          "Customer Name",
          "Store Name",
          "Mobile Number",
          "Region Name",
          "Bank Account Number",
          "Payment Type",
          "Cheque Number",
          "Cheque Date",
          "Payment Amount",
          "Serial Number",
          "Created By",
          "Warranty",
          "Battery Warranty",
        ],
      ],
      body: printData?.map((item) => [
        item?.sl,
        item?.["POS No"],
        item?.["Posting Date"],
        item?.["Customer Name"],
        item?.["Store Name"],
        item?.["Mobile Number"],
        item?.["Region Name"],
        item?.["Bank Account Number"],
        item?.["Payment Type"],
        item?.["Cheque Number"],
        item?.["Cheque Date"],
        item?.["Payment Amount"],
        item?.["Serial Number"],
        item?.["Created By"],
        item?.Warranty,
        item?.["Battery Warranty"],
      ]),
      styles: {
        fontSize: 6,
        cellPadding: 5,
        overflow: "linebreak",
      },
      didDrawPage: (data) => {
        doc.setFontSize(12);
        doc.text("Samsung Warranty Report", data.settings.margin.left, 30);
      },
    });
    doc.save("Samsung Warranty Report");
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
                    <FormControl
                      fullWidth
                      style={{ background: "#fff" }}
                      size="small"
                    >
                      <InputLabel id="region-or-extension-select-label">
                        Region/Extension
                      </InputLabel>
                      <Select
                        labelId="region-or-extension--select-label"
                        id="region-or-extension--select"
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
                    <Button variant="contained">Search</Button>
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
                      exportToExcel(printData, "Samsung_Warranty")
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
                    rows={reports}
                    cols={samsung_warranty_columns}
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

export default SamsungWarrantyReport;
