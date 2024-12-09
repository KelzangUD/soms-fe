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
import { CustomDataTable,Transition } from "../../component/common/index";

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
    { field: "received_Qty", headerName: "Received Qty", flex: 0.8 },
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
                  backgroundColor: "#1976d2",
                  color: "#eee",
                  paddingY: "20px",
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
                  size="small"
                />
              </Grid>
              <Grid item xs={3} paddingRight={1}>
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
              <Grid item xs={3} paddingRight={1}>
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
              <Grid item xs={3} paddingRight={1}>
                <TextField
                  id="outlined-basic"
                  label="Mode Of Transport"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  value={transferOrderDetails?.transfer_Mode}
                  size="small"
                />
              </Grid>
            </Grid>

            <Grid item container xs={12} paddingY={2}>
              <Grid item xs={3} paddingRight={1}>
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
              <Grid item xs={6}>
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
              marginBottom={2}
              sx={{ display: "flex", justifyContent: "flex-end" }}
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

export default ViewPostedTransferShipment;
