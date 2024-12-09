import React, { useState, useEffect, useRef } from "react";
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
import PrintIcon from "@mui/icons-material/Print";
import { RenderStatus } from "../../ui/index";
import { CustomDataTable, PrintSection } from "../../component/common/index";
import Route from "../../routes/Route";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";

const BankCollection = () => {
  const access_token = localStorage.getItem("access_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [regionOrExtension, setRegionOrExtension] = useState(
    userDetails?.storeId
  );
  const [regionsOrExtensions, setRegionsOrExtensions] = useState([]);
  const [bankCollection, setBankCollection] = useState([]);
  const bank_collection_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.4 },
    { field: "payment_amount", headerName: "Payment Amount", width: 110 },
    {
      field: "type",
      headerName: "Payment Type",
      width: 100,
    },
    { field: "payment_ref_number", headerName: "Reference Number", width: 130 },
    { field: "bank_name", headerName: "Bank Name", width: 150 },
    { field: "cheque", headerName: "Cheque No", width: 80 },
    { field: "cheque_date", headerName: "Cheque Date", width: 90 },
    { field: "created_date", headerName: "Created Date", width: 90 },
    { field: "created_by", headerName: "Created User", width: 160 },
    {
      field: "result_code",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <RenderStatus status={params?.row?.result_code} />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 60,
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
  const fetchBankCollection = async () => {
    const res = await Route(
      "GET",
      `/Report/bankCollection?extension=${regionOrExtension}&fromDate=2024-08-01&toDate=2024-12-31`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setBankCollection(
        res?.data?.map((item, index) => ({
          id: index,
          sl: index + 1,
          payment_amount: item?.payment_amount,
          type: item?.type,
          result_code: item?.result_code,
          created_date: item?.created_date,
          payment_ref_number: item?.payment_ref_number,
          created_by: item?.created_by,
          cheque: item?.cheque,
          cheque_date: item?.cheque_date,
          bank_name: item?.bank_name,
          filePath: item?.filePath,
        }))
      );
      setPrintData(
        res?.data?.map((item, index) => ({
          sl: index + 1,
          "Payment Amount": item?.payment_amount,
          "Payment Type": item?.type,
          "Ref No.": item?.payment_ref_number,
          Status: item?.result_code,
          "Bank Name": item?.bank_name,
          "Cheque No": item?.cheque,
          "Cheque Date": item?.cheque_date,
          "Creation Date": item?.created_date,
          "Created User": item?.created_by,
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
    fetchBankCollection();
  }, []);

  const exportJsonToPdfHandle = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "sl",
          "Payment Amount",
          "Payment Type",
          "Ref No.",
          "Status",
          "Bank Name",
          "Cheque No",
          "Cheque Date",
          "Creation Date",
          "Created User",
        ],
      ],
      body: printData?.map((item) => [
        item?.sl,
        item?.["Payment Amount"],
        item?.["Recharge Type"],
        item?.["Ref No."],
        item?.Status,
        item?.["Bank Name"],
        item?.["Cheque No"],
        item?.["Cheque Date"],
        item?.["Creation Date"],
        item?.["Created User"],
      ]),
      styles: {
        fontSize: 8,
      },
      margin: { top: 35 }, 
      didDrawPage: (data) => {
        doc.setFontSize(12);
        doc.text("Bank Collection", data.settings.margin.left, 30);
      },
    });
    doc.save("Bank_Collection");
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
                      exportToExcel(printData, "Bank_Collection")
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
                    rows={bankCollection}
                    cols={bank_collection_columns}
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

export default BankCollection;
