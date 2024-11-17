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
import { DataGrid } from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { RenderStatus } from "../../ui/index";
import Route from "../../routes/Route";

const BankCollection = () => {
  const [bankCollection, setBankCollection] = useState([]);
  const bank_collection_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "payment_amount", headerName: "Payment Amount (Nu)", width: 170 },
    {
      field: "type",
      headerName: "Payment Type",
      width: 120,
    },
    { field: "payment_ref_number", headerName: "Reference Number", width: 150 },
    { field: "bank_name", headerName: "Bank Name", width: 200 },
    { field: "cheque", headerName: "Cheque No", width: 100 },
    { field: "cheque_date", headerName: "Cheque Date", width: 100 },
    { field: "created_date", headerName: "Created Date", width: 100 },
    { field: "created_by", headerName: "Created User", width: 180 },
    {
      field: "result_code",
      headerName: "Status",
      width: 110,
      renderCell: (params) => (
        <RenderStatus status={params?.row?.result_code} />
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

  // const token = localStorage.getItem("token");
  const fetchBankCollection = async () => {
    const res = await Route(
      "GET",
      `/Report/bankCollection?extension=19&fromDate=2024-08-01&toDate=2024-10-31`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setBankCollection(
        res?.data?.map((item, index) => ({
          id: index,
          payment_amount: item?.payment_amount,
          type: item?.type,
          result_code: item?.result_code,
          created_date: item?.created_date,
          payment_ref_number: item?.payment_ref_number,
          created_by: item?.created_by,
          cheque: item?.cheque,
          cheque_date: item?.cheque_date,
          bank_name: item?.bank_name,
          filePath: item?.filePath,
        }))
      );
    }
  };
  useEffect(() => {
    fetchBankCollection();
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
                  <div
                    style={{
                      height: "auto",
                      width: "100%",
                      background: "#fff",
                    }}
                  >
                    <DataGrid
                      rows={bankCollection?.map((row, index) => ({
                        ...row,
                        sl: index + 1,
                      }))}
                      columns={bank_collection_columns}
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

export default BankCollection;
