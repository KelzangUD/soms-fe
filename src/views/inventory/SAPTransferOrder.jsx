import React, { useState, useCallback } from "react";
import { Box, Button, Grid, styled } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CustomNoRowsOverlay from "../../component/common/CustomNoRowsOverlay";
import { sap_transfer_columns } from "../../data/static";
import { useCommon } from "../../contexts/CommonContext";
import * as excelToJson from "simple-excel-to-json";
import { LoaderDialog, Notification } from "../../ui/index";
import Route from "../../routes/Route";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter debounceMs={500} placeholder="Search..." />
    </GridToolbarContainer>
  );
}

const SAPTransferOrder = () => {
  const { isMdUp } = useCommon();
  const username = localStorage.getItem("username");
  const access_token = localStorage.getItem("access_token");
  const [uploadButtonLabel, setUploadButtonLabel] = useState("Upload File");
  const [data, setData] = useState({
    transfer_From: 29,
    transfer_To: 28,
    transfer_To_SubInventory: "WAREH",
    transfer_To_Locator: "FRESHS",
    created_By: username,
    transferOrderItemDTOList: [],
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [isLoading, setIsLoading] = useState(false);
  const fileUploadHandle = (e) => {
    setUploadButtonLabel("File Uploaded");
    const file = e?.target?.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = event?.target?.result;
      const parsed = excelToJson.parseXls2Json(buffer, { isBuffer: true });
      setData((prev) => ({
        ...prev,
        transferOrderItemDTOList: (parsed[0] ?? []).map((item, index) => ({
          // use a real unique key if available
          id: index,
          sl: index + 1,
          item_Number: item?.Item_Code || "",
          item_Serial_Number: item?.Serial_Number || "",
          uom: item?.Uom || "",
          qty: item?.Qnty || 0,
        })),
      }));
      //   console.log(parsed[0]);
    };

    reader?.readAsArrayBuffer(file);
  };
  // 2️⃣ Update state when a cell is edited and committed
  const handleProcessRowUpdate = useCallback(
    (newRow, oldRow) => {
      //   console.log(newRow, oldRow);
      setData((prev) => ({
        ...prev,
        transferOrderItemDTOList: prev.transferOrderItemDTOList.map((row) =>
          row.id === oldRow.id ? newRow : row
        ),
      }));
      return newRow; // must return the updated row
    },
    [] // no need for rows/data because we're using the functional updater
  );
  const createHandle = async () => {
    setIsLoading(true);
    try {
      console.log(data);
      const res = await Route(
        "POST",
        `/transferOrder/createSAPTransferOrder`,
        access_token,
        data,
        null
      );
      console.log(res);
      if (res?.status === 200) {
        setNotificationMsg("Created SAP Transfer Order Successfully");
        setSeverity("success");
        setShowNotification(true);
        setData((prev) => ({
          ...prev,
          transfer_From: 29,
          transfer_To: 28,
          transfer_To_SubInventory: "WAREH",
          transfer_To_Locator: "FRESHS",
          created_By: username,
          transferOrderItemDTOList: [],
        }));
      } else {
        setNotificationMsg("Failed To Create SAP Transfer Order");
        setSeverity("error");
        setShowNotification(true);
      }
    } catch (err) {
      setNotificationMsg("Failed To Create SAP Transfer Order");
      setSeverity("error");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };
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
                <Grid item container spacing={1} justifyContent="flex-end">
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    color="success"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    {uploadButtonLabel}
                    <VisuallyHiddenInput
                      type="file"
                      onChange={fileUploadHandle}
                      multiple
                    />
                  </Button>
                  <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    sx={{
                      marginLeft: 1,
                      alignItems: "right",
                    }}
                    onClick={createHandle}
                  >
                    Create
                  </LoadingButton>
                </Grid>
                <Grid item container alignItems="center" xs={12} mb={5}>
                  <DataGrid
                    rows={data?.transferOrderItemDTOList}
                    autoHeight
                    slots={{
                      noRowsOverlay: CustomNoRowsOverlay,
                      toolbar: CustomToolbar,
                    }}
                    columns={sap_transfer_columns(isMdUp)}
                    checkboxSelection={false}
                    // onRowSelectionModelChange={onRowSelectionModelChange}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                      },
                    }}
                    pageSizeOptions={[10, 20, 50, 100]}
                    // getRowHeight={() => "auto"}
                    disableColumnFilter
                    disableColumnSelector
                    treeData
                    experimentalFeatures={{ newEditingApi: true }}
                    processRowUpdate={handleProcessRowUpdate}
                    // getRowClassName={(params) => {
                    //   if (params.row.isTitle) return "title-row";
                    //   if (params.row.isSubTitle) return "subtitle-row";
                    //   return "";
                    // }}
                    disableColumnMenu
                    // showCellVerticalBorder
                    // showColumnVerticalBorder
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={notificationMsg}
          severity={severity}
        />
      )}
      {isLoading && <LoaderDialog open={isLoading} />}
    </>
  );
};

export default SAPTransferOrder;
