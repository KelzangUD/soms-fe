import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleIcon from "@mui/icons-material/People";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import CollectionsIcon from "@mui/icons-material/Collections";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DescriptionIcon from "@mui/icons-material/Description";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const MenuItems = [
  {
    module: "Dashboard",
    icon: (
      <DashboardIcon
        fontSize="small"
        sx={{
          color: "#eee",
        }}
      />
    ),
    route: "/home/dashboard",
  },
  {
    module: "Work Structures",
    icon: (
      <ManageAccountsIcon
        fontSize="small"
        sx={{
          color: "#eee",
        }}
      />
    ),
    // itemNumber: 1,
    nestedItems: [
      {
        page: "Business Unit",
        route: "work-structures/business-unit",
      },
      {
        page: "Geography",
        route: "work-structures/geography",
      },
      {
        page: "Department",
        route: "work-structures/department",
      },
      {
        page: "Designation",
        route: "work-structures/designation",
      },
      {
        page: "Grade",
        route: "work-structures/grade",
      },
      {
        page: "Store Location Mapping",
        route: "work-structures/store-location-mapping",
      },
      {
        page: "Section",
        route: "work-structures/section",
      },
    ],
  },
  {
    module: "Employee",
    icon: (
      <PeopleIcon
        fontSize="small"
        sx={{
          color: "#eee",
        }}
      />
    ),
    // itemNumber: 2,
    nestedItems: [
      {
        page: "Employee List",
        route: "employee/employee-list",
      },
      {
        page: "Directory",
        route: "employee/directory",
      },
    ],
  },
  {
    module: "POS Management",
    icon: (
      <PointOfSaleIcon
        fontSize="small"
        sx={{
          color: "#eee",
        }}
      />
    ),
    // itemNumber: 3,
    nestedItems: [
      {
        page: "Sales Order",
        route: "pos-management/sales-order",
      },
      {
        page: "Sales Return",
        route: "pos-management/sales-return",
      },
      // {
      //   page: "Apply EMI",
      //   route: "pos-management/apply-emi",
      // },
      {
        page: "EMI History",
        route: "pos-management/emi-history",
      },
      // {
      //   page: "EMI Approval",
      //   route: "pos-management/emi-approval",
      // },
    ],
  },
  {
    module: "Collections",
    icon: (
      <CollectionsIcon
        fontSize="small"
        sx={{
          color: "#eee",
        }}
      />
    ),
    // itemNumber: 4,
    nestedItems: [
      {
        page: "Payment Receipt",
        route: "collections/payment-receipt",
      },
      {
        page: "Recharge",
        route: "collections/recharge",
      },
      // {
      //   page: "Credit/EMI Collection",
      //   route: "collections/credit-or-emi-collection",
      // },
      // {
      //   page: "Advance Collection",
      //   route: "collections/advance-collection",
      // },
      // {
      //   page: "Advance Collection History",
      //   route: "collections/advance-collection-history",
      // },
      // {
      //   page: "Advance Refund",
      //   route: "collections/advance-refund",
      // },
      // {
      //   page: "Advance Refund History",
      //   route: "collections/advance-refund-history",
      // },
    ],
  },
  {
    module: "Purchase",
    icon: (
      <ShoppingCartIcon
        fontSize="small"
        sx={{
          color: "#eee",
        }}
      />
    ),
    // itemNumber: 5,
    nestedItems: [
      {
        page: "Requisitions",
        route: "purchase/requisitions",
      },
      {
        page: "Requisition List",
        route: "purchase/requisition-list",
      },
      {
        page: "Requisition Approval",
        route: "purchase/requisition-approval",
      },
    ],
  },
  {
    module: "Inventory",
    icon: (
      <InventoryIcon
        fontSize="small"
        sx={{
          color: "#eee",
        }}
      />
    ),
    // itemNumber: 6,
    nestedItems: [
      {
        page: "Transfer Orders",
        route: "inventory/transfer-orders",
      },
      {
        page: "Transfer Order Outward",
        route: "inventory/transfer-order-outward",
      },
      {
        page: "Posted Transfer Shipment",
        route: "inventory/posted-transfer-shipment",
      },
      {
        page: "Transfer Order Inward",
        route: "inventory/transfer-order-inward",
      },
      {
        page: "Posted Transfer Receipts",
        route: "inventory/posted-transfer-receipt",
      },
    ],
  },
  {
    module: "Reports",
    icon: (
      <AssessmentIcon
        fontSize="small"
        sx={{
          color: "#eee",
        }}
      />
    ),
    // itemNumber: 7,
    nestedItems: [
      {
        page: "Posted Sales Invoice",
        route: "reports/posted-sales-invoice",
      },
      {
        page: "Sales Order List",
        route: "reports/sales-order-list",
      },
      {
        page: "Sales Return List",
        route: "reports/sales-return-list",
      },
      {
        page: "Return Sale Invoice",
        route: "reports/return-sale-invoice",
      },
      {
        page: "Payment Collection",
        route: "reports/payment-collection",
      },
      {
        page: "Recharge Collection",
        route: "reports/recharge-collection",
      },
      {
        page: "Bank Collection",
        route: "reports/bank-collection",
      },
      {
        page: "On Hand Report",
        route: "reports/on-hand-report",
      },
      {
        page: "Sales Order Report",
        route: "reports/sales-order-report",
      },
      {
        page: "Sales and Stock Report",
        route: "reports/sales-and-stock-report",
      },
      {
        page: "Sales Report - All",
        route: "reports/sales-report-all",
      },
      {
        page: "Sales Return Report",
        route: "reports/sales-return-report",
      },
      {
        page: "Credit Sale Report",
        route: "reports/credit-sale-report",
      },
      {
        page: "Transfer Order Report",
        route: "reports/transfer-order-report",
      },
      {
        page: "Samsung Warranty Report",
        route: "reports/samsung-warranty-report",
      },
      // {
      //   page: "Service Log Report",
      //   route: "report/ebsservicelog",
      // },
    ],
  },
  {
    module: "EBS Report",
    icon: (
      <DescriptionIcon
        fontSize="small"
        sx={{
          color: "#eee",
        }}
      />
    ),
    // itemNumber: 8,
    nestedItems: [
      {
        page: "Service Log Report",
        route: "ebs-reports/service-log-report",
      },
      {
        page: "EBS Log For Sales Order",
        route: "ebs-reports/ebs-log-for-sales-order",
      },
      {
        page: "EBS Log For Sales Receipt",
        route: "ebs-reports/ebs-log-for-sales-receipt",
      },
      {
        page: "EBS Log For Sales Return",
        route: "ebs-reports/ebs-log-for-sales-return",
      },
      {
        page: "EBS Log For Requisition",
        route: "ebs-reports/ebs-log-for-requisition",
      },
      {
        page: "EBS Log For Transfer Order",
        route: "ebs-reports/ebs-log-for-transfer-order",
      },
      {
        page: "EBS Log For Transfer Order Receipt",
        route: "ebs-reports/ebs-log-for-transfer-order-receipt",
      },
      {
        page: "EBS Log For Recharge",
        route: "ebs-reports/ebs-log-for-recharge",
      },
      {
        page: "EBS Log For Cash Collection Report",
        route: "ebs-reports/ebs-log-for-cash-collection-report",
      },
    ],
  },
  {
    module: "Settings",
    icon: (
      <SettingsIcon
        fontSize="small"
        sx={{
          color: "#eee",
        }}
      />
    ),
    // itemNumber: 9,
    nestedItems: [
      {
        page: "Company Settings",
        route: "setting/company-setting",
      },
      {
        page: "Roles & permissions",
        route: "setting/roles-and-permission",
      },
      {
        page: "System Users",
        route: "setting/system-users",
      },
      {
        page: "Approval Rule",
        route: "setting/approval-rules",
      },
      {
        page: "Hierarchy",
        route: "setting/hierarchy",
      },
      // {
      //   page: "Delegation",
      //   route: "setting/delegation",
      // },
    ],
  },
];
