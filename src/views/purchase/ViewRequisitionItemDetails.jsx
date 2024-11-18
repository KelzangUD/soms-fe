import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Dialog, Slide, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewRequisitionItemDetails = ({
  open,
  setOpen,
  details,
  approvalStatus,
}) => {
  const [itemDTOlist, setItemDTOList] = useState([]);

  useEffect(() => {
    // console.log(approvalStatus);
    // console.log(details);
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
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "item_Number", headerName: "Item Number", width: 200 },
    {
      field: "item_Description",
      headerName: "Description",
      width: 500,
    },
    { field: "uom", headerName: "UOM", width: 80 },
    { field: "qty", headerName: "Quantity", width: 70 },
    {
      field: "level1_Qty",
      headerName: "Approve Quantity",
      width: 130,
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
                padding={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "rgb(25, 118, 210)",
                  color: "#fff",
                }}
              >
                <Grid item>
                  <Typography variant="subtitle1">
                    Requisition Details
                  </Typography>
                </Grid>
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
                  sx={{ mx: 2 }}
                />
              </div>
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
