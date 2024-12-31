import React, { useState, useEffect } from "react";
import { Box, Grid, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { CustomDataTable } from "../../component/common/index";
import Route from "../../routes/Route";
import EditHierarchyDialog from "./EditHierarchyDialog";
import AddHierarchyDialog from "./AddHierarchyDialog";

const Hierarchy = () => {
  const access_token = localStorage.getItem("access_token");
  const [hierarchyList, setHierarchyList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [hierarchyDtls, setHierarcyDtls] = useState("");
  const [hierarchyRole, setHierarchyRole] = useState([]);
  const [hierarchyName, setHierarchyName] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchHierarchyList = async () => {
    const res = await Route(
      "GET",
      `/UserDtls/getHierarchyList`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      const rowsWithIds = (res?.data || []).map((item, index) => ({
        ...item,
        id: index + 1,
        sl: index + 1,
      }));
      setHierarchyList(rowsWithIds);
    }
  };

  const fetchHierarchyRole = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchRoleForHierarchy`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setHierarchyRole(res?.data);
    }
  };

  useEffect(() => {
    fetchHierarchyList();
    fetchHierarchyRole();
  }, []);

  const columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.05 },
    { field: "hierarchyName", headerName: "Hierarchy Name", flex: 0.9 },
    {
      field: "action",
      headerName: "Action",
      flex: 0.2,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            size="small"
            color="primary"
            onClick={() => handleEditHierarchy(params?.row?.hierarchyName)}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];

  const handleEditHierarchy = async (name) => {
    const res = await Route(
      "GET",
      `/UserDtls/getHierarchy/${name}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setHierarchyName(name);
      setHierarcyDtls(res?.data);
      setShowEditModal(true);
    }
  };

  const handleClose = () => {
    setShowEditModal(false);
  };

  const handleAddHierarchy = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
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
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                endIcon={<AddIcon />}
                onClick={handleAddHierarchy}
              >
                Add New
              </Button>
            </Grid>
          </Grid>
          <Grid item container alignItems="center" xs={12}>
            <CustomDataTable rows={hierarchyList} cols={columns} />
          </Grid>
        </Grid>
      </Box>
      {showEditModal && (
        <EditHierarchyDialog
          hierarchyDtls={hierarchyDtls}
          hierarchyRole={hierarchyRole}
          hierarchyName={hierarchyName}
          handleClose={handleClose}
          open={showEditModal}
        />
      )}
      {showAddModal && (
        <AddHierarchyDialog
          hierarchyRole={hierarchyRole}
          handleClose={handleCloseAddModal}
          fetchHierarchyList={fetchHierarchyList}
          open={showAddModal}
        />
      )}
    </>
  );
};

export default Hierarchy;
