import React from "react";
import { Routes, Route } from "react-router-dom";
import { Requisitions, RequisitionList, RequisitionApproval } from "../../views/purchase/index";

const Purchase = () => {
  return (
    <>
      <Routes>
        <Route path="/requisitions" element={<Requisitions />} />
        <Route path="/requisition-list" element={<RequisitionList />} />
        <Route path="/requisition-approval" element={<RequisitionApproval />} />
      </Routes>
    </>
  );
};

export default Purchase;
