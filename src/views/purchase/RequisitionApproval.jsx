import React, { useState, useEffect } from "react";
import { Box, Paper, Grid, Button, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid } from "@mui/x-data-grid";
import Notification from "../../ui/Notification";
import { RenderStatus } from "../../ui";
import UpdateRequisition from "./UpdateRequisition";
import ApproveRequisition from "./ApproveRequisition";
// import { CustomDataTable } from "../../component/common/index";
import Route from "../../routes/Route";

const RequisitionApproval = () => {
  const empID = localStorage.getItem("username");
  const access_token = localStorage.getItem("access_token");
  const [requisitionList, setRequisitionList] = useState([]);
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [itemDetails, setItemDetails] = useState([]);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [showApproveDetails, setShowApproveDetails] = useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const updateHandle = async (params) => {
    const res = await Route(
      "GET",
      `/requisition/viewRequisitionDetails?requisitionNo=${params?.row?.requisitionNo}&empID=${empID}`,
      access_token,
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
      access_token,
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
      renderCell: (params) => (
        <RenderStatus status={params?.row?.approvalStatus} />
      ),
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
            color="success"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="approve"
            size="small"
            onClick={() => viewDetailsHandle(params)}
            color="primary"
          >
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="reject"
            size="small"
            onClick={() => rejectRequisitionHandle(params)}
            color="error"
          >
            <ClearIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];

  const fetchRequisitionListByApprover = async () => {
    const res = await Route(
      "GET",
      `/requisition/viewRequisitionListByApprover/${empID}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setRequisitionList(res?.data);
    }
  };
  useEffect(() => {
    fetchRequisitionListByApprover();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const rejectRequisitionHandle = async (params) => {
    const res = await Route(
      "PUT",
      `/requisition/rejectRequisitionDetails?requisitionNo=${params?.row?.requisitionNo}&empID=${empID}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setNotificationMsg(res?.data?.responseText);
      setSeverity("success");
      setShowNofication(true);
      fetchRequisitionListByApprover();
    } else {
      setNotificationMsg(res?.data?.message);
      setSeverity("error");
      setShowNofication(true);
    }
  };
  const handleRowSelection = (selectionModel) => {
    const selectedRowParams = requisitionList.filter((row) =>
      selectionModel.includes(row.id)
    );
    setSelectedRows(selectedRowParams);
  };
  const approveHandle = async () => {
    const data = selectedRows?.map((item) => ({
      requisitionNo: item?.requisitionNo,
    }));
    const res = await Route(
      "PUT",
      `/requisition/bulkApproveRequisitionDetails?empID=${empID}`,
      access_token,
      data,
      null
    );
    if (res?.status === 200) {
      setNotificationMsg(res?.data?.responseText);
      setSeverity("success");
      setShowNofication(true);
      fetchRequisitionListByApprover();
    } else {
      setNotificationMsg(res?.data?.message);
      setSeverity("error");
      setShowNofication(true);
    }
  };
  const rejectHandle = async () => {
    const data = selectedRows?.map((item) => ({
      requisitionNo: item?.requisitionNo,
    }));
    const res = await Route(
      "PUT",
      `/requisition/bulkRejectRequisitionDetails?empID=${empID}`,
      access_token,
      data,
      null
    );
    if (res?.status === 200) {
      setNotificationMsg(res?.data?.responseText);
      setSeverity("success");
      setShowNofication(true);
      fetchRequisitionListByApprover();
    } else {
      setNotificationMsg(res?.data?.message);
      setSeverity("error");
      setShowNofication(true);
    }
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
                  <Grid item alignContent="center">
                    <Button
                      variant="contained"
                      sx={{ mr: 2 }}
                      onClick={approveHandle}
                      endIcon={<DoneIcon />}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={rejectHandle}
                      endIcon={<ClearIcon />}
                      style={{
                        background: "#fff",
                      }}
                    >
                      Reject
                    </Button>
                  </Grid>
                </Grid>
                <Grid item container alignItems="center" xs={12}>
                  {/* <CustomDataTable
                    rows={requisitionList?.map((row, index) => ({
                      ...row,
                      sl: index + 1,
                    }))}
                    cols={requisiton_approval_columns}
                    checkboxSelection={true}
                    onRowSelectionModelChange={handleRowSelection}
                  /> */}
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
                      checkboxSelection
                      onRowSelectionModelChange={handleRowSelection}
                    />
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
