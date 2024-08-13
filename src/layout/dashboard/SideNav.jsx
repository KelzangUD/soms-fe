import React from "react";
import {
  Paper,
  Grid,
  Box,
  Typography,
  Divider,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Logo from "../../assets/images/logo.ico";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleIcon from '@mui/icons-material/People';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import CollectionsIcon from '@mui/icons-material/Collections';
import AssessmentIcon from "@mui/icons-material/Assessment";
import DescriptionIcon from '@mui/icons-material/Description';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function SideNav() {
  const navigation = useNavigate();
  const containerStyle = {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 0,
    backgroundColor: "#F5F7F8",
  };
  const routeHandle = (route) => {
    navigation(route);
  };
  const handleNestedItemClick = (index) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };
  const menuItems = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      onClick: () => routeHandle("/home/dashboard"),
    },
    {
      label: "Work Structures",
      icon: <ManageAccountsIcon />,
      onClick: () => handleNestedItemClick(1),
      nestedItems: [
        {
          label: "User",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("system-setting/user"),
        },
        {
          label: "Activity Logs",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("system-setting/activity-logs"),
        },
      ],
    },
    {
      label: "Employee",
      icon: <PeopleIcon />,
      onClick: () => handleNestedItemClick(2),
      nestedItems: [
        {
          label: "User",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("system-setting/user"),
        },
        {
          label: "Activity Logs",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("system-setting/activity-logs"),
        },
      ],
    },
    {
      label: "POS Management",
      icon: <PointOfSaleIcon />,
      onClick: () => handleNestedItemClick(3),
      nestedItems: [
        {
          label: "User",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("system-setting/user"),
        },
        {
          label: "Activity Logs",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("system-setting/activity-logs"),
        },
      ],
    },
    {
      label: "Collections",
      icon: <CollectionsIcon />,
      onClick: () => handleNestedItemClick(4),
      nestedItems: [
        {
          label: "User",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("system-setting/user"),
        },
        {
          label: "Activity Logs",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("system-setting/activity-logs"),
        },
      ],
    },
    {
      label: "Purchase",
      icon: <ShoppingCartIcon />,
      onClick: () => handleNestedItemClick(5),
      nestedItems: [
        {
          label: "User",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("system-setting/user"),
        },
        {
          label: "Activity Logs",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("system-setting/activity-logs"),
        },
      ],
    },
    {
      label: "Inventory",
      icon: <InventoryIcon />,
      onClick: () => handleNestedItemClick(6),
      nestedItems: [
        {
          label: "User",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("system-setting/user"),
        },
        {
          label: "Activity Logs",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("system-setting/activity-logs"),
        },
      ],
    },
    {
      label: "Report",
      icon: <AssessmentIcon />,
      onClick: () => handleNestedItemClick(7),
      nestedItems: [
        {
          label: "Current Month",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("report/current-month"),
        },
        {
          label: "Six Months",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("report/six-months"),
        },
        {
          label: "One Year",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("report/one-year"),
        },
      ],
    },
    {
      label: "EBS Report",
      icon: <DescriptionIcon />,
      onClick: () => handleNestedItemClick(8),
      nestedItems: [
        {
          label: "User",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("system-setting/user"),
        },
        {
          label: "Activity Logs",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("system-setting/activity-logs"),
        },
      ],
    },
    {
      label: "Setting",
      icon: <SettingsIcon />,
      onClick: () => handleNestedItemClick(9),
      nestedItems: [
        {
          label: "Company Setting",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("setting/company-setting"),
        },
        {
          label: "Roles & Permission",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("setting/roles-and-permission"),
        },
        {
          label: "System Users",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("setting/system-users"),
        },
        {
          label: "Approval Rule",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("setting/approval-rule"),
        },
        {
          label: "Hierarchy",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("setting/hierarchy"),
        },
        {
          label: "Delegation",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("setting/delegation"),
        },
      ],
    },
  ];
  const [openStates, setOpenStates] = React.useState(
    menuItems.map(() => false)
  );

  return (
    <Paper style={containerStyle}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container alignItems="center">
          <Grid item xs={12} alignItems="center">
            <Button
              type="button"
              variant="text"
              color="primary"
              size="large"
              fullWidth
            >
              <img
                src={Logo}
                alt="Logo"
                style={{ width: "30%", height: "auto" }}
              />
            </Button>
          </Grid>
          <Grid item xs={12} marginBottom={2}>
            <Typography variant="body1" align="center">
              Sales & Order Management System
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <List
        sx={{ width: "100%", maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItemButton onClick={item.onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
              {item.nestedItems &&
                (openStates[index] ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            {item.nestedItems && (
              <Collapse in={openStates[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.nestedItems.map((nestedItem, nestedIndex) => (
                    <ListItemButton
                      key={nestedIndex}
                      sx={{ pl: 4 }}
                      onClick={nestedItem.onClick}
                    >
                      <ListItemIcon>{nestedItem.icon}</ListItemIcon>
                      <ListItemText primary={nestedItem.label} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}
