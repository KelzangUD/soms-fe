import React, { useState, useEffect, useRef } from "react";
import {
  Autocomplete,
  Box,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { CustomDataTable, PrintSection } from "../../component/common/index";
import { on_hand_report_columns } from "../../data/static";
import Route from "../../routes/Route";
import { dateFormatterTwo } from "../../util/CommonUtil";
import { useCommon } from "../../contexts/CommonContext";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";

const OnHandReport = () => {
  const {
    regionsOrExtensions,
    itemsList,
    fetchLocatorsBasedOnExtension,
    locatorsList,
  } = useCommon();
  const access_token = localStorage.getItem("access_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [printData, setPrintData] = useState([]);
  const [details, setDetails] = useState({
    storeName: userDetails?.regionName,
    item: "ALL",
    locator_id: "ALL",
    serialNo: "ALL",
    imei_no: "ALL",
  });
  const [onHandReports, setOnHandReports] = useState([]);
  const fetchOnHandReports = async () => {
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
        "Locator ID": item?.locator_id,
        "Item Description": item?.item_Description,
        UOM: item?.uom,
        "Serial Controlled": item?.serial_controlled,
        "Transaction Quantity": parseInt(item?.transaction_Quantity),
        "Serial Number": item?.serial_Number,
        "Sub-inventory ID": item?.sub_inventory_id,
        "Store Name": item?.store_name,
        "Imei Number": item?.imei_number,
      }))
    );
  };
  useEffect(() => {
    fetchOnHandReports();
  }, []);
  useEffect(() => {
    fetchLocatorsBasedOnExtension(details?.storeName);
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
          "Locator ID",
          "Item Description",
          "UOM",
          "Serial Controlled",
          "Transaction Quantity",
          "Serial Number",
          "Sub-inventory ID",
          "Store Name",
          "Imei Number",
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
                  <Grid item xs={2}>
                    <TextField
                      label="As On Date"
                      variant="outlined"
                      fullWidth
                      name="as_on_date"
                      required
                      disabled
                      value={dateFormatterTwo(new Date())}
                      style={{ background: "#fff" }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Autocomplete
                      disablePortal
                      options={regionsOrExtensions?.map((item) => ({
                        label: item?.extensionName,
                        id: item?.id,
                      }))}
                      value={details?.storeName}
                      onChange={storeHandle}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Region/Extension"
                          size="small"
                        />
                      )}
                      style={{ background: "#fff" }}
                      disabled={
                        userDetails?.roleName === "Administrator" ? false : true
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Autocomplete
                      disablePortal
                      options={[
                        { label: "ALL", id: "ALL" },
                        ...(itemsList?.map((item) => ({
                          label: item?.item_number,
                          id: item?.item_number,
                        })) || []),
                      ]}
                      value={details?.item}
                      onChange={itemHandle}
                      renderInput={(params) => (
                        <TextField {...params} label="Item" size="small" />
                      )}
                      style={{ background: "#fff" }}
                    />
                  </Grid>
                  <Grid item xs={2}>
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
                        <TextField {...params} label="Locator" size="small" />
                      )}
                      style={{ background: "#fff" }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label="Serial No."
                      variant="outlined"
                      fullWidth
                      name="serial_no"
                      required
                      value={details?.serialNo}
                      onChange={serialNoHandle}
                      style={{ background: "#fff" }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="IMEI No."
                      variant="outlined"
                      fullWidth
                      name="imei_no"
                      required
                      value={details?.imei_no}
                      onChange={imeiNoHandle}
                      style={{ background: "#fff" }}
                      size="small"
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
                    cols={on_hand_report_columns}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OnHandReport;
