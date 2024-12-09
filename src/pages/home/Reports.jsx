import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  PostedSalesInvoice,
  SalesOrderList,
  ReturnSaleInvoice,
  PaymentCollection,
  RechargeCollection,
  BankCollection,
  OnHandReport,
  SalesOrderReport,
  SalesAndOrderReport,
  SalesReportAll,
  CreditSalesReport,
  TransferOrderReport,
  SamsungWarrantyReport
} from "../../views/reports/index";

const Reports = () => {
  return (
    <>
      <Routes>
        <Route path="/posted-sales-invoice" element={<PostedSalesInvoice />} />
        <Route path="/sales-order-list" element={<SalesOrderList />} />
        <Route path="/return-sale-invoice" element={<ReturnSaleInvoice />} />
        <Route path="/payment-collection" element={<PaymentCollection />} />
        <Route path="/recharge-collection" element={<RechargeCollection />} />
        <Route path="/bank-collection" element={<BankCollection />} />
        <Route path="/on-hand-report" element={<OnHandReport />} />
        <Route path="/sales-order-report" element={<SalesOrderReport />} />
        <Route path="/sales-and-stock-report" element={<SalesAndOrderReport />} />
        <Route path="/sales-report-all" element={<SalesReportAll />} />
        <Route path="/credit-sale-report" element={<CreditSalesReport />} />
        <Route path="/transfer-order-report" element={<TransferOrderReport />} />
        <Route path="/samsung-warranty-report" element={<SamsungWarrantyReport />} />
      </Routes>
    </>
  );
};

export default Reports;
