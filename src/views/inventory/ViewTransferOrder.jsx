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
import { CustomDataTable, Transition } from "../../component/common";

const ViewTransferOrder = ({ open, setOpen, transferOrderDetails }) => {
  const item_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.4 },
    { field: "item_Number", headerName: "Item Number", flex: 1.5 },
    {
      field: "item_Description",
      headerName: "Description",
      flex: 3,
    },
    {
      field: "item_Serial_Number",
      headerName: "Serial No",
      felx: 3,
    },
    { field: "uom", headerName: "UOM", flex: 1 },
    { field: "qty", headerName: "Quantity", flex: 1 },
  ];
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
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
            <Grid item container xs={12} paddingTop={2}>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="transfer_order_no"
                  label="Transfer Order No"
                  required
                  disabled
                  value={transferOrderDetails?.transfer_Order_Number}
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
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
              <Grid item xs={3} paddingRight={1}>
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
            <Grid item container xs={12} paddingTop={2}>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="from_sub_inv"
                  label="From Sub-Inventory"
                  required
                  disabled
                  value={transferOrderDetails?.transfer_From_SubInventory}
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="from_locator"
                  label="From Locator"
                  required
                  disabled
                  value={transferOrderDetails?.transfer_From_Locator}
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="to_store"
                  label="To Store"
                  required
                  disabled
                  value={transferOrderDetails?.transfer_To_Name}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="to_sub_inv"
                  label="To Sub-Inventory"
                  required
                  disabled
                  value={transferOrderDetails?.transfer_To_SubInventory}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} paddingY={2}>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="to_locator"
                  label="To Locator"
                  required
                  disabled
                  value={transferOrderDetails?.transfer_To_Locator}
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="mode_of_transport"
                  label="Mode Of Transport"
                  disabled
                  fullWidth
                  value={transferOrderDetails?.transfer_Mode}
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="vehicle_no"
                  label="Vehicle No."
                  fullWidth
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
              alignItems="right"
              paddingY={1}
              marginBottom={1}
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

export default ViewTransferOrder;
