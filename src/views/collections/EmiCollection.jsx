import React, { useState, useEffect } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { CustomDataTable } from "../../component/common/index";
import { LoaderDialog, Notification, RenderStatus } from "../../ui/index";
import EmiPaymentDetails from "./EmiPaymentDetails";
import Route from "../../routes/Route";

const EMICollection = () => {
  const access_token = localStorage.getItem("access_token");
  const [emiHistory, setEmiHistory] = useState([]);
  const empID = localStorage.getItem("username");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [emiDetails, setEmiDetails] = useState([]);
  const [view, setView] = useState(false);
  const fetchEmiHistoryDetail = async (params) => {
    setIsLoading(true);
    try {
      const res = await Route(
        "GET",
        `/emi/getActiveEMI_CustomerDetail?customerNo=${params?.row?.customerNo}&posNo=${params?.row?.posNo}`,
        access_token,
        null,
        null
      );
      if (res?.status === 200) {
        setEmiDetails(res?.data);
        setView(true);
      }
    } catch (err) {
      setNotificationMessage("Error Fetching Report");
      setSeverity("error");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };
  const emi_history_columns = [
    { field: "sl", headerName: "Sl.No", width: 30 },
    { field: "posNo", headerName: "POS No", width: 170 },
    { field: "customerName", headerName: "Customer Name", width: 200 },
    { field: "customerNo", headerName: "Customer No", width: 200 },
    // { field: "address", headerName: "Organization", width: 170 },
    { field: "postingDate", headerName: "Posting Date", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <RenderStatus status={params?.row?.paymentStatus} />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="view"
            size="small"
            onClick={() => fetchEmiHistoryDetail(params)}
            color="primary"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
  const fetchEmiHistory = async () => {
    setIsLoading(true);
    try {
      const res = await Route(
        "GET",
        `/emi/getActiveEMI_CustomersList?userId=${empID}`,
        access_token,
        null,
        null
      );
      if (res?.status === 200) {
        setEmiHistory(res?.data);
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
    fetchEmiHistory();
  }, []);

  return (
    <>
      {view ? (
        <EmiPaymentDetails
          open={view}
          setOpen={setView}
          details={emiDetails[0]}
        />
      ) : (
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
                    alignItems="center"
                    sx={{ px: 1 }}
                    xs={12}
                  >
                    <CustomDataTable
                      rows={emiHistory?.map((item, index) => ({
                        sl: index + 1,
                        id: index,
                        ...item,
                      }))}
                      cols={emi_history_columns}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

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

export default EMICollection;
