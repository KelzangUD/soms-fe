import React, { useState, useEffect } from "react";
import { Box, Grid, IconButton } from "@mui/material";
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
      flex: 1.3,
      renderCell: (params) => (
        <RenderStatus status={params?.row?.approvalStatus} />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.7,
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

  const fetchRequisitionList = async (access_token, empId) => {
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
  useEffect(() => {
    fetchRequisitionList(access_token, empId);
  }, [access_token, empId]);

  return (
    <>
      <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <CustomDataTable
            rows={requisitionList?.map((row, index) => ({
              ...row,
              sl: index + 1,
            }))}
            cols={requisiton_list_columns}
          />
        </Grid>
      </Grid>
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
