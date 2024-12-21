import React from "react";
import {
  Box,
  Grid,
  Button,
  Dialog,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CustomDataTable, Transition } from "../../component/common/index";

const ViewPostedTransferShipment = ({
  open,
  setOpen,
  transferOrderDetails,
}) => {
  const item_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.3 },
    { field: "item_Number", headerName: "Item Number", flex: 1.8 },
    {
      field: "item_Description",
      headerName: "Description",
      flex: 3,
    },
    {
      field: "serial_no",
      headerName: "Serial No",
      flex: 2.5,
    },
    { field: "uom", headerName: "UOM", flex: 0.7 },
    { field: "qty", headerName: "Quantity", flex: 0.8 },
    { field: "received_Qty", headerName: "Received Qty", flex: 1 },
    {
      field: "received_Remark",
      headerName: "Received Remarks",
      flex: 1.5,
    },
  ];
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xl"
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
                  backgroundColor: (theme) => theme.palette.bg.light,
                  color: "#eee",
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
            <Grid item container xs={12} paddingTop={2} spacing={1}>
              <Grid item xs={3}>
                <TextField
                  id="transfer_order_no"
                  label="Transfer Order No"
                  required
                  disabled
                  value={transferOrderDetails?.transfer_Order_Number}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Transfer Order Create Date"
                      value={dayjs(transferOrderDetails?.transfer_Date)}
                      disabled
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="transfer_type"
                  label="Transfer Type"
                  required
                  disabled
                  value={transferOrderDetails?.transfer_Type}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="from_store"
                  label="From Store"
                  required
                  disabled
                  value={transferOrderDetails?.transfer_From_Name}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1} mt={1}>
              <Grid item xs={3}>
                <TextField
                  id="from_sub_inv"
                  label="From Sub-Inventory"
                  required
                  disabled
                  value={transferOrderDetails?.transfer_From_SubInventory}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="remarks"
                  label="From Locator"
                  disabled
                  value={transferOrderDetails?.remarks}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="to_store"
                  label="To Store"
                  disabled
                  value={transferOrderDetails?.transfer_From_Locator}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="to_sub_inv"
                  label="To Sub-Inventory"
                  disabled
                  value={transferOrderDetails?.transfer_To_SubInventory}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1} mt={1}>
              <Grid item xs={3}>
                <TextField
                  id="to_locator"
                  label="To Locator"
                  disabled
                  value={transferOrderDetails?.transfer_To_Locator}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="mode_of_transfer"
                  label="Mode Of Transfer"
                  disabled
                  value={transferOrderDetails?.transfer_Mode}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="vehicel_no"
                  label="Vehicle No."
                  required
                  disabled
                  value={transferOrderDetails?.vehicle_Number}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="remarks"
                  label="Remarks"
                  disabled
                  value={transferOrderDetails?.remarks}
                />
              </Grid>
            </Grid>
            <Grid item container alignItems="center" xs={12} paddingY={2}>
              <CustomDataTable
                rows={
                  transferOrderDetails?.transferOrderItemDTOList !== null
                    ? transferOrderDetails?.transferOrderItemDTOList?.map(
                        (row, index) => ({
                          ...row,
                          sl: index + 1,
                          id: index,
                        })
                      )
                    : []
                }
                cols={item_columns}
              />
            </Grid>
            <Grid
              item
              xs={12}
              marginBottom={2}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
                color="error"
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
};

export default ViewPostedTransferShipment;
