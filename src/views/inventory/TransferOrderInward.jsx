import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Button, IconButton, FormControl } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ViewInwardTransferOrder from "./ViewInwardTransferOrder";
import UpdateTransferOrderInward from "./UpdateTransferOrderInward";
import { RenderStatus } from "../../ui/index";
import { CustomDataTable, PrintSection } from "../../component/common/index";
import Route from "../../routes/Route";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";

const TransferOrderInward = () => {
  const empID = localStorage.getItem("username");
  const access_token = localStorage.getItem("access_token");
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [transferShipment, setTransferShipment] = useState([]);
  const [inwardTransferOrderList, setInwardTransferOrderList] = useState([]);
  const [transferOrderDetails, setTransferOrderDetails] = useState({});
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);

  const fetchViewTransferOrderDetails = async (transferOrderNo, type) => {
    const res = await Route(
      "GET",
      `/transferOrder/viewInTransitTransferOrderDetails?transferOrderNo=${transferOrderNo}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setTransferOrderDetails(res?.data);
      type === "view" ? setView(true) : setEdit(true);
    }
  };
  const editHandle = (params) => {
    fetchViewTransferOrderDetails(params?.row?.transfer_order_no, "edit");
  };
  const viewHandle = (params) => {
    fetchViewTransferOrderDetails(params?.row?.transfer_order_no, "view");
  };
  const transfer_order_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.4 },
    { field: "transfer_order_no", headerName: "Transfer Order No", flex: 2.5 },
    {
      field: "transfer_from_code",
      headerName: "Transfer From Code",
      flex: 2.5,
    },
    { field: "transfer_to_code", headerName: "Tansfer To Code", flex: 2.5 },
    { field: "posted_date", headerName: "Posted Date", flex: 1.2 },
    {
      field: "status",
      headerName: "Status",
      flex: 1.3,
      renderCell: (params) => <RenderStatus status={params?.row?.status} />,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => editHandle(params)}
            color="success"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="view"
            size="small"
            onClick={() => viewHandle(params)}
            color="primary"
          >
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];

  const fetchInwardTrasnferOrderList = async () => {
    const res = await Route(
      "GET",
      `/transferOrder/viewInwardTransferOrderList/${empID}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setInwardTransferOrderList(
        res?.data?.map((item, index) => ({
          id: item?.transfer_Order_Id,
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
    fetchInwardTrasnferOrderList();
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
        doc.text("Transfer Order Inward", data.settings.margin.left, 30);
      },
    });
    doc.save("Transfer_Order_Inward");
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
                    <FormControl fullWidth style={{ background: "#fff" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="From*"
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
                    <FormControl fullWidth style={{ background: "#fff" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="To*"
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
                      exportToExcel(printData, "Transfer Order Inward")
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
                    rows={inwardTransferOrderList}
                    cols={transfer_order_columns}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {edit && (
        <UpdateTransferOrderInward
          open={edit}
          setOpen={setEdit}
          fetchInwardTrasnferOrderList={fetchInwardTrasnferOrderList}
          transferOrderDetails={transferOrderDetails}
        />
      )}
      {view && (
        <ViewInwardTransferOrder
          open={view}
          setOpen={setView}
          transferOrderDetails={transferOrderDetails}
        />
      )}
    </>
  );
};

export default TransferOrderInward;
