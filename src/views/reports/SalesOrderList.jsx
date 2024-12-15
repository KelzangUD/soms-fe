import React, { useState, useRef } from "react";
import {
  Autocomplete,
  Box,
  Grid,
  Button,
  IconButton,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CustomDataTable, PrintSection } from "../../component/common/index";
import Route from "../../routes/Route";
import { exportToExcel } from "react-json-to-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import { useCommon } from "../../contexts/CommonContext";

const SalesOrderList = () => {
  const { regionsOrExtensions } = useCommon();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const access_token = localStorage.getItem("access_token");
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [rechargeCollection, setRechargeCollection] = useState([]);
  const [printData, setPrintData] = useState([]);
  const [regionOrExtension, setRegionOrExtension] = useState(
    userDetails?.regionName
  );
  const [salesOrderList, setSalesOrderList] = useState([]);
  const sales_order_list_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.4 },
    { field: "pos_no", headerName: "POS No", flex: 1.5 },
    {
      field: "pos_date",
      headerName: "POS Date",
      flex: 1.5,
    },
    { field: "customer_name", headerName: "Customer Name", flex: 2.5 },
    { field: "mobile_no", headerName: "Mobile No", flex: 1.5 },
    { field: "ac_to_customer", headerName: "A/C to Customer", flex: 1.5 },
    { field: "payment_terms", headerName: "Payment Terms", flex: 1.5 },
    { field: "payment_amount", headerName: "Payment Amount (Nu)", flex: 1.5 },
    { field: "created_user", headerName: "Created User", felx: 1.5 },
    {
      field: "action",
      headerName: "Action",
      flex: 1.5,
      renderCell: (params) => (
        <>
          <IconButton aria-label="view" size="small" color="secondary">
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
  const sales_order_list_rows = [];
  const regionOrExtensionHandle = (e) => {
    console.log(e?.target?.value);
    setRegionOrExtension(e?.target?.value);
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
                <Grid item container spacing={1} alignItems="center">
                  <Grid item xs={3}>
                    <Autocomplete
                      disablePortal
                      options={regionsOrExtensions?.map((item) => ({
                        label: item?.extensionName,
                        id: item?.id,
                      }))}
                      value={regionOrExtension}
                      // onChange={storeHandle}
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
                  <Grid item xs={2}>
                    <FormControl fullWidth style={{ background: "#fff" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="From*" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth style={{ background: "#fff" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="To*" />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label="Customer Name"
                      variant="outlined"
                      fullWidth
                      name="customer_name"
                      required
                      // onChange={oldPasswordHandle}
                      style={{ background: "#fff" }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label="POS No."
                      variant="outlined"
                      fullWidth
                      name="pos_no"
                      required
                      // onChange={oldPasswordHandle}
                      style={{ background: "#fff" }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button variant="contained">Search</Button>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <PrintSection />
                </Grid>
                <Grid item container alignItems="center" xs={12}>
                  <CustomDataTable
                    rows={salesOrderList}
                    cols={sales_order_list_columns}
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

export default SalesOrderList;
