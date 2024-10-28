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

const ModuleAccess = ({ moduleAccess, roleId }) => {
  const [moduleList, setModuleList] = useState([]);
  const [access, setAccess] = useState([]);

  useEffect(() => {
    setAccess(moduleAccess);
  }, [moduleAccess]);

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
  };

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
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>Business Unit (Work Structures)</TableCell>
                        <TableCell align="right">
                          <Checkbox />
                        </TableCell>
                        <TableCell align="right">
                          <Checkbox />
                        </TableCell>
                        <TableCell align="right">
                          <Checkbox />
                        </TableCell>
                        <TableCell align="right">
                          <Checkbox />
                        </TableCell>
                        <TableCell align="right">
                          <Checkbox />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <Grid
              item
              container
              spacing={2}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                // onClick={updateHandle}
                >
                  Save/Update
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ModuleAccess;
