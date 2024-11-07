import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleIcon from "@mui/icons-material/People";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import CollectionsIcon from "@mui/icons-material/Collections";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DescriptionIcon from "@mui/icons-material/Description";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import Route from "../../routes/Route";
import Notification from '../../ui/Notification';

const iconList = [
  { role: "Work Structures", icon: <ManageAccountsIcon /> },
  { role: "Employee", icon: <PeopleIcon /> },
  { role: "POS Management", icon: <PointOfSaleIcon /> },
  { role: "Collections", icon: <CollectionsIcon /> },
  { role: "Purchase", icon: <ShoppingCartIcon /> },
  { role: "Inventory", icon: <InventoryIcon /> },
  { role: "Reports", icon: <AssessmentIcon /> },
  { role: "EBS Report", icon: <DescriptionIcon /> },
  { role: "Settings", icon: <SettingsIcon /> },
];

const ModuleAccess = ({ moduleAccess, roleId, modulePermission }) => {
  const user = localStorage.getItem('username');
  const [moduleList, setModuleList] = useState([]);
  const [access, setAccess] = useState([]);
  const [permissionList, setPermissionList] = useState([]);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [showNotification, setShowNofication] = useState(false);
  const [severity, setSeverity] = useState('');
  const [changedAccess, setChangedAccess] = useState([]); // Store only changed access records
  const [changedPermissions, setChangedPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setAccess(moduleAccess);
    setPermissionList(modulePermission);

    setTimeout(() => {
      setIsLoading(false); // Set loading to false once data is ready
    }, 30000);
  }, [moduleAccess, modulePermission]);

  const fetchAllModule = async () => {
    const res = await Route("GET", `/Common/getAllModule`, null, null, null);
    if (res?.status === 200) {
      const modulesWithIcons = res.data.map(module => ({
        ...module,
        icon: getIconForModule(module.module_name)
      }));
      setModuleList(modulesWithIcons);
    }
  };

  useEffect(() => {
    fetchAllModule();
  }, []);

  const getIconForModule = (moduleName) => {
    const match = iconList.find(item => item.role === moduleName);
    return match ? match.icon : null; // Return the icon or null if not found
  };

  const combinedModules = moduleList.map(module => {
    const accessModule = access.find(access => access.module_id === module.module_id);
    return {
      ...module,
      isactive: accessModule ? accessModule.isactive : 0
    };
  });

  const handleSwitchChange = (moduleId, currentState) => {
    const newState = currentState === 1 ? 0 : 1;
    setAccess((prevAccess) =>
      prevAccess.map((access) =>
        access.module_id === moduleId ? { ...access, isactive: newState } : access
      )
    );

    // Record only the changed module
    setChangedAccess((prevChanges) => {
      const updatedModule = { module_id: moduleId, isactive: newState };
      const isAlreadyChanged = prevChanges.some((change) => change.module_id === moduleId);

      if (isAlreadyChanged) {
        // If already in changes, replace it
        return prevChanges.map((change) =>
          change.module_id === moduleId ? updatedModule : change
        );
      }
      return [...prevChanges, updatedModule]; // Add new change
    });
  };

  // Group permissions by page
  const groupedPermissions = permissionList.reduce((acc, permission) => {
    const { page_name, module_name } = permission;
    const key = `${module_name} - ${page_name}`;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(permission);
    return acc;
  }, {});

  const handleToggle = (id) => {
    setPermissionList((prevList) =>
      prevList.map((item) =>
        item.role_permission_id === id
          ? { ...item, status: item.status === "Active" ? "In_Active" : "Active" }
          : item
      )
    );

    // Record only the changed permission
    setChangedPermissions((prevChanges) => {
      const updatedPermission = {
        role_permission_id: id,
        status: permissionList.find((item) => item.role_permission_id === id)?.status === "Active"
          ? "In_Active"
          : "Active",
      };
      const isAlreadyChanged = prevChanges.some((change) => change.role_permission_id === id);

      if (isAlreadyChanged) {
        // If already in changes, replace it
        return prevChanges.map((change) =>
          change.role_permission_id === id ? updatedPermission : change
        );
      }
      return [...prevChanges, updatedPermission]; // Add new change
    });
  };

  const updateRolePermission = async () => {
    let data = {
      'moduleAccessDtos': changedAccess,
      'roleAndPermissionDtos': changedPermissions,
      'roleId': roleId,
      'updateBy': user
    }

    const res = await Route("POST", `/UserDtls/updateRolePermission`, null, data, null);
    if (res?.status === 200) {
      setNotificationMsg('Role Permission has been successfully updated.');
      setSeverity("info");
      setShowNofication(true);
    } else {
      setNotificationMsg('Error occured updating role permission. Try again!');
      setSeverity("error");
      setShowNofication(true);
    }
  };

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
        <CircularProgress /> {/* Loader while data is loading */}
      </Grid>
    );
  }

  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          {/* <SubHeader text="Module Access" /> */}
          <Grid item xs={12}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item sx={{ width: "100%" }}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Module Access
                </Typography>
                <Paper>
                  <List sx={{ paddingX: "16px" }}>
                    {
                      combinedModules?.map((item) => (
                        <ListItem disablePadding key={item?.id}>
                          <ListItemIcon>{item?.icon}</ListItemIcon>
                          <ListItemText primary={item?.module_name} />
                          <Switch
                            edge="end"
                            checked={item?.isactive === 1}
                            onChange={() => handleSwitchChange(item.module_id, item.isactive)}
                          />
                        </ListItem>
                      ))
                    }
                  </List>
                </Paper>
              </Grid>
            </Grid>
            <Grid item container spacing={2} sx={{ mb: 2 }}>
              <Grid item sx={{ width: "100%" }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "800" }}>
                          Module Permission
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "800" }}>
                          View
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "800" }}>
                          Create
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "800" }}>
                          Update
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "800" }}>
                          Import
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "800" }}>
                          Export
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(groupedPermissions).map(([page, permissions]) => {
                        // Check if the associated module is active
                        const moduleId = permissions[0]?.module_id; // Assuming all permissions have the same module_id
                        const module = combinedModules.find(mod => mod.module_id === moduleId);

                        return (
                          module?.isactive === 1 && ( // Only render if the module is active
                            <TableRow
                              key={page}
                              id={`page-${page}`} // Set the id as "page-{page}"
                              sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                              }}
                            >
                              {/* Combine module_name and page_name for the first cell */}
                              <TableCell>
                                {`${permissions[0]?.module_name} (${permissions[0]?.page_name})`}
                              </TableCell>

                              {/* Render checkboxes for each permission type */}
                              {['View', 'Create', 'Update', 'Import', 'Export'].map((perm) => {
                                const permission = permissions.find((p) => p.permission_name === perm);
                                return (
                                  <TableCell align="right" key={`${page}-${perm}`}>
                                    <Checkbox
                                      checked={permission?.status === 'Active'}
                                      onChange={() => handleToggle(permission?.role_permission_id)}
                                      disabled={!permission} // Disable if permission is not found
                                    />
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          )
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <Grid
              item
              container
              spacing={2}
              sx={{ justifyContent: 'center' }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  onClick={updateRolePermission}
                >
                  Save/Update
                </Button>
              </Grid>
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
    </>
  );
};

export default ModuleAccess;
