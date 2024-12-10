import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Grid,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { CustomDataTable } from "../../component/common/index";
import { on_hand_report_columns } from "../../data/static";
import Route from "../../routes/Route";
import { dateFormatterTwo } from "../../util/CommonUtil";
import { useCommon } from "../../contexts/CommonContext";

const OnHandReport = () => {
  const {
    regionsOrExtensions,
    itemsList,
    fetchLocatorsBasedOnExtension,
    locatorsList,
  } = useCommon();
  const access_token = localStorage.getItem("access_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
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
                  <IconButton aria-label="pdf" color="error">
                    <PictureAsPdfIcon />
                  </IconButton>
                  <IconButton aria-label="excel" color="success">
                    <FileDownloadIcon />
                  </IconButton>
                  <IconButton aria-label="excel" color="primary">
                    <PrintIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
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
