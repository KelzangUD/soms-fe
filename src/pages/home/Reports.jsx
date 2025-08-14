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
  SamsungWarrantyReport,
  SalesReturnList,
  SalesReturnReport,
  EmployeeEMIReport,
  CustomersEmiReport
} from "../../views/reports/index";

const Reports = () => {
  return (
    <>
      <Routes>
        <Route path="/posted-sales-invoice" element={<PostedSalesInvoice />} />
        <Route path="/sales-order-list" element={<SalesOrderList />} />
        <Route path="/sales-return-list" element={<SalesReturnList />} />
        <Route path="/return-sale-invoice" element={<ReturnSaleInvoice />} />
        <Route path="/payment-collection" element={<PaymentCollection />} />
        <Route path="/recharge-collection" element={<RechargeCollection />} />
        <Route path="/bank-collection" element={<BankCollection />} />
        <Route path="/on-hand-report" element={<OnHandReport />} />
        <Route path="/sales-order-report" element={<SalesOrderReport />} />
        <Route
          path="/sales-and-stock-report"
          element={<SalesAndOrderReport />}
        />
        <Route path="/sales-report-all" element={<SalesReportAll />} />
        <Route path="/sales-return-report" element={<SalesReturnReport />} />
        <Route path="/credit-sale-report" element={<CreditSalesReport />} />
        <Route
          path="/transfer-order-report"
          element={<TransferOrderReport />}
        />
        <Route
          path="/samsung-warranty-report"
          element={<SamsungWarrantyReport />}
        />
        <Route
          path="/employee-emi-report"
          element={<EmployeeEMIReport />}
        />
        <Route
          path="/customers-emi-report"
          element={<CustomersEmiReport />}
        />
      </Routes>
    </>
  );
};

export default Reports;
