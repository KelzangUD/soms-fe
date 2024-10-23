import React, { useState, useEffect } from "react";
import { Box, Paper, Grid, Button, InputBase, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Route from "../../routes/Route";
import Notification from "../../ui/Notification";
import UpdateRequisition from "./UpdateRequisition";
import ApproveRequisition from "./ApproveRequisition";

const RequisitionApproval = () => {
  const empID = localStorage.getItem("username");
  const [requisitionList, setRequisitionList] = useState([]);
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [itemDetails, setItemDetails] = useState([]);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [showApproveDetails, setShowApproveDetails] = useState(false);

  const updateHandle = async (params) => {
    const res = await Route(
      "GET",
      `/requisition/viewRequisitionDetails?requisitionNo=${params?.row?.requisitionNo}&empID=${empID}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setItemDetails(res?.data);
      setShowViewDetails(true);
    } else {
      setNotificationMsg(res?.data?.message);
      setSeverity("error");
      setShowNofication(true);
    }
  };
  const viewDetailsHandle = async (params) => {
    const res = await Route(
      "GET",
      `/requisition/viewRequisitionDetails?requisitionNo=${params?.row?.requisitionNo}&empID=${empID}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setItemDetails(res?.data);
      setShowApproveDetails(true);
    } else {
      setNotificationMsg(res?.data?.message);
      setSeverity("error");
      setShowNofication(true);
    }
  };
  const requisiton_approval_columns = [
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
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => updateHandle(params)}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="approve"
            size="small"
            onClick={() => viewDetailsHandle(params)}
          >
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
  //   const token = localStorage.getItem("token");
  const fetchRequisitionListByApprover = async () => {
    const res = await Route(
      "GET",
      `/requisition/viewRequisitionListByApprover/${empID}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setRequisitionList(res?.data);
    }
  };
  useEffect(() => {
    fetchRequisitionListByApprover();
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
                  <Grid item>
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
                </Grid>
                <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
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
                      columns={requisiton_approval_columns}
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
        <UpdateRequisition
          open={showViewDetails}
          setOpen={setShowViewDetails}
          details={itemDetails}
          fetchRequisitionListByApprover={fetchRequisitionListByApprover}
        />
      )}
      {showApproveDetails && (
        <ApproveRequisition
          open={showApproveDetails}
          setOpen={setShowApproveDetails}
          details={itemDetails}
          fetchRequisitionListByApprover={fetchRequisitionListByApprover}
        />
      )}
    </>
  );
};

export default RequisitionApproval;
