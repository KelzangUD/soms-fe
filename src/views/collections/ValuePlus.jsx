import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  Typography,
  Card,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Notification,
  LoaderDialog,
  SuccessNotification,
  Title,
} from "../../ui/index";
import dayjs from "dayjs";
import Route from "../../routes/Route";
import { dateFormatter, downloadSampleHandle } from "../../util/CommonUtil";
import { useCommon } from "../../contexts/CommonContext";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
  outlineColor: "#fff",
});

const ValuePlus = () => {
  const { paymentType, bankAccountNames, fetchBankAccountName, valuePlusPlan } =
    useCommon();
  const userID = localStorage.getItem("username");
  const access_token = localStorage.getItem("access_token");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [responseData, setResponseData] = useState({});
  const [severity, setSeverity] = useState("info");
  const [details, setDetails] = useState({
    postingDate: dayjs(new Date()),
    prepaidNumber: "",
    paymentAmount: "",
    paymentType: "",
    paymentTypeValue: "",
    bankAccount: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchBankAccountName(details?.paymentType);
  }, [details?.paymentType]);
  const postingDateHandle = (e) => {
    setDetails((prev) => ({
      ...prev,
      postingDate: dateFormatter(e?.$d),
    }));
  };
  const prepaidNumberHandle = (e) => {
    setDetails((prev) => ({
      ...prev,
      prepaidNumber: e?.target?.value,
    }));
  };
  const amountHandle = (e) => {
    setDetails((prev) => ({
      ...prev,
      paymentAmount: e?.target?.value,
    }));
  };
  const paymentTypeHandle = (e) => {
    console.log(e?.target);
    setDetails((prev) => ({
      ...prev,
      paymentType: e?.target?.value?.id,
      paymentTypeValue: e?.target?.value,
    }));
  };
  const bankAccHandle = (e) => {
    setDetails((prev) => ({
      ...prev,
      bankAccount: e?.target?.value,
    }));
  };

  const resetHandle = () => {
    setDetails((prev) => ({
      ...prev,
      postingDate: dayjs(new Date()),
      prepaidNumber: "",
      paymentAmount: "",
      paymentType: "",
      bankAccount: "",
    }));
  };
  const validationRules = [
    { key: "prepaidNumber", message: "Please Enter Prepaid Number!" },
    { key: "paymentAmount", message: "Please Enter Payment Amount!" },
    { key: "paymentType", message: "Please Select Payment Type!" },
    { key: "bankAccount", message: "Please Select Bank A/C Name!" },
  ];
  const createHandle = async (e) => {
    e.preventDefault();
    for (const rule of validationRules) {
      if (!details?.[rule.key]) {
        setNotificationMsg(rule.message);
        setSeverity("info");
        setShowNotification(true);
        return;
      }
    }
    const data = {
      PaymentLines: [
        {
          emiRefrenceNo: "",
          bankAccountNumber: details?.bankAccount,
          paymentAmount: details?.paymentAmount,
          paymentType: details?.paymentTypeValue?.type,
        },
      ],
      LinesAmount: {
        additionalDiscount: "0",
        grossTotal: details?.paymentAmount,
        tdsAmount: "0",
        discountAmount: "0",
        lotOfSaleDiscount: "0",
        netTotal: details?.paymentAmount,
        taxAmount: "0",
      },
      SalesHeader: {
        salesType: "Retail",
        store_id: "",
        address: "",
        subscriberType: "",
        city: "",
        mobileNumber: "",
        documentNumber: "",
        address1: "",
        advanceNo: "",
        currentBalance: "",
        saleOrderId: "0",
        posNo: "",
        postingDate: details?.postingDate,
        advanceAmt: "",
        customerNumber: "",
        customerName: "",
        serviceRemarks: "",
        adJ_TYPE: "",
        store_name: "",
        invoiceNo: "1323209543906013184",
        productType: "Service",
        emp_id: userID,
      },
      ItemLines: {
        postinG_DATE: details?.postingDate,
        price_ID: "0",
        description: "",
        itemNo: "",
        discounT_ID: "0",
        storE_NAME: "",
        sellingPrice: details?.paymentAmount,
        uom: "Nos",
        productGroupCode: "",
        lineItemAmt: details?.paymentAmount,
        customeR_NUMBER: details?.prepaidNumber,
        discountType: "",
        discountPer: "0",
        storeName: "",
        linE_ID: "0",
        taxAmt: "0",
        invoice_number: "",
        cash: "",
        saleS_ORDERNO: "",
        lineDiscountAmt: "0",
        baseSellingPrice: "0",
        mrp: details?.paymentAmount,
        inventorY_ITEM_ID: "1420",
        tdS_PERCENT: "",
        serialNo: "",
        paymenT_MODE: "",
        additionaL_DISCOUNT: "0",
        taX_BASE_AMOUNT: "0",
        imeiNo: "",
        qty: "1",
        basE_AMOUNT_TDS: "",
        cheque: "",
        createD_BY: "826",
        creditCard: "",
        creditSale: "",
        discountValue: "0",
        status: "",
      },
    };
    console.log(data);
    setIsLoading(true);
    try {
      const res = await Route(
        "POST",
        "/Api/CRM/update_payment",
        null,
        data,
        null
      );
      console.log(res);
      if (res?.data?.Status === "Posted") {
        setResponseData(res?.data);
        setSeverity("success");
        setNotificationMsg(res?.data?.Message);
        setShowNotification(true);
        resetHandle();
      } else if (res?.data?.status === "FAILED") {
        setResponseData(res?.data);
        setSeverity("error");
        setNotificationMsg(res?.data?.message);
        setShowNotification(true);
      } else {
        setNotificationMsg(res?.response?.data?.message);
        setSeverity("error");
        setShowNotification(true);
      }
    } catch (err) {
      setNotificationMsg(`Recharge Failed: ${err}`);
      setSeverity("error");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12}>
            <Card>
              <Title title="Value Plus Details" />
              <Grid container padding={2} spacing={1}>
                <Grid item xs={12} md={4}>
                  <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Posting Date"
                        value={dayjs(details?.postingDate)}
                        onChange={postingDateHandle}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Prepaid Number"
                    name="prepaid_no"
                    onChange={prepaidNumberHandle}
                    required
                    value={details?.prepaidNumber}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl>
                    <InputLabel id="payment-amount-select-label">
                      Payment Amount*
                    </InputLabel>
                    <Select
                      labelId="payment-amount-select-label"
                      id="payment-amount-select"
                      name="payment_amount"
                      label="Payment Amount*"
                      onChange={amountHandle}
                      value={details?.paymentAmount}
                    >
                      {valuePlusPlan?.map((item) => (
                        <MenuItem value={item?.amount} key={item?.amount}>
                          {item?.plan_name}
                          {"  "}({item?.amount})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container padding={2} spacing={1}>
                <Grid item xs={12} md={4}>
                  <FormControl>
                    <InputLabel id="payment-type-select-label">
                      Payment Type*
                    </InputLabel>
                    <Select
                      labelId="payment-type-select-label"
                      id="payment-type-select"
                      label="Payment Type*"
                      onChange={paymentTypeHandle}
                      value={details?.paymentTypeValue}
                    >
                      {paymentType?.map((item) => (
                        <MenuItem value={item} name={item?.type} key={item?.id}>
                          {item?.type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl>
                    <InputLabel id="bank-ac-name-select-label">
                      Bank A/C Name*
                    </InputLabel>
                    <Select
                      labelId="bank-ac-name-select-label"
                      id="bank-ac-name-select"
                      label="Bank A/C Name*"
                      name="bank_account"
                      onChange={bankAccHandle}
                      value={details?.bankAccount}
                    >
                      {bankAccountNames?.map((item) => (
                        <MenuItem value={item?.bankName} key={item?.id}>
                          {item.bankName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" marginY={2}>
            <Button
              variant="contained"
              sx={{ marginRight: 2 }}
              onClick={createHandle}
            >
              Create
            </Button>
            <Button variant="outlined" color="error" onClick={resetHandle}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
      {isLoading && <LoaderDialog open={isLoading} />}
      {showNotification && (severity === "error" || severity === "info") && (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={notificationMsg}
          severity={severity}
        />
      )}
      {showNotification && severity === "success" && (
        <SuccessNotification
          showNotification={showNotification}
          setShowNotification={setShowNotification}
          notificationMsg="Successfully Recharged!"
          alertMessage={notificationMsg}
        />
      )}
    </>
  );
};

export default ValuePlus;
