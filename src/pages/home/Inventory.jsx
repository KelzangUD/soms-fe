import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  TransferOrders,
  TransferOrderOutward,
  PostedTransferShipment,
  TransferOrderInward,
  PostedTransferReceipt,
  SAPTransferOrder
} from "../../views/inventory/index";

const Inventory = () => {
  return (
    <>
      <Routes>
        <Route path="/transfer-orders" element={<TransferOrders />} />
        <Route
          path="/transfer-order-outward"
          element={<TransferOrderOutward />}
        />
        <Route
          path="/posted-transfer-shipment"
          element={<PostedTransferShipment />}
        />
        <Route
          path="/transfer-order-inward"
          element={<TransferOrderInward />}
        />
        <Route
          path="/posted-transfer-receipt"
          element={<PostedTransferReceipt />}
        />
        <Route
          path="/sap-transfer-order"
          element={<SAPTransferOrder />}
        />
      </Routes>
    </>
  );
};

export default Inventory;
