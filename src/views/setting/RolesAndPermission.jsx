import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ModuleAccess from "../../component/roles_and_permission/ModuleAccess";
import Route from "../../routes/Route";
import AddNewRoleModal from "./AddNewRoleModal";

const RolesAndPermission = () => {
  const [roles_list, setRoles_list] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [moduleAccess, setModuleAccess] = useState([]);
  const [modulePermission, setModulePermission] = useState([]);
  const [showAddRole, setShowAddRole] = useState(false);

  const fetchRoles = async () => {
    const res = await Route("GET", `/Common/FetchRole`, null, null, null);
    if (res?.status === 200) {
      setRoles_list(res?.data);
      if (!selectedId && res.data.length > 0) {
        setSelectedId(res.data[0].id);
      }
    }
  };

  const fetchModulePermission = async (id) => {
    const res = await Route("GET", `/Common/fetchModulePermission?roleId=${id}`, null, null, null);
    if (res?.status === 200) {
      setModulePermission(res?.data);
    }
  };

  const fetchModuleAccess = async ( id ) => {
    const res = await Route("GET", `/Common/fetchModuleAccess?roleId=${id}`, null, null, null);
    if (res?.status === 200) {
      setModuleAccess(res?.data);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    if (selectedId) {
      fetchModuleAccess(selectedId);
      fetchModulePermission(selectedId);
    }
  }, [selectedId]);

  const handleItemClick = (id) => {
    setSelectedId(id);
  };

  const addNewRole = () => {
    setShowAddRole(true);
  };

  const closeAddModal = () => {
    setShowAddRole(false);
  };

  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          {/* <SubHeader text="Roles And Permission" /> */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={3} container spacing={2} sx={{ mb: 1 }}>
                <Grid item xs={12} sx={{ my: 1 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={addNewRole}
                    startIcon={<AddIcon />}
                    sx={{ mb: 2 }}
                  >
                    Add Roles
                  </Button>
                  <Paper>
                    <List>
                      {roles_list?.map((item, index) => (
                        <ListItem disablePadding key={item?.id || `role-${index}`}>
                          <ListItemButton
                            selected={selectedId === item?.id}
                            onClick={() => handleItemClick(item?.id)}
                          >
                            <ListItemText primary={item?.type} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
              <Grid item xs={9} sx={{ my: 1 }}>
                <ModuleAccess moduleAccess={ moduleAccess } roleId={selectedId} modulePermission={modulePermission}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {showAddRole && <AddNewRoleModal open={showAddRole} handleClose={closeAddModal} fetchRole={fetchRoles}/>}
    </>
  );
};

export default RolesAndPermission;
