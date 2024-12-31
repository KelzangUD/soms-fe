import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Select,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AddLineItem from "./AddLineItem";
import EditLineItem from "./EditLineItem";
import {
  Notification,
  LoaderDialog,
  ItemsNotFoundDialog,
  VisuallyHiddentInputComponent,
  SuccessNotification,
} from "../../ui/index";
import {
  LineItemsTable,
  PaymentDetailsTable,
} from "../../component/pos_management/index";
import Route from "../../routes/Route";
import dayjs from "dayjs";
import { dateFormatter, downloadSampleHandle } from "../../util/CommonUtil";
import { useCommon } from "../../contexts/CommonContext";

const SalesOrder = () => {
  const {
    salesType,
    productsType,
    paymentType,
    fetchBankBasedOnPaymentType,
    banks,
  } = useCommon();
  const user = localStorage.getItem("username");
  const userDetails = JSON.parse(localStorage?.getItem("userDetails"));
  const access_token = localStorage.getItem("access_token");
  const [showNotification, setShowNofication] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editLineItemIndex, setEditLineItemIndex] = useState(null);
  const [editDetails, setEditDetails] = useState({});
  const [customersList, setCustomersList] = useState([]);
  const [salesOrderDetails, setSalesOrderDetails] = useState({
    pos_no: "",
    postingDate: dateFormatter(new Date().toDateString()),
    salesType: "",
    productType: "",
    mobileNo: "",
    customerNumber: "",
    customerName: "",
    address: "",
    address1: "",
    city: "",
    serviceRemarks: "",
    advanceNo: "",
    advanceAmt: 0,
    adjType: "",
    storeName: userDetails?.regionName,
    advance_no: "",
    advance_amount: "",
    adj_type: "",
    amount: "",
    item_Number: "",
    interest: "",
  });
  const [linesAmount, setLinesAmount] = useState({
    grossTotal: 0,
    taxAmt: 0,
    discountedAmount: 0,
    advanceTaxAmount: 0,
    tdsAmount: 0,
    netAmount: 0,
  });
  const [paymentLines, setPaymentLines] = useState([]);
  const [paymentLinesItem, setPaymentLinesItem] = useState({
    paymentAmount: "",
    paymentTypeItem: "",
    paymentType: "",
    paymentTypeName: "",
    bankItem: "",
    bankAccountNumber: "",
    chequeNumber: "",
    chequeDate: "",
    cardNumber: "",
    emiRefrenceNo: "",
    chequeCopy: "",
  });
  const [bulkUpload, setBulkUpload] = useState(false);
  const [lineItems, setLineItems] = useState([]);
  const [itemsNotFound, setItemsNotFound] = useState([]);
  const [openItemsNotFoundDialog, setOpenItemsNotFoundDialog] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [emiList, setEmiList] = useState([]);
  const [responseData, setResponseData] = useState({});
  const [lineItemDetail, setLineItemDetail] = useState({
    priceLocator: "",
    mrp: "",
    discPercentage: "",
    tdsAmount: "",
    discountedAmount: "",
    sellingPrice: "",
    taxPercentage: "",
    additionalDiscount: "",
    amountExclTax: "",
    advanceTaxAmount: "",
    volumeDiscount: "",
    itemTotalAddedQty: "",
    lineItemAmt: "",
    available: "",
    serialNoStatus: "",
    taxAmt: "",
    priceLocatorDTOs: "",
  });

  const fetchCustomersList = async () => {
    const res = await Route(
      "GET",
      `/Customer/Common/Fetch_All_Customers?salesType=${salesOrderDetails?.salesType}&userId=${user}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setCustomersList(res?.data);
    }
  };
  const fetchCustomersDetails = async (customerID) => {
    const res = await Route(
      "GET",
      `/Customer/Common/Fetch_Customer_Dtls?customerId=${customerID}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setSalesOrderDetails((prev) => ({
        ...prev,
        mobileNo: res?.data?.mobile_NUMBER,
        customerNumber: res?.data?.customer_NUMBER,
        address: res?.data?.address1,
        address1: res?.data?.address2,
        city: res?.data?.city,
      }));
    }
  };
  const fetcEMIList = async (employeeCode) => {
    const res = await Route(
      "GET",
      `/SalesOrder/GetEMIList?employeeCode=${employeeCode}`,
      access_token,
      null,
      null
    );
    setIsLoading(true);
    try {
      if (res?.status === 200) {
        setEmiList(res?.data);
      }
    } catch (err) {
      setNotificationMsg("Error", err);
      setSeverity("error");
      setShowNofication(true);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchItemDescription = async (itemNo) => {
    const res = await Route(
      "GET",
      `/SalesOrder/FetchByDescription?salesType=${salesOrderDetails?.salesType}&storeName=${userDetails?.regionName}&item=${itemNo}&subInventory=${userDetails?.subInventory}&locator=${userDetails?.locator}&serialNo&qty=1`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setLineItemDetail((prev) => ({
        ...prev,
        description: res?.data?.description,
        priceLocator: res?.data?.priceLocator,
        mrp: res?.data?.mrp,
        discPercentage: res?.data?.discPercentage,
        tdsAmount: parseInt(res?.data?.tdsAmount),
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
        priceLocatorDTOs: res?.data?.priceLocatorDTOs,
      }));
    }
  };
  const fetcEMIDetails = async (emiNo) => {
    const res = await Route(
      "GET",
      `/SalesOrder/GetEMIDetails?emiNo=${emiNo}`,
      access_token,
      null,
      null
    );
    setIsLoading(true);
    try {
      if (res?.status === 200) {
        fetchItemDescription(res?.data[0]?.item_Number);
        setSalesOrderDetails((prev) => ({
          ...prev,
          amount: res?.data[0]?.amount,
          item_Number: res?.data[0]?.item_Number,
          interest: res?.data[0]?.interest,
        }));
      }
    } catch (err) {
      setNotificationMsg("Error", err);
      setSeverity("error");
      setShowNofication(true);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchProductDetailsBasedOnItemList = async (file) => {
    setIsLoading(true);
    try {
      let data = new FormData();
      data.append("storeName", userDetails?.regionName);
      data.append("File", file);
      const res = await Route(
        "POST",
        `/SalesOrder/Product_Details`,
        access_token,
        data,
        null,
        "multipart/form-data"
      );
      if (res?.status === 200) {
        const foundItems = [];
        const notFoundItems = [];
        res?.data?.forEach((item) => {
          if (item?.remarks !== "Not-Available") {
            foundItems.push({
              priceLocator: item?.priceLocator,
              mrp: item?.mrp,
              discPercentage: item?.discPercentage,
              tdsAmount: parseInt(item?.tdsAmount),
              discountedAmount: 0,
              sellingPrice: item?.sellingPrice,
              taxPercentage: parseInt(item?.taxPercentage),
              additionalDiscount: parseInt(item?.additionalDiscount),
              amountExclTax: item?.amountExclTax,
              advanceTaxAmount: item?.advanceTaxAmount,
              volumeDiscount: item?.volumeDiscount,
              itemTotalAddedQty: item?.itemTotlaAddedQty,
              lineItemAmt: item?.sellingPrice,
              available: item?.available,
              serialNoStatus: item?.serialNoStatus,
              taxAmt: item?.taxAmount,
              priceLocatorDTOs: item?.priceLocatorDTOs,
              description: item?.description,
              itemNo: item?.itemNo,
              qty: 1,
              serialNo: item?.serialNo,
              subInventoryId: item?.sub_Inventory,
              locatorId: item?.locator,
            });
          } else {
            notFoundItems.push({
              serialNo: item?.serialNo,
            });
          }
        });
        setLineItems(foundItems);
        if (notFoundItems?.length > 0) {
          setItemsNotFound(notFoundItems);
          setOpenItemsNotFoundDialog(true);
        }
      }
    } catch (error) {
      setNotificationMsg("Error", error);
      setSeverity("error");
      setShowNofication(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    salesOrderDetails?.salesType !== "" && fetchCustomersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salesOrderDetails?.salesType, user]);
  useEffect(() => {
    fetchBankBasedOnPaymentType(paymentLinesItem?.paymentType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentLinesItem?.paymentType]);
  useEffect(() => {
    setPaymentLinesItem((prev) => ({
      ...prev,
      paymentAmount: linesAmount?.netAmount,
    }));
  }, [linesAmount?.netAmount]);
  const salesTypeHandle = (e) => {
    resetStateHandle();
    setSalesOrderDetails((prev) => ({
      ...prev,
      salesType: parseInt(e?.target?.value),
      adj_type: e?.target?.value === "4" ? "EMI" : "",
    }));
    e?.target?.value === "2" ? setBulkUpload(true) : setBulkUpload(false);
  };
  const productsTypeHandle = (e) => {
    setSalesOrderDetails((prev) => ({
      ...prev,
      productType: parseInt(e.target.value),
    }));
  };
  const customerNameHandle = (e, value) => {
    fetchCustomersDetails(value?.id);
    setSalesOrderDetails((prev) => ({
      ...prev,
      customerName: value?.label,
    }));
  };
  const advanceOrEmiHandle = (e) => {
    if (e?.target?.value === "EMI") {
      fetcEMIList(salesOrderDetails?.customerName.split("(")[1].split(")")[0]);
    }
    setSalesOrderDetails((prev) => ({
      ...prev,
      adj_type: e?.target?.value,
      advance_amount: 0,
    }));
  };
  const advanceNoHandle = (e, value) => {
    fetcEMIDetails(value?.id.replaceAll("|", "%7C"));
    setSalesOrderDetails((prev) => ({
      ...prev,
      advance_no: value?.id.replaceAll("|", "%7C"),
      advanceNo: value?.id,
    }));
  };
  const remarksHandle = (e) => {
    setSalesOrderDetails((prev) => ({
      ...prev,
      serviceRemarks: e?.target?.value,
    }));
  };
  const uploadCSVFileHandle = (e) => {
    fetchProductDetailsBasedOnItemList(e?.target?.files[0]);
  };
  const addButtonHandle = () => {
    if (
      salesOrderDetails?.salesType === "" ||
      salesOrderDetails?.productType === "" ||
      salesOrderDetails?.customerName === ""
    ) {
      setNotificationMsg("Please Fill Up Necessary Information!");
      setSeverity("info");
      setShowNofication(true);
    } else {
      setOpenDialog(true);
    }
  };
  const editLineItemHandle = (e, item, index) => {
    setEditLineItemIndex(index);
    setEditDetails(item);
    setEdit(true);
  };
  const deleteLineItemHandle = (e, indexToRemove) => {
    setLineItems((prev) => prev.filter((_, index) => index !== indexToRemove));
  };
  const paymentAmountHandle = (e) => {
    setPaymentLinesItem((prev) => ({
      ...prev,
      paymentAmount: e?.target?.value,
    }));
  };
  const paymentHandle = (e) => {
    setPaymentLinesItem((prev) => ({
      ...prev,
      paymentTypeItem: e?.target?.value,
      paymentType: e?.target?.value?.id,
      paymentTypeName: e?.target?.value?.type,
    }));
  };
  const bankHandle = (e) => {
    setPaymentLinesItem((prev) => ({
      ...prev,
      bankItem: e?.target?.value,
      bankAccountNumber: e?.target?.value?.bankName,
    }));
  };
  const cardNoHandle = (e) => {
    setPaymentLinesItem((prev) => ({
      ...prev,
      cardNumber: e?.target?.value,
    }));
  };
  const chequeNoHandle = (e) => {
    setPaymentLinesItem((prev) => ({
      ...prev,
      chequeNumber: e?.target?.value,
    }));
  };
  const chequeDateHandle = (e) => {
    setPaymentLinesItem((prev) => ({
      ...prev,
      chequeDate: dateFormatter(e?.$d),
    }));
  };
  const chequeCopyHandle = (e) => {
    setIsFileUploaded(true);
    setPaymentLinesItem((prev) => ({
      ...prev,
      chequeCopy: e?.target?.files[0],
    }));
  };
  const addPaymentItemHandle = () => {
    setPaymentLines((prev) => [...prev, paymentLinesItem]);
    setPaymentLinesItem({
      paymentAmount: "",
      paymentTypeItem: "",
      paymentType: "",
      paymentTypeName: "",
      bankItem: "",
      bankAccountNumber: "",
      chequeNumber: "",
      chequeDate: "",
      cardNumber: "",
      emiRefrenceNo: "",
      chequeCopy: "",
    });
  };
  const deletePaymentItemHandle = (e, indexToRemove) => {
    setPaymentLines((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };
  useEffect(() => {
    const totals = lineItems?.reduce(
      (accumulator, currentObject) => {
        accumulator.grossTotal +=
          currentObject?.mrp * parseInt(currentObject?.qty) || 0;
        accumulator.taxAmt += currentObject?.taxAmt || 0;
        accumulator.discountedAmount += currentObject?.discountedAmount || 0;
        accumulator.advanceTaxAmount += currentObject?.advanceTaxAmount || 0;
        accumulator.tdsAmount += currentObject?.tdsAmount || 0;
        accumulator.netAmount +=
          currentObject?.mrp * parseInt(currentObject?.qty) -
            (currentObject?.taxAmt +
              currentObject?.discountedAmount +
              currentObject?.advanceTaxAmount +
              currentObject?.tdsAmount) || 0;
        return accumulator;
      },
      {
        grossTotal: 0,
        taxAmt: 0,
        discountedAmount: 0,
        advanceTaxAmount: 0,
        tdsAmount: 0,
        netAmount: 0,
      }
    );
    setLinesAmount((prev) => ({
      ...prev,
      ...totals,
    }));
  }, [lineItems]);

  const resetStateHandle = () => {
    setSalesOrderDetails((prev) => ({
      ...prev,
      postingDate: dateFormatter(dayjs(new Date())),
      salesType: "",
      productType: "",
      mobileNo: "",
      customerNumber: "",
      customerName: "",
      address: "",
      address1: "",
      city: "",
      serviceRemarks: "",
      advanceNo: "",
      advanceAmt: 0,
      adjType: "",
      advance_no: "",
      advance_amount: "",
      adj_type: "",
      item_Number: "",
      interest: "",
      amount: "",
    }));
    setPaymentLines([]);
    setPaymentLinesItem((prev) => ({
      ...prev,
      paymentAmount: "",
      paymentType: "",
      paymentTypeName: "",
      bankAccountNumber: "",
      chequeNumber: "",
      chequeDate: "",
      cardNumber: "",
      emiRefrenceNo: "",
      chequeCopy: "",
    }));
    setBulkUpload(false);
    setLineItems([]);
    setLineItemDetail((prev) => ({
      ...prev,
      priceLocator: "",
      mrp: "",
      discPercentage: "",
      tdsAmount: "",
      discountedAmount: "",
      sellingPrice: "",
      taxPercentage: "",
      additionalDiscount: "",
      amountExclTax: "",
      advanceTaxAmount: "",
      volumeDiscount: "",
      itemTotalAddedQty: "",
      lineItemAmt: "",
      available: "",
      serialNoStatus: "",
      taxAmt: "",
      priceLocatorDTOs: "",
    }));
  };

  const postHandle = async () => {
    if (
      parseInt(linesAmount?.netAmount) ===
      (paymentLines?.length > 0 &&
        paymentLines?.reduce(
          (accumulator, currentObject) =>
            accumulator + parseInt(currentObject?.paymentAmount),
          0
        ))
    ) {
      setIsLoading(true);
      try {
        let formData = new FormData();
        if (paymentLines && parseInt(paymentLinesItem.paymentType) === 2) {
          for (let i = 0; i < paymentLines?.length; i++) {
            formData.append("cheque", paymentLines[i].chequeCopy);
          }
        } else {
          const placeholderFile = new File([""], "cheque.png");
          formData.append("cheque", placeholderFile);
        }
        formData?.append("storeName", userDetails?.regionName);
        const data = {
          itemLinesDtls: lineItems,
          paymentLinesDtls: paymentLines,
          salesHeaderDtls: salesOrderDetails,
          linesAmountDtls: {
            grossTotal: linesAmount?.grossTotal,
            taxAmount: linesAmount?.taxAmt,
            discountAmount: linesAmount?.discountedAmount,
            additionalDiscount: 0,
            lotOfSaleDiscount: 0,
            tdsAmount: linesAmount?.tdsAmount,
            netAmount: linesAmount?.netAmount,
          },
          userId: user,
        };
        const jsonDataBlob = new Blob([JSON.stringify(data)], {
          type: "application/json",
        });
        formData.append("details", jsonDataBlob, "data.json");
        const res = await Route(
          "POST",
          `/SalesOrder/UpdateItemSales`,
          access_token,
          formData,
          null,
          "multipart/form-data"
        );
        if (res?.status === 201) {
          resetStateHandle();
          setResponseData(res?.data);
          setSeverity("success");
          setNotificationMsg("Successfully Created");
          setShowNofication(true);
        } else if (res?.status === 400) {
          setNotificationMsg(res?.response?.data?.status);
          setSeverity("info");
          setShowNofication(true);
        } else {
          setNotificationMsg("Failed to create the sales order. Try again!");
          setSeverity("error");
          setShowNofication(true);
        }
      } catch (error) {
        setNotificationMsg("Error", error);
        setSeverity("error");
        setShowNofication(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      setNotificationMsg("Total Payment is Not equal to Net Payment");
      setSeverity("info");
      setShowNofication(true);
    }
  };

  const openInNewTab = () => {
    const queryParams = new URLSearchParams();
    queryParams.append("advance", responseData?.advance);
    queryParams.append("amount", responseData?.amount);
    queryParams.append("applicationNo", responseData?.applicationNo);
    queryParams.append("billing", responseData?.billing);
    queryParams.append("companyName", responseData?.companyName);
    queryParams.append("createdBy", responseData?.createdBy);
    queryParams.append("customerName", responseData?.customerName);
    queryParams.append("customerNo", responseData?.customerNo);
    queryParams.append("discount", responseData?.discount);
    queryParams.append("downPayment", responseData?.downPayment);
    queryParams.append("grossTotal", responseData?.grossTotal);
    queryParams.append("paymentDate", responseData?.paymentDate);
    queryParams.append("phone", responseData?.phone);
    queryParams.append("receiptType", responseData?.receiptType);
    queryParams.append("rechargeDate", responseData?.rechargeDate);
    queryParams.append("tax", responseData?.tax);
    queryParams.append("totalAmount", responseData?.totalAmount);
    responseData?.itemDetails.forEach((item) =>
      queryParams.append("itemDetails", JSON.stringify(item))
    );
    const queryString = queryParams.toString();
    const newWindow = window.open(
      `/sales-order-receipt?${queryString}`,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Card>
              <Grid
                container
                sx={{
                  backgroundColor: (theme) => theme.palette.bg.light,
                  padding: 2,
                }}
              >
                <Typography variant="subtitle1" color="#eee">
                  Header
                </Typography>
              </Grid>
              <Grid container p={2}>
                <Grid container spacing={1} mb={1}>
                  <Grid item xs={3}>
                    <TextField label="POS No" name="pos_no" disabled />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Posting Date"
                      name="posting_date"
                      defaultValue={new Date().toDateString()}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl>
                      <InputLabel id="sales-type-select-label">
                        Sales Type
                      </InputLabel>
                      <Select
                        labelId="sales-type-select-label"
                        id="sales-type-select"
                        value={salesOrderDetails?.salesType}
                        label="Sales Type"
                        onChange={salesTypeHandle}
                      >
                        {salesType?.map((item) => (
                          <MenuItem value={item?.id} key={item?.id}>
                            {item?.type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl>
                      <InputLabel id="product-type-select-label">
                        Product Type
                      </InputLabel>
                      <Select
                        labelId="product-type-select-label"
                        id="product-type-select"
                        value={salesOrderDetails?.productType}
                        label="Product Type"
                        onChange={productsTypeHandle}
                      >
                        {productsType?.map((item) => (
                          <MenuItem value={item?.id} key={item?.id}>
                            {item?.type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={1} py={1} mb={1}>
                  <Grid item xs={3}>
                    <Autocomplete
                      disablePortal
                      options={customersList?.map((item) => ({
                        id: item?.customerId,
                        label: item?.customer_NAME,
                      }))}
                      onChange={(event, newValue) => {
                        if (newValue === null) {
                          setSalesOrderDetails((prev) => ({
                            ...prev,
                            customerName: "",
                            mobileNo: "",
                            customerNumber: "",
                            address: "",
                            address1: "",
                            city: "",
                          }));
                        } else {
                          customerNameHandle(event, newValue);
                        }
                      }}
                      value={salesOrderDetails?.customerName}
                      renderInput={(params) => (
                        <TextField {...params} label="Customer Name" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Mobile No"
                      name="mobile_no"
                      required
                      value={salesOrderDetails?.mobileNo}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Customer No"
                      name="customer_no"
                      required
                      value={salesOrderDetails?.customerNumber}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Address"
                      name="address"
                      value={salesOrderDetails?.address}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <TextField
                      label="Address 1"
                      name="address 1"
                      value={salesOrderDetails?.address1}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="City"
                      name="city"
                      value={salesOrderDetails?.city}
                      disabled
                    />
                  </Grid>
                  {salesOrderDetails?.salesType === 4 && (
                    <>
                      <Grid item xs={3}>
                        <FormControl>
                          <InputLabel id="advance-emi-select-label">
                            Advance/EMI
                          </InputLabel>
                          <Select
                            labelId="advance-emi-select-label"
                            id="advance-emi-select"
                            value={salesOrderDetails?.adj_type}
                            label="Advance/EMI"
                            onChange={advanceOrEmiHandle}
                          >
                            <MenuItem value="Advance">Advance</MenuItem>
                            <MenuItem value="EMI">EMI</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                        <Autocomplete
                          disablePortal
                          options={emiList?.map((item) => ({
                            id: item?.emiNo,
                            label: item?.emiNo,
                          }))}
                          onChange={(event, newValue) => {
                            if (newValue === null) {
                              setSalesOrderDetails((prev) => ({
                                ...prev,
                                item_Number: "",
                                interest: "",
                                amount: "",
                              }));
                            } else {
                              advanceNoHandle(event, newValue);
                            }
                          }}
                          value={salesOrderDetails?.advanceNo}
                          renderInput={(params) => (
                            <TextField {...params} label="EMI Number" />
                          )}
                        />
                      </Grid>
                      <Grid item xs={3} mt={1}>
                        <TextField
                          label="Item Number"
                          name="item_number"
                          value={salesOrderDetails?.item_Number}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3} mt={1}>
                        <TextField
                          label="Advance Amount"
                          name="advance_amount"
                          value={0}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3} mt={1}>
                        <TextField
                          label="Down Payment Amount"
                          name="down_payment_amount"
                          value={0}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3} mt={1}>
                        <TextField
                          label="Interest Amount"
                          name="interest_amount"
                          value={salesOrderDetails?.interest}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3} mt={1}>
                        <TextField
                          label="Final Amount"
                          name="city"
                          value={salesOrderDetails?.amount}
                          disabled
                        />
                      </Grid>
                    </>
                  )}
                  <Grid
                    item
                    xs={6}
                    sx={{
                      mt: salesOrderDetails?.salesType === 4 ? 1 : 0,
                    }}
                  >
                    <TextField
                      label="Remarks"
                      name="remarks"
                      onChange={remarksHandle}
                      value={salesOrderDetails?.serviceRemarks}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Grid
                container
                px={2}
                py={1.5}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: (theme) => theme.palette.bg.light,
                }}
              >
                <Grid item>
                  <Typography variant="subtitle1" color="#fff">
                    Line
                  </Typography>
                </Grid>
                <Grid item>
                  {bulkUpload && (
                    <IconButton
                      component="label"
                      role={undefined}
                      tabIndex={-1}
                      fullWidth
                      variant="outlined"
                    >
                      <FileUploadIcon
                        sx={{
                          color: "#fff",
                        }}
                      />
                      <VisuallyHiddentInputComponent
                        onChange={uploadCSVFileHandle}
                      />
                    </IconButton>
                  )}
                  {bulkUpload && (
                    <IconButton
                      aria-label="download"
                      onClick={() => downloadSampleHandle("BulkUploader")}
                    >
                      <FileDownloadIcon
                        sx={{
                          color: "#fff",
                        }}
                      />
                    </IconButton>
                  )}
                  <IconButton aria-label="add-line" onClick={addButtonHandle}>
                    <AddBoxIcon
                      sx={{
                        color: "#fff",
                      }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container>
                <LineItemsTable
                  lineItems={lineItems}
                  deleteLineItemHandle={deleteLineItemHandle}
                  editLineItemHandle={editLineItemHandle}
                  linesAmount={linesAmount}
                />
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Grid
                container
                padding={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: (theme) => theme.palette.bg.light,
                  color: "#fff",
                }}
              >
                <Grid item>
                  <Typography variant="subtitle1">Payment Details</Typography>
                </Grid>
              </Grid>
              <Grid container p={2}>
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <TextField
                      label="Payment Amount"
                      name="payment_amount"
                      required
                      onChange={paymentAmountHandle}
                      value={
                        Math.round(paymentLinesItem?.paymentAmount * 100) / 100
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl>
                      <InputLabel id="payment-type-select-label">
                        Payment Type
                      </InputLabel>
                      <Select
                        labelId="payment-type-select-label"
                        id="payment-type-select"
                        label="Payment Type"
                        onChange={paymentHandle}
                        value={paymentLinesItem?.paymentTypeItem}
                      >
                        {paymentType?.map((item) => (
                          <MenuItem value={item} key={item?.id}>
                            {item?.type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl>
                      <InputLabel id="bank-ac-name-select-label">
                        Bank A/C Name
                      </InputLabel>
                      <Select
                        labelId="bank-ac-name-select-label"
                        id="bank-ac-name-select"
                        label="Bank A/C Name"
                        onChange={bankHandle}
                        value={paymentLinesItem?.bankItem}
                      >
                        {banks?.map((item) => (
                          <MenuItem value={item} key={item?.id}>
                            {item?.bankName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {paymentLinesItem?.paymentType === "2" && (
                    <Grid item sx={2}>
                      <TextField
                        label="Card No"
                        name="card_no"
                        onChange={cardNoHandle}
                      />
                    </Grid>
                  )}
                  {paymentLinesItem?.paymentType === "2" && (
                    <>
                      <Grid item sx={2}>
                        <TextField
                          label="Cheque No"
                          name="cheque_no"
                          onChange={chequeNoHandle}
                        />
                      </Grid>
                      <Grid item sx={1}>
                        <FormControl>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Cheque Date"
                              onChange={chequeDateHandle}
                            />
                          </LocalizationProvider>
                        </FormControl>
                      </Grid>
                      <Grid item sx={2}>
                        <TextField
                          type="file"
                          label={isFileUploaded ? "File" : ""}
                          InputLabelProps={{ shrink: true }}
                          onChange={chequeCopyHandle}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid
                    item
                    container
                    xs={1}
                    display="flex"
                    alignItems="center"
                  >
                    <IconButton aria-label="add" onClick={addPaymentItemHandle}>
                      <AddBoxIcon
                        sx={{
                          color: (theme) => theme.palette.addBtnColor.light,
                        }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <PaymentDetailsTable
                  paymentLines={paymentLines}
                  deletePaymentItemHandle={deletePaymentItemHandle}
                />
              </Grid>
            </Card>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" marginY={2}>
            <Button variant="contained" onClick={postHandle}>
              Post
            </Button>
            <Button
              variant="outlined"
              sx={{ ml: 2 }}
              onClick={() => resetStateHandle()}
              color="error"
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
      {showNotification && (severity === "error" || severity === "info") && (
        <Notification
          open={showNotification}
          setOpen={setShowNofication}
          message={notificationMsg}
          severity={severity}
        />
      )}
      {openDialog && (
        <AddLineItem
          open={openDialog}
          setOpen={setOpenDialog}
          storeName={salesOrderDetails?.storeName}
          salesType={salesOrderDetails?.salesType}
          productType={salesOrderDetails?.productType}
          setLineItems={setLineItems}
          userDetails={userDetails}
          itemNo={salesOrderDetails?.item_Number}
          lineItemDetails={lineItemDetail}
          adj_type={salesOrderDetails?.adj_type}
        />
      )}
      {edit && (
        <EditLineItem
          open={edit}
          setOpen={setEdit}
          storeName={salesOrderDetails?.storeName}
          user={user}
          salesType={salesOrderDetails?.salesType}
          setLineItems={setLineItems}
          userDetails={userDetails}
          editDetails={editDetails}
          lineItems={lineItems}
          editLineItemIndex={editLineItemIndex}
        />
      )}
      {isLoading && <LoaderDialog open={isLoading} />}
      {openItemsNotFoundDialog && (
        <ItemsNotFoundDialog
          open={openItemsNotFoundDialog}
          setOpen={setOpenItemsNotFoundDialog}
          itemsNoFound={itemsNotFound}
        />
      )}
      {showNotification && severity === "success" && (
        <SuccessNotification
          showNotification={showNotification}
          setShowNofication={setShowNofication}
          notificationMsg={notificationMsg}
          alertMessange={`The Sales Order Created Successfully with application no
      ${responseData?.applicationNo}`}
          openInNewTab={openInNewTab}
        />
      )}
    </>
  );
};

export default SalesOrder;
