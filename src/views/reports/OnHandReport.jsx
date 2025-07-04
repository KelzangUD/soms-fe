import React, { useState, useEffect, useRef } from "react";
import { Autocomplete, Box, Grid, Button, TextField } from "@mui/material";
import { CustomDataTable, PrintSection } from "../../component/common/index";
import { on_hand_report_columns } from "../../data/static";
import Route from "../../routes/Route";
import { dateFormatterTwo } from "../../util/CommonUtil";
import { useCommon } from "../../contexts/CommonContext";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import { LoaderDialog, Notification } from "../../ui/index";

const OnHandReport = () => {
  const {
    regionsOrExtensions,
    itemsList,
    fetchLocatorsBasedOnExtension,
    locatorsList,
    isMdUp,
  } = useCommon();

  const access_token = localStorage.getItem("access_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [details, setDetails] = useState({
    storeName: userDetails?.regionName,
    item: "ALL",
    itemLabel: "All",
    locator_id:
      userDetails?.roleId === 37 ||
      userDetails?.roleId === 53 ||
      userDetails?.roleId === 54 ||
      userDetails?.roleId === 55
        ? "ALL"
        : userDetails?.locator,
    serialNo: "ALL",
    imei_no: "ALL",
  });
  const [onHandReports, setOnHandReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const fetchOnHandReports = async () => {
    setIsLoading(true);
    try {
      const res = await Route(
        "GET",
        `/OnHand/Fetch_OnHand_Items?storeName=${details?.storeName}&item=${details?.item}&locator_id=${details?.locator_id}&serialNo=${details?.serialNo}&imei_no=${details?.imei_no}`,
        access_token,
        null,
        null
      );
      if (res?.status === 200) {
        setOnHandReports(res?.data);
      }
      setPrintData(
        res?.data?.map((item, index) => ({
          sl: index + 1,
          Item: item?.item,
          "Item Description": item?.item_description,
          UOM: item?.uom,
          "Transaction Quantity": parseInt(item?.transaction_quantity),
          "Serial Controlled": item?.serial_controlled,
          "Imei Number": item?.imei_number,
          "Serial Number": item?.serial_number,
          "Sub-inventory ID": item?.sub_inventory_id,
          "Locator ID": item?.locator_id,
          "Store Name": item?.store_name,
        }))
      );
    } catch (err) {
      setNotificationMessage("Error Fetching Report");
      setSeverity("error");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchOnHandReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchLocatorsBasedOnExtension(details?.storeName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details?.storeName]);
  const storeHandle = (e, value) => {
    setDetails((prev) => ({
      ...prev,
      storeName: value?.id,
      locator_id: "ALL",
    }));
  };
  const itemHandle = (e, value) => {
    setDetails((prev) => ({
      ...prev,
      item: value?.id,
      itemLabel: value?.label,
    }));
  };
  const locatorHandle = (e, value) => {
    setDetails((prev) => ({
      ...prev,
      locator_id: value?.id,
    }));
  };
  const serialNoHandle = (e) => {
    setDetails((prev) => ({
      ...prev,
      serialNo: e?.target?.value,
    }));
  };
  const imeiNoHandle = (e) => {
    setDetails((prev) => ({
      ...prev,
      imei_no: e?.target?.value,
    }));
  };
  const exportJsonToPdfHandle = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "sl",
          "Item",
          "Item Description",
          "UOM",
          "Transaction Quantity",
          "Serial Number",
          "Imei Number",
          "Sub-inventory ID",
          "Locator ID",
          "Store Name",
          "Serial Controlled",
        ],
      ],
      body: printData?.map((item) => [
        item?.sl,
        item?.["Item"],
        item?.["Locator ID"],
        item?.["Item Description"],
        item?.["UOM"],
        item?.["Serial Controlled"],
        item?.["Transaction Quantity"],
        item?.["Serial Number"],
        item?.["Sub-inventory ID"],
        item?.["Store Name"],
        item?.["Imei Number"],
      ]),
      styles: {
        fontSize: 8,
      },
      margin: { top: 35 },
      didDrawPage: (data) => {
        doc.setFontSize(12);
        doc.text("On-Hand Report", data.settings.margin.left, 30);
      },
    });
    doc.save("OnHand_Report");
  };

  const columns = on_hand_report_columns(isMdUp); 
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
                <Grid item container spacing={1} sx={{ pt: 2 }}>
                  <Grid item xs={12} md={2}>
                    <TextField
                      label="As On Date"
                      name="as_on_date"
                      required
                      disabled
                      value={dateFormatterTwo(new Date())}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Autocomplete
                      disablePortal
                      options={[
                        { label: "ALL", id: "ALL" },
                        ...(regionsOrExtensions?.map((item) => ({
                          label: item?.extensionName,
                          id: item?.id,
                        })) || []),
                      ]}
                      value={details?.storeName}
                      onChange={storeHandle}
                      renderInput={(params) => (
                        <TextField {...params} label="Region/Extension" />
                      )}
                      disabled={
                        userDetails?.roleName === "Administrator" ||
                        userDetails?.roleName === "General Manager" ||
                        userDetails?.roleName === "Regional Manager" ||
                        userDetails?.roleName === "Regional Accountant" ||
                        userDetails?.roleName === "Contact Center CCE"
                          ? false
                          : true
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Autocomplete
                      disablePortal
                      options={[
                        { label: "ALL", id: "ALL" },
                        ...(itemsList?.map((item) => ({
                          label: item?.description,
                          id: item?.item_number,
                        })) || []),
                      ]}
                      value={details?.itemLabel}
                      onChange={itemHandle}
                      renderInput={(params) => (
                        <TextField {...params} label="Item" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    {userDetails?.subInventory === "WAREH" ? (
                      <Autocomplete
                        disablePortal
                        options={[
                          { label: "ALL", id: "ALL" },
                          { label: "FRESHS", id: "FRESHS" },
                          { label: "DAMNRP", id: "DAMNRP" },
                        ]}
                        value={details?.locator_id}
                        onChange={locatorHandle}
                        renderInput={(params) => (
                          <TextField {...params} label="Locator" />
                        )}
                      />
                    ) : (
                      <Autocomplete
                        disablePortal
                        options={[
                          { label: "ALL", id: "ALL" },
                          ...(locatorsList?.map((item) => ({
                            label: item?.locator,
                            id: item?.locator,
                          })) || []),
                        ]}
                        value={details?.locator_id}
                        onChange={locatorHandle}
                        renderInput={(params) => (
                          <TextField {...params} label="Locator" />
                        )}
                        disabled={
                          userDetails?.roleId === 37 ||
                          userDetails?.roleId === 53 ||
                          userDetails?.roleId === 54 ||
                          userDetails?.roleId === 55 ||
                          userDetails?.roleId === 59
                            ? false
                            : true
                        }
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      label="Serial No."
                      name="serial_no"
                      required
                      value={details?.serialNo}
                      onChange={serialNoHandle}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      label="IMEI No."
                      name="imei_no"
                      required
                      value={details?.imei_no}
                      onChange={imeiNoHandle}
                    />
                  </Grid>
                  <Grid item xs={2} alignContent="center">
                    <Button variant="contained" onClick={fetchOnHandReports}>
                      Search
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <PrintSection
                    exportExcel={() =>
                      exportToExcel(printData, "OnHand_Report")
                    }
                    exportPdf={exportJsonToPdfHandle}
                    handlePrint={reactToPrintFn}
                  />
                </Grid>
                <Grid item xs={12} ref={contentRef}>
                  <CustomDataTable
                    rows={onHandReports?.map((item, index) => ({
                      sl: index + 1,
                      ...item,
                    }))}
                    cols={columns}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {isLoading && <LoaderDialog open={isLoading} />}
      {showNotification && severity === "error" && (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={notificationMessage}
          severity={severity}
        />
      )}
    </>
  );
};

export default OnHandReport;
