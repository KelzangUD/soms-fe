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
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { RenderStatus } from "../../ui/index";
import { CustomDataTable } from "../../component/common/index";
import Route from "../../routes/Route";

const PaymentCollection = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const access_token = localStorage.getItem("access_token");
  const [rechargeCollection, setRechargeCollection] = useState([]);
  const recharge_collection_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "payment_amount", headerName: "Payment Amount", width: 130 },
    {
      field: "recharge_type",
      headerName: "Payment Type",
      width: 120,
    },
    { field: "payment_ref_number", headerName: "Reference Number", width: 140 },
    {
      field: "result_code",
      headerName: "Status",
      width: 110,
      renderCell: (params) => (
        <RenderStatus status={params?.row?.result_code} />
      ),
    },
    { field: "created_date", headerName: "Created Date", width: 110 },
    { field: "created_by", headerName: "Created User", width: 200 },
    {
      field: "old_print",
      headerName: "Old Print",
      width: 90,
      renderCell: (params) => (
        <>
          <IconButton aria-label="view" size="small" color="primary">
            <PrintIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 90,
      renderCell: (params) => (
        <>
          <IconButton aria-label="view" size="small" color="primary">
            <PrintIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];

  const fetchRechargeCollection = async () => {
    const res = await Route(
      "GET",
      `/Report/rechargeCollection?extension=${userDetails?.storeId}&fromDate=2024-08-01&toDate=2024-10-31`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setRechargeCollection(
        res?.data?.map((item, index) => ({
          id: index,
          sl: index + 1,
          type: item?.type,
          created_date: item?.created_date,
          message_seq: item?.message_seq,
          payment_amount: item?.payment_amount,
          result_code: item?.result_code,
          created_by: item?.created_by,
          payment_ref_number: item?.payment_ref_number,
          cheque: item?.cheque,
          cheque_date: item?.cheque_date,
          bank_name: item?.bank_name,
          recharge_type: item?.recharge_type,
        }))
      );
    }
  };
  useEffect(() => {
    fetchRechargeCollection();
  }, []);

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
                <Grid item container>
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
                <Grid item container spacing={1} alignItems="center">
                  <Grid item xs={3}>
                    <FormControl
                      fullWidth
                      style={{ background: "#fff" }}
                      size="small"
                    >
                      <InputLabel id="region-or-extension-select-label">
                        Region/Extension
                      </InputLabel>
                      <Select
                        labelId="region-or-extension--select-label"
                        id="region-or-extension--select"
                        // value={age}
                        label="Region/Extension"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>TIPL_Dagapela Extension</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
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
                  <IconButton aria-label="pdf" color="error">
                    <PictureAsPdfIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton aria-label="excel" color="success">
                    <FileDownloadIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton aria-label="print" color="primary">
                    <PrintIcon fontSize="inherit" />
                  </IconButton>
                </Grid>
                <Grid item container alignItems="center" xs={12}>
                  <CustomDataTable
                    rows={rechargeCollection}
                    cols={recharge_collection_columns}
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

export default PaymentCollection;
