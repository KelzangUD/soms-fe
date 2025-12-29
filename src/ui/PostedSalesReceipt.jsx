import React from "react";

const PostedSalesReceipt = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const applicationNo = queryParams.get("applicationNo");

  // Retrieve full data from sessionStorage
  const salesOrderData = JSON.parse(localStorage.getItem("salesOrderData"));

  if (salesOrderData && salesOrderData.applicationNo === applicationNo) {
    console.log("Sales Order Data:", salesOrderData);
  } else {
    console.error("Sales Order Data not found");
  }
  return (
    <>
      <div style={{ width: "320px", padding: "0", lineHeight: "1.5" }}>
        <div style={{ textAlign: "center" }}>
          <h3>{salesOrderData?.companyName}</h3>
          <p>{salesOrderData?.customerName}</p>
          <h4>Tax Invoice/{salesOrderData?.receiptType}</h4>
        </div>
        <hr style={{ border: "1px dashed #000" }} />
        <div>
          <p>GST No: C10041246</p>
          <p>TPN No: TAC00084</p>
        </div>
        <hr style={{ border: "1px dashed #000" }} />
        <div>
          <p>Receipt No: {applicationNo}</p>
          <p>Receipt Date: {salesOrderData?.rechargeDate}</p>
          <p>Customer Name: {salesOrderData?.customerName}</p>
          <p>Customer No: {salesOrderData?.customerNo}</p>
          <p>Billing: {salesOrderData?.billing}</p>
          <p>
            Phone:{" "}
            {salesOrderData?.phone === "" ||
            salesOrderData?.phone == null ||
            salesOrderData?.phone === undefined
              ? "77889977"
              : salesOrderData?.phone}
          </p>
        </div>
        <hr style={{ border: "1px dashed #000" }} />
        {salesOrderData?.installmentCycle === null ? (
          <>
            {salesOrderData?.itemDetails?.map((item) => (
              <>
                <div>
                  <p>Description: {item?.description}</p>
                  <p>Quantity: {item?.qty}</p>
                  <p>Unit Rate: {parseFloat(item?.mrp).toFixed(2)}</p>
                  <p>Serial No: {item?.serialNo}</p>
                  <p align="right">Amount(Nu): {item?.selling_Price}</p>
                </div>
                <hr style={{ border: "1px dashed #000" }} />
              </>
            ))}
            <div>
              <p>
                Gross Total (Nu):{" "}
                {parseFloat(salesOrderData?.grossTotal)?.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </p>
            </div>
            <div>
              <p>
                GST Tax:{" "}
                {parseFloat(salesOrderData?.tax)?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <p>
                UPI Tax:{" "}
                {parseFloat(
                  salesOrderData?.itemDetails?.reduce(
                    (accumulator, currentObject) =>
                      accumulator + (parseInt(currentObject?.upiAmt) || 0),
                    0
                  )
                )?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <p>
                Discount/Commission:{" "}
                {parseFloat(salesOrderData?.discount)?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            {/* <div>
              <p>
                Advance Amount:{" "}
                {parseFloat(salesOrderData?.advance)?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div> */}
            {/* <div>
              <p>
                Down Payment:{" "}
                {salesOrderData?.downPayment === "null"
                  ? parseFloat(0).toFixed(2)
                  : parseFloat(salesOrderData?.downPayment)?.toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
              </p>
            </div> */}
            {/* <div>
              <p>
                EMI Service Charge:{" "}
                {salesOrderData?.emiServiceCharge === "null"
                  ? parseFloat(0).toFixed(2)
                  : parseFloat(
                      salesOrderData?.emiServiceCharge
                    )?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
              </p>
            </div> */}
            <hr style={{ border: "1px dashed #000" }} />
            <div>
              <p>
                Total Payment:{" "}
                {parseFloat(salesOrderData?.totalAmount)?.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <p>Description: {salesOrderData?.itemDetails[0]?.description}</p>
            </div>
            <div>
              <p>Serial No: {salesOrderData?.itemDetails[0]?.serialNo}</p>
            </div>
            <div>
              <p>Quantity: {salesOrderData?.itemDetails[0]?.qty}</p>
            </div>
            <div>
              <p>
                Unit Rate (Nu.):{" "}
                {salesOrderData?.itemDetails[0]?.mrp?.toLocaleString("en-US")}
              </p>
            </div>
            <div>
              <p>
                Service Charge (Nu.):{" "}
                {parseFloat(salesOrderData?.emiServiceCharge)
                  .toFixed(2)
                  ?.toLocaleString("en-US")}
              </p>
            </div>
            <div>
              <p>
                Total Amount (Nu.):{" "}
                {parseInt(salesOrderData?.grossTotal)?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <p>
                Discount/Commission (Nu.):{" "}
                {parseFloat(salesOrderData?.discount)?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <p>
                Tax (Nu.):{" "}
                {parseFloat(salesOrderData?.tax)?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <p>
                Advance Amount (Nu.):{" "}
                {parseFloat(salesOrderData?.advance)?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <p>
                Total Balance Amount (Nu.):{" "}
                {parseFloat(salesOrderData?.totalBalanceAmount)?.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </p>
            </div>
            <div>
              <p>
                Number of Installment: {salesOrderData?.installmentCycle} Months
              </p>
            </div>
            <div>
              <p>
                Equated Monthly Instalment (Nu.):{" "}
                {parseFloat(salesOrderData?.installmentAmount)?.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </p>
            </div>
            <hr style={{ border: "1px dashed #000" }} />
            <div>
              <p>
                Total Advance Payment (Nu.):{" "}
                {parseFloat(salesOrderData?.downPayment)?.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </p>
            </div>
          </>
        )}

        <hr style={{ border: "1px dashed #000" }} />
        <div>
          <p>Created By: {salesOrderData?.createdBy}</p>
        </div>
        <hr style={{ border: "1px dashed #000" }} />
        <div>
          <p align="center">Address: P.O.Box No#1502, Norzin Lam, Thimphu</p>
          <p align="center">Phone: +975-77889977 www.tashicell.com</p>
        </div>
      </div>
    </>
  );
};

export default PostedSalesReceipt;
