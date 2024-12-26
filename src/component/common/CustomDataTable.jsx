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
            borderWidth: "2px",
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
  pageSize = 10,
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
            paginationModel: { page: 0, pageSize: pageSize },
          },
        }}
        pageSizeOptions={[10, 20, 50, 100]}
        getRowHeight={() => "auto"}
        disableColumnFilter
        disableColumnSelector
      />
    </>
  );
};

export default CustomDataTable;
