import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Grid,
  Button,
  Dialog,
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
}) => {
  const { subInventory, locators, fetchLocators } = useCommon();
  const access_token = localStorage.getItem("access_token");
  const [showNotification, setShowNofication] = useState(false);
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
      `/SalesOrder/FetchBySerialNo?salesType=${salesType}&storeName=${storeName}&item=${lineItemDetail?.itemNo}&subInventory=${lineItemDetail?.subInventoryId}&locator=${lineItemDetail?.locatorId}&serialNo=${lineItemDetail?.serialNo}&qty=${lineItemDetail?.qty}`,
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
        itemTotalAddedQty: res?.data?.itemTotlaAddedQty,
        lineItemAmt: res?.data?.sellingPrice,
        available: res?.data?.available,
        serialNoStatus: res?.data?.serialNoStatus,
        taxAmt: res?.data?.taxAmount,
        priceLocator: res?.data?.priceLocator,
        priceLocatorDTOs: res?.data?.priceLocatorDTOs,
        description: res?.data?.description,
        itemNo: res?.data?.itemNo,
      }));
    } else if (res?.status === 200 && res?.data?.available === "N") {
      setNotificationMsg("Item Not Avaliable");
      setSeverity("info");
      setShowNofication(true);
    } else {
      setNotificationMsg(res?.response?.data?.detail);
      setSeverity("info");
      setShowNofication(true);
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
        additionalDiscount: parseInt(res?.data?.additionalDiscount),
        taxPercentage: parseInt(res?.data?.taxPercentage),
        sellingPrice: res?.data?.sellingPrice,
        discountAmt: res?.data?.discountAmt,
        amountExclTax: res?.data?.amountExclTax,
        advanceTaxAmount: res?.data?.advanceTaxAmount,
        taxAmount: res?.data?.taxAmount,
        volumeDiscount: res?.data?.volumeDiscount,
        itemTotlaAddedQty: res?.data?.itemTotalAddedQty,
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
      setShowNofication(true);
    }
  }, [lineItemDetail?.serialNo, lineItemDetail?.qty]);
  useEffect(() => {
    if (pricingID !== "") {
      fetchPriceLocatorDetails();
    }
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
  const submitHandle = () => {
    setLineItems((prev) =>
      prev.map((item, index) =>
        index === editLineItemIndex ? { ...item, ...lineItemDetail } : item
      )
    );
    setOpen(false);
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
              <Grid
                container
                spacing={1}
                paddingY={1}
                paddingX={4}
                marginTop={1}
              >
                <Grid item xs={3}>
                  <TextField
                    id="store_name"
                    label="Store Name"
                    fullWidth
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
                      renderInput={(params) => (
                        <TextField {...params} label="Sub-Inventory" />
                      )}
                    />
                  ) : (
                    <TextField
                      id="sub_inv"
                      label="Sub-Inventory"
                      fullWidth
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
                      renderInput={(params) => (
                        <TextField {...params} label="Locator" />
                      )}
                    />
                  ) : (
                    <TextField
                      id="locator"
                      label="Locator"
                      fullWidth
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
                    fullWidth
                    onChange={serialNoHandle}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="qty"
                    label="Quantity"
                    fullWidth
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
                <Grid item xs={3}>
                  <TextField
                    id="disc_per"
                    label="Disc/Comm %"
                    fullWidth
                    disabled
                    value={lineItemDetail?.discPercentage}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingY={1} paddingX={4}>
                <Grid item xs={3}>
                  <TextField
                    id="tds_amt"
                    label="TDS Amount"
                    fullWidth
                    disabled
                    value={lineItemDetail?.tdsAmount}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="item_no"
                    label="Item No."
                    fullWidth
                    disabled
                    value={lineItemDetail?.itemNo}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="mrp"
                    label="MRP"
                    fullWidth
                    disabled
                    value={lineItemDetail?.mrp}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="disc_com_amt"
                    label="Disc/Comm Amount"
                    fullWidth
                    disabled
                    value={lineItemDetail?.discountedAmount}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingY={1} paddingX={4}>
                <Grid item xs={3}>
                  <TextField
                    id="tax_per"
                    label="Tax %"
                    fullWidth
                    disabled
                    value={lineItemDetail?.taxPercentage}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="selling_price"
                    label="Selling Price"
                    fullWidth
                    disabled
                    value={lineItemDetail?.sellingPrice}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="add_disc"
                    label="Additional Disc"
                    fullWidth
                    disabled
                    value={lineItemDetail?.additionalDiscount}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="tax_amt"
                    label="Tax Amount"
                    fullWidth
                    disabled
                    value={lineItemDetail?.taxAmt}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingY={1} paddingX={4}>
                <Grid item xs={3}>
                  <TextField
                    id="amt_excel"
                    label="Amount Excl. Tax"
                    fullWidth
                    disabled
                    value={lineItemDetail?.amountExclTax}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="adv_tax"
                    label="Advance Tax Amount"
                    fullWidth
                    value={lineItemDetail?.advanceTaxAmount}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="vol_dis"
                    label="Volumn Discount"
                    fullWidth
                    disabled
                    value={lineItemDetail?.volumeDiscount}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="item_total_added_qty"
                    label="Item Total Added Qty"
                    fullWidth
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
                    fullWidth
                    disabled
                    value={lineItemDetail?.sellingPrice}
                  />
                </Grid>
              </Grid>
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
        </Box>
      </Dialog>
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={setShowNofication}
          message={notificationMsg}
          severity={severity}
        />
      )}
    </>
  );
};

export default EditLineItem;
