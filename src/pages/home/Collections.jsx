import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  CashReceipt,
  Recharge,
  BankReceipt,
  CreditOrEMICollection,
  AdvanceCollection,
  AdvanceCollectionHistory,
  AdvanceRefund,
  AdvanceRefundHistory
} from "../../views/collections/index";

const Collections = () => {
  return (
    <>
      <Routes>
        <Route path="/cash-receipt" element={<CashReceipt />} />
        <Route path="/recharge" element={<Recharge />} />
        <Route path="/bank-receipt" element={<BankReceipt />} />
        <Route
          path="/credit-or-emi-collection"
          element={<CreditOrEMICollection />}
        />
        <Route path="/advance-collection" element={<AdvanceCollection />} />
        <Route
          path="/advance-collection-history"
          element={<AdvanceCollectionHistory />}
        />
        <Route
          path="/advance-refund"
          element={<AdvanceRefund />}
        />
         <Route
          path="/advance-refund-history"
          element={<AdvanceRefundHistory />}
        />
      </Routes>
    </>
  );
};

export default Collections;
