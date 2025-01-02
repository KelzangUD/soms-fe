import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Notification from "../../ui/Notification";
import { RenderStatus } from "../../ui";
import UpdateRequisition from "./UpdateRequisition";
import ApproveRequisition from "./ApproveRequisition";
import { CustomDataTable } from "../../component/common/index";
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
  const [params, setParams] = useState({});
  const [showDialog, setShowDialog] = useState(false);

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
    { field: "sl", headerName: "Sl. No", flex: 0.4 },
    { field: "requisitionNo", headerName: "Requisition No", flex: 2 },
    {
      field: "requisitionTypeName",
      headerName: "Requisition Type",
      flex: 2,
    },
    { field: "requisition_Date", headerName: "Requisition Date", flex: 1.5 },
    {
      field: "approvalStatus",
      headerName: "Approval Status",
      flex: 1.5,
      renderCell: (params) => (
        <RenderStatus status={params?.row?.approvalStatus} />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1.5,
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
            <CheckBoxIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="reject"
            size="small"
            onClick={() => {
              setParams(params);
              setShowDialog(true);
            }}
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
  const rejectRequisitionHandle = async () => {
    const res = await Route(
      "PUT",
      `/requisition/rejectRequisitionDetails?requisitionNo=${params?.row?.requisitionNo}&empID=${empID}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setShowDialog(false);
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
            container
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
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
              >
                Reject
              </Button>
            </Grid>
            <Grid item container alignItems="center" xs={12} mt={2}>
              <CustomDataTable
                rows={requisitionList?.map((row, index) => ({
                  ...row,
                  sl: index + 1,
                }))}
                cols={requisiton_approval_columns}
                checkboxSelection={true}
                onRowSelectionModelChange={handleRowSelection}
              />
            </Grid>
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
      {showDialog && (
        <Dialog
          fullWidth
          maxWidth="sm"
          open={showDialog}
          onClose={() => setShowDialog(false)}
        >
          <DialogTitle>Confirmation!</DialogTitle>
          <DialogContent>
            <Alert icon={false} severity="info">
              Are you sure that you want to reject this Requisition?
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={rejectRequisitionHandle}
              sx={{
                mt: -1,
                mb: 2,
              }}
            >
              Confirm
            </Button>
            <Button
              onClick={() => setShowDialog(false)}
              variant="outlined"
              color="error"
              sx={{
                mr: 2,
                mt: -1,
                mb: 2,
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default RequisitionApproval;
