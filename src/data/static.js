// ==================== Sales Report-All Headers =================================
export const sales_report_all_columns = [
  { field: "sl", headerName: "Sl. No", width: 60 },
  {
    field: "sales_type",
    headerName: "Sales Type",
    width: 100,
    valueGetter:(params) =>  (params?.row?.isTitle) ? null : params?.row?.sales_type || "---",
  },
  {
    field: "item_code",
    headerName: "Item Code",
    width: 150,
    valueGetter: (params) =>  params?.row?.item_code || "---",
  },
  {
    field: "item_description",
    headerName: "Item Description",
    width: 300,
    valueGetter: (params) =>  (params?.row?.isTitle) ? null : params?.row?.item_description || "---",
  },
  {
    field: "gross_amount",
    headerName: "Gross Amount",
    width: 100,
    valueGetter: (params) =>  (params?.row?.isTitle) ? null : params?.row?.gross_amount || "---",
  },
  {
    field: "discount_Value",
    headerName: "Discount/Commission",
    width: 150,
    valueGetter: (params) =>  (params?.row?.isTitle) ? null : params?.row?.discount_Value || "---",
  },
  {
    field: "additional_Discount",
    headerName: "Add. Dis",
    width: 150,
    valueGetter: (params) =>  (params?.row?.isTitle) ? null : params?.row?.additional_Discount || "---",
  },
  {
    field: "line_Discount_Amount",
    headerName: "Lots of Sale Dis",
    width: 150,
    valueGetter: (params) =>  (params?.row?.isTitle) ? null : params?.row?.line_Discount_Amount || "---",
  },
  {
    field: "tds_Amount",
    headerName: "TDS",
    width: 80,
    valueGetter: (params) =>  (params?.row?.isTitle) ? null : params?.row?.tds_Amount || "---",
  },
  {
    field: "tax_Amount",
    headerName: "Tax Amount",
    width: 120,
    valueGetter: (params) =>  (params?.row?.isTitle) ? null : params?.row?.tax_Amount || "---",
  },
  {
    field: "net_amount",
    headerName: "Net Amount",
    width: 120,
    valueGetter: (params) =>  (params?.row?.isTitle) ? null : params?.row?.net_amount || "---",
  },
];
// ==================== Sales And Order Report Headers ===========================
export const sales_and_stock_report_columns = [
  { field: "sl", headerName: "Sl. No", flex: 0.3 },
  { field: "item_code", headerName: "Item Code", flex: 1.8 },
  {
    field: "item_details",
    headerName: "Particulars (Details of Item)",
    flex: 3.2,
  },
  { field: "unit", headerName: "Unit", flex: 0.5 },
  {
    field: "opening_balance",
    headerName: "Opening Balance (Qty)",
    flex: 1.4,
  },
  { field: "stock_received", headerName: "Stock Received (Qty)", flex: 1.4 },
  { field: "transfer_out", headerName: "Transfer Out (Qty)", flex: 1.2 },
  { field: "sales_qty", headerName: "Sales Qty", flex: 0.7 },
  {
    field: "amount",
    headerName: "Amount",
    flex: 0.7,
  },
  {
    field: "closing_balance",
    headerName: "Closing Balance",
    flex: 1,
  },
];
// ===================== On-Hand Report Headers ===============================
export const on_hand_report_columns = [
  { field: "sl", headerName: "Sl. No", flex: 0.3 },
  { field: "item", headerName: "Item No", flex: 2 },
  {
    field: "item_description",
    headerName: "Item Description",
    flex: 3.5,
  },
  { field: "uom", headerName: "UOM", flex: 1.1 },
  { field: "transaction_quantity", headerName: "Quantity", flex: 0.9 },
  { field: "serial_number", headerName: "Serial No", flex: 2 },
  { field: "imei_number", headerName: "IMEI No", flex: 1.5 },
  { field: "sub_inventory_id", headerName: "Sub-Inventory", flex: 1.5 },
  { field: "locator_id", headerName: "Locator", flex: 2 },
];
