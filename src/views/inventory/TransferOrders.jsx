import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Grid,
  InputBase,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateTransferOrder from "./CreateTransferOrder";
import ViewTransferOrder from "./ViewTransferOrder";
import UpdateTransferOrder from "./UpdateTransferOrder";
import {Notification, RenderStatus} from "../../ui/index";
import Route from "../../routes/Route";

const TransferOrders = () => {
  const empID = localStorage.getItem("username");
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [open, setOpen] = useState(false);
  const [viewTransferOrderList, setViewTransferOrderList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [transferOrderDetails, setTransferOrderDetails] = useState({});
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );

  const fetchViewTransferOrderDetails = async (transferOrderNo, type) => {
    const res = await Route(
      "GET",
      `/transferOrder/viewTransferOrderDetails?transferOrderNo=${transferOrderNo}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setTransferOrderDetails(res?.data);
      type === "view" ? setView(true) : setEdit(true);
    }
  };
  const fetchTransferOrderList = async () => {
    const res = await Route(
      "GET",
      `/transferOrder/viewTransferOrderList/${empID}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setViewTransferOrderList(
        res?.data?.map((item, index) => ({
          id: index,
          transfer_order_no: item?.transfer_Order_Number,
          transfer_from_code: item?.transfer_From_Name,
          transfer_to_code: item?.transfer_To_Name,
          posted_date: item?.creation_Date,
          status: item?.status,
        }))
      );
    }
  };
  const updateTransferOrderShipment = async (transferOrderNo) => {
    const res = await Route(
      "PUT",
      `/transferOrder/transferOrderShipment?transferOrderNo=${transferOrderNo}&empId=${empID}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      fetchTransferOrderList();
      setSeverity("success");
      setNotificationMsg(res?.data?.responseText);
      setShowNofication(true);
    } else {
      setSeverity("error");
      setNotificationMsg(res?.data?.responseText);
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
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "transfer_order_no", headerName: "Transfer Order No", width: 200 },
    {
      field: "transfer_from_code",
      headerName: "Transfer From Code",
      width: 240,
    },
    { field: "transfer_to_code", headerName: "Tansfer To Code", width: 240 },
    { field: "posted_date", headerName: "Posted Date", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => <RenderStatus status={params?.row?.status} />,
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
                  <Grid item >
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<AddIcon />}
                      onClick={() => setOpen(true)}
                    >
                      Add New
                    </Button>
                  </Grid>
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
                      rows={viewTransferOrderList?.map((row, index) => ({
                        ...row,
                        sl: index + 1,
                      }))}
                      columns={transfer_order_columns}
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
    </>
  );
};

export default TransferOrders;
