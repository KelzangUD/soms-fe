import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  SalesOrder,
  SalesReturn,
  ApplyEmi,
  EMIHistory,
  EMIApproval,
  CreateEmiCustomer,
  EMIOrganization,
  PricingDetails
} from "../../views/pos_management/index";

const POSManagement = () => {
  return (
    <>
      <Routes>
        <Route path="/sales-order" element={<SalesOrder />} />
        <Route path="/sales-return" element={<SalesReturn />} />
        <Route path="/apply-emi" element={<ApplyEmi />} />
        <Route path="/create-emi-customer" element={<CreateEmiCustomer />} />
        <Route path="/emi-history" element={<EMIHistory />} />
        <Route path="/emi-approval" element={<EMIApproval />} />
        <Route path="/emi-organization" element={<EMIOrganization />} />
        <Route path="/pricing-details" element={<PricingDetails />} />
      </Routes>
    </>
  );
};

export default POSManagement;
