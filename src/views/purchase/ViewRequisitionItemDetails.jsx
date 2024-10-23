import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Dialog, Slide, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewRequisitionItemDetails = ({ open, setOpen, details }) => {
  const [itemDTOlist, setItemDTOList] = useState([]);

  useEffect(() => {
    setItemDTOList(
      details?.itemDTOList?.map((item) => ({
        id: item?.req_Item_No,
        item_Number: item?.item_Number,
        item_Description: item?.item_Description,
        uom: item?.uom,
        qty: item?.qty,
        level1_Qty: item?.level1_Qty,
      }))
    );
  }, [details]);
  const requisiton_item_columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "item_Number", headerName: "Item Number", width: 200 },
    {
      field: "item_Description",
      headerName: "Description",
      width: 500,
    },
    { field: "uom", headerName: "UOM", width: 150 },
    { field: "qty", headerName: "Quantity", width: 150 },
    {
      field: "level1_Qty",
      headerName: "Approve Quantity",
      width: 150,
    },
    {
      field: "received_Remark",
      headerName: "Remarks",
      width: 150,
    },
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
                <Grid item>
                  <Typography variant="subtitle1">
                    Requisition Details
                  </Typography>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">
                      Requisition Number: {details?.requisitionNo}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body1">
                      Employee Name: {details?.employeeName}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body1">
                      Employee Code: {details?.employeeCode}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body1">
                      Store Name: {details?.requisitionStoreName}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} display="flex">
                    <Typography variant="body1">
                      Region Name: {details?.regionName}
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex">
                    <Typography variant="body1">
                      Requisition Date: {details?.requisition_Date}
                    </Typography>
                  </Grid>
                </Grid>
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
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              alignItems="right"
              paddingX={2}
              sx={{ display: "flex", justifyContent: "flex-end" }}
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

export default ViewRequisitionItemDetails;
