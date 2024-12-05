import React, { useState, useEffect } from "react";
import { Box, Paper, Grid, InputBase, IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Route from "../../routes/Route";
import { Notification, RenderStatus } from "../../ui/index";
import ViewRequisitionItemDetails from "./ViewRequisitionItemDetails";
import { CustomDataTable } from "../../component/common/index";

const RequisitionList = () => {
  const access_token = localStorage.getItem("access_token");
  const empId = localStorage.getItem("username");
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [requisitionList, setRequisitionList] = useState([]);
  const [itemDetails, setItemDetails] = useState([]);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState("Submitted");

  const viewDetailsHandle = async (params) => {
    const res = await Route(
      "GET",
      `/requisition/viewRequisitionDetails?requisitionNo=${params?.row?.requisitionNo}&empID=${empId}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setApprovalStatus(params?.row?.approvalStatus);
      setItemDetails(res?.data);
      setShowViewDetails(true);
    } else {
      setNotificationMsg(res?.response?.data?.message);
      setSeverity("error");
      setShowNofication(true);
    }
  };

  const requisiton_list_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "requisitionNo", headerName: "Requisition No", width: 200 },
    {
      field: "requisitionTypeName",
      headerName: "Requisition Type",
      width: 200,
    },
    { field: "requisition_Date", headerName: "Requisition Date", width: 150 },
    {
      field: "approvalStatus",
      headerName: "Approval Status",
      width: 150,
      renderCell: (params) => (
        <RenderStatus status={params?.row?.approvalStatus} />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 70,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="view"
            size="small"
            onClick={() => viewDetailsHandle(params)}
            color="primary"
          >
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
  
  useEffect(() => {
    const fetchRequisitionList = async () => {
      const res = await Route(
        "GET",
        `/requisition/viewRequisitionListByCreator/${empId}`,
        access_token,
        null,
        null
      );
      if (res?.status === 200) {
        setRequisitionList(res?.data);
      }
    };
    fetchRequisitionList();
  }, [access_token, empId]);

  return (
    <>
      <>
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
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Paper
                    sx={{
                      p: "2px 0",
                      display: "flex",
                      alignItems: "center",
                      width: 400,
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search"
                      inputProps={{ "aria-label": "search" }}
                    />
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
                <Grid
                  container
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <IconButton aria-label="pdf" color="error">
                    <PictureAsPdfIcon />
                  </IconButton>
                  <IconButton aria-label="excel" color="success">
                    <FileDownloadIcon />
                  </IconButton>
                  <IconButton aria-label="print" color="primary">
                    <PrintIcon />
                  </IconButton>
                </Grid>
                <Grid item container alignItems="center" xs={12}>
                  <CustomDataTable
                    rows={requisitionList?.map((row, index) => ({
                      ...row,
                      sl: index + 1,
                    }))}
                    cols={requisiton_list_columns}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </>
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={setShowNofication}
          message={notificationMsg}
          severity={severity}
        />
      )}
      {showViewDetails && (
        <ViewRequisitionItemDetails
          open={showViewDetails}
          setOpen={setShowViewDetails}
          details={itemDetails}
          approvalStatus={approvalStatus}
        />
      )}
    </>
  );
};

export default RequisitionList;
