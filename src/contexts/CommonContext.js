import React, { createContext, useState, useContext, useEffect } from "react";
import Route from "../routes/Route";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const CommonContext = createContext();

export const CommonProvider = ({ children }) => {
  const empId = localStorage.getItem("username");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [salesType, setSalesType] = useState([]);
  const [productsType, setProductsType] = useState([]);
  const [paymentType, setPaymentType] = useState([]);
  const [banks, setBanks] = useState([]);
  const [subInventory, setSubInventory] = useState([]);
  const [locators, setLocators] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [bankAccountNames, setBankAccountNames] = useState([]);
  const [requisitionType, setRequisitionType] = useState([]);
  const [requisitionItems, setRequisitionItems] = useState([]);
  const [transferType, setTransferType] = useState([]);
  const [modeOfTransport, setModeOfTransport] = useState([]);
  const [fromSubInventory, setFromSubInventory] = useState([]);
  const [fromLocator, setFromLocator] = useState([]);
  const [toLocator, setToLocator] = useState([]);
  const [transferOrderToLocator, setTransferOrderToLocator] = useState([]);
  const [faToLocator, setFaToLocator] = useState([]);
  // const [toStore, setToStore] = useState([]);
  const [onHandsTransferOrderItems, setOnHandsTransferOrderItems] = useState(
    []
  );
  const [regionsOrExtensions, setRegionsOrExtensions] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [locatorsList, setLocatorsList] = useState([]);
  const [locatorsNameList, setLocatorsNameList] = useState([]);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const fetchSalesType = async () => {
    const res = await Route("GET", "/Common/FetchSalesType", null, null, null);
    if (res?.status === 200) {
      const currentDate = new Date().getDate();
      if (currentDate <= 20) {
        setSalesType(res?.data);
      } else {
        setSalesType(
          res?.data?.filter((item) => item?.type !== "EMI Customer")
        );
      }
    }
  };
  const fetchProductsType = async () => {
    const res = await Route("GET", "/Common/FetchProductType", null, null, 1);
    if (res?.status === 200) {
      setProductsType(res?.data);
    }
  };
  const fetchPaymentType = async () => {
    const res = await Route("GET", "/Common/PaymentType", null, null, null);
    if (res?.status === 200) {
      setPaymentType(res?.data);
    }
  };
  const fetchBankBasedOnPaymentType = async (paymentType) => {
    const res = await Route(
      "GET",
      `/Common/FetchBankDetails?userId=${empId}&paymentType=${paymentType}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setBanks(res?.data);
    }
  };
  const fetchSubInventory = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchSubInventory?userId=${empId}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setSubInventory(res?.data);
    }
  };
  const fetchLocators = async (subInventory) => {
    const res = await Route(
      "GET",
      `/Common/FetchLocator?userId=${empId}&subInventory=${subInventory}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setLocators(res?.data);
    }
  };
  const fetchServiceType = async () => {
    const res = await Route("GET", "/Common/ServiceType", null, null, null);
    if (res?.status === 200) {
      setServiceType(res?.data);
    }
  };
  const fetchPaymentOptions = async () => {
    const res = await Route("GET", "/Common/PaymentOption", null, null, null);
    if (res?.status === 200) {
      setPaymentOptions(res?.data);
    }
  };
  const fetchBankAccountName = async (paymentMethod) => {
    const res = await Route(
      "GET",
      `/Common/FetchBankDetails?userId=${empId}&paymentType=${paymentMethod}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setBankAccountNames(res?.data);
    }
  };
  const fetchRequisitionType = async () => {
    const res = await Route(
      "GET",
      `/Common/RequisitionType?type=1`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setRequisitionType(res?.data);
    }
  };
  const fetchRequisitionItem = async () => {
    const res = await Route("GET", "/Common/RequisitionItem", null, null, null);
    if (res?.status === 200) {
      setRequisitionItems(res?.data);
    }
  };
  const fetchTransferType = async () => {
    const res = await Route(
      "GET",
      "/Common/FetchTransferType",
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setTransferType(res?.data);
    }
  };
  const fetchModeOfTransport = async () => {
    const res = await Route(
      "GET",
      "/Common/fetchTransferMode",
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setModeOfTransport(res?.data);
    }
  };
  const fetchFromSubInventory = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchSubInventory?userId=${empId}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setFromSubInventory(res?.data);
    }
  };
  const fetchFromLocator = async (id) => {
    const res = await Route(
      "GET",
      `/Common/FetchLocator?userId=${empId}&subInventory=${id}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setFromLocator(res?.data);
    }
  };
  const fetchToLocator = async (id) => {
    const res = await Route(
      "GET",
      `/Common/FetchLocator?userId=${empId}&subInventory=${id}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setToLocator(res?.data);
    }
  };
  const fetchTrasnferOrderToLocator = async (storeId, subinv) => {
    const res = await Route(
      "GET",
      `/Common/Fetch_Locator?workLocation=${storeId}&subInventory=${subinv}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setTransferOrderToLocator(res?.data);
    }
  };
 
  const fetchLocatorBasedOExtension = async (extension) => {
    const res = await Route(
      "GET",
      `/Common/FetchLocatorByExtension?extension=${extension}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setFaToLocator(res?.data);
    }
  };
  const fetchAllItems = async (regionName, subInventory, locator) => {
    setOnHandsTransferOrderItems([]);
    const res = await Route(
      "GET",
      `/Common/FetchOnHandsTransferOrderItems?StoreName=${regionName}&SubInventoryID=${subInventory}&LocatorID=${locator}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setOnHandsTransferOrderItems(res?.data);
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
  const fetchLocatorsBasedOnExtension = async (storeName) => {
    const res = await Route(
      "GET",
      `/Common/FetchLocatorByExtension?extension=${storeName}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setLocatorsList(res?.data);
    }
  };
  const validateSerialNumberWithLocator = async (serialNo, itemCode) => {
    const res = await Route(
      "GET",
      `/Common/validateSerialNumberWithLocator?StoreName=${userDetails?.regionName}&SubInventoryID=${userDetails?.subInventory}&LocatorID=${userDetails?.locator}&SerialNo=${serialNo}&itemCode=${itemCode}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      return res?.data;
    }
  };
  const fetchLocatorName = async (storeName) => {
    const res = await Route(
      "GET",
      `/Common/FetchLocatorName?extension=${storeName}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      console.log(res?.data);
      setLocatorsNameList(res?.data);
    }
  };
  useEffect(() => {
    fetchSalesType();
    fetchProductsType();
    fetchPaymentType();
    fetchSubInventory();
    fetchServiceType();
    fetchPaymentOptions();
    fetchRequisitionType();
    fetchRequisitionItem();
    fetchTransferType();
    fetchModeOfTransport();
    fetchFromSubInventory();
    fetchFromLocator();
    // fetchToStore();
    fetchRegionsOrExtensions();
    fetchItemsList();
  }, []);

  return (
    <CommonContext.Provider
      value={{
        salesType,
        productsType,
        paymentType,
        fetchBankBasedOnPaymentType,
        banks,
        subInventory,
        locators,
        fetchLocators,
        serviceType,
        paymentOptions,
        fetchBankAccountName,
        bankAccountNames,
        fetchBankAccountName,
        requisitionType,
        requisitionItems,
        transferType,
        modeOfTransport,
        fromSubInventory,
        fetchFromLocator,
        fromLocator,
        fetchToLocator,
        toLocator,
        fetchLocatorBasedOExtension,
        faToLocator,
        // toStore,
        onHandsTransferOrderItems,
        regionsOrExtensions,
        itemsList,
        fetchLocatorsBasedOnExtension,
        locatorsList,
        fetchAllItems,
        validateSerialNumberWithLocator,
        fetchTrasnferOrderToLocator,
        transferOrderToLocator,
        isMdUp,
        fetchLocatorName,
        locatorsNameList
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export const useCommon = () => useContext(CommonContext);
