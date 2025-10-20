import React, { useState, useEffect } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { CustomDataTable } from "../../component/common/index";
import { LoaderDialog, Notification, RenderStatus } from "../../ui/index";
import EmiPaymentDetails from "./EmiPaymentDetails";
import Route from "../../routes/Route";
import { useCommon } from "../../contexts/CommonContext";

const EMICollection = () => {
  const access_token = localStorage.getItem("access_token");
  const { isMdUp } = useCommon();
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
    {
      field: "sl",
      headerName: "Sl.No",
      width: isMdUp ? "" : 30,
      flex: isMdUp ? 30 : "",
    },
    {
      field: "posNo",
      headerName: "POS No",
      width: isMdUp ? "" : 200,
      flex: isMdUp ? 200 : "",
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: isMdUp ? "" : 200,
      flex: isMdUp ? 200 : "",
    },
    {
      field: "customerNo",
      headerName: "Customer No",
      width: isMdUp ? "" : 200,
      flex: isMdUp ? 200 : "",
    },
    {
      field: "organizationName",
      headerName: "Organization",
      width: isMdUp ? "" : 300,
      flex: isMdUp ? 300 : "",
    },
    {
      field: "postingDate",
      headerName: "Posting Date",
      width: isMdUp ? "" : 150,
      flex: isMdUp ? 150 : "",
    },
    {
      field: "status",
      headerName: "EMI/Payment Status",
      width: isMdUp ? "" : 180,
      flex: isMdUp ? 180 : "",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <RenderStatus status={params?.row?.emiStatus} />
          <RenderStatus status={params?.row?.paymentStatus} />
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: isMdUp ? "" : 150,
      flex: isMdUp ? 150 : "",
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
        setEmiHistory(
          res?.data?.filter((item) => item?.emiStatus === "Active")
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
