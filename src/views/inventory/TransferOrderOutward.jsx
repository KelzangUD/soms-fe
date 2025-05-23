import React, { useState, useEffect } from "react";
import { Box, Grid, Button, IconButton, FormControl } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ViewTransferOrder from "./ViewTransferOrder";
import { RenderStatus, LoaderDialog, Notification } from "../../ui/index";
import { CustomDataTable } from "../../component/common/index";
import dayjs from "dayjs";
import { dateFormatterTwo } from "../../util/CommonUtil";
import Route from "../../routes/Route";
import { useCommon } from "../../contexts/CommonContext";

const TransferOrderOutward = () => {
  const empID = localStorage.getItem("username");
  const access_token = localStorage.getItem("access_token");
  const { isMdUp } = useCommon();
  const [transferOrderList, setTransferOrderList] = useState([]);
  const [transferOrderDetails, setTransferOrderDetails] = useState({});
  const [view, setView] = useState(false);
  const [params, setParams] = useState({
    fromDate: dateFormatterTwo(new Date()),
    toDate: dateFormatterTwo(new Date()),
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [isLoading, setIsLoading] = useState(false);

  const fetchViewTransferOrderDetails = async (transferOrderNo) => {
    setIsLoading(true);
    try {
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
    } catch (err) {
      setNotificationMsg("Failed To Fetch Sales All Report");
      setSeverity("error");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };
  const viewHandle = (params) => {
    fetchViewTransferOrderDetails(params?.row?.transfer_order_no);
  };
  const transfer_order_columns = [
    {
      field: "sl",
      headerName: "Sl. No",
      flex: isMdUp ? 0.4 : undefined,
      width: isMdUp ? undefined : 80,
    },
    {
      field: "transfer_order_no",
      headerName: "Transfer Order No",
      flex: isMdUp ? 1.6 : undefined,
      width: isMdUp ? undefined : 160,
    },
    {
      field: "transfer_from_code",
      headerName: "Transfer From Code",
      flex: isMdUp ? 2.5 : undefined,
      width: isMdUp ? undefined : 250,
    },
    {
      field: "transfer_to_code",
      headerName: "Transfer To Code",
      flex: isMdUp ? 2.5 : undefined,
      width: isMdUp ? undefined : 250,
    },
    {
      field: "posted_date",
      headerName: "Posted Date",
      flex: isMdUp ? 1 : undefined,
      width: isMdUp ? undefined : 120,
    },
    {
      field: "status",
      headerName: "Status",
      flex: isMdUp ? 1.2 : undefined,
      width: isMdUp ? undefined : 120,
      renderCell: (params) => <RenderStatus status={params?.row?.status} />,
    },
    {
      field: "action",
      headerName: "Action",
      flex: isMdUp ? 1 : undefined,
      width: isMdUp ? undefined : 100,
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
    setIsLoading(true);
    try {
      const res = await Route(
        "GET",
        `/transferOrder/viewTransferOrderOutwardListWithDate?empID=${empID}&fromDate=${params?.fromDate}&toDate=${params?.toDate}`,
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
    } catch (err) {
      setNotificationMsg("Failed To Fetch Sales All Report");
      setSeverity("error");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTransferOrderOutward();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
                  container
                  xs={12}
                  spacing={2}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid item container spacing={1} alignItems="center">
                    <Grid item xs={4} md={2}>
                      <FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="From*"
                            onChange={fromDateHandle}
                            value={dayjs(params?.fromDate)}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} md={2}>
                      <FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="To*"
                            onChange={toDateHandle}
                            value={dayjs(params?.toDate)}
                            minDate={dayjs(params?.fromDate)}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        onClick={fetchTransferOrderOutward}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
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
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={notificationMsg}
          severity={severity}
        />
      )}
      {isLoading && <LoaderDialog open={isLoading} />}
    </>
  );
};

export default TransferOrderOutward;
