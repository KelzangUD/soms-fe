import React, { useState, useEffect } from "react";
import { Box, Paper, Grid, Button, InputBase, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Route from "../../routes/Route";
import EditHierarchyDialog from "./EditHierarchyDialog";
import AddHierarchyDialog from "./AddHierarchyDialog";

const Hierarchy = () => {
  const [hierarchyList, setHierarchyList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [hierarchyDtls, setHierarcyDtls] = useState('');
  const [hierarchyRole, setHierarchyRole] = useState([]);
  const [hierarchyName, setHierarchyName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchHierarchyList = async () => {
    const res = await Route("GET", `/UserDtls/getHierarchyList`, null, null, null);
    if (res?.status === 200) {
      const rowsWithIds = (res?.data || []).map((item, index) => ({ ...item, id: index + 1 }));
      setHierarchyList(rowsWithIds);
    }
  };

  const fetchHierarchyRole = async () => {
    const res = await Route('GET', `/Common/FetchRoleForHierarchy`, null, null, null);
    if (res?.status === 200) {
      setHierarchyRole(res?.data);
    }
  };

  useEffect(() => {
    fetchHierarchyList();
    fetchHierarchyRole();
  }, []);

  const columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.1 },
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
            onClick={() => handleEditHierarchy(params.row.hierarchyName)}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];

  const handleEditHierarchy = async (name) => {
    const res = await Route('GET', `/UserDtls/getHierarchy/${name}`, null, null, null);
    if(res?.status === 200) {
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
          {/* <SubHeader text="Hierarchy" /> */}
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
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                endIcon={<AddIcon />}
                sx={{ mr: 2 }}
                onClick={handleAddHierarchy}
              >
                Add New
              </Button>
            </Grid>
          </Grid>
          <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
            <div style={{ height: "auto", width: "100%", background: "#fff" }}>
              <DataGrid
                rows={hierarchyList?.map((row, index) => ({
                  ...row,
                  sl: index + 1,
                }))}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10, 50, 100]}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
      {showEditModal && <EditHierarchyDialog hierarchyDtls={hierarchyDtls} hierarchyRole={hierarchyRole} hierarchyName={hierarchyName} handleClose={handleClose} open={showEditModal}/>}
      {showAddModal && <AddHierarchyDialog hierarchyRole={hierarchyRole} handleClose={handleCloseAddModal} fetchHierarchyList={fetchHierarchyList} open={showAddModal}/>}
    </>
  );
};

export default Hierarchy;
