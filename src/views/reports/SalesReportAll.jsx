import React, { useState, useEffect, useRef } from "react";
import {
  Autocomplete,
  Box,
  Grid,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LoaderDialog, Notification } from "../../ui/index";
import { CustomDataTable, PrintSection } from "../../component/common/index";
import Route from "../../routes/Route";
import { sales_report_all_columns } from "../../data/static";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import { dateFormatterTwo } from "../../util/CommonUtil";
import { useCommon } from "../../contexts/CommonContext";
import { v4 as uuidv4 } from "uuid";

const SalesReportAll = () => {
  const { isMdUp, fetchLocatorName, locatorsNameList } = useCommon();
  const access_token = localStorage.getItem("access_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [salesType, setSalesType] = useState([]);
  const [reportsType, setReportsType] = useState([]);
  const [regionsOrExtensions, setRegionsOrExtensions] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [params, setParams] = useState({
    extension: userDetails?.regionName,
    fromDate: dateFormatterTwo(new Date()),
    toDate: dateFormatterTwo(new Date()),
    itemNo: "",
    fieldAssistant: "",
    fieldAssistantLabel: "ALL",
    reportType: 0,
    roleId: userDetails?.roleId,
    saleType: 1,
  });
  const [salesAllReport, setSalesAllReport] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchLocatorName(params?.extension);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.extension]);
  const fetchSalesType = async () => {
    const res = await Route(
      "GET",
      `/Common/fetchAllReportType`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setSalesType(res?.data);
    }
  };
  const fetchReportsType = async () => {
    const res = await Route("GET", `/Common/fetchReportType`, null, null, null);
    if (res?.status === 200) {
      setReportsType(res?.data);
    }
  };
  const fetchRegionsOrExtensions = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchAllRegionOrExtension`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setRegionsOrExtensions(res?.data);
    }
  };
  const fetchItemsList = async () => {
    const res = await Route("GET", `/Common/FetchAllItems`, null, null, null);
    if (res?.status === 200) {
      setItemsList(res?.data);
    }
  };
  const fetchSalesAllReport = async () => {
    setIsLoading(true);
    try {
      const res = await Route(
        "GET",
        `/Report/getSalesAllReport?extension=${params?.extension}&fromDate=${params?.fromDate}&toDate=${params?.toDate}&itemNo=${params?.itemNo}&fieldAssistant=${params?.fieldAssistant}&reportType=${params?.reportType}&roleId=${params?.roleId}&saleType=${params?.saleType}`,
        access_token,
        null,
        null
      );
      if (res?.status === 200) {
        setPrintData([
          ...(res?.data?.advanceCollection?.length > 0
            ? [
                {
                  item_code: res?.data?.advanceCollectionTitle,
                },
                ...res?.data?.advanceCollection?.map((item) => ({
                  sl: item?.rownumber,
                  sales_type: item?.sales_type,
                  customer_name: item?.customer_name,
                  customer_number: item?.customer_number,
                  customer_account_code: item?.inventory_item_Number,
                  salesOrderNo: item?.salesOrderNo,
                  region_Name: item?.region_Name,
                  store_Name: item?.store_Name,
                  revenue_head: item?.revenue_head,
                  posting_Date: item?.posting_Date,
                  item_code: item?.item_code,
                  description: item?.description,
                  gross_amount: parseFloat(item?.selling_price, 10),
                  discount_Value: parseFloat(item?.discount_Value, 10),
                  additional_Discount: parseFloat(
                    item?.additional_Discount,
                    10
                  ),
                  line_Discount_Amount: parseFloat(
                    item?.line_Discount_Amount,
                    10
                  ),
                  tds_Amount: parseFloat(item?.tds_Amount, 10),
                  tax_Amount: parseFloat(item?.tax_Amount, 10),
                  net_amount: parseFloat(item?.line_Item_Amount, 10),
                  paymentMode: item?.paymentMode,
                  createdBy: item?.createdBy,
                  remarks: item?.status,
                })),
                {
                  description: "Total",
                  gross_amount: res?.data?.advanceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.selling_price, 10),
                      0
                    )
                    .toFixed(2),
                  discount_Value: res?.data?.advanceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.discount_Value, 10),
                      0
                    )
                    .toFixed(2),
                  additional_Discount: res?.data?.advanceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.additional_Discount, 10),
                      0
                    )
                    .toFixed(2),
                  line_Discount_Amount: res?.data?.advanceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator +
                        parseFloat(item?.line_Discount_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tds_Amount: res?.data?.advanceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tds_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tax_Amount: res?.data?.advanceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tax_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  net_amount: res?.data?.advanceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.line_Item_Amount, 10),
                      0
                    )
                    .toFixed(2),
                },
              ]
            : []),
          ...(res?.data?.bankCollection?.length > 0
            ? [
                {
                  item_code: res?.data?.bankCollectionTitle,
                },
                ...res?.data?.bankCollection?.map((item) => ({
                  sl: item?.rownumber,
                  sales_type: item?.sales_type,
                  customer_name: item?.customer_name,
                  customer_number: item?.customer_number,
                  customer_account_code: item?.inventory_item_Number,
                  salesOrderNo: item?.salesOrderNo,
                  region_Name: item?.region_Name,
                  store_Name: item?.store_Name,
                  revenue_head: item?.revenue_head,
                  posting_Date: item?.posting_Date,
                  item_code: item?.item_code,
                  description: item?.description,
                  gross_amount: parseFloat(item?.selling_price, 10),
                  discount_Value: parseFloat(item?.discount_Value, 10),
                  additional_Discount: parseFloat(
                    item?.additional_Discount,
                    10
                  ),
                  line_Discount_Amount: parseFloat(
                    item?.line_Discount_Amount,
                    10
                  ),
                  tds_Amount: parseFloat(item?.tds_Amount, 10),
                  tax_Amount: parseFloat(item?.tax_Amount, 10),
                  net_amount: parseFloat(item?.line_Item_Amount, 10),
                  paymentMode: item?.paymentMode,
                  createdBy: item?.createdBy,
                  remarks: item?.status,
                })),
                {
                  description: "Total",
                  gross_amount: res?.data?.bankCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.selling_price, 10),
                      0
                    )
                    .toFixed(2),
                  discount_Value: res?.data?.bankCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.discount_Value, 10),
                      0
                    )
                    .toFixed(2),
                  additional_Discount: res?.data?.bankCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.additional_Discount, 10),
                      0
                    )
                    .toFixed(2),
                  line_Discount_Amount: res?.data?.bankCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator +
                        parseFloat(item?.line_Discount_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tds_Amount: res?.data?.bankCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tds_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tax_Amount: res?.data?.bankCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tax_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  net_amount: res?.data?.bankCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.line_Item_Amount, 10),
                      0
                    )
                    .toFixed(2),
                },
                // {
                //   description: "Grand Total For Bank Collection",
                //   gross_amount:
                //     res?.data?.bankCollection?.reduce(
                //       (accumulator, item) =>
                //         accumulator + parseFloat(item?.selling_price, 10),
                //       0
                //     ) +
                //     res?.data?.bankCollection?.reduce(
                //       (accumulator, item) =>
                //         accumulator + parseFloat(item?.discount_Value, 10),
                //       0
                //     ) +
                //     res?.data?.bankCollection?.reduce(
                //       (accumulator, item) =>
                //         accumulator + parseFloat(item?.additional_Discount, 10),
                //       0
                //     ) +
                //     res?.data?.bankCollection?.reduce(
                //       (accumulator, item) =>
                //         accumulator +
                //         parseFloat(item?.line_Discount_Amount, 10),
                //       0
                //     ) +
                //     res?.data?.bankCollection?.reduce(
                //       (accumulator, item) =>
                //         accumulator + parseFloat(item?.tds_Amount, 10),
                //       0
                //     ) +
                //     res?.data?.bankCollection?.reduce(
                //       (accumulator, item) =>
                //         accumulator + parseFloat(item?.tax_Amount, 10),
                //       0
                //     ) +
                //     res?.data?.bankCollection?.reduce(
                //       (accumulator, item) =>
                //         accumulator + parseFloat(item?.line_Item_Amount, 10),
                //       0
                //     ),
                // },
              ]
            : []),

          ...(res?.data?.paymentCollection?.length > 0
            ? [
                {
                  item_code: res?.data?.paymentCollectionTitle,
                },
                ...res?.data?.paymentCollection?.map((item) => ({
                  sl: item?.rownumber,
                  sales_type: item?.sales_type,
                  customer_name: item?.customer_name,
                  customer_number: item?.customer_number,
                  customer_account_code: item?.inventory_item_Number,
                  salesOrderNo: item?.salesOrderNo,
                  region_Name: item?.region_Name,
                  store_Name: item?.store_Name,
                  revenue_head: item?.revenue_head,
                  posting_Date: item?.posting_Date,
                  item_code: item?.item_code,
                  description: item?.description,
                  gross_amount: parseFloat(item?.selling_price, 10),
                  discount_Value: parseFloat(item?.discount_Value, 10),
                  additional_Discount: parseFloat(
                    item?.additional_Discount,
                    10
                  ),
                  line_Discount_Amount: parseFloat(
                    item?.line_Discount_Amount,
                    10
                  ),
                  tds_Amount: parseFloat(item?.tds_Amount, 10),
                  tax_Amount: parseFloat(item?.tax_Amount, 10),
                  net_amount: parseFloat(item?.line_Item_Amount, 10),
                  paymentMode: item?.paymentMode,
                  createdBy: item?.createdBy,
                  remarks: item?.status,
                })),
                {
                  description: "Total",
                  gross_amount: res?.data?.paymentCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.selling_price, 10),
                      0
                    )
                    .toFixed(2),
                  discount_Value: res?.data?.paymentCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.discount_Value, 10),
                      0
                    )
                    .toFixed(2),
                  additional_Discount: res?.data?.paymentCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.additional_Discount, 10),
                      0
                    )
                    .toFixed(2),
                  line_Discount_Amount: res?.data?.paymentCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator +
                        parseFloat(item?.line_Discount_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tds_Amount: res?.data?.paymentCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tds_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tax_Amount: res?.data?.paymentCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tax_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  net_amount: res?.data?.paymentCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.line_Item_Amount, 10),
                      0
                    )
                    .toFixed(2),
                },
              ]
            : []),

          ...(res?.data?.rechargeCollection?.length > 0
            ? [
                {
                  item_code: res?.data?.rechargeCollectionTitle,
                },
                ...res?.data?.rechargeCollection?.map((item) => ({
                  sl: item?.rownumber,
                  sales_type: item?.sales_type,
                  customer_name: item?.customer_name,
                  customer_number: item?.customer_number,
                  customer_account_code: item?.inventory_item_Number,
                  salesOrderNo: item?.salesOrderNo,
                  region_Name: item?.region_Name,
                  store_Name: item?.store_Name,
                  revenue_head: item?.revenue_head,
                  posting_Date: item?.posting_Date,
                  item_code: item?.item_code,
                  description: item?.description,
                  gross_amount: parseFloat(item?.selling_price, 10),
                  discount_Value: parseFloat(item?.discount_Value, 10),
                  additional_Discount: parseFloat(
                    item?.additional_Discount,
                    10
                  ),
                  line_Discount_Amount: parseFloat(
                    item?.line_Discount_Amount,
                    10
                  ),
                  tds_Amount: parseFloat(item?.tds_Amount, 10),
                  tax_Amount: parseFloat(item?.tax_Amount, 10),
                  net_amount: parseFloat(item?.line_Item_Amount, 10),
                  paymentMode: item?.paymentMode,
                  createdBy: item?.createdBy,
                  remarks: item?.status,
                })),
                {
                  description: "Total",
                  gross_amount: res?.data?.rechargeCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.selling_price, 10),
                      0
                    )
                    .toFixed(2),
                  discount_Value: res?.data?.rechargeCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.discount_Value, 10),
                      0
                    )
                    .toFixed(2),
                  additional_Discount: res?.data?.rechargeCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.additional_Discount, 10),
                      0
                    )
                    .toFixed(2),
                  line_Discount_Amount: res?.data?.rechargeCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator +
                        parseFloat(item?.line_Discount_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tds_Amount: res?.data?.rechargeCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tds_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tax_Amount: res?.data?.rechargeCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tax_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  net_amount: res?.data?.rechargeCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.line_Item_Amount, 10),
                      0
                    )
                    .toFixed(2),
                },
              ]
            : []),

          ...(res?.data?.salesInvoice?.length > 0
            ? [
                {
                  item_code: res?.data?.salesInvoiceTitle,
                },
                ...res?.data?.salesInvoice?.map((item) => ({
                  sl: item?.rownumber,
                  sales_type: item?.sales_type,
                  customer_name: item?.customer_name,
                  customer_number: item?.customer_number,
                  customer_account_code: item?.inventory_item_Number,
                  salesOrderNo: item?.salesOrderNo,
                  region_Name: item?.region_Name,
                  store_Name: item?.store_Name,
                  revenue_head: item?.revenue_head,
                  posting_Date: item?.posting_Date,
                  item_code: item?.item_code,
                  description: item?.description,
                  gross_amount: parseFloat(item?.selling_price, 10),
                  discount_Value: parseFloat(item?.discount_Value, 10),
                  additional_Discount: parseFloat(
                    item?.additional_Discount,
                    10
                  ),
                  line_Discount_Amount: parseFloat(
                    item?.line_Discount_Amount,
                    10
                  ),
                  tds_Amount: parseFloat(item?.tds_Amount, 10),
                  tax_Amount: parseFloat(item?.tax_Amount, 10),
                  net_amount: parseFloat(item?.line_Item_Amount, 10),
                  paymentMode: item?.paymentMode,
                  createdBy: item?.createdBy,
                  remarks: item?.status,
                })),
                {
                  description: "Total",
                  gross_amount: res?.data?.salesInvoice
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.selling_price, 10),
                      0
                    )
                    .toFixed(2),
                  discount_Value: res?.data?.salesInvoice
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.discount_Value, 10),
                      0
                    )
                    .toFixed(2),
                  additional_Discount: res?.data?.salesInvoice
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.additional_Discount, 10),
                      0
                    )
                    .toFixed(2),
                  line_Discount_Amount: res?.data?.salesInvoice
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator +
                        parseFloat(item?.line_Discount_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tds_Amount: res?.data?.salesInvoice
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tds_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tax_Amount: res?.data?.salesInvoice
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tax_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  net_amount: res?.data?.salesInvoice
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.line_Item_Amount, 10),
                      0
                    )
                    .toFixed(2),
                },
              ]
            : []),

          ...(res?.data?.vasServiceCollection?.length > 0
            ? [
                {
                  item_code: res?.data?.vasServiceCollectionTitle,
                },
                ...res?.data?.vasServiceCollection?.map((item) => ({
                  sl: item?.rownumber,
                  sales_type: item?.sales_type,
                  customer_name: item?.customer_name,
                  customer_number: item?.customer_number,
                  customer_account_code: item?.inventory_item_Number,
                  salesOrderNo: item?.salesOrderNo,
                  region_Name: item?.region_Name,
                  store_Name: item?.store_Name,
                  revenue_head: item?.revenue_head,
                  posting_Date: item?.posting_Date,
                  item_code: item?.item_code,
                  description: item?.description,
                  gross_amount: parseFloat(item?.selling_price, 10),
                  discount_Value: parseFloat(item?.discount_Value, 10),
                  additional_Discount: parseFloat(
                    item?.additional_Discount,
                    10
                  ),
                  line_Discount_Amount: parseFloat(
                    item?.line_Discount_Amount,
                    10
                  ),
                  tds_Amount: parseFloat(item?.tds_Amount, 10),
                  tax_Amount: parseFloat(item?.tax_Amount, 10),
                  net_amount: parseFloat(item?.line_Item_Amount, 10),
                  paymentMode: item?.paymentMode,
                  createdBy: item?.createdBy,
                  remarks: item?.status,
                })),
                {
                  description: "Total",
                  gross_amount: res?.data?.vasServiceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.selling_price, 10),
                      0
                    )
                    .toFixed(2),
                  discount_Value: res?.data?.vasServiceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.discount_Value, 10),
                      0
                    )
                    .toFixed(2),
                  additional_Discount: res?.data?.vasServiceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.additional_Discount, 10),
                      0
                    )
                    .toFixed(2),
                  line_Discount_Amount: res?.data?.vasServiceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator +
                        parseFloat(item?.line_Discount_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tds_Amount: res?.data?.vasServiceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tds_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tax_Amount: res?.data?.vasServiceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tax_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  net_amount: res?.data?.vasServiceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.line_Item_Amount, 10),
                      0
                    )
                    .toFixed(2),
                },
                {
                  description: "Total",
                  gross_amount:
                    res?.data?.vasServiceCollection?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.selling_price, 10),
                      0
                    ) +
                    res?.data?.vasServiceCollection?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.discount_Value, 10),
                      0
                    ) +
                    res?.data?.vasServiceCollection?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.additional_Discount, 10),
                      0
                    ) +
                    res?.data?.vasServiceCollection?.reduce(
                      (accumulator, item) =>
                        accumulator +
                        parseFloat(item?.line_Discount_Amount, 10),
                      0
                    ) +
                    res?.data?.vasServiceCollection?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tds_Amount, 10),
                      0
                    ) +
                    res?.data?.vasServiceCollection?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tax_Amount, 10),
                      0
                    ) +
                    res?.data?.vasServiceCollection?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.line_Item_Amount, 10),
                      0
                    ),
                },
              ]
            : []),
          ...(res?.data?.emiCollection?.length > 0
            ? [
                {
                  item_code: res?.data?.emiCollectionTitle,
                },
                ...res?.data?.emiCollection?.map((item) => ({
                  sl: item?.rownumber,
                  sales_type: item?.sales_type,
                  customer_name: item?.customer_name,
                  customer_number: item?.customer_number,
                  customer_account_code: item?.inventory_item_Number,
                  salesOrderNo: item?.salesOrderNo,
                  region_Name: item?.region_Name,
                  store_Name: item?.store_Name,
                  revenue_head: item?.revenue_head,
                  posting_Date: item?.posting_Date,
                  item_code: item?.item_code,
                  description: item?.description,
                  gross_amount: parseFloat(item?.selling_price, 10),
                  discount_Value: parseFloat(item?.discount_Value, 10),
                  additional_Discount: parseFloat(
                    item?.additional_Discount,
                    10
                  ),
                  line_Discount_Amount: parseFloat(
                    item?.line_Discount_Amount,
                    10
                  ),
                  tds_Amount: parseFloat(item?.tds_Amount, 10),
                  tax_Amount: parseFloat(item?.tax_Amount, 10),
                  net_amount: parseFloat(item?.line_Item_Amount, 10),
                  paymentMode: item?.paymentMode,
                  createdBy: item?.createdBy,
                  remarks: item?.status,
                })),
                {
                  description: "Total",
                  gross_amount: res?.data?.emiCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.selling_price, 10),
                      0
                    )
                    .toFixed(2),
                  discount_Value: res?.data?.emiCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.discount_Value, 10),
                      0
                    )
                    .toFixed(2),
                  additional_Discount: res?.data?.emiCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.additional_Discount, 10),
                      0
                    )
                    .toFixed(2),
                  line_Discount_Amount: res?.data?.emiCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator +
                        parseFloat(item?.line_Discount_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tds_Amount: res?.data?.emiCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tds_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tax_Amount: res?.data?.emiCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tax_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  net_amount: res?.data?.emiCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.line_Item_Amount, 10),
                      0
                    )
                    .toFixed(2),
                },
                // {
                //   description: "Grand Total For EMI Collection",
                //   gross_amount:
                //     res?.data?.emiCollection?.reduce(
                //       (accumulator, item) =>
                //         accumulator + parseFloat(item?.selling_price, 10),
                //       0
                //     ) +
                //     res?.data?.emiCollection?.reduce(
                //       (accumulator, item) =>
                //         accumulator + parseFloat(item?.discount_Value, 10),
                //       0
                //     ) +
                //     res?.data?.emiCollection?.reduce(
                //       (accumulator, item) =>
                //         accumulator + parseFloat(item?.additional_Discount, 10),
                //       0
                //     ) +
                //     res?.data?.emiCollection?.reduce(
                //       (accumulator, item) =>
                //         accumulator +
                //         parseFloat(item?.line_Discount_Amount, 10),
                //       0
                //     ) +
                //     res?.data?.emiCollection?.reduce(
                //       (accumulator, item) =>
                //         accumulator + parseFloat(item?.tds_Amount, 10),
                //       0
                //     ) +
                //     res?.data?.emiCollection?.reduce(
                //       (accumulator, item) =>
                //         accumulator + parseFloat(item?.tax_Amount, 10),
                //       0
                //     ) +
                //     res?.data?.emiCollection?.reduce(
                //       (accumulator, item) =>
                //         accumulator + parseFloat(item?.line_Item_Amount, 10),
                //       0
                //     ),
                // },
              ]
            : []),
          {
            description: "Grand Total",
            gross_amount: (
              res?.data?.advanceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.selling_price, 10),
                0
              ) +
              res?.data?.bankCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.selling_price, 10),
                0
              ) +
              res?.data?.paymentCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.selling_price, 10),
                0
              ) +
              res?.data?.rechargeCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.selling_price, 10),
                0
              ) +
              res?.data?.salesInvoice?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.selling_price, 10),
                0
              ) +
              res?.data?.vasServiceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.selling_price, 10),
                0
              ) +
              res?.data?.emiCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.selling_price, 10),
                0
              )
            ).toFixed(2),
            discount_Value: (
              res?.data?.advanceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.discount_Value, 10),
                0
              ) +
              res?.data?.bankCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.discount_Value, 10),
                0
              ) +
              res?.data?.paymentCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.discount_Value, 10),
                0
              ) +
              res?.data?.rechargeCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.discount_Value, 10),
                0
              ) +
              res?.data?.salesInvoice?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.discount_Value, 10),
                0
              ) +
              res?.data?.vasServiceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.discount_Value, 10),
                0
              )
            ).toFixed(2),
            additional_Discount: (
              res?.data?.advanceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.additional_Discount, 10),
                0
              ) +
              res?.data?.bankCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.additional_Discount, 10),
                0
              ) +
              res?.data?.paymentCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.additional_Discount, 10),
                0
              ) +
              res?.data?.rechargeCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.additional_Discount, 10),
                0
              ) +
              res?.data?.salesInvoice?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.additional_Discount, 10),
                0
              ) +
              res?.data?.vasServiceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.additional_Discount, 10),
                0
              ) +
              res?.data?.emiCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.additional_Discount, 10),
                0
              )
            ).toFixed(2),
            line_Discount_Amount: (
              res?.data?.advanceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Discount_Amount, 10),
                0
              ) +
              res?.data?.bankCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Discount_Amount, 10),
                0
              ) +
              res?.data?.paymentCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Discount_Amount, 10),
                0
              ) +
              res?.data?.rechargeCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Discount_Amount, 10),
                0
              ) +
              res?.data?.salesInvoice?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Discount_Amount, 10),
                0
              ) +
              res?.data?.vasServiceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Discount_Amount, 10),
                0
              )
            ).toFixed(2),
            tds_Amount: (
              res?.data?.advanceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tds_Amount, 10),
                0
              ) +
              res?.data?.bankCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tds_Amount, 10),
                0
              ) +
              res?.data?.paymentCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tds_Amount, 10),
                0
              ) +
              res?.data?.rechargeCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tds_Amount, 10),
                0
              ) +
              res?.data?.salesInvoice?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tds_Amount, 10),
                0
              ) +
              res?.data?.vasServiceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tds_Amount, 10),
                0
              ) +
              res?.data?.emiCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tds_Amount, 10),
                0
              )
            ).toFixed(2),
            tax_Amount: (
              res?.data?.advanceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tax_Amount, 10),
                0
              ) +
              res?.data?.bankCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tax_Amount, 10),
                0
              ) +
              res?.data?.paymentCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tax_Amount, 10),
                0
              ) +
              res?.data?.rechargeCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tax_Amount, 10),
                0
              ) +
              res?.data?.salesInvoice?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tax_Amount, 10),
                0
              ) +
              res?.data?.vasServiceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tax_Amount, 10),
                0
              ) +
              res?.data?.emiCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tax_Amount, 10),
                0
              )
            ).toFixed(2),
            net_amount: (
              res?.data?.advanceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Item_Amount, 10),
                0
              ) +
              res?.data?.bankCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Item_Amount, 10),
                0
              ) +
              res?.data?.paymentCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Item_Amount, 10),
                0
              ) +
              res?.data?.rechargeCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Item_Amount, 10),
                0
              ) +
              res?.data?.salesInvoice?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Item_Amount, 10),
                0
              ) +
              res?.data?.vasServiceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Item_Amount, 10),
                0
              ) +
              res?.data?.emiCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Item_Amount, 10),
                0
              )
            ).toFixed(2),
          },
        ]);
        setSalesAllReport([
          ...(res?.data?.advanceCollection?.length > 0
            ? [
                {
                  id: uuidv4(),
                  item_code: res?.data?.advanceCollectionTitle,
                  isTitle: true,
                },
                ...res?.data?.advanceCollection?.map((item, index) => ({
                  ...item,
                  id: uuidv4(),
                  sl: index + 1,
                  item_code: item?.inventory_item_Number,
                  item_description: item?.description,
                  gross_amount: item?.selling_price,
                  net_amount: item?.line_Item_Amount,
                })),
                {
                  id: uuidv4(),
                  item_description: "Total",
                  isSubTitle: true,
                  gross_amount: res?.data?.advanceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.selling_price, 10),
                      0
                    )
                    .toFixed(2),
                  discount_Value: res?.data?.advanceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.discount_Value, 10),
                      0
                    )
                    .toFixed(2),
                  additional_Discount: res?.data?.advanceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.additional_Discount, 10),
                      0
                    )
                    .toFixed(2),
                  line_Discount_Amount: res?.data?.advanceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator +
                        parseFloat(item?.line_Discount_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tds_Amount: res?.data?.advanceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tds_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tax_Amount: res?.data?.advanceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tax_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  net_amount: res?.data?.advanceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.line_Item_Amount, 10),
                      0
                    )
                    .toFixed(2),
                },
              ]
            : []),

          ...(res?.data?.bankCollection?.length > 0
            ? [
                {
                  id: uuidv4(),
                  item_code: res?.data?.bankCollectionTitle,
                  isTitle: true,
                },
                ...res?.data?.bankCollection?.map((item, index) => ({
                  ...item,
                  id: uuidv4(),
                  sl: index + 1,
                  item_code: item?.inventory_item_Number,
                  item_description: item?.description,
                  gross_amount: item?.selling_price,
                  net_amount: item?.line_Item_Amount,
                })),
                {
                  id: uuidv4(),
                  item_description: "Total",
                  isSubTitle: true,
                  gross_amount: res?.data?.bankCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.selling_price, 10),
                      0
                    )
                    .toFixed(2),
                  discount_Value: res?.data?.bankCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.discount_Value, 10),
                      0
                    )
                    .toFixed(2),
                  additional_Discount: res?.data?.bankCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.additional_Discount, 10),
                      0
                    )
                    .toFixed(2),
                  line_Discount_Amount: res?.data?.bankCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator +
                        parseFloat(item?.line_Discount_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tds_Amount: res?.data?.bankCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tds_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tax_Amount: res?.data?.bankCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tax_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  net_amount: res?.data?.bankCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.line_Item_Amount, 10),
                      0
                    )
                    .toFixed(2),
                },
              ]
            : []),

          ...(res?.data?.paymentCollection?.length > 0
            ? [
                {
                  id: uuidv4(),
                  item_code: res?.data?.paymentCollectionTitle,
                  isTitle: true,
                },
                ...res?.data?.paymentCollection?.map((item, index) => ({
                  ...item,
                  id: uuidv4(),
                  sl: index + 1,
                  item_code: item?.inventory_item_Number,
                  item_description: item?.description,
                  gross_amount: item?.selling_price,
                  net_amount: item?.line_Item_Amount,
                })),
                {
                  id: uuidv4(),
                  item_description: "Total",
                  isSubTitle: true,
                  gross_amount: res?.data?.paymentCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.selling_price, 10),
                      0
                    )
                    .toFixed(2),
                  discount_Value: res?.data?.paymentCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.discount_Value, 10),
                      0
                    )
                    .toFixed(2),
                  additional_Discount: res?.data?.paymentCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.additional_Discount, 10),
                      0
                    )
                    .toFixed(2),
                  line_Discount_Amount: res?.data?.paymentCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator +
                        parseFloat(item?.line_Discount_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tds_Amount: res?.data?.paymentCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tds_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tax_Amount: res?.data?.paymentCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tax_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  net_amount: res?.data?.paymentCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.line_Item_Amount, 10),
                      0
                    )
                    .toFixed(2),
                },
              ]
            : []),

          ...(res?.data?.rechargeCollection?.length > 0
            ? [
                {
                  id: uuidv4(),
                  item_code: res?.data?.rechargeCollectionTitle,
                  isTitle: true,
                },
                ...res?.data?.rechargeCollection?.map((item, index) => ({
                  ...item,
                  id: uuidv4(),
                  sl: index + 1,
                  item_code: item?.inventory_item_Number,
                  item_description: item?.description,
                  gross_amount: item?.selling_price,
                  net_amount: item?.line_Item_Amount,
                })),
                {
                  id: uuidv4(),
                  item_description: "Total",
                  isSubTitle: true,
                  gross_amount: res?.data?.rechargeCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.selling_price, 10),
                      0
                    )
                    .toFixed(2),
                  discount_Value: res?.data?.rechargeCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.discount_Value, 10),
                      0
                    )
                    .toFixed(2),
                  additional_Discount: res?.data?.rechargeCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.additional_Discount, 10),
                      0
                    )
                    .toFixed(2),
                  line_Discount_Amount: res?.data?.rechargeCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator +
                        parseFloat(item?.line_Discount_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tds_Amount: res?.data?.rechargeCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tds_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tax_Amount: res?.data?.rechargeCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tax_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  net_amount: res?.data?.rechargeCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.line_Item_Amount, 10),
                      0
                    )
                    .toFixed(2),
                },
              ]
            : []),

          ...(res?.data?.salesInvoice?.length > 0
            ? [
                {
                  id: uuidv4(),
                  item_code: res?.data?.salesInvoiceTitle,
                  isTitle: true,
                },
                ...res?.data?.salesInvoice?.map((item, index) => ({
                  ...item,
                  id: uuidv4(),
                  sl: index + 1,
                  item_code: item?.inventory_item_Number,
                  item_description: item?.description,
                  gross_amount: item?.selling_price,
                  net_amount: item?.line_Item_Amount,
                })),
                {
                  id: uuidv4(),
                  item_description: "Total",
                  isSubTitle: true,
                  gross_amount: res?.data?.salesInvoice
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.selling_price, 10),
                      0
                    )
                    .toFixed(2),
                  discount_Value: res?.data?.salesInvoice
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.discount_Value, 10),
                      0
                    )
                    .toFixed(2),
                  additional_Discount: res?.data?.salesInvoice
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.additional_Discount, 10),
                      0
                    )
                    .toFixed(2),
                  line_Discount_Amount: res?.data?.salesInvoice
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator +
                        parseFloat(item?.line_Discount_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tds_Amount: res?.data?.salesInvoice
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tds_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tax_Amount: res?.data?.salesInvoice
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tax_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  net_amount: res?.data?.salesInvoice
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.line_Item_Amount, 10),
                      0
                    )
                    .toFixed(2),
                },
              ]
            : []),

          ...(res?.data?.vasServiceCollection?.length > 0
            ? [
                {
                  id: uuidv4(),
                  item_code: res?.data?.vasServiceCollectionTitle,
                  isTitle: true,
                },
                ...res?.data?.vasServiceCollection?.map((item, index) => ({
                  ...item,
                  id: uuidv4(),
                  sl: index + 1,
                  item_code: item?.inventory_item_Number,
                  item_description: item?.description,
                  gross_amount: item?.selling_price,
                  net_amount: item?.line_Item_Amount,
                })),
                {
                  id: uuidv4(),
                  item_description: "Total",
                  isSubTitle: true,
                  gross_amount: res?.data?.vasServiceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.selling_price, 10),
                      0
                    )
                    .toFixed(2),
                  discount_Value: res?.data?.vasServiceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.discount_Value, 10),
                      0
                    )
                    .toFixed(2),
                  additional_Discount: res?.data?.vasServiceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.additional_Discount, 10),
                      0
                    )
                    .toFixed(2),
                  line_Discount_Amount: res?.data?.vasServiceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator +
                        parseFloat(item?.line_Discount_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tds_Amount: res?.data?.vasServiceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tds_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tax_Amount: res?.data?.vasServiceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tax_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  net_amount: res?.data?.vasServiceCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.line_Item_Amount, 10),
                      0
                    )
                    .toFixed(2),
                },
              ]
            : []),
          ...(res?.data?.emiCollection?.length > 0
            ? [
                {
                  id: uuidv4(),
                  item_code: res?.data?.emiCollectionTitle,
                  isTitle: true,
                },
                ...res?.data?.emiCollection?.map((item, index) => ({
                  ...item,
                  id: uuidv4(),
                  sl: index + 1,
                  item_code: item?.inventory_item_Number,
                  item_description: item?.description,
                  gross_amount: item?.selling_price,
                  net_amount: item?.line_Item_Amount,
                })),
                {
                  id: uuidv4(),
                  item_description: "Total",
                  isSubTitle: true,
                  gross_amount: res?.data?.emiCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.selling_price, 10),
                      0
                    )
                    .toFixed(2),
                  discount_Value: res?.data?.emiCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.discount_Value, 10),
                      0
                    )
                    .toFixed(2),
                  additional_Discount: res?.data?.emiCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.additional_Discount, 10),
                      0
                    )
                    .toFixed(2),
                  line_Discount_Amount: res?.data?.emiCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator +
                        parseFloat(item?.line_Discount_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tds_Amount: res?.data?.emiCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tds_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  tax_Amount: res?.data?.emiCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.tax_Amount, 10),
                      0
                    )
                    .toFixed(2),
                  net_amount: res?.data?.emiCollection
                    ?.reduce(
                      (accumulator, item) =>
                        accumulator + parseFloat(item?.line_Item_Amount, 10),
                      0
                    )
                    .toFixed(2),
                },
              ]
            : []),
          {
            id: uuidv4(),
            item_description: "Grand Total",
            isSubTitle: true,
            gross_amount: (
              res?.data?.advanceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.selling_price, 10),
                0
              ) +
              res?.data?.bankCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.selling_price, 10),
                0
              ) +
              res?.data?.paymentCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.selling_price, 10),
                0
              ) +
              res?.data?.rechargeCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.selling_price, 10),
                0
              ) +
              res?.data?.salesInvoice?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.selling_price, 10),
                0
              ) +
              res?.data?.vasServiceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.selling_price, 10),
                0
              ) +
              res?.data?.emiCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.selling_price, 10),
                0
              )
            ).toFixed(2),
            discount_Value: (
              res?.data?.advanceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.discount_Value, 10),
                0
              ) +
              res?.data?.bankCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.discount_Value, 10),
                0
              ) +
              res?.data?.paymentCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.discount_Value, 10),
                0
              ) +
              res?.data?.rechargeCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.discount_Value, 10),
                0
              ) +
              res?.data?.salesInvoice?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.discount_Value, 10),
                0
              ) +
              res?.data?.vasServiceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.discount_Value, 10),
                0
              ) +
              res?.data?.emiCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.discount_Value, 10),
                0
              )
            ).toFixed(2),
            additional_Discount: (
              res?.data?.advanceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.additional_Discount, 10),
                0
              ) +
              res?.data?.bankCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.additional_Discount, 10),
                0
              ) +
              res?.data?.paymentCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.additional_Discount, 10),
                0
              ) +
              res?.data?.rechargeCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.additional_Discount, 10),
                0
              ) +
              res?.data?.salesInvoice?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.additional_Discount, 10),
                0
              ) +
              res?.data?.vasServiceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.additional_Discount, 10),
                0
              ) +
              res?.data?.emiCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.additional_Discount, 10),
                0
              )
            ).toFixed(2),
            line_Discount_Amount: (
              res?.data?.advanceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Discount_Amount, 10),
                0
              ) +
              res?.data?.bankCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Discount_Amount, 10),
                0
              ) +
              res?.data?.paymentCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Discount_Amount, 10),
                0
              ) +
              res?.data?.rechargeCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Discount_Amount, 10),
                0
              ) +
              res?.data?.salesInvoice?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Discount_Amount, 10),
                0
              ) +
              res?.data?.vasServiceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Discount_Amount, 10),
                0
              ) +
              res?.data?.emiCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Discount_Amount, 10),
                0
              )
            ).toFixed(2),
            tds_Amount: (
              res?.data?.advanceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tds_Amount, 10),
                0
              ) +
              res?.data?.bankCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tds_Amount, 10),
                0
              ) +
              res?.data?.paymentCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tds_Amount, 10),
                0
              ) +
              res?.data?.rechargeCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tds_Amount, 10),
                0
              ) +
              res?.data?.salesInvoice?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tds_Amount, 10),
                0
              ) +
              res?.data?.vasServiceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tds_Amount, 10),
                0
              ) +
              res?.data?.emiCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tds_Amount, 10),
                0
              )
            ).toFixed(2),
            tax_Amount: (
              res?.data?.advanceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tax_Amount, 10),
                0
              ) +
              res?.data?.bankCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tax_Amount, 10),
                0
              ) +
              res?.data?.paymentCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tax_Amount, 10),
                0
              ) +
              res?.data?.rechargeCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tax_Amount, 10),
                0
              ) +
              res?.data?.salesInvoice?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tax_Amount, 10),
                0
              ) +
              res?.data?.vasServiceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tax_Amount, 10),
                0
              ) +
              res?.data?.emiCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.tax_Amount, 10),
                0
              )
            ).toFixed(2),
            net_amount: (
              res?.data?.advanceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Item_Amount, 10),
                0
              ) +
              res?.data?.bankCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Item_Amount, 10),
                0
              ) +
              res?.data?.paymentCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Item_Amount, 10),
                0
              ) +
              res?.data?.rechargeCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Item_Amount, 10),
                0
              ) +
              res?.data?.salesInvoice?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Item_Amount, 10),
                0
              ) +
              res?.data?.vasServiceCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Item_Amount, 10),
                0
              ) +
              res?.data?.emiCollection?.reduce(
                (accumulator, item) =>
                  accumulator + parseFloat(item?.line_Item_Amount, 10),
                0
              )
            ).toFixed(2),
          },
        ]);
      }
    } catch (err) {
      setNotificationMsg("Failed To Fetch Sales All Report");
      setSeverity("error");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchSalesType();
    fetchReportsType();
    fetchRegionsOrExtensions();
    fetchItemsList();
    fetchSalesAllReport();
  }, []);
  const salesTypeHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      saleType: parseInt(e?.target?.value),
    }));
  };
  const reportsTypeHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      reportType: parseInt(e?.target?.value),
    }));
  };
  const fromDateHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      fromDate: dateFormatterTwo(e.$d),
    }));
  };
  const toDateHandle = (e) => {
    setParams((prev) => ({
      ...prev,
      toDate: dateFormatterTwo(e.$d),
    }));
  };
  const regionOrExtensionHandle = (e, value) => {
    setParams((prev) => ({
      ...prev,
      extension: value?.id,
    }));
  };
  const fieldAssistantHandle = (e, value) => {
    setParams((prev) => ({
      ...prev,
      fieldAssistant: value?.id,
      fieldAssistantLabel: value?.label,
    }));
  };
  const itemHandle = (e, value) => {
    setParams((prev) => ({
      ...prev,
      itemNo: value?.id,
      itemNoLabel: value?.label,
    }));
  };
  const exportJsonToPdfHandle = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "sl",
          "Sales Type",
          "Customer Name",
          "Customer Number",
          "Sales Order No.",
          "Region",
          "Office",
          "Revenue Head",
        ],
      ],
      body: printData?.map((item) => [
        item?.sl,
        item?.["sales_type"],
        item?.["customer_name"],
        item?.["customer_number"],
        item?.["sales_order_no"],
        item?.["region_Name"],
        item?.["office"],
        item?.["revenue_head"],
      ]),
      styles: {
        fontSize: 8,
      },
      margin: { top: 35 },
      didDrawPage: (data) => {
        doc.setFontSize(12);
        doc.text("Sales All-Report", data.settings.margin.left, 30);
      },
    });
    doc.save("Sales All-Report");
  };

  const columns = sales_report_all_columns(isMdUp);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ width: "100%" }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item container spacing={1} alignItems="center">
                  <Grid item xs={12} md={2}>
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{ background: "#fff" }}
                    >
                      <InputLabel id="report-type-select-label">
                        Report Type
                      </InputLabel>
                      <Select
                        labelId="report-type-select-label"
                        id="report-type-select"
                        value={params?.saleType}
                        label="Report Type"
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
                  <Grid item xs={12} md={2}>
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{ background: "#fff" }}
                    >
                      <InputLabel id="sales-type-select-label">
                        Sales Type
                      </InputLabel>
                      <Select
                        labelId="sales-type-select-label"
                        id="sales-type-select"
                        value={params?.reportType}
                        label="Sales Type"
                        onChange={reportsTypeHandle}
                      >
                        {reportsType?.map((item) => (
                          <MenuItem value={item?.id} key={item?.id}>
                            {item?.type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <FormControl>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="From Date"
                          onChange={fromDateHandle}
                          value={dayjs(params?.fromDate)}
                          format="DD/MM/YYYY"
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <FormControl>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="To Date"
                          onChange={toDateHandle}
                          value={dayjs(params?.toDate)}
                          minDate={dayjs(params?.fromDate)}
                          format="DD/MM/YYYY"
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Autocomplete
                      disablePortal
                      onChange={regionOrExtensionHandle}
                      value={params?.extension}
                      options={[
                        { label: "ALL", id: "ALL" },
                        ...(regionsOrExtensions?.map((item) => ({
                          id: item?.id,
                          label: item?.id,
                        })) || []),
                      ]}
                      renderInput={(params) => (
                        <TextField {...params} label="Region/Extension" />
                      )}
                      disabled={
                        userDetails?.roleName === "Administrator" ||
                        userDetails?.roleName === "General Manager" ||
                        userDetails?.roleName === "Regional Manager" ||
                        userDetails?.roleName === "Regional Accountant"
                          ? false
                          : true
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Autocomplete
                      disablePortal
                      options={[
                        ...(locatorsNameList?.map((item) => ({
                          label: item?.locatorName,
                          id: item?.locatorName,
                        })) || []),
                      ]}
                      value={params?.fieldAssistantLabel}
                      onChange={fieldAssistantHandle}
                      renderInput={(params) => (
                        <TextField {...params} label="Field Assistant" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      disablePortal
                      options={[
                        { label: "ALL", id: "" },
                        ...(itemsList?.map((item) => ({
                          label: item?.description,
                          id: item?.item_number,
                        })) || []),
                      ]}
                      value={params?.itemNoLabel}
                      onChange={itemHandle}
                      renderInput={(params) => (
                        <TextField {...params} label="Item" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={0.5}>
                    <Button variant="contained" onClick={fetchSalesAllReport}>
                      Search
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <PrintSection
                    exportExcel={() =>
                      exportToExcel(printData, "Sales All-Report")
                    }
                    exportPdf={exportJsonToPdfHandle}
                    handlePrint={reactToPrintFn}
                  />
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  xs={12}
                  ref={contentRef}
                  mb={5}
                >
                  <CustomDataTable rows={salesAllReport} cols={columns} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
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

export default SalesReportAll;
