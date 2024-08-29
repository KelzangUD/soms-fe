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
          label: "Business Unit",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("work-structures/business-unit"),
        },
        {
          label: "Geography",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("work-structures/geography"),
        },
        {
          label: "Department",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("work-structures/department"),
        },
        {
          label: "Designation",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("work-structures/designation"),
        },
        {
          label: "Grade",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("work-structures/grade"),
        },
        {
          label: "Store Location Mapping",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("work-structures/store-location-mapping"),
        },
        {
          label: "Section",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("work-structures/section"),
        },
      ],
    },
    {
      label: "Employee",
      icon: <PeopleIcon />,
      onClick: () => handleNestedItemClick(2),
      nestedItems: [
        {
          label: "Employee List",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("employee/employee-list"),
        },
        {
          label: "Directory",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("employee/directory"),
        },
      ],
    },
    {
      label: "POS Management",
      icon: <PointOfSaleIcon />,
      onClick: () => handleNestedItemClick(3),
      nestedItems: [
        {
          label: "Sales Order",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("pos-management/sales-order"),
        },
        {
          label: "Sales Return",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("pos-management/sales-return"),
        },
        {
          label: "Apply EMI",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("pos-management/apply-emi"),
        },
        {
          label: "EMI History",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("pos-management/emi-history"),
        },
        {
          label: "EMI Approval",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("pos-management/emi-approval"),
        },
      ],
    },
    {
      label: "Collections",
      icon: <CollectionsIcon />,
      onClick: () => handleNestedItemClick(4),
      nestedItems: [
        {
          label: "Cash Receipt",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("collections/cash-receipt"),
        },
        {
          label: "Recharge",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("collections/recharge"),
        },
        {
          label: "Bank Receipt",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("collections/bank-receipt"),
        },
        {
          label: "Credit/EMI Collection",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("collections/credit-or-emi-collection"),
        },
        {
          label: "Advance Collection",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("collections/advance-collection"),
        },
        {
          label: "Advance Collection History",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("collections/advance-collection-history"),
        },
        {
          label: "Advance Refund",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("collections/advance-refund"),
        },
        {
          label: "Advance Refund History",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("collections/advance-refund-history"),
        },
      ],
    },
    {
      label: "Purchase",
      icon: <ShoppingCartIcon />,
      onClick: () => handleNestedItemClick(5),
      nestedItems: [
        {
          label: "Requisitions",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("purchase/requisitions"),
        },
        {
          label: "Requisition List",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("purchase/requisition-list"),
        },
        {
          label: "Requisition Approval",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("purchase/requisition-approval"),
        },
      ],
    },
    {
      label: "Inventory",
      icon: <InventoryIcon />,
      onClick: () => handleNestedItemClick(6),
      nestedItems: [
        {
          label: "Transfer Orders",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("inventory/transfer-orders"),
        },
        {
          label: "Transfer Order Outward",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("inventory/transfer-order-outward"),
        },
        {
          label: "Posted Transfer Shipment",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("inventory/posted-transfer-shipment"),
        },
        {
          label: "Transfer Order Inward",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("inventory/transfer-order-inward"),
        },
        {
          label: "Posted Transfer Receipt",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("inventory/posted-transfer-receipt"),
        },
      ],
    },
    {
      label: "Reports",
      icon: <AssessmentIcon />,
      onClick: () => handleNestedItemClick(7),
      nestedItems: [
        {
          label: "Posted Sales Report",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("reports/posted-sales-invoice"),
        },
        {
          label: "Sales Order List",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("reports/sales-order-list"),
        },
        {
          label: "Return Sale Invoice",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("reports/return-sale-invoice"),
        },
        {
          label: "Payment Collection",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("reports/payment-collection"),
        },
        {
          label: "Recharge Collection",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("reports/recharge-collection"),
        },
        {
          label: "Bank Collection",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("reports/bank-collection"),
        },
        {
          label: "On Hand Report",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("reports/on-hand-report"),
        },
        {
          label: "Sales Order Report",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("reports/sales-order-report"),
        },
        {
          label: "Sales & Stock Report",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("reports/sales-and-stock-report"),
        },
        {
          label: "Sales Report-All",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("reports/sales-report-all"),
        },
        {
          label: "Credit Sale Report",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("reports/credit-sale-report"),
        },
        {
          label: "Transfer Order Report",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("reports/transfer-order-report"),
        },
      ],
    },
    {
      label: "EBS Report",
      icon: <DescriptionIcon />,
      onClick: () => handleNestedItemClick(8),
      nestedItems: [
        {
          label: "Service Log Report",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("ebs-reports/service-log-report"),
        },
        {
          label: "EBS Log For Sales Order",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("ebs-reports/ebs-log-for-sales-order"),
        },
        {
          label: "EBS Log For Sales Receipt",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("ebs-reports/ebs-log-for-sales-receipt"),
        },
        {
          label: "EBS Log For Sales Return",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("ebs-reports/ebs-log-for-sales-return"),
        },
        {
          label: "EBS Log For Requisition",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("ebs-reports/ebs-log-for-requisition"),
        },
        {
          label: "EBS Log For Transfer Order",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("ebs-reports/ebs-log-for-transfer-order"),
        },
        {
          label: "EBS Log For Transfer Order Receipt",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("ebs-reports/ebs-log-for-transfer-order-receipt"),
        },
        {
          label: "EBS Log For Recharge",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("ebs-reports/ebs-log-for-recharge"),
        },
        {
          label: "EBS Log For Cash Collection Report",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("ebs-reports/ebs-log-for-cash-collection-report"),
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
          label: "Approval Rules",
          icon: <KeyboardArrowRightIcon />,
          onClick: () => routeHandle("setting/approval-rules"),
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
                style={{ width: "18%", height: "auto" }}
              />
            </Button>
          </Grid>
          <Grid item xs={12} marginBottom={2}>
            <Typography variant="body2" align="center">
              Sales & Order Management System
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <List
        sx={{ width: "100%", maxWidth: 360, maxHeight: "100vh", overflowY: 'auto' }}
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
