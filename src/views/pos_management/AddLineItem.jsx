import React, { useState, useEffect } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Grid,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Route from "../../routes/Route";
import { Notification, LoaderDialog } from "../../ui/index";
import { Transition } from "../../component/common/index";
import { useCommon } from "../../contexts/CommonContext";

const AddLineItem = ({
  open,
  setOpen,
  storeName,
  salesType,
  productType,
  setLineItems,
  userDetails,
  itemNo,
  lineItemDetails,
  adj_type,
  user,
  emiCycle,
  downPaymentStatus,
  setDownPaymentStatus,
}) => {
  const { fetchLocators, locators } = useCommon();
  const access_token = localStorage.getItem("access_token");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [desc, setDesc] = useState("");
  const [onHandItems, setOnHandItems] = useState([]);
  const [pricingID, setPricingID] = useState("");
  const [subInventory, setSubInventory] = useState([]);
  const [lineItemDetail, setLineItemDetail] = useState({
    storeName: storeName,
    subInventoryId: userDetails?.subInventory,
    locatorId: userDetails?.locator,
    description: "",
    serialNo: "",
    imeiNo: "",
    qty: productType === 3 || productType === 2 ? 1 : "",
    priceLocator: "N",
    discPercentage: "",
    tdsAmount: "",
    itemNo: itemNo,
    mrp: "",
    discountedAmount: "",
    sellingPrice: "",
    taxPercentage: "",
    additionalDiscount: "",
    amountExclTax: "",
    advanceTaxAmount: "",
    itemTotalAddedQty: "",
    lineItemAmt: "",
    available: "N",
    serialNoStatus: false,
    taxAmt: "",
    taxBasedAmt: "",
    discountValue: "",
    dineDiscountAmt: "",
    tdsPercent: "",
    base_amount_tds: "",
    pricedIdForVarientCode: "",
    volumeDiscount: "",
    priceLocatorDTOs: [],
    downPayment: "",
    actualDownPayment: "",
    payableAmount: "",
    installmentAmount: "",
    downPaymentIR: "",
    emiInterestRate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const fetchSubInventory = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchSubInventory?userId=${user}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setSubInventory(res?.data);
    }
  };

  const fetchOnHandItems = async () => {
    const res = await Route(
      "GET",
      `/OnHand/FetchItemByDesc?storeName=${storeName}&desc=${desc}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setOnHandItems(
        res?.data?.map((item) => ({
          item: item?.item,
          label: item?.item_description,
          serial_controlled: item?.serial_controlled,
        }))
      );
    }
  };
  const fetchItemDescriptionWithSerialNO = async () => {
    setIsLoading(true);
    try {
      const res = await Route(
        "GET",
        `/SalesOrder/FetchBySerialNo?salesType=${salesType}&storeName=${storeName}&item=${
          lineItemDetail?.itemNo
        }&subInventory=${lineItemDetail?.subInventoryId}&locator=${
          lineItemDetail?.locatorId
        }&serialNo=${lineItemDetail?.serialNo}&qty=${
          lineItemDetail?.qty
        }&emiCycle=${
          emiCycle === null ? 0 : emiCycle
        }&downPaymentStatus=${downPaymentStatus}`,
        access_token,
        null,
        null
      );
      if (res?.status === 200 && res?.data?.available === "Y") {
        setLineItemDetail((prev) => ({
          ...prev,
          priceLocator: res?.data?.priceLocator,
          mrp: res?.data?.mrp,
          discPercentage: res?.data?.discPercentage,
          tdsAmount: parseInt(res?.data?.tdsAmount),
          discountedAmount: res?.data?.discountAmt,
          sellingPrice: res?.data?.sellingPrice,
          taxPercentage:
            res?.data?.taxPercentage !== null
              ? parseInt(res?.data?.taxPercentage)
              : 0,
          additionalDiscount:
            res?.data?.additionalDiscount !== null
              ? parseInt(res?.data?.additionalDiscount)
              : 0,
          amountExclTax: res?.data?.amountExclTax,
          advanceTaxAmount: res?.data?.advanceTaxAmount,
          volumeDiscount: res?.data?.volumeDiscount,
          itemTotalAddedQty: res?.data?.itemTotlaAddedQty,
          lineItemAmt: res?.data?.sellingPrice,
          available: res?.data?.available,
          serialNoStatus: res?.data?.serialNoStatus,
          taxAmt: res?.data?.taxAmount,
          priceLocatorDTOs: res?.data?.priceLocatorDTOs,
          description: res?.data?.description,
          itemNo: res?.data?.itemNo,
          pricedIdForVarientCode: res?.data?.pricedIdForVarientCode,
          downPayment: parseInt(res?.data?.downPayment).toFixed(2),
          actualDownPayment: parseInt(res?.data?.downPayment).toFixed(2),
          payableAmount: res?.data?.payableAmount,
          installmentAmount: res?.data?.installmentAmount,
          downPaymentIR: res?.data?.downPaymentIR,
          emiInterestRate: res?.data?.emiInterestRate,
        }));
      } else if (res?.status === 200 && res?.data?.available === "N") {
        setNotificationMsg("Item Not Available");
        setSeverity("info");
        setShowNotification(true);
      } else {
        setNotificationMsg(res?.response?.data?.detail);
        setSeverity("info");
        setShowNotification(true);
      }
    } catch (err) {
      setNotificationMsg(`Error: ${err}`);
      setSeverity("info");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchItemDescriptionWithOutSerialNO = async () => {
    const res = await Route(
      "GET",
      `/SalesOrder/FetchByDescription?salesType=${salesType}&storeName=${storeName}&item=${lineItemDetail?.itemNo}&subInventory=${lineItemDetail?.subInventoryId}&locator=${lineItemDetail?.locatorId}&serialNo&qty=${lineItemDetail?.qty}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200 && res?.data?.serialControlled !== "Y") {
      setLineItemDetail((prev) => ({
        ...prev,
        priceLocator: res?.data?.priceLocator,
        mrp: res?.data?.mrp,
        discPercentage: res?.data?.discPercentage,
        tdsAmount: parseInt(res?.data?.tdsAmount),
        discountedAmount: res?.data?.discountAmt,
        sellingPrice: res?.data?.sellingPrice,
        taxPercentage:
          res?.data?.taxPercentage !== null
            ? parseInt(res?.data?.taxPercentage)
            : 0,
        additionalDiscount:
          res?.data?.additionalDiscount !== null
            ? parseInt(res?.data?.additionalDiscount)
            : 0,
        amountExclTax: res?.data?.amountExclTax,
        advanceTaxAmount: res?.data?.advanceTaxAmount,
        volumeDiscount: res?.data?.volumeDiscount,
        itemTotalAddedQty: res?.data?.itemTotlaAddedQty,
        lineItemAmt: res?.data?.sellingPrice,
        available: res?.data?.available,
        serialNoStatus: res?.data?.serialNoStatus,
        taxAmt: res?.data?.taxAmount,
        priceLocatorDTOs: res?.data?.priceLocatorDTOs,
        pricedIdForVarientCode: res?.data?.pricedIdForVarientCode,
        downPayment: parseInt(res?.data?.downPayment).toFixed(2),
        actualDownPayment: parseInt(res?.data?.downPayment).toFixed(2),
        payableAmount: res?.data?.payableAmount,
        installmentAmount: res?.data?.installmentAmount,
        downPaymentIR: res?.data?.downPaymentIR,
        emiInterestRate: res?.data?.emiInterestRate,
      }));
    }
  };
  const fetchPriceLocatorDetails = async () => {
    const res = await Route(
      "GET",
      `/SalesOrder/FetchPriceLocatorDtls?pricingId=${pricingID}&qty=${lineItemDetail?.qty}&salesType=${salesType}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setLineItemDetail((prev) => ({
        ...prev,
        discPercentage: res?.data?.discPercentage,
        tdsAmount: parseInt(res?.data?.tdsAmount),
        mrp: res?.data?.mrp,
        additionalDiscount:
          res?.data?.additionalDiscount !== null
            ? parseInt(res?.data?.additionalDiscount)
            : 0,
        taxPercentage:
          res?.data?.taxPercentage !== null
            ? parseInt(res?.data?.taxPercentage)
            : 0,
        sellingPrice: res?.data?.sellingPrice,
        discountAmt: res?.data?.discountAmt,
        amountExclTax: res?.data?.amountExclTax,
        advanceTaxAmount: res?.data?.advanceTaxAmount,
        taxAmount: res?.data?.taxAmount,
        volumeDiscount: res?.data?.volumeDiscount,
        itemTotalAddedQty: res?.data?.itemTotlaAddedQty,
        pricedIdForVarientCode: lineItemDetails?.pricedIdForVarientCode,
        downPayment: parseInt(res?.data?.downPayment).toFixed(2),
        actualDownPayment: parseInt(res?.data?.downPayment).toFixed(2),
        payableAmount: res?.data?.payableAmount,
        installmentAmount: res?.data?.installmentAmount,
        downPaymentIR: res?.data?.downPaymentIR,
        emiInterestRate: res?.data?.emiInterestRate,
      }));
    }
  };
  useEffect(() => {
    if (adj_type === "EMI") {
      setLineItemDetail((prev) => ({
        ...prev,
        description: lineItemDetails?.description,
        imeiNo: lineItemDetails?.imeiNo,
        priceLocator: lineItemDetails?.priceLocator,
        discPercentage: lineItemDetails?.discPercentage,
        tdsAmount: lineItemDetails?.tdsAmount,
        mrp: lineItemDetails?.mrp,
        discountedAmount: lineItemDetails?.discountedAmount,
        sellingPrice: lineItemDetails?.sellingPrice,
        taxPercentage: parseInt(lineItemDetails?.taxPercentage),
        additionalDiscount: parseInt(lineItemDetails?.additionalDiscount),
        amountExclTax: lineItemDetails?.amountExclTax,
        advanceTaxAmount: lineItemDetails?.advanceTaxAmount,
        itemTotalAddedQty: lineItemDetails?.itemTotalAddedQty,
        lineItemAmt: lineItemDetails?.lineItemAmt,
        taxAmt: lineItemDetails?.taxAmt,
        taxBasedAmt: lineItemDetails?.taxBasedAmt,
        discountValue: lineItemDetails?.discountValue,
        dineDiscountAmt: lineItemDetails?.dineDiscountAmt,
        tdsPercent: lineItemDetails?.tdsPercent,
        base_amount_tds: lineItemDetails?.base_amount_tds,
        pricedIdForVarientCode: lineItemDetails?.pricedIdForVarientCode,
        volumeDiscount: lineItemDetails?.volumeDiscount,
        downPayment: parseInt(lineItemDetails?.downPayment).toFixed(2),
        actualDownPayment: parseInt(lineItemDetails?.downPayment).toFixed(2),
        payableAmount: lineItemDetails?.payableAmount,
        installmentAmount: lineItemDetails?.installmentAmount,
        downPaymentIR: lineItemDetails?.downPaymentIR,
        emiInterestRate: lineItemDetails?.emiInterestRate,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adj_type]);
  useEffect(() => {
    fetchSubInventory();
  }, []);
  useEffect(() => {
    fetchLocators(lineItemDetail?.subInventoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineItemDetail?.subInventoryId]);
  useEffect(() => {
    fetchOnHandItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desc]);
  useEffect(() => {
    if (
      salesType !== null &&
      storeName !== "" &&
      lineItemDetail?.itemNo !== "" &&
      lineItemDetail?.subInventoryId !== "" &&
      lineItemDetail?.locatorId !== "" &&
      lineItemDetail?.qty !== ""
    ) {
      fetchItemDescriptionWithOutSerialNO();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    salesType,
    storeName,
    lineItemDetail?.itemNo,
    lineItemDetail?.subInventoryId,
    lineItemDetail?.locatorId,
    lineItemDetail?.qty,
  ]);
  useEffect(() => {
    if (lineItemDetail?.serialNo !== "" && lineItemDetail?.qty !== "") {
      fetchItemDescriptionWithSerialNO();
    }
    if (lineItemDetail?.serialNo !== "" && lineItemDetail?.qty === "") {
      setNotificationMsg("Please enter quantity!");
      setSeverity("info");
      setShowNotification(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineItemDetail?.serialNo, lineItemDetail?.qty, downPaymentStatus]);
  useEffect(() => {
    if (pricingID !== "") {
      fetchPriceLocatorDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricingID]);

  const subInventoryHandle = (e, value) => {
    setLineItemDetail((prev) => ({
      ...prev,
      subInventoryId: value?.id,
    }));
  };
  const locatorHandle = (e, value) => {
    setLineItemDetail((prev) => ({
      ...prev,
      locatorId: value?.id,
    }));
  };
  const handleInputChange = (inputValue) => {
    setDesc(inputValue);
  };
  const descriptionHandle = (e, value) => {
    if (value?.serial_controlled === "Y") {
      setNotificationMsg("Please Enter Serial Number!");
      setSeverity("info");
      setShowNotification(true);
    }
    setLineItemDetail((prev) => ({
      ...prev,
      description: value?.label,
      itemNo: value?.item,
    }));
  };
  const serialNoHandle = (e) => {
    setLineItemDetail((prev) => ({
      ...prev,
      serialNo: e?.target?.value,
    }));
  };
  const qtyHandle = (e) => {
    setLineItemDetail((prev) => ({
      ...prev,
      qty: e?.target?.value,
    }));
  };
  const priceLocatorHandle = (e, value) => {
    setPricingID(value?.id);
    setLineItemDetail((prev) => ({
      ...prev,
      pricedIdForVarientCode: e?.target?.value,
    }));
  };
  const fetchDownPaymentDetails = async () => {
    setLineItemDetail((prev) => ({
      ...prev,
      installmentAmount: "",
      payableAmount: "",
    }));
    const res = await Route(
      "GET",
      `/emi/getDownPaymentDetails?mrp=${lineItemDetail?.mrp}&minDownPayment=${
        lineItemDetail?.downPayment === "" ? 0 : lineItemDetail?.downPayment
      }&actualDownPayment=${
        lineItemDetail?.actualDownPayment
      }&emiCycle=${emiCycle}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setLineItemDetail((prev) => ({
        ...prev,
        installmentAmount: res?.data?.installmentAmount,
        payableAmount: res?.data?.netPayableAmount,
      }));
    }
  };
  useEffect(() => {
    if (lineItemDetail?.actualDownPayment !== "" && emiCycle) {
      fetchDownPaymentDetails();
    }
  }, [lineItemDetail?.actualDownPayment, emiCycle]);
  const actualDownPaymentHandle = (e) => {
    setLineItemDetail((prev) => ({
      ...prev,
      actualDownPayment: e?.target?.value,
    }));
  };
  const submitHandle = () => {
    if (salesType === 5) {
      if (
        parseInt(lineItemDetail?.actualDownPayment) >=
        parseInt(lineItemDetail?.downPayment)
      ) {
        setLineItems((prev) => [...prev, lineItemDetail]);
        setOpen(false);
      } else {
        setNotificationMsg("Actual Down Payment is Less than Down Payment");
        setSeverity("info");
        setShowNotification(true);
      }
    } else {
      setLineItems((prev) => [...prev, lineItemDetail]);
      setOpen(false);
    }
  };
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Grid
                container
                padding={2}
                sx={{
                  alignItems: "center",
                  backgroundColor: (theme) => theme.palette.bg.light,
                  color: "#fff",
                }}
              >
                <Typography variant="subtitle1">Add Line Item</Typography>
              </Grid>
              {salesType === 5 && (
                <Grid container>
                  <Alert severity="info" sx={{ width: "100%" }}>
                    Actual Down Payment should be equal to or greater than
                    Minimum Down Payment!
                  </Alert>
                </Grid>
              )}
              <Grid
                container
                spacing={1}
                paddingY={1}
                paddingX={2}
                marginTop={1}
              >
                <Grid item xs={3}>
                  <TextField
                    id="storeName"
                    label="Store Name"
                    value={storeName}
                    disabled
                  />
                </Grid>
                <Grid item xs={3}>
                  {userDetails?.roleName === "Administrator" ||
                  userDetails?.roleName === "Regional Manager" ||
                  userDetails?.roleName === "General Manager" ? (
                    <Autocomplete
                      disablePortal
                      options={subInventory?.map((item) => ({
                        id: item?.id,
                        label: item?.id,
                      }))}
                      onChange={subInventoryHandle}
                      value={lineItemDetail?.subInventoryId}
                      renderInput={(params) => (
                        <TextField {...params} label="Sub-Inventory" />
                      )}
                    />
                  ) : (
                    <TextField
                      id="sub_inventory"
                      label="Sub-Inventory"
                      value={lineItemDetail?.subInventoryId}
                      disabled
                    />
                  )}
                </Grid>
                <Grid item xs={3}>
                  {userDetails?.roleName === "Administrator" ||
                  userDetails?.roleName === "Regional Manager" ||
                  userDetails?.roleName === "General Manager" ? (
                    <Autocomplete
                      disablePortal
                      options={locators?.map((item) => ({
                        id: item?.id,
                        label: item?.name,
                      }))}
                      onChange={locatorHandle}
                      value={lineItemDetail?.locatorId}
                      renderInput={(params) => (
                        <TextField {...params} label="Locator" />
                      )}
                    />
                  ) : (
                    <TextField
                      id="locator"
                      label="Locator"
                      value={lineItemDetail?.locatorId}
                      disabled
                    />
                  )}
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    disablePortal
                    options={onHandItems}
                    onChange={descriptionHandle}
                    value={lineItemDetail?.description}
                    onInputChange={(e, inputValue) =>
                      handleInputChange(inputValue)
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Description" />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingY={1} paddingX={2}>
                <Grid item xs={3}>
                  <TextField
                    id="serial_no"
                    label="Serial No"
                    onChange={serialNoHandle}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="qty"
                    label="Quantity"
                    value={lineItemDetail?.qty}
                    onChange={qtyHandle}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    disablePortal
                    options={
                      lineItemDetail?.priceLocatorDTOs?.length > 0
                        ? lineItemDetail?.priceLocatorDTOs?.map((item) => ({
                            id: item?.pricingId,
                            label: item?.variantCode,
                          }))
                        : []
                    }
                    disabled={
                      lineItemDetail?.priceLocator === "Y" ? false : true
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Price Locator" />
                    )}
                    onChange={priceLocatorHandle}
                  />
                </Grid>
                {salesType === 5 ? (
                  <Grid item xs={3}>
                    <FormControl>
                      <InputLabel id="down-payment-status-select-label">
                        Down Payment Status
                      </InputLabel>
                      <Select
                        labelId="down-payment-status-select-label"
                        id="down-payment-status-select"
                        label="Down Payment Status"
                        onChange={(e) => setDownPaymentStatus(e?.target?.value)}
                        value={downPaymentStatus}
                      >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                ) : (
                  <Grid item xs={3}>
                    <TextField
                      id="dis_percentage"
                      label="Disc/Comm %"
                      disabled
                      value={lineItemDetail?.discPercentage}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid container spacing={1} paddingY={1} paddingX={2}>
                <Grid item xs={3}>
                  <TextField
                    id="tds_amount"
                    label="TDS Amount"
                    disabled
                    value={lineItemDetail?.tdsAmount}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="item_no"
                    label="Item No."
                    disabled
                    value={lineItemDetail?.itemNo}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="mrp"
                    label="MRP"
                    disabled
                    value={lineItemDetail?.mrp}
                  />
                </Grid>
                {salesType === 5 && downPaymentStatus === "No" && (
                  <Grid item xs={3}>
                    <TextField
                      id="installment_amount"
                      label="Installment Amount"
                      disabled
                      value={lineItemDetail?.installmentAmount}
                    />
                  </Grid>
                )}
                {salesType !== 5 ? (
                  <Grid item xs={3}>
                    <TextField
                      id="disc_amt"
                      label="Disc/Comm Amount"
                      disabled
                      value={lineItemDetail?.discountedAmount}
                    />
                  </Grid>
                ) : null}
                {salesType === 5 && downPaymentStatus === "Yes" && (
                  <>
                    <Grid item xs={3}>
                      <TextField
                        id="minium_down_payment"
                        label="Minimum Down Payment"
                        disabled
                        value={lineItemDetail?.downPayment}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              {salesType !== 5 ? (
                <Grid container spacing={1} paddingY={1} paddingX={2}>
                  <Grid item xs={3}>
                    <TextField
                      id="tax_per"
                      label="Tax %"
                      disabled
                      value={lineItemDetail?.taxPercentage}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="selling_price"
                      label="Selling Price"
                      disabled
                      value={lineItemDetail?.sellingPrice}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="add_disc"
                      label="Additional Disc"
                      disabled
                      value={lineItemDetail?.additionalDiscount}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="tax_amt"
                      label="Tax Amount"
                      disabled
                      value={lineItemDetail?.taxAmt}
                    />
                  </Grid>
                </Grid>
              ) : null}
              {salesType !== 5 ? (
                <Grid container spacing={1} paddingY={1} paddingX={2}>
                  <Grid item xs={3}>
                    <TextField
                      id="amt_excel_tax"
                      label="Amount Excl. Tax"
                      disabled
                      value={lineItemDetail?.amountExclTax}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="adv_tax"
                      label="Advance Tax Amount"
                      value={lineItemDetail?.advanceTaxAmount}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="vol_disc"
                      label="Volume Discount"
                      disabled
                      value={lineItemDetail?.volumeDiscount}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="item_total_added_qty"
                      label="Item Total Added Qty"
                      disabled
                      value={lineItemDetail?.itemTotalAddedQty}
                    />
                  </Grid>
                </Grid>
              ) : null}
              {salesType === 5 ? (
                <>
                  <Grid container spacing={1} paddingY={1} paddingX={2}>
                    {downPaymentStatus === "Yes" && (
                      <>
                        <Grid item xs={3}>
                          <TextField
                            id="actual_down_payment"
                            label="Actual Down Payment"
                            onChange={actualDownPaymentHandle}
                            value={lineItemDetail?.actualDownPayment}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            id="payable_amount"
                            label="Payable Amount"
                            disabled
                            value={lineItemDetail?.payableAmount}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            id="installment_amount"
                            label="Installment Amount"
                            disabled
                            value={lineItemDetail?.installmentAmount}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </>
              ) : null}
              {salesType !== 5 ? (
                <Grid
                  container
                  spacing={1}
                  paddingY={1}
                  paddingX={2}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Grid item xs={3}>
                    <TextField
                      id="selling_price"
                      label="Line Item Amount"
                      disabled
                      value={lineItemDetail?.lineItemAmt}
                    />
                  </Grid>
                </Grid>
              ) : null}

              <Grid
                item
                xs={12}
                alignItems="right"
                paddingY={1}
                paddingX={2}
                marginBottom={1}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="contained"
                  onClick={submitHandle}
                  sx={{ mr: 2 }}
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setOpen(false)}
                  color="error"
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={notificationMsg}
          severity={severity}
        />
      )}
      {isLoading && <LoaderDialog open={isLoading} />}
    </>
  );
};

export default AddLineItem;
