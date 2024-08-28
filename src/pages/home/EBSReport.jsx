import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  ServiceLogReport,
  EBSLogForSalesOrder,
  EBSLogForSalesReceipt,
  EBSLogForSalesReturn,
  EBSLogForRequisition,
  EBSLogForTransferOrder,
  EBSLogForTransferOrderReceipt,
  EBSLogForRecharge,
  EBSLogForCashCollectionReport
} from "../../views/ebs_reports/index";

const EBSReports = () => {
  return (
    <>
      <Routes>
        <Route path="/service-log-report" element={<ServiceLogReport />} />
        <Route
          path="/ebs-log-for-sales-order"
          element={<EBSLogForSalesOrder />}
        />
        <Route
          path="/ebs-log-for-sales-receipt"
          element={<EBSLogForSalesReceipt />}
        />
        <Route
          path="/ebs-log-for-sales-return"
          element={<EBSLogForSalesReturn />}
        />
        <Route
          path="/ebs-log-for-requisition"
          element={<EBSLogForRequisition />}
        />
        <Route
          path="/ebs-log-for-transfer-order"
          element={<EBSLogForTransferOrder />}
        />
        <Route
          path="/ebs-log-for-transfer-order-receipt"
          element={<EBSLogForTransferOrderReceipt />}
        />
        <Route
          path="/ebs-log-for-recharge"
          element={<EBSLogForRecharge />}
        />
        <Route
          path="/ebs-log-for-cash-collection-report"
          element={<EBSLogForCashCollectionReport />}
        />
      </Routes>
    </>
  );
};

export default EBSReports;
