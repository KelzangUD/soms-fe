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

const AddLineItem = ({
  open,
  setOpen,
  storeName,
  salesType,
  setLineItems,
  userDetails,
}) => {
  const { subInventory, fetchLocators, locators } = useCommon();
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
    description: "",
    serialNo: "",
    imeiNo: "",
    qty: "",
    priceLocator: "N",
    discPercentage: "",
    tdsAmount: "",
    itemNo: "",
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
    setLineItems((prev) => [...prev, lineItemDetail]);
    setOpen(false);
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
                  color: "#000",
                }}
              >
                <Typography variant="subtitle1">Add Line Item</Typography>
              </Grid>
              <Grid
                container
                spacing={1}
                paddingY={1}
                paddingX={2}
                marginTop={1}
              >
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="Store Name"
                    variant="outlined"
                    fullWidth
                    value={storeName}
                    disabled
                    size="small"
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
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Sub-Inventory"
                          size="small"
                        />
                      )}
                    />
                  ) : (
                    <TextField
                      id="outlined-basic"
                      label="Sub-Inventory"
                      variant="outlined"
                      fullWidth
                      value={lineItemDetail?.subInventoryId}
                      disabled
                      size="small"
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
                      renderInput={(params) => (
                        <TextField {...params} label="Locator" size="small" />
                      )}
                    />
                  ) : (
                    <TextField
                      id="outlined-basic"
                      label="Locator"
                      variant="outlined"
                      fullWidth
                      value={lineItemDetail?.locatorId}
                      disabled
                      size="small"
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
                      <TextField {...params} label="Description" size="small" />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingY={1} paddingX={2}>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="Serial No"
                    variant="outlined"
                    fullWidth
                    onChange={serialNoHandle}
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="Quantity"
                    variant="outlined"
                    fullWidth
                    value={lineItemDetail?.qty}
                    onChange={qtyHandle}
                    size="small"
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
                      <TextField
                        {...params}
                        label="Price Locator"
                        size="small"
                      />
                    )}
                    onChange={priceLocatorHandle}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="Disc/Comm %"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={lineItemDetail?.discPercentage}
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingY={1} paddingX={2}>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="TDS Amount"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={lineItemDetail?.tdsAmount}
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="Item No."
                    variant="outlined"
                    fullWidth
                    disabled
                    value={lineItemDetail?.itemNo}
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="MRP"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={lineItemDetail?.mrp}
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="Disc/Comm Amount"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={lineItemDetail?.discountedAmount}
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingY={1} paddingX={2}>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="Tax %"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={lineItemDetail?.taxPercentage}
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="Selling Price"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={lineItemDetail?.sellingPrice}
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="Additional Disc"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={lineItemDetail?.additionalDiscount}
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="Tax Amount"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={lineItemDetail?.taxAmt}
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingY={1} paddingX={2}>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="Amount Excl. Tax"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={lineItemDetail?.amountExclTax}
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="Advance Tax Amount"
                    variant="outlined"
                    fullWidth
                    value={lineItemDetail?.advanceTaxAmount}
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="Volumn Discount"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={lineItemDetail?.volumeDiscount}
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="Item Total Added Qty"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={lineItemDetail?.itemTotalAddedQty}
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                paddingY={1}
                paddingX={2}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="Line Item Amount"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={lineItemDetail?.sellingPrice}
                    size="small"
                  />
                </Grid>
              </Grid>
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
                  size="small"
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setOpen(false)}
                  color="error"
                  size="small"
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

export default AddLineItem;
