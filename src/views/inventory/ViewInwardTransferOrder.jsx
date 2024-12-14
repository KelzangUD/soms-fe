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

const ViewInwardTransferOrder = ({ open, setOpen, transferOrderDetails }) => {
  const item_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.3 },
    { field: "item_Number", headerName: "Item Number", flex: 1.7 },
    {
      field: "item_Description",
      headerName: "Description",
      flex: 4,
    },
    {
      field: "item_Serial_Number",
      headerName: "Serial No",
      flex: 3,
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
                  color: "#fff",
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
                  id="outlined-basic"
                  label="Transfer Order No"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={transferOrderDetails?.transfer_Order_Number}
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Transfer Order Create Date"
                      value={dayjs(transferOrderDetails?.transfer_Date)}
                      disabled
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Transfer Type"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={transferOrderDetails?.transfer_Type}
                  size="small"
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
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} mt={1} spacing={1}>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="From Sub-Inventory"
                  variant="outlined"
                  required
                  fullWidth
                  disabled
                  value={transferOrderDetails?.transfer_From_SubInventory}
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="From Locator"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={transferOrderDetails?.transfer_From_Locator}
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="To Store"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={transferOrderDetails?.transfer_To_Name}
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="To Sub-inventry"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={transferOrderDetails?.transfer_To_SubInventory}
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} mt={1} spacing={1}>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="To Locator"
                  variant="outlined"
                  required
                  fullWidth
                  disabled
                  value={transferOrderDetails?.transfer_To_Locator}
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Mode Of Transport"
                  variant="outlined"
                  required
                  fullWidth
                  disabled
                  value={transferOrderDetails?.transfer_Mode}
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Vehicle No."
                  variant="outlined"
                  required
                  fullWidth
                  disabled
                  value={transferOrderDetails?.vehicle_Number}
                  size="small"
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
                  size="small"
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
              marginBottom={2}
              sx={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
            >
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
                color="error"
                size="small"
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

export default ViewInwardTransferOrder;
