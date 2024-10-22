import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Grid,
  Button,
  InputBase,
  IconButton,
  FormControl,
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
import ViewPostedTransferShipment from "./ViewPostedTransferShipment";
import Route from "../../routes/Route";

const PostedTransferShipment = () => {
  const empID = localStorage.getItem("username");
  const [transferShipment, setTransferShipment] = useState([]);
  const [transferShipmentDetails, setTransferShipmentDetails] = useState({});
  const [view, setView] = useState(false);

  const fetchPostedTransferShipmentDetails = async (transferOrderNo) => {
    const res = await Route(
      "GET",
      `/transferOrder/viewPostedTransferOrderDetails?transferOrderNo=${transferOrderNo}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setTransferShipmentDetails(res?.data);
      setView(true);
    }
  };

  const viewHandle = (params) => {
    fetchPostedTransferShipmentDetails(params?.id)
  };
  const posted_transfer_shipment_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "transfer_order_no", headerName: "Transfer Order No", width: 250 },
    {
      field: "transfer_from_code",
      headerName: "Transfer From Code",
      width: 250,
    },
    { field: "transfer_to_code", headerName: "Tansfer To Code", width: 250 },
    { field: "posted_date", headerName: "Posted Date", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton aria-label="view" size="small" onClick={() => viewHandle(params)}>
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];

  //   const token = localStorage.getItem("token");
  const fetchPostedTransferShipment = async () => {
    const res = await Route(
      "GET",
      `/transferOrder/viewPostedOutwardTransferOrderList/${empID}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setTransferShipment(
        res?.data?.map((item, index) => ({
          id: item?.transfer_Order_Number,
          sl: index+1,
          transfer_order_no: item?.transfer_Order_Number,
          transfer_from_code: item?.transfer_From_Name,
          transfer_to_code: item?.transfer_To_Name,
          posted_date: item?.stringTransferDate,
          status: item?.status,
        }))
      );
    }
  };
  useEffect(() => {
    fetchPostedTransferShipment();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          {/* <SubHeader text="Posted Transfer Shipment" /> */}
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
                  <div
                    style={{
                      height: "auto",
                      width: "100%",
                      background: "#fff",
                    }}
                  >
                    <DataGrid
                      rows={transferShipment}
                      columns={posted_transfer_shipment_columns}
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
      {view && (
        <ViewPostedTransferShipment
          open={view}
          setOpen={setView}
          transferOrderDetails={transferShipmentDetails}
        />
      )}
    </>
  );
};

export default PostedTransferShipment;
