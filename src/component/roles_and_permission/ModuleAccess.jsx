import React from "react";
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

const ModuleAccess = () => {
  const list = [
    {
      id: 1,
      role: "Work Structures",
      icon: <ManageAccountsIcon />,
    },
    {
      id: 2,
      role: "Employee",
      icon: <PeopleIcon />,
    },
    {
      id: 3,
      role: "POS Management",
      icon: <PointOfSaleIcon />,
    },
    {
      id: 4,
      role: "Collections",
      icon: <CollectionsIcon />,
    },
    {
      id: 5,
      role: "Purchase",
      icon: <ShoppingCartIcon />,
    },
    {
      id: 6,
      role: "Inventory",
      icon: <InventoryIcon />,
    },
    {
      id: 7,
      role: "Reports",
      icon: <AssessmentIcon />,
    },
    {
      id: 8,
      role: "EBS Report",
      icon: <DescriptionIcon />,
    },
    {
      id: 9,
      role: "Settings",
      icon: <SettingsIcon />,
    },
  ];
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
                    {list?.map((item) => (
                      <ListItem disablePadding key={item?.id}>
                        <ListItemIcon>{item?.icon}</ListItemIcon>
                        <ListItemText primary={item?.role} />
                        <Switch
                          edge="end"
                          //   onChange={handleToggle("wifi")}
                          //   checked={checked.indexOf("wifi") !== -1}
                          //   inputProps={{
                          //     "aria-labelledby": "switch-list-label-wifi",
                          //   }}
                        />
                      </ListItem>
                    ))}
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
