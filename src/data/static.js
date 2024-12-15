// ==================== Sales Report-All Headers =================================
export const sales_report_all_columns = [
  { field: "sl", headerName: "Sl. No", flex: 0.4 },
  { field: "sales_type", headerName: "Sales Type", flex: 1.5 },
  {
    field: "customer_name",
    headerName: "Customer Name",
    flex: 2.5,
  },
  { field: "customer_no", headerName: "Customer Number", flex: 1 },
  {
    field: "sales_order_no",
    headerName: "Sales Order No.",
    flex: 1.5,
  },
  { field: "region", headerName: "Region", flex: 1.5 },
  { field: "office", headerName: "Office", flex: 1.5 },
  { field: "revenue_head", headerName: "Revenue Head", flex: 1.5 },
  {
    field: "posting_date",
    headerName: "Posting Date",
    flex: 1.5,
  },
  {
    field: "item_code",
    headerName: "Item Code",
    flex: 1.5,
  },
  {
    field: "item_description",
    headerName: "Item Description",
    flex: 1.5,
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
    field: "item_Description",
    headerName: "Item Description",
    flex: 3.5,
  },
  { field: "uom", headerName: "UOM", flex: 1.1 },
  { field: "transaction_Quantity", headerName: "Quantity", flex: 0.9 },
  { field: "serial_Number", headerName: "Serial No", flex: 2 },
  { field: "imei_number", headerName: "IMEI No", flex: 1.5 },
  { field: "sub_inventory_id", headerName: "Sub-Inventory", flex: 1.5 },
  { field: "locator_id", headerName: "Locator", flex: 2 },
];
