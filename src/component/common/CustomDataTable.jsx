import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter
        debounceMs={500}
        placeholder="Search..."
        sx={{
          width: "400px",
          bgcolor: "#fff",
          "& .MuiInputBase-root": {
            padding: "0 12px",
            height: "40px",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "4px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
            borderWidth: "2px"
          },
        }}
      />
    </GridToolbarContainer>
  );
}

const CustomDataTable = ({
  rows,
  cols,
  checkboxSelection = false,
  onRowSelectionModelChange,
}) => {
  return (
    <>
      <DataGrid
        rows={rows}
        autoHeight
        slots={{ noRowsOverlay: CustomNoRowsOverlay, toolbar: CustomToolbar }}
        columns={cols}
        checkboxSelection={checkboxSelection}
        onRowSelectionModelChange={onRowSelectionModelChange}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        // pageSizeOptions={[5, 10, 20, 50, { label: 'All', value: rows?.length }]}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        sx={{
          background: "#fff",
          "--DataGrid-overlayHeight": "300px",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F5F7F8",
          },
          "& .MuiDataGrid-row": {
            padding: "4px 0",
          },
        }}
        getRowHeight={() => 'auto'}
      />
    </>
  );
};

export default CustomDataTable;
