import React from "react";
import { useLocation } from "react-router-dom";

const RechargeReceipt = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const applicationNo = query.get("applicationNo");
  const companyName = query.get("companyName");
  const customerName = query.get("customerName");
  const amount = query.get("amount");
  const billing = query.get("billing");
  const createdBy = query.get("createdBy");
  const customerNo = query.get("customerNo");
  const description = query.get("description");
  const rechargeDate = query.get("rechargeDate");
  const receiptType = query.get("receiptType");
  return (
    <>
      <div style={{ width: "250px", padding: "0", lineHeight: "1.7"}}>
        <div style={{ textAlign: "center" }}>
          <h3>{companyName}</h3>
          <p>{customerName}</p>
          <h4>{receiptType}</h4>
        </div>
        <hr style={{ border: "1px dashed #000" }} />
        <div>
          <p>Receipt No: {applicationNo}</p>
          <p>Receipt Date: {rechargeDate}</p>
          <p>Customer Name: {customerName}</p>
          <p>Customer No: {customerNo}</p>
          <p>Billing: {billing}</p>
          <p>Phone:</p>
        </div>
        <hr style={{ border: "1px dashed #000" }} />
        <div>
          <p>Description: {description}</p>
        </div>
        <hr style={{ border: "1px dashed #000" }} />
        <div>
          <p align="right">Amount(Nu): {amount}</p>
        </div>
        <hr style={{ border: "1px dashed #000" }} />
        <div>
          <p>Cash: {amount}</p>
        </div>
        <hr style={{ border: "1px dashed #000" }} />
        <div>
          <p>Total Payment: {amount}</p>
        </div>
        <hr style={{ border: "1px dashed #000" }} />
        <div>
          <p>Created By: {createdBy}</p>
        </div>
        <hr style={{ border: "1px dashed #000" }} />
        <div>
          <p align="center">
            Address: P.O.Box No#1502, Norzin Lam, Thimphu
          </p>
          <p align="center">Phone: +975-77889977 www.tashicell.com</p>
        </div>
      </div>
    </>
  );
};

export default RechargeReceipt;
