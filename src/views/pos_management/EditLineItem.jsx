import { useState, useEffect } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Route from "../../routes/Route";
import { Notification } from "../../ui/index";
import { Transition } from "../../component/common/index";
import { useCommon } from "../../contexts/CommonContext";

const EditLineItem = ({
  open,
  setOpen,
  storeName,
  salesType,
  setLineItems,
  userDetails,
  editDetails,
  editLineItemIndex,
  emiCycle,
  downPaymentStatus,
  setDownPaymentStatus,
}) => {
  const { subInventory, locators, fetchLocators } = useCommon();
  const access_token = localStorage.getItem("access_token");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [desc, setDesc] = useState("");
  const [onHandItems, setOnHandItems] = useState([]);
  const [pricingID, setPricingID] = useState("");
  const [lineItemDetail, setLineItemDetail] = useState({
    storeName: storeName,
    subInventoryId: userDetails?.subInventory,
    locatorId: userDetails?.locator,
    description: editDetails?.description,
    serialNo: editDetails?.serialNo,
    imeiNo: editDetails?.imeiNo,
    qty: editDetails?.qty,
    priceLocator: editDetails?.priceLocator,
    discPercentage: editDetails?.discPercentage,
    tdsAmount: editDetails?.tdsAmount,
    itemNo: editDetails?.itemNo,
    mrp: editDetails?.mrp,
    discountedAmount: editDetails?.discountedAmount,
    sellingPrice: editDetails?.sellingPrice,
    taxPercentage: editDetails?.taxPercentage,
    additionalDiscount: editDetails?.additionalDiscount,
    amountExclTax: editDetails?.amountExclTax,
    advanceTaxAmount: editDetails?.advanceTaxAmount,
    itemTotalAddedQty: editDetails?.itemTotalAddedQty,
    lineItemAmt: editDetails?.lineItemAmt,
    available: editDetails?.available,
    serialNoStatus: editDetails?.serialNoStatus,
    taxAmt: editDetails?.taxAmt,
    taxBasedAmt: editDetails?.taxBasedAmt,
    discountValue: editDetails?.discountValue,
    dineDiscountAmt: editDetails?.dineDiscountAmt,
    tdsPercent: editDetails?.tdsPercent,
    base_amount_tds: editDetails?.base_amount_tds,
    pricedIdForVarientCode: editDetails?.pricedIdForVarientCode,
    volumeDiscount: editDetails?.volumeDiscount,
    priceLocatorDTOs:
      editDetails?.priceLocatorDTOs !== null
        ? editDetails?.priceLocatorDTOs
        : [],
    downPayment: parseInt(editDetails?.downPayment).toFixed(2),
    actualDownPayment: editDetails?.actualDownPayment,
    payableAmount: editDetails?.payableAmount,
    installmentAmount: editDetails?.installmentAmount,
    downPaymentIR: editDetails?.downPaymentIR,
    emiInterestRate: editDetails?.emiInterestRate,
    upiPayment: editDetails?.upiPayment,
    upiPercentage: editDetails?.upiPercentage,
    upiAmt: editDetails?.upiAmt,
  });
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
          label: item?.item_Description,
        }))
      );
    }
  };
  const fetchItemDescriptionWithSerialNO = async () => {
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
      }&downPaymentStatus=${downPaymentStatus}&upiPayment=${
        lineItemDetail?.upiPayment
      }`,
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
        mrp: res?.data?.mrp,
        discountedAmount: res?.data?.discountAmt,
        sellingPrice: res?.data?.sellingPrice,
        taxPercentage: parseInt(res?.data?.taxPercentage),
        additionalDiscount: parseInt(res?.data?.additionalDiscount),
        amountExclTax: res?.data?.amountExclTax,
        advanceTaxAmount: res?.data?.advanceTaxAmount,
        volumeDiscount: res?.data?.volumeDiscount,
        itemTotlaAddedQty: res?.data?.itemTotalAddedQty,
        lineItemAmt: res?.data?.sellingPrice,
        available: res?.data?.available,
        serialNoStatus: res?.data?.serialNoStatus,
        taxAmt: res?.data?.taxAmount,
        priceLocator: res?.data?.priceLocator,
        priceLocatorDTOs: res?.data?.priceLocatorDTOs,
        description: res?.data?.description,
        itemNo: res?.data?.itemNo,
        downPayment: parseInt(res?.data?.downPayment).toFixed(2),
        payableAmount: res?.data?.payableAmount,
        installmentAmount: res?.data?.installmentAmount,
        downPaymentIR: res?.data?.downPaymentIR,
        emiInterestRate: res?.data?.emiInterestRate,
        upiPercentage: res?.data?.upiPercentage,
        upiAmt: res?.data?.upiAmt,
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
  };
  const fetchItemDescriptionWithOutSerialNO = async () => {
    const res = await Route(
      "GET",
      `/SalesOrder/FetchByDescription?salesType=${salesType}&storeName=${storeName}&item=${lineItemDetail?.itemNo}&subInventory=${lineItemDetail?.subInventoryId}&locator=${lineItemDetail?.locatorId}&serialNo&qty=${lineItemDetail?.qty}&upiPayment=${lineItemDetail?.upiPayment}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200 && res?.data?.serialControlled != "Y") {
      setLineItemDetail((prev) => ({
        ...prev,
        priceLocator: res?.data?.priceLocator,
        mrp: res?.data?.mrp,
        discPercentage: res?.data?.discPercentage,
        tdsAmount: parseInt(res?.data?.tdsAmount),
        mrp: res?.data?.mrp,
        discountedAmount: res?.data?.discountAmt,
        sellingPrice: res?.data?.sellingPrice,
        taxPercentage: parseInt(res?.data?.taxPercentage),
        additionalDiscount: parseInt(res?.data?.additionalDiscount),
        amountExclTax: res?.data?.amountExclTax,
        advanceTaxAmount: res?.data?.advanceTaxAmount,
        volumeDiscount: res?.data?.volumeDiscount,
        itemTotalAddedQty: res?.data?.itemTotlaAddedQty,
        lineItemAmt: res?.data?.sellingPrice,
        available: res?.data?.available,
        serialNoStatus: res?.data?.serialNoStatus,
        taxAmt: res?.data?.taxAmount,
        priceLocator: res?.data?.priceLocator,
        priceLocatorDTOs: res?.data?.priceLocatorDTOs,
        downPayment: parseInt(res?.data?.downPayment).toFixed(2),
        payableAmount: res?.data?.payableAmount,
        installmentAmount: res?.data?.installmentAmount,
        downPaymentIR: res?.data?.downPaymentIR,
        emiInterestRate: res?.data?.emiInterestRate,
        upiPercentage: res?.data?.upiPercentage,
        upiAmt: res?.data?.upiAmt,
      }));
    }
  };
  const fetchPriceLocatorDetails = async () => {
    const res = await Route(
      "GET",
      `/SalesOrder/FetchPriceLocatorDtls?pricingId=${pricingID}&qty=${lineItemDetail?.qty}&salesType=${salesType}&upiPayment=${lineItemDetail?.upiPayment}`,
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
        additionalDiscount: parseInt(res?.data?.additionalDiscount),
        taxPercentage: parseInt(res?.data?.taxPercentage),
        sellingPrice: res?.data?.sellingPrice,
        discountAmt: res?.data?.discountAmt,
        amountExclTax: res?.data?.amountExclTax,
        advanceTaxAmount: res?.data?.advanceTaxAmount,
        taxAmount: res?.data?.taxAmount,
        volumeDiscount: res?.data?.volumeDiscount,
        itemTotlaAddedQty: res?.data?.itemTotalAddedQty,
        downPayment: parseInt(res?.data?.downPayment).toFixed(2),
        payableAmount: res?.data?.payableAmount,
        installmentAmount: res?.data?.installmentAmount,
        downPaymentIR: res?.data?.downPaymentIR,
        emiInterestRate: res?.data?.emiInterestRate,
        upiPercentage: res?.data?.upiPercentage,
        upiAmt: res?.data?.upiAmt,
      }));
    }
  };
  useEffect(() => {
    fetchLocators(lineItemDetail?.subInventoryId);
  }, [lineItemDetail?.subInventoryId]);
  useEffect(() => {
    fetchOnHandItems();
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
  }, [lineItemDetail?.serialNo, lineItemDetail?.qty]);
  useEffect(() => {
    if (pricingID !== "") {
      fetchPriceLocatorDetails();
    }
  }, [pricingID]);

  const upiPaymentHandle = (e) => {
    setLineItemDetail((prev) => ({
      ...prev,
      upiPayment: e?.target?.value,
    }));
  };
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
  };
  const fetchDownPaymentDetails = async () => {
    const res = await Route(
      "GET",
      `/emi/getDownPaymentDetails?mrp=${lineItemDetail?.mrp}&minDownPayment=${
        lineItemDetail?.downPayment === "NaN" ? 0 : lineItemDetail?.downPayment
      }&actualDownPayment=${
        lineItemDetail?.actualDownPayment === undefined
          ? editDetails?.actualDownPayment
          : lineItemDetail?.actualDownPayment
      }&emiCycle=${emiCycle === null ? 0 : emiCycle}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setLineItemDetail((prev) => ({
        ...prev,
        installmentAmount: res?.data?.installmentAmount,
        payableAmount: res?.data?.netPayableAmount,
        actualDownPayment: lineItemDetail?.actualDownPayment,
      }));
    }
  };
  useEffect(() => {
    if (
      parseInt(lineItemDetail?.actualDownPayment) !==
        parseInt(editDetails?.actualDownPayment) &&
      salesType === 5
    ) {
      fetchDownPaymentDetails();
    }
  }, [lineItemDetail?.actualDownPayment, editDetails?.actualDownPayment]);
  const actualDownPaymentHandle = (e) => {
    setLineItemDetail((prev) => ({
      ...prev,
      actualDownPayment: e.target.value,
    }));
  };
  const submitHandle = () => {
    if (salesType === 5) {
      if (
        parseInt(lineItemDetail?.actualDownPayment) >=
        parseInt(lineItemDetail?.downPayment)
      ) {
        setLineItems((prev) =>
          prev.map((item, index) =>
            index === editLineItemIndex ? { ...item, ...lineItemDetail } : item
          )
        );
        setOpen(false);
      } else {
        setNotificationMsg("Actual Down Payment is Less than Down Payment");
        setSeverity("info");
        setShowNotification(true);
      }
    } else {
      setLineItems((prev) =>
        prev.map((item, index) =>
          index === editLineItemIndex ? { ...item, ...lineItemDetail } : item
        )
      );
      setOpen(false);
    }
  };
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xl"
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
              {salesType === 1 && (
                <Grid container>
                  <Alert severity="info" sx={{ width: "100%" }}>
                    For UPI payment, please select UPI payment as "YES".
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
                {salesType === 1 && (
                  <Grid
                    item
                    xs={12}
                    mb={1}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Grid item xs={12} md={3}>
                      <FormControl>
                        <InputLabel id="upi-payment-select-label">
                          UPI Payment
                        </InputLabel>
                        <Select
                          labelId="upi-payment-select-label"
                          id="upi-payment-select"
                          value={lineItemDetail?.upiPayment}
                          label="UPI Payment"
                          onChange={upiPaymentHandle}
                        >
                          <MenuItem value="Y">Yes</MenuItem>
                          <MenuItem value="N">No</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                )}
                <Grid item xs={12} md={3}>
                  <TextField
                    id="storeName"
                    label="Store Name"
                    value={storeName}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={3}>
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
                <Grid item xs={12} md={3}>
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
                <Grid item xs={12} md={3}>
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
              <Grid
                container
                spacing={1}
                paddingY={{ xs: 0, md: 1 }}
                paddingX={2}
              >
                <Grid item xs={12} md={3}>
                  <TextField
                    id="serial_no"
                    label="Serial No"
                    onChange={serialNoHandle}
                  />
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  md={3}
                  display="flex"
                  justifyContent="space-between"
                >
                  <TextField
                    id="qty"
                    label="Qty"
                    value={lineItemDetail?.qty}
                    onChange={qtyHandle}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
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
                  <Grid item xs={12} md={3}>
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
                        disabled
                      >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                ) : (
                  <Grid item xs={12} md={3}>
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
                <Grid item xs={12} md={3}>
                  <TextField
                    id="tds_amount"
                    label="TDS Amount"
                    disabled
                    value={lineItemDetail?.tdsAmount}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="item_no"
                    label="Item No."
                    disabled
                    value={lineItemDetail?.itemNo}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="mrp"
                    label="MRP"
                    disabled
                    value={lineItemDetail?.mrp}
                  />
                </Grid>
                {salesType === 5 && downPaymentStatus === "No" && (
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="installment_amount"
                      label="Installment Amount"
                      disabled
                      value={lineItemDetail?.installmentAmount}
                    />
                  </Grid>
                )}
                {salesType !== 5 ? (
                  <Grid item xs={12} md={3}>
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
                    <Grid item xs={12} md={3}>
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
              <Grid
                container
                spacing={1}
                paddingY={{ xs: 0, md: 1 }}
                paddingX={2}
              >
                <Grid item xs={12} md={3}>
                  <TextField
                    id="gst"
                    label="GST %"
                    disabled
                    value={lineItemDetail?.taxPercentage}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="gst_amt"
                    label="GST Amount"
                    disabled
                    value={lineItemDetail?.taxAmt}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="upi_percentage"
                    label="Transaction Fee Percentage"
                    disabled
                    value={lineItemDetail?.upiPercentage}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="upi_amount"
                    label="Transaction Fee Amount"
                    disabled
                    value={lineItemDetail?.upiAmt}
                  />
                </Grid>
              </Grid>
              {salesType !== 5 ? (
                <Grid
                  container
                  spacing={1}
                  paddingY={{ xs: 0, md: 1 }}
                  paddingX={2}
                >
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="selling_price"
                      label="Selling Price"
                      disabled
                      value={lineItemDetail?.sellingPrice}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="add_disc"
                      label="Additional Disc"
                      disabled
                      value={lineItemDetail?.additionalDiscount}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="amt_excel_tax"
                      label="Amount Excl. Tax"
                      disabled
                      value={lineItemDetail?.amountExclTax}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="adv_tax"
                      label="Advance Tax Amount"
                      value={lineItemDetail?.advanceTaxAmount}
                    />
                  </Grid>
                </Grid>
              ) : null}
              {salesType !== 5 ? (
                <Grid
                  container
                  spacing={1}
                  paddingY={{ xs: 0, md: 1 }}
                  paddingX={2}
                >
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="vol_disc"
                      label="Volume Discount"
                      disabled
                      value={lineItemDetail?.volumeDiscount}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
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
                  <Grid
                    container
                    spacing={1}
                    paddingY={{ xs: 0, md: 1 }}
                    paddingX={2}
                  >
                    {downPaymentStatus === "Yes" && (
                      <>
                        <Grid item xs={12} md={3}>
                          <TextField
                            id="actual_down_payment"
                            label="Actual Down Payment"
                            onChange={actualDownPaymentHandle}
                            value={lineItemDetail?.actualDownPayment}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField
                            id="payable_amount"
                            label="Payable Amount"
                            disabled
                            value={lineItemDetail?.payableAmount}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
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
                  <Grid item xs={12} md={3}>
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
                  disabled={
                    salesType === 5 && lineItemDetail?.mrp < 30000
                      ? true
                      : false
                  }
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
        {/* <Box sx={{ width: "100%" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Grid
                container
                paddingX={4}
                paddingY={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: (theme) => theme.palette.bg.light,
                  color: "#fff",
                }}
              >
                <Grid item>
                  <Typography variant="subtitle1">Edit Line Item</Typography>
                </Grid>
              </Grid>
              {salesType === 5 && (
                <Grid container>
                  <Alert severity="info" sx={{ width: "100%" }}>
                    Actual Down Payment should be equal to or greater than
                    Minimum Down Payment!
                  </Alert>
                </Grid>
              )}
              {salesType === 1 && (
                <Grid container>
                  <Alert severity="info" sx={{ width: "100%" }}>
                    For UPI payment, please select UPI payment as "YES".
                  </Alert>
                </Grid>
              )}

              <Grid
                container
                spacing={1}
                paddingY={1}
                paddingX={4}
                marginTop={1}
              >
                {salesType === 1 && (
                  <Grid
                    item
                    xs={12}
                    mb={1}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Grid item xs={12} md={3}>
                      <FormControl>
                        <InputLabel id="upi-payment-select-label">
                          UPI Payment
                        </InputLabel>
                        <Select
                          labelId="upi-payment-select-label"
                          id="upi-payment-select"
                          value={lineItemDetail?.upiPayment}
                          label="UPI Payment"
                          onChange={upiPaymentHandle}
                        >
                          <MenuItem value="Y">Yes</MenuItem>
                          <MenuItem value="N">No</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                )}
                <Grid item xs={3}>
                  <TextField
                    id="store_name"
                    label="Store Name"
                    value={storeName}
                    disabled
                  />
                </Grid>
                <Grid item xs={3}>
                  {userDetails?.roleName === "Administrator" ? (
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
                      id="sub_inv"
                      label="Sub-Inventory"
                      value={lineItemDetail?.subInventoryId}
                      disabled
                    />
                  )}
                </Grid>
                <Grid item xs={3}>
                  {userDetails?.roleName === "Administrator" ? (
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
              <Grid container spacing={1} paddingY={1} paddingX={4}>
                <Grid item xs={3}>
                  <TextField
                    id="serial_no"
                    label="Serial No"
                    onChange={serialNoHandle}
                    value={lineItemDetail?.serialNo}
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
                      lineItemDetail?.priceLocator == "Y" ? false : true
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
                        disabled
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
              <Grid container spacing={1} paddingY={1} paddingX={4}>
                <Grid item xs={3}>
                  <TextField
                    id="tds_amt"
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
                {salesType == 5 && downPaymentStatus === "No" && (
                  <Grid item xs={3}>
                    <TextField
                      id="installment_amount"
                      label="Installment Amount"
                      disabled
                      value={lineItemDetail?.installmentAmount}
                    />
                  </Grid>
                )}
                <Grid item xs={3}>
                  {salesType === 5 && downPaymentStatus === "Yes" ? (
                    <TextField
                      id="minimum_down_payment"
                      label="Minimum Down Payment"
                      disabled
                      value={lineItemDetail?.downPayment}
                    />
                  ) : (
                    <TextField
                      id="disc_com_amt"
                      label="Disc/Comm Amount"
                      disabled
                      value={lineItemDetail?.discountedAmount}
                    />
                  )}
                </Grid>
              </Grid>
              {salesType !== 5 ? (
                <>
                  <Grid container spacing={1} paddingY={1} paddingX={4}>
                    <Grid item xs={3}>
                      <TextField
                        id="gst_per"
                        label="GST %"
                        disabled
                        value={lineItemDetail?.taxPercentage}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="gst_amt"
                        label="GSt Amount"
                        disabled
                        value={lineItemDetail?.taxAmt}
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
                  </Grid>
                  <Grid container spacing={1} paddingY={1} paddingX={4}>
                    <Grid item xs={3}>
                      <TextField
                        id="amt_excel"
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
                        id="vol_dis"
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
                  <Grid
                    container
                    spacing={1}
                    paddingY={1}
                    paddingX={4}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Grid item xs={3}>
                      <TextField
                        id="selling_price"
                        label="Line Item Amount"
                        disabled
                        value={lineItemDetail?.sellingPrice}
                      />
                    </Grid>
                  </Grid>
                </>
              ) : (
                <Grid container spacing={1} paddingY={1} paddingX={4}>
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
                </Grid>
              )}
              {salesType === 5 ? (
                <>
                  <Grid
                    container
                    spacing={1}
                    paddingY={{ xs: 0, md: 1 }}
                    paddingX={2}
                  >
                    {downPaymentStatus === "Yes" && (
                      <>
                        <Grid item xs={12} md={3}>
                          <TextField
                            id="actual_down_payment"
                            label="Actual Down Payment"
                            onChange={actualDownPaymentHandle}
                            value={lineItemDetail?.actualDownPayment}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField
                            id="payable_amount"
                            label="Payable Amount"
                            disabled
                            value={lineItemDetail?.payableAmount}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
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
              
              <Grid
                item
                xs={12}
                alignItems="right"
                paddingY={1}
                paddingX={4}
                marginBottom={2}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="contained"
                  onClick={submitHandle}
                  sx={{ mr: 2 }}
                >
                  Update
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
        </Box> */}
      </Dialog>
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={notificationMsg}
          severity={severity}
        />
      )}
    </>
  );
};

export default EditLineItem;
