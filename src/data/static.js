import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

// ==================== Sales Report-All Headers =================================
export const sales_report_all_columns = (isMdUp) => {
  return [
    {
      field: "sl",
      headerName: "Sl. No",
      flex: isMdUp ? 0.4 : undefined,
      width: isMdUp ? undefined : 80,
    },
    {
      field: "sales_type",
      headerName: "Sales Type",
      flex: isMdUp ? 1 : undefined,
      width: isMdUp ? undefined : 120,
      valueGetter: (params) =>
        params?.row?.isTitle ? null : params?.row?.sales_type || "---",
    },
    {
      field: "item_code",
      headerName: "Item Code",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 180,
      valueGetter: (params) => params?.row?.item_code || "---",
    },
    {
      field: "item_description",
      headerName: "Item Description",
      flex: isMdUp ? 3 : undefined,
      width: isMdUp ? undefined : 300,
      valueGetter: (params) =>
        params?.row?.isTitle ? null : params?.row?.item_description || "---",
    },
    {
      field: "gross_amount",
      headerName: "Gross Amount",
      flex: isMdUp ? 1 : undefined,
      width: isMdUp ? undefined : 140,
      valueGetter: (params) =>
        params?.row?.isTitle ? null : params?.row?.gross_amount || "---",
    },
    {
      field: "discount_Value",
      headerName: "Discount/Commission",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 190,
      valueGetter: (params) =>
        params?.row?.isTitle ? null : params?.row?.discount_Value || "---",
    },
    {
      field: "additional_Discount",
      headerName: "Add. Dis",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 100,
      valueGetter: (params) =>
        params?.row?.isTitle ? null : params?.row?.additional_Discount || "---",
    },
    {
      field: "line_Discount_Amount",
      headerName: "Lots of Sale Dis",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 150,
      valueGetter: (params) =>
        params?.row?.isTitle
          ? null
          : params?.row?.line_Discount_Amount || "---",
    },
    {
      field: "tds_Amount",
      headerName: "TDS",
      flex: isMdUp ? 0.8 : undefined,
      width: isMdUp ? undefined : 80,
      valueGetter: (params) =>
        params?.row?.isTitle ? null : params?.row?.tds_Amount || "---",
    },
    {
      field: "tax_Amount",
      headerName: "GST Amount",
      flex: isMdUp ? 1.2 : undefined,
      width: isMdUp ? undefined : 120,
      valueGetter: (params) =>
        params?.row?.isTitle ? null : params?.row?.tax_Amount || "---",
    },
    {
      field: "net_amount",
      headerName: "Net Amount",
      flex: isMdUp ? 1.2 : undefined,
      width: isMdUp ? undefined : 180,
      valueGetter: (params) =>
        params?.row?.isTitle ? null : params?.row?.net_amount || "---",
    },
  ];
};
// ==================== Sales And Order Report Headers ===========================
export const sales_and_stock_report_columns = (isMdUp) => {
  return [
    {
      field: "sl",
      headerName: "Sl. No",
      flex: isMdUp ? 0.4 : undefined,
      width: isMdUp ? undefined : 80,
    },
    {
      field: "item_code",
      headerName: "Item Code",
      flex: isMdUp ? 1.8 : undefined,
      width: isMdUp ? undefined : 150,
    },
    {
      field: "item_details",
      headerName: "Particulars (Details of Item)",
      flex: isMdUp ? 3.2 : undefined,
      width: isMdUp ? undefined : 380,
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: isMdUp ? 0.5 : undefined,
      width: isMdUp ? undefined : 80,
    },
    {
      field: "opening_balance",
      headerName: "Opening Balance (Qty)",
      flex: isMdUp ? 1.4 : undefined,
      width: isMdUp ? undefined : 170,
    },
    {
      field: "stock_received",
      headerName: "Stock Received (Qty)",
      flex: isMdUp ? 1.4 : undefined,
      width: isMdUp ? undefined : 170,
    },
    {
      field: "transfer_out",
      headerName: "Transfer Out (Qty)",
      flex: isMdUp ? 1.2 : undefined,
      width: isMdUp ? undefined : 150,
    },
    {
      field: "sales_qty",
      headerName: "Sales Qty",
      flex: isMdUp ? 0.7 : undefined,
      width: isMdUp ? undefined : 100,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: isMdUp ? 0.7 : undefined,
      width: isMdUp ? undefined : 90,
    },
    {
      field: "closing_balance",
      headerName: "Closing Balance",
      flex: isMdUp ? 1 : undefined,
      width: isMdUp ? undefined : 140,
    },
  ];
};
// ===================== On-Hand Report Headers ===============================
export const on_hand_report_columns = (isMdUp) => {
  return [
    {
      field: "sl",
      headerName: "Sl. No",
      flex: isMdUp ? 0.4 : undefined,
      width: isMdUp ? undefined : 80,
    },
    {
      field: "item",
      headerName: "Item No",
      flex: isMdUp ? 2 : undefined,
      width: isMdUp ? undefined : 130,
    },
    {
      field: "item_description",
      headerName: "Item Description",
      flex: isMdUp ? 3.5 : undefined,
      width: isMdUp ? undefined : 380,
    },
    {
      field: "uom",
      headerName: "UOM",
      flex: isMdUp ? 1.1 : undefined,
      width: isMdUp ? undefined : 90,
    },
    {
      field: "transaction_quantity",
      headerName: "Quantity",
      flex: isMdUp ? 0.9 : undefined,
      width: isMdUp ? undefined : 100,
    },
    {
      field: "serial_number",
      headerName: "Serial No",
      flex: isMdUp ? 2 : undefined,
      width: isMdUp ? undefined : 120,
    },
    {
      field: "imei_number",
      headerName: "IMEI No",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 150,
    },
    {
      field: "sub_inventory_id",
      headerName: "Sub-Inventory",
      flex: isMdUp ? 1.5 : undefined,
      width: isMdUp ? undefined : 130,
    },
    {
      field: "locator_id",
      headerName: "Locator",
      flex: isMdUp ? 2 : undefined,
      width: isMdUp ? undefined : 160,
    },
  ];
};

// ===================== All Item Report Headers ===============================
export const all_item_columns = (isMdUp, editHandle) => {
  return [
    {
      field: "sl",
      headerName: "Sl. No",
      flex: isMdUp ? 0.4 : undefined,
      width: isMdUp ? undefined : 80,
    },
    {
      field: "description",
      headerName: "Description",
      flex: isMdUp ? 5.5 : undefined,
      width: isMdUp ? undefined : 380,
    },
    {
      field: "item_number",
      headerName: "Item Number",
      flex: isMdUp ? 2 : undefined,
      width: isMdUp ? undefined : 180,
    },
    {
      field: "uom",
      headerName: "UOM",
      flex: isMdUp ? 1.1 : undefined,
      width: isMdUp ? undefined : 90,
    },
    {
      field: "mrp",
      headerName: "MRP",
      flex: isMdUp ? 2 : undefined,
      width: isMdUp ? undefined : 160,
    },
    {
      field: "sales_type",
      headerName: "Sales Type",
      flex: isMdUp ? 2.5 : undefined,
      width: isMdUp ? undefined : 260,
    },
    {
      field: "action",
      headerName: "Action",
      flex: isMdUp ? 0.9 : undefined,
      width: isMdUp ? undefined : 120,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="print"
            size="small"
            color="primary"
            onClick={() => editHandle(params)}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
};

// ===================== SAP Transfer Headers ===============================
export const sap_transfer_columns = (isMdUp) => {
  return [
    {
      field: "sl",
      headerName: "Sl. No",
      flex: isMdUp ? 0.4 : undefined,
      width: isMdUp ? undefined : 80,
    },
    {
      field: "item_Number",
      headerName: "Item Number",
      flex: isMdUp ? 2 : undefined,
      width: isMdUp ? undefined : 180,
      editable: true,
    },
    {
      field: "item_Serial_Number",
      headerName: "Serial Number",
      flex: isMdUp ? 5.5 : undefined,
      width: isMdUp ? undefined : 380,
      editable: true,
    },
    // {
    //   field: "uom",
    //   headerName: "UOM",
    //   flex: isMdUp ? 1.1 : undefined,
    //   width: isMdUp ? undefined : 90,
    //   editable: true,
    // },
    {
      field: "qty",
      headerName: "Qty",
      flex: isMdUp ? 2 : undefined,
      width: isMdUp ? undefined : 160,
      editable: true,
    },
  ];
};
