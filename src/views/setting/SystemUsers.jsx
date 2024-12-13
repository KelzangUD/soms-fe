import React, { useState, useEffect } from "react";
import { Box, Paper, Grid, Button, InputBase, IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddSystemUserDialog from "./AddSysteUserDialog";
import ViewEditSystemUserModal from "./ViewEditSystemUserModal";
import { CustomDataTable } from "../../component/common/index";
import { RenderStatus } from "../../ui";
import Route from "../../routes/Route";

const SystemUsers = () => {
  const access_token = localStorage.getItem("access_token");
  const [systemUsers, setSystemUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [userDtls, setUserDtls] = useState("");

  const handleAction = async (userCode, type) => {
    setActionType(type);
    const res = await Route(
      "GET",
      `/UserDtls/fetchUserDetails?userId=${userCode}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setUserDtls(res?.data);
      setShowViewModal(true);
    }
  };

  const columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.3 },
    { field: "full_name", headerName: "Name", flex: 1.5 },
    { field: "email_address", headerName: "Email", flex: 2.3 },
    { field: "createdDate", headerName: "Created Date", flex: 1.2 },
    {
      field: "roleName",
      headerName: "Role",
      flex: 1.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1.5,
      renderCell: (params) => <RenderStatus status={params?.row?.status} />,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="view"
            size="small"
            onClick={() => handleAction(params.row.user_code, "view")}
            color="primary"
          >
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => handleAction(params?.row?.user_code, "edit")}
            color="success"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];

  const fetchSystemUsers = async () => {
    const res = await Route(
      "GET",
      "/UserDtls/getAllUserList",
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      const rowsWithIds = (res?.data || []).map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      setSystemUsers(rowsWithIds);
    }
  };

  useEffect(() => {
    fetchSystemUsers();
  }, []);

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Grid item alignContent="center">
              <Button
                variant="contained"
                aria-label="add"
                color="primary"
                onClick={handleAddUser}
                endIcon={<AddIcon />}
              >
                Add New
              </Button>
            </Grid>
          </Grid>
          <Grid item container alignItems="center" xs={12}>
            <CustomDataTable
              rows={systemUsers?.map((row, index) => ({
                ...row,
                sl: index + 1,
              }))}
              cols={columns}
            />
          </Grid>
        </Grid>
      </Box>
      {showAddModal && (
        <AddSystemUserDialog
          open={showAddModal}
          handleClose={handleCloseAddModal}
          fetchSystemUser={fetchSystemUsers}
        />
      )}
      {showViewModal && (
        <ViewEditSystemUserModal
          open={showViewModal}
          handleClose={handleCloseViewModal}
          fetchSystemUser={fetchSystemUsers}
          data={userDtls}
          actionType={actionType}
        />
      )}
    </>
  );
};

export default SystemUsers;
