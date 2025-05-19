import React, { useState, useEffect } from "react";
import { Box, Grid, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddSystemUserDialog from "./AddSysteUserDialog";
import ViewEditSystemUserModal from "./ViewEditSystemUserModal";
import { CustomDataTable } from "../../component/common/index";
import { RenderStatus } from "../../ui";
import Route from "../../routes/Route";
import { useCommon } from "../../contexts/CommonContext";

const SystemUsers = () => {
  const access_token = localStorage.getItem("access_token");
  const { isMdUp } = useCommon();
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
    {
      field: "sl",
      headerName: "Sl. No",
      flex: isMdUp ? 0.4 : undefined,
      width: isMdUp ? undefined : 80,
    },
    {
      field: "full_name",
      headerName: "Name",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 180,
    },
    {
      field: "email_address",
      headerName: "Email",
      flex: isMdUp ? 2.3 : undefined,
      width: isMdUp ? undefined : 280,
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      flex: isMdUp ? 1.2 : undefined,
      width: isMdUp ? undefined : 180,
    },
    {
      field: "roleName",
      headerName: "Role",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 180,
    },
    {
      field: "status",
      headerName: "Status",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 130,
      renderCell: (params) => <RenderStatus status={params?.row?.status} />,
    },
    {
      field: "action",
      headerName: "Action",
      flex: isMdUp ? 1 : undefined,
      width: isMdUp ? undefined : 100,
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
            color="success"
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
        <Grid container spacing={2} alignItems="center" sx={{ px: 2 }}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
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
          setOpen={setShowAddModal}
          fetchSystemUser={fetchSystemUsers}
        />
      )}
      {showViewModal && (
        <ViewEditSystemUserModal
          open={showViewModal}
          setOpen={setShowViewModal}
          fetchSystemUser={fetchSystemUsers}
          data={userDtls}
          actionType={actionType}
        />
      )}
    </>
  );
};

export default SystemUsers;
