import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  IconButton,
  FormControl,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ViewTransferOrder from "./ViewTransferOrder";
import { RenderStatus } from "../../ui/index";
import { CustomDataTable } from "../../component/common/index";
import Route from "../../routes/Route";

const TransferOrderOutward = () => {
  const empID = localStorage.getItem("username");
  const access_token = localStorage.getItem("access_token");
  const [transferOrderList, setTransferOrderList] = useState([]);
  const [transferOrderDetails, setTransferOrderDetails] = useState({});
  const [view, setView] = useState(false);

  const fetchViewTransferOrderDetails = async (transferOrderNo) => {
    const res = await Route(
      "GET",
      `/transferOrder/viewInTransitTransferOrderDetails?transferOrderNo=${transferOrderNo}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setTransferOrderDetails(res?.data);
      setView(true);
    }
  };
  const viewHandle = (params) => {
    fetchViewTransferOrderDetails(params?.row?.transfer_order_no);
  };
  const transfer_order_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.4 },
    { field: "transfer_order_no", headerName: "Transfer Order No", flex: 1.6 },
    {
      field: "transfer_from_code",
      headerName: "Transfer From Code",
      flex: 2.5,
    },
    { field: "transfer_to_code", headerName: "Tansfer To Code", flex: 2.5 },
    { field: "posted_date", headerName: "Posted Date", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1.2,
      renderCell: (params) => <RenderStatus status={params?.row?.status} />,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <>
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

  const fetchTransferOrderOutward = async () => {
    const res = await Route(
      "GET",
      `/transferOrder/viewTransferOrderOutwardList/${empID}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setTransferOrderList(
        res?.data?.map((item, index) => ({
          id: index,
          sl: index + 1,
          transfer_order_no: item?.transfer_Order_Number,
          transfer_from_code: item?.transfer_From_Name,
          transfer_to_code: item?.transfer_To_Name,
          posted_date: item?.stringTransferDate,
          status: item?.status,
        }))
      );
    }
  };
  useEffect(() => {
    fetchTransferOrderOutward();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <Grid
                  item
                  xs={12}
                  spacing={2}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid item container spacing={1} alignItems="center">
                    <Grid item xs={2}>
                      <FormControl fullWidth style={{ background: "#fff" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker label="From*" />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
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
                </Grid>
                <Grid
                  item
                  xs={12}
                  spacing={1}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <IconButton aria-label="pdf" color="error">
                    <PictureAsPdfIcon />
                  </IconButton>
                  <IconButton aria-label="excel" color="success">
                    <FileDownloadIcon />
                  </IconButton>
                  <IconButton aria-label="excel" color="primary">
                    <PrintIcon />
                  </IconButton>
                </Grid>
                <Grid item container alignItems="center" xs={12}>
                  <CustomDataTable
                    rows={transferOrderList}
                    cols={transfer_order_columns}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {view && (
        <ViewTransferOrder
          open={view}
          setOpen={setView}
          transferOrderDetails={transferOrderDetails}
        />
      )}
    </>
  );
};

export default TransferOrderOutward;
