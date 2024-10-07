import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Paper,
  Grid,
  Button,
  InputBase,
  IconButton,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Route from "../../routes/Route";

const OnHandReport = () => {
  const [details, setDetails] = useState({
    storeName: "",
    item: "ALL",
    locator_id: "ALL",
    serialNo: "ALL",
    imei_no: "ALL",
  });
  const [onHandReports, setOnHandReports] = useState([]);
  const on_hand_report_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "item", headerName: "Item No", width: 250 },
    {
      field: "item_Description",
      headerName: "Item Description",
      width: 450,
    },
    { field: "uom", headerName: "UOM", width: 100 },
    { field: "transaction_Quantity", headerName: "Quantity", width: 100 },
    { field: "serial_Number", headerName: "Serial No", width: 200 },
    { field: "imei_number", headerName: "IMEI No", width: 150 },
    { field: "sub_inventory_id", headerName: "Sub-Inventory", width: 150 },
    { field: "locator_id", headerName: "Locator", width: 150 },
  ];
  const [regionOrExtension, setRegionOrExtension] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [locatorsList, setLocatorsList] = useState([]);
  const token = localStorage.getItem("access_token");
  const username = localStorage.getItem("username");
  const fetchRegionOrExtension = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchAllRegionOrExtension`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setRegionOrExtension(res?.data);
    }
  };
  const fetchItemsList = async () => {
    const res = await Route("GET", `/Common/FetchAllItems`, null, null, null);
    if (res?.status === 200) {
      setItemsList(res?.data);
    }
  };
  const fetchUserDetails = async () => {
    const res = await Route(
      "GET",
      `/Common/fetchUserDtls?userId=${username}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setDetails((prev) => ({
        ...prev,
        storeName: res?.data?.region_NAME,
      }));
    }
  };
  const fetchLocatorsBasedOnExtension = async () => {
    const res = await Route(
      "GET",
      `/Common/FetchLocatorByExtension?extension=${details?.storeName}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setLocatorsList(res?.data);
    }
  };
  const fetchOnHandReports = async () => {
    const res = await Route(
      "GET",
      `/OnHand/Fetch_OnHand_Items?storeName=${details?.storeName}&item=${details?.item}&locator_id=${details?.locator_id}&serialNo=${details?.serialNo}&imei_no=${details?.imei_no}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setOnHandReports(res?.data);
    }
  };
  useEffect(() => {
    fetchRegionOrExtension();
    fetchItemsList();
    fetchUserDetails();
  }, []);
  useEffect(() => {
    fetchLocatorsBasedOnExtension();
    fetchOnHandReports();
  }, [details]);
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
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid item>
                    <Grid item>
                      <Paper
                        sx={{
                          p: "2px 0",
                          display: "flex",
                          alignItems: "center",
                          maxWidth: 400,
                        }}
                      >
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="Search"
                          inputProps={{ "aria-label": "search" }}
                        />
                        <IconButton
                          type="button"
                          sx={{ p: "10px" }}
                          aria-label="search"
                        >
                          <SearchIcon />
                        </IconButton>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ mr: 2 }}>
                    <Button
                      variant="contained"
                      color="error"
                      endIcon={<PictureAsPdfIcon />}
                      sx={{ mr: 2 }}
                    >
                      Export
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      endIcon={<FileDownloadIcon />}
                      sx={{ mr: 2 }}
                    >
                      Export
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<PrintIcon />}
                    >
                      Print
                    </Button>
                  </Grid>
                </Grid>
                <Grid item container spacing={2} sx={{ px: 2, pt: 2 }}>
                  <Grid item xs={1}>
                    <TextField
                      label="As On Date"
                      variant="outlined"
                      fullWidth
                      name="as_on_date"
                      required
                      disabled
                      value={new Date().toString()}
                      style={{ background: "#fff" }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Autocomplete
                      disablePortal
                      options={regionOrExtension?.map((item) => ({
                        label: item?.extensionName,
                        id: item?.id,
                      }))}
                      value={details?.storeName}
                      onChange={storeHandle}
                      renderInput={(params) => (
                        <TextField {...params} label="Region/Extension" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      disablePortal
                      options={itemsList?.map((item) => ({
                        label: item?.item_number,
                        id: item?.item_number,
                      }))}
                      value={details?.item}
                      onChange={itemHandle}
                      renderInput={(params) => (
                        <TextField {...params} label="Item" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Autocomplete
                      disablePortal
                      options={locatorsList?.map((item) => ({
                        label: item?.locator,
                        id: item?.locator,
                      }))}
                      value={details?.locator_id}
                      onChange={locatorHandle}
                      renderInput={(params) => (
                        <TextField {...params} label="Locator" />
                      )}
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
                    />
                  </Grid>
                  <Grid item xs={2} alignContent="center">
                    <Button variant="contained" onClick={fetchOnHandReports}>
                      Search
                    </Button>
                  </Grid>
                </Grid>
                <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
                  <div
                    style={{
                      height: "auto",
                      width: "100%",
                      background: "#fff",
                    }}
                  >
                    <DataGrid
                      rows={onHandReports?.map((row, index) => ({
                        ...row,
                        sl: index + 1,
                      }))}
                      columns={on_hand_report_columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                    />
                  </div>
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
