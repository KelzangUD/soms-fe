import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Button, IconButton, FormControl } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ViewPostedTransferShipment from "./ViewPostedTransferShipment";
import { RenderStatus } from "../../ui/index";
import { CustomDataTable, PrintSection } from "../../component/common/index";
import Route from "../../routes/Route";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";

const PostedTransferShipment = () => {
  const empID = localStorage.getItem("username");
  const access_token = localStorage.getItem("access_token");
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [transferShipment, setTransferShipment] = useState([]);
  const [transferShipmentDetails, setTransferShipmentDetails] = useState({});
  const [view, setView] = useState(false);
  const fetchPostedTransferShipmentDetails = async (transferOrderNo) => {
    const res = await Route(
      "GET",
      `/transferOrder/viewPostedTransferOrderDetails?transferOrderNo=${transferOrderNo}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setTransferShipmentDetails(res?.data);
      setView(true);
    }
  };

  const viewHandle = (params) => {
    fetchPostedTransferShipmentDetails(params?.id);
  };
  const posted_transfer_shipment_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.4 },
    { field: "transfer_order_no", headerName: "Transfer Order No", flex: 1.5 },
    {
      field: "transfer_from_code",
      headerName: "Transfer From Code",
      flex: 2.5,
    },
    { field: "transfer_to_code", headerName: "Tansfer To Code", flex: 3 },
    { field: "posted_date", headerName: "Posted Date", flex: 1.2 },
    {
      field: "status",
      headerName: "Status",
      flex: 1.2,
      renderCell: (params) => <RenderStatus status={params?.row?.status} />,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.7,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="view"
            size="small"
            color="primary"
            onClick={() => viewHandle(params)}
          >
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];

  const fetchPostedTransferShipment = async () => {
    const res = await Route(
      "GET",
      `/transferOrder/viewPostedOutwardTransferOrderList/${empID}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setTransferShipment(
        res?.data?.map((item, index) => ({
          id: item?.transfer_Order_Number,
          sl: index + 1,
          transfer_order_no: item?.transfer_Order_Number,
          transfer_from_code: item?.transfer_From_Name,
          transfer_to_code: item?.transfer_To_Name,
          posted_date: item?.stringTransferDate,
          status: item?.status,
        }))
      );
      setPrintData(
        res?.data?.map((item, index) => ({
          sl: index + 1,
          "Transfer Order No": item?.transfer_Order_Number,
          "Transfer From Code": item?.transfer_From_Name,
          "Transfer To Code": item?.transfer_To_Name,
          "Posted Date": item?.stringTransferDate,
          Status: item?.status,
        }))
      );
    }
  };
  useEffect(() => {
    fetchPostedTransferShipment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const exportJsonToPdfHandle = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "sl",
          "Transfer Order No",
          "Transfer From Code",
          "Transfer To Code",
          "Posted Date",
          "Status",
        ],
      ],
      body: printData?.map((item) => [
        item?.sl,
        item?.["Transfer Order No"],
        item?.["Transfer From Code"],
        item?.["ransfer To Code"],
        item?.["Posted Date"],
        item?.Status,
      ]),
      styles: {
        fontSize: 8,
      },
      margin: { top: 35 },
      didDrawPage: (data) => {
        doc.setFontSize(12);
        doc.text("Posted Transfer Shipment", data.settings.margin.left, 30);
      },
    });
    doc.save("Posted_Transfer_Shipment");
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
                    <FormControl fullWidth style={{ background: "#fff" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="From*" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth style={{ background: "#fff" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="To*" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="contained">Search</Button>
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <PrintSection
                    exportExcel={() =>
                      exportToExcel(printData, "Posted Transfer Shipment")
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
                    rows={transferShipment}
                    cols={posted_transfer_shipment_columns}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {view && (
        <ViewPostedTransferShipment
          open={view}
          setOpen={setView}
          transferOrderDetails={transferShipmentDetails}
        />
      )}
    </>
  );
};

export default PostedTransferShipment;
