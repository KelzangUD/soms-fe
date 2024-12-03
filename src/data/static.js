// ==================== Sales Report-All Headers =================================
export const sales_report_all_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "sales_type", headerName: "Sales Type", width: 150 },
    {
      field: "customer_name",
      headerName: "Customer Name",
      width: 250,
    },
    { field: "customer_no", headerName: "Customer Number", width: 100 },
    {
      field: "sales_order_no",
      headerName: "Sales Order No.",
      width: 150,
    },
    { field: "region", headerName: "Region", width: 150 },
    { field: "office", headerName: "Office", width: 150 },
    { field: "revenue_head", headerName: "Revenue Head", width: 150 },
    {
      field: "posting_date",
      headerName: "Posting Date",
      width: 150,
    },
    {
      field: "item_code",
      headerName: "Item Code",
      width: 150,
    },
    {
      field: "item_description",
      headerName: "Item Description",
      width: 150,
    },
  ];
// ==================== Sales And Order Report Headers ===========================
export const sales_and_stock_report_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "item_code", headerName: "Item Code", width: 200 },
    {
      field: "item_details",
      headerName: "Particulars (Details of Item)",
      width: 300,
    },
    { field: "unit", headerName: "Unit", width: 80 },
    {
      field: "opening_balance",
      headerName: "Opening Balance (Qty)",
      width: 150,
    },
    { field: "stock_received", headerName: "Stock Received (Qty)", width: 150 },
    { field: "transfer_out", headerName: "Transfer Out (Qty)", width: 120 },
    { field: "sales_qty", headerName: "Sales Qty", width: 80 },
    {
      field: "amount",
      headerName: "Amount",
      width: 70,
    },
    {
      field: "closing_balance",
      headerName: "Closing Balance",
      width: 100,
    },
];
// ===================== On-Hand Report Headers ===============================
export const on_hand_report_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "item", headerName: "Item No", width: 200 },
    {
      field: "item_Description",
      headerName: "Item Description",
      width: 350,
    },
    { field: "uom", headerName: "UOM", width: 90 },
    { field: "transaction_Quantity", headerName: "Quantity", width: 90 },
    { field: "serial_Number", headerName: "Serial No", width: 200 },
    { field: "imei_number", headerName: "IMEI No", width: 150 },
    { field: "sub_inventory_id", headerName: "Sub-Inventory", width: 150 },
    { field: "locator_id", headerName: "Locator", width: 200 },
  ];