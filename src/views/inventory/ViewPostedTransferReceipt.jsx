import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Dialog,
  FormControl,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewPostedTransferOrderReceipt = ({ open, setOpen, transferOrderDetails }) => {
  const item_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "item_Number", headerName: "Item Number", width: 200 },
    {
      field: "item_Description",
      headerName: "Description",
      width: 500,
    },
    {
      field: "serial_no",
      headerName: "Serial No",
      width: 400,
    },
    { field: "uom", headerName: "UOM", width: 150 },
    { field: "qty", headerName: "Quantity", width: 150 },
    { field: "received_Qty", headerName: "Received Qty", width: 150 },
    { field: "received_Remark", headerName: "Received Remarks", width: 150 },
  ];
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Grid
                container
                padding={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#EEEDEB",
                }}
              >
                <Grid item paddingX={2}>
                  <Typography variant="subtitle1">
                    View Transfer Order
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} paddingX={4}>
            <Grid item container xs={12} paddingTop={2}>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="Transfer Order No"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={transferOrderDetails?.transfer_Order_Number}
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Transfer Order Create Date"
                      value={dayjs(transferOrderDetails?.transfer_Date)}
                      disabled
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="Transfer Type"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={transferOrderDetails?.transfer_Type}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="From Store"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={transferOrderDetails?.transfer_From_Name}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} paddingTop={2}>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="From Sub-Inventory"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={transferOrderDetails?.transfer_From_SubInventory}
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="From Locator"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={transferOrderDetails?.transfer_From_Locator}
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="To Store"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={transferOrderDetails?.transfer_To_Name}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="To Sub-Inventory"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={transferOrderDetails?.transfer_To_SubInventory}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} paddingY={2}>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="To Locator"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={transferOrderDetails?.transfer_To_Locator}
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="Mode Of Transport"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={transferOrderDetails?.transfer_Mode}
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="Vehicle No."
                  variant="outlined"
                  required
                  fullWidth
                  disabled
                  value={transferOrderDetails?.vehicle_Number}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Remarks"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={transferOrderDetails?.remarks}
                />
              </Grid>
            </Grid>
            <Grid item container alignItems="center" xs={12} paddingY={2}>
              <div
                style={{
                  height: "auto",
                  width: "100%",
                  background: "#fff",
                }}
              >
                <DataGrid
                  rows={transferOrderDetails?.transferOrderItemDTOList !== null ? transferOrderDetails?.transferOrderItemDTOList?.map(
                    (row, index) => ({
                      ...row,
                      sl: index + 1,
                      id: index,
                    })
                  ) : []}
                  columns={item_columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              alignItems="right"
              paddingX={2}
              sx={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
            >
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
};

export default ViewPostedTransferOrderReceipt;
