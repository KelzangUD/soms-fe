import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Dialog, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Transition } from "../../component/common";

const ViewRequisitionItemDetails = ({
  open,
  setOpen,
  details,
  approvalStatus,
}) => {
  const [itemDTOlist, setItemDTOList] = useState([]);
  useEffect(() => {
    setItemDTOList(
      details?.itemDTOList?.map((item) => ({
        id: item?.req_Item_No,
        item_Number: item?.item_Number,
        item_Description: item?.item_Description,
        uom: item?.uom,
        qty: item?.qty,
        level1_Qty:
          approvalStatus === "Submitted" || approvalStatus === "Rejected"
            ? 0
            : approvalStatus === "In-Progress"
            ? item?.level1_Qty
            : item?.level2_Qty,
      }))
    );
  }, [details]);
  const requisiton_item_columns = [
    { field: "sl", headerName: "Sl. No", flex: 0.4 },
    { field: "item_Number", headerName: "Item Number", flex: 2 },
    {
      field: "item_Description",
      headerName: "Description",
      flex: 5,
    },
    { field: "uom", headerName: "UOM", flex: 0.8 },
    { field: "qty", headerName: "Quantity", flex: 0.7 },
    {
      field: "level1_Qty",
      headerName: "Approve Quantity",
      flex: 1.3,
    },
    {
      field: "received_Remark",
      headerName: "Remarks",
      flex: 1.5,
    },
  ];
  return (
    <>
      <Dialog
        maxWidth="xl"
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Grid
                container
                p={2}
                sx={{
                  backgroundColor: (theme) => theme?.palette?.bg?.light,
                  color: "#eee",
                }}
              >
                <Typography variant="subtitle1">Requisition Details</Typography>
              </Grid>
              <Grid container spacing={1} paddingX={2} paddingY={1}>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    Requisition Number: {details?.requisitionNo}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    Employee Name: {details?.employeeName}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    Employee Code: {details?.employeeCode}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingX={2}>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    Store Name: {details?.requisitionStoreName}
                  </Typography>
                </Grid>
                <Grid item xs={4} display="flex">
                  <Typography variant="body1">
                    Region Name: {details?.regionName}
                  </Typography>
                </Grid>
                <Grid item xs={4} display="flex">
                  <Typography variant="body1">
                    Requisition Date: {details?.requisition_Date}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
              <DataGrid
                rows={itemDTOlist?.map((row, index) => ({
                  ...row,
                  sl: index + 1,
                }))}
                columns={requisiton_item_columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                sx={{
                  mx: 2,
                  background: "#fff",
                  "--DataGrid-overlayHeight": "300px",
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#F5F7F8",
                  },
                  "& .MuiDataGrid-row": {
                    padding: "4px 0",
                  },
                }}
                getRowHeight={() => "auto"}
              />
            </Grid>
            <Grid
              item
              xs={12}
              alignItems="right"
              paddingX={2}
              marginBottom={2}
              marginX={2}
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

export default ViewRequisitionItemDetails;
