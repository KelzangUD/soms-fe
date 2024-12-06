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
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "full_name", headerName: "Name", width: 150 },
    { field: "email_address", headerName: "Email", width: 230 },
    { field: "createdDate", headerName: "Created Date", width: 120 },
    {
      field: "roleName",
      headerName: "Role",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => <RenderStatus status={params?.row?.status} />,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => handleAction(params?.row?.user_code, "edit")}
            color="primary"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="view"
            size="small"
            onClick={() => handleAction(params.row.user_code, "view")}
            color="secondary"
          >
            <VisibilityIcon fontSize="inherit" />
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
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid item>
              <Paper
                sx={{
                  p: "2px 4px",
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
                aria-label="add"
                color="primary"
                onClick={handleAddUser}
                endIcon={<AddIcon />}
              >
                Add New
              </Button>
              <IconButton
                aria-label="add"
                color="success"
                // onClick={}
              >
                <FileDownloadIcon />
              </IconButton>
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
