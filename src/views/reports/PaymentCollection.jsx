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
import { CustomDataTable, PrintSection } from "../../component/common/index";
import Route from "../../routes/Route";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";

const PaymentCollection = () => {
  const access_token = localStorage.getItem("access_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [rechargeCollection, setRechargeCollection] = useState([]);
  const [regionOrExtension, setRegionOrExtension] = useState(
    userDetails?.storeId
  );
  const [regionsOrExtensions, setRegionsOrExtensions] = useState([]);

  const recharge_collection_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.4 },
    { field: "payment_amount", headerName: "Payment Amount", flex: 1.1 },
    {
      field: "recharge_type",
      headerName: "Payment Type",
      width: 90,
    },
    { field: "payment_ref_number", headerName: "Reference Number", flex: 1.2 },
    {
      field: "result_code",
      headerName: "Status",
      flex: 1.1,
      renderCell: (params) => (
        <RenderStatus status={params?.row?.result_code} />
      ),
    },
    { field: "created_date", headerName: "Created Date", flex: 0.9 },
    { field: "created_by", headerName: "Created User", flex: 1.5 },
    {
      field: "old_print",
      headerName: "Old Print",
      flex: 0.9,
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
      flex: 0.9,
      renderCell: (params) => (
        <>
          <IconButton aria-label="view" size="small" color="primary">
            <PrintIcon fontSize="inherit" />
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
  const fetchRechargeCollection = async () => {
    const res = await Route(
      "GET",
      `/Report/rechargeCollection?extension=${regionOrExtension}&fromDate=2024-08-01&toDate=2024-12-31`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setRechargeCollection(
        res?.data?.map((item, index) => ({
          id: index,
          sl: index + 1,
          created_date: item?.created_date,
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
          "Payment Amount": item?.payment_amount,
          "Recharge Type": item?.recharge_type,
          "Ref No.": item?.payment_ref_number,
          Status: item?.result_code,
          "Created Date": item?.created_date,
          "Created By": item?.created_by,
          Cheque: item?.cheque,
          "Cheque Date": item?.cheque_date,
          "Bank Name": item?.bank_name,
        }))
      );
    }
  };
  const regionOrExtensionHandle = (e) => {
    console.log(e?.target?.value);
    setRegionOrExtension(e?.target?.value);
  };
  useEffect(() => {
    fetchRegionsOrExtensions();
    fetchRechargeCollection();
  }, []);
  const exportJsonToPdfHandle = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "sl",
          "Payment Amount",
          "Recharge Type",
          "Ref No.",
          "Status",
          "Created Date",
          "Created By",
          "Cheque",
          "Cheque Date",
          "Bank Name",
        ],
      ],
      body: printData?.map((item) => [
        item?.sl,
        item?.["Payment Amount"],
        item?.["Recharge Type"],
        item?.["Ref No."],
        item?.Status,
        item?.["Created Date"],
        item?.["Created By"],
        item?.Cheque,
        item?.["Cheque Date"],
        item?.["Bank Name"],
      ]),
      styles: {
        fontSize: 8,
      },
      margin: { top: 35 }, 
      didDrawPage: (data) => {
        doc.setFontSize(12);
        doc.text("Payment Collection", data.settings.margin.left, 30);
      },
    });
    doc.save("Payment_Collection");
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
                      exportToExcel(printData, "Payment_Collection")
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

export default PaymentCollection;
