import React, { useState, useEffect } from "react";
import { Box, Button, Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateTransferOrder from "./CreateTransferOrder";
import ViewTransferOrder from "./ViewTransferOrder";
import UpdateTransferOrder from "./UpdateTransferOrder";
import { LoaderDialog, Notification, RenderStatus } from "../../ui/index";
import { CustomDataTable } from "../../component/common/index";
import Route from "../../routes/Route";

const TransferOrders = () => {
  const empID = localStorage.getItem("username");
  const access_token = localStorage.getItem("access_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [open, setOpen] = useState(false);
  const [viewTransferOrderList, setViewTransferOrderList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [transferOrderDetails, setTransferOrderDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransferOrderList = async () => {
    setIsLoading(true);
    try {
      const res = await Route(
        "GET",
        `/transferOrder/viewTransferOrderList/${empID}`,
        access_token,
        null,
        null
      );
      if (res?.status === 200) {
        setViewTransferOrderList(
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
      setShowNofication(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchViewTransferOrderDetails = async (transferOrderNo, type) => {
    const res = await Route(
      "GET",
      `/transferOrder/viewTransferOrderDetails?transferOrderNo=${transferOrderNo}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setTransferOrderDetails(res?.data);
      type === "view" ? setView(true) : setEdit(true);
    }
  };
  const updateTransferOrderShipment = async (transferOrderNo) => {
    const res = await Route(
      "PUT",
      `/transferOrder/transferOrderShipment?transferOrderNo=${transferOrderNo}&empId=${empID}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      const response = await Route(
        "GET",
        `/transferOrder/viewTransferOrderList/${empID}`,
        access_token,
        null,
        null
      );
      if (response?.status === 200) {
        setViewTransferOrderList(
          response?.data?.map((item, index) => ({
            id: index,
            sl: index + 1,
            transfer_order_no: item?.transfer_Order_Number,
            transfer_from_code: item?.transfer_From_Name,
            transfer_to_code: item?.transfer_To_Name,
            posted_date: item?.stringTransferDate,
            status: item?.status,
          }))
        );
        setSeverity("success");
        setNotificationMsg(res?.data?.responseText);
        setShowNofication(true);
      }
    } else {
      setSeverity("error");
      setNotificationMsg(res?.response?.data?.responseText);
      setShowNofication(true);
    }
  };
  const editHandle = (params) => {
    fetchViewTransferOrderDetails(params?.row?.transfer_order_no, "edit");
  };
  const viewHandle = (params) => {
    fetchViewTransferOrderDetails(params?.row?.transfer_order_no, "view");
  };
  const shipHandle = (params) => {
    updateTransferOrderShipment(params?.row?.transfer_order_no);
  };
  const transfer_order_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.4 },
    { field: "transfer_order_no", headerName: "Transfer Order No", flex: 2 },
    {
      field: "transfer_from_code",
      headerName: "Transfer From Code",
      flex: 2.4,
    },
    { field: "transfer_to_code", headerName: "Tansfer To Code", flex: 2.4 },
    { field: "posted_date", headerName: "Posted Date", flex: 1.5 },
    {
      field: "status",
      headerName: "Status",
      flex: 1.3,
      renderCell: (params) => <RenderStatus status={params?.row?.status} />,
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
            onClick={() => editHandle(params)}
            color="success"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="view"
            size="small"
            onClick={() => viewHandle(params)}
            color="primary"
          >
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="ship"
            size="small"
            onClick={() => shipHandle(params)}
            color="secondary"
          >
            <LocalShippingIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
  useEffect(() => {
    fetchTransferOrderList();
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
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                  >
                    Add New
                  </Button>
                </Grid>
                <Grid item container alignItems="center" xs={12}>
                  <CustomDataTable
                    rows={viewTransferOrderList}
                    cols={transfer_order_columns}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {open && (
        <CreateTransferOrder
          open={open}
          setOpen={setOpen}
          fetchTransferOrderList={fetchTransferOrderList}
          userDetails={userDetails}
        />
      )}
      {view && (
        <ViewTransferOrder
          open={view}
          setOpen={setView}
          transferOrderDetails={transferOrderDetails}
        />
      )}
      {edit && (
        <UpdateTransferOrder
          open={edit}
          setOpen={setEdit}
          fetchTransferOrderList={fetchTransferOrderList}
          transferOrderDetails={transferOrderDetails}
        />
      )}
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={setShowNofication}
          message={notificationMsg}
          severity={severity}
        />
      )}
      {isLoading && <LoaderDialog open={isLoading} />}
    </>
  );
};

export default TransferOrders;
