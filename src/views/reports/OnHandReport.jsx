import React, { useState, useEffect } from "react";
import {
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
import SubHeader from "../../common/SubHeader";
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
  const on_hand_report_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "item_no", headerName: "Item No", width: 250 },
    {
      field: "item_description",
      headerName: "Item Description",
      width: 350,
    },
    { field: "uom", headerName: "UOM", width: 100 },
    { field: "qty", headerName: "Quantity", width: 100 },
    { field: "serial_no", headerName: "Serial No", width: 150 },
    { field: "imei_no", headerName: "IMEI No", width: 150 },
    { field: "sub_inventory", headerName: "Sub-Inventory", width: 150 },
    { field: "locator", headerName: "Locator", width: 150 },
  ];
  const on_hand_report_rows = [
    {
      id: 1,
      item_no: "SM-SIM-SIM-SIM-USIMC",
      item_description: "Combo USIM, 64K, Java, Postpaid",
      uom: "Number",
      qty: 1,
      serial_no: "866208067573669",
      imei_no: "BOB",
      sub_inventory: "WAREH",
      locator: "FRESHS",
    },
  ];

  //   const token = localStorage.getItem("token");
  //   const fetchResults = async () => {
  //     const res = await Route("GET", "/results", token, null, null);
  //     if (res?.status === 200) {
  //       setResults(res?.data?.results);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchResults();
  //   }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          {/* <SubHeader text="On Hand Report" /> */}
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
                  spacing={2}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid
                    item
                    container
                    xs={9}
                    direction="column-reverse"
                    spacing={2}
                  >
                    <Grid item container spacing={1} alignItems="center">
                      <Grid item xs={2}>
                        <TextField
                          label="As On Date"
                          variant="outlined"
                          fullWidth
                          name="as_on_date"
                          required
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <FormControl fullWidth>
                          <InputLabel id="region-or-extension-select-label">
                            Region/Extension
                          </InputLabel>
                          <Select
                            labelId="region-or-extension-select-label"
                            id="region-or-extension-select"
                            // value={age}
                            label="Region/Extension"
                            // onChange={handleChange}
                          >
                            <MenuItem value={1}>
                              TIPL_Dagapela Extension
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={2}>
                        <FormControl fullWidth>
                          <InputLabel id="item-select-label">
                            Item
                          </InputLabel>
                          <Select
                            labelId="item-select-label"
                            id="item-select"
                            // value={age}
                            label="Item"
                            // onChange={handleChange}
                          >
                            <MenuItem value={1}>
                              20W USB-C POWER ADAPTER-ITP (MHJF32P/A) (OM-SPE-SPA-IPN-20WPN)
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={2}>
                        <FormControl fullWidth>
                          <InputLabel id="creator-select-label">
                            Creator
                          </InputLabel>
                          <Select
                            labelId="creator-select-label"
                            id="creator-select"
                            // value={age}
                            label="Creator"
                            // onChange={handleChange}
                          >
                            {/* <MenuItem value={1}>
                              20W USB-C POWER ADAPTER-ITP (MHJF32P/A) (OM-SPE-SPA-IPN-20WPN)
                            </MenuItem> */}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          label="Serial No."
                          variant="outlined"
                          fullWidth
                          name="serial_no"
                          required
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          label="IMEI No."
                          variant="outlined"
                          fullWidth
                          name="imei_no"
                          required
                          // onChange={oldPasswordHandle}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Button variant="contained">Search</Button>
                      </Grid>
                    </Grid>
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
                  <Grid item xs={3}>
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
                <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
                  <div style={{ height: "auto", width: "100%" }}>
                    <DataGrid
                      rows={on_hand_report_rows?.map((row, index) => ({
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
