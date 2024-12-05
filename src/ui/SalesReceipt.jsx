import React from "react";
import { useLocation } from "react-router-dom";

const SalesReceipt = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const applicationNo = query.get("applicationNo");
  const companyName = query.get("companyName");
  const customerName = query.get("customerName");
  const phone = query.get("phone");
  const billing = query.get("billing");
  const createdBy = query.get("createdBy");
  const customerNo = query.get("customerNo");
  const grossTotal = query.get("grossTotal");
  const tax = query?.get("tax");
  const disc = query?.get("discount");
  const advance = query?.get("advance");
  const downPayment = query.get("downPayment");
  const totalPayment = query.get("totalPayment");
  const rechargeDate = query.get("rechargeDate");
  const receiptType = query.get("receiptType");
  const itemDetails = query
    .getAll("itemDetails")
    .map((item) => JSON.parse(item));

  React.useEffect(() => {
    console.log(itemDetails);
  }, [location.search]);
  return (
    <>
      <div style={{ width: "400px", padding: "8px", lineHeight: "1.5" }}>
        <div style={{ textAlign: "center" }}>
          <h3>{companyName}</h3>
          <p>{customerName}</p>
          <h4>{receiptType}</h4>
        </div>
        <hr />
        <div>
          <p>Receipt No: {applicationNo}</p>
          <p>Receipt Date: {rechargeDate}</p>
          <p>Customer Name: {customerName}</p>
          <p>Customer No: {customerNo}</p>
          <p>Billing: {billing}</p>
          <p>Phone: {phone}</p>
        </div>
        <hr />
        {itemDetails?.map((item) => (
          <>
            <div>
              <p>Description: {item?.description}</p>
              <p>Quantity: {item?.qty}</p>
              <p>Unit Rate: {item?.mrp}</p>
              <p align="right">Amount(Nu): {item?.selling_Price}</p>
            </div>
            <hr />
          </>
        ))}
        <div>
          <p>Gross Total (Nu): {grossTotal}</p>
        </div>
        <div>
          <p>Tax: {tax}</p>
        </div>
        <div>
          <p>Discount/Commission: {disc}</p>
        </div>
        <div>
          <p>Advance Amount: {advance}</p>
        </div>
        <div>
          <p>Downpayment: {downPayment === "null" ? 0 : downPayment}</p>
        </div>
        <hr />
        <div>
          <p>Total Payment: {totalPayment}</p>
        </div>
        <hr />
        <div>
          <p>Created By: {createdBy}</p>
        </div>
        <hr />
        <div>
          <p align="center">Address: P.O.Box No#1502, Norzin Lam, Thimphu</p>
          <p align="center">Phone: +975-77889977 www.tashicell.com</p>
        </div>
      </div>
    </>
  );
};

export default SalesReceipt;
