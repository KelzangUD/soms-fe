import React, { useState, useEffect } from "react";
import { Box, Paper, Grid, Button, InputBase, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Route from "../../routes/Route";
import { Notification, RenderStatus } from "../../ui/index";
import ViewRequisitionItemDetails from "./ViewRequisitionItemDetails";

const RequisitionList = () => {
  const empId = localStorage.getItem("username");
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [requisitionList, setRequisitionList] = useState([]);
  const [itemDetails, setItemDetails] = useState([]);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState("Submitted");

  const viewDetailsHandle = async (params) => {
    // console.log(params?.row);
    const res = await Route(
      "GET",
      `/requisition/viewRequisitionDetails?requisitionNo=${params?.row?.requisitionNo}&empID=${empId}`,
      null,
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
      renderCell: (params) => <RenderStatus status={params?.row?.approvalStatus} />,
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
  // const token = localStorage.getItem("token");
  const fetchRequisitionList = async () => {
    const res = await Route(
      "GET",
      `/requisition/viewRequisitionListByCreator/${empId}`,
      null,
      null,
      null
    );
    // console.log(res);
    if (res?.status === 200) {
      setRequisitionList(res?.data);
    }
  };
  useEffect(() => {
    fetchRequisitionList();
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
                  <div
                    style={{
                      height: "auto",
                      width: "100%",
                      background: "#fff",
                    }}
                  >
                    <DataGrid
                      rows={requisitionList?.map((row, index) => ({
                        ...row,
                        sl: index + 1,
                      }))}
                      columns={requisiton_list_columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                    />
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
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
