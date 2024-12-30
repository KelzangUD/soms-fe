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
      <GridToolbarQuickFilter debounceMs={500} placeholder="Search..." />
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
        // getRowHeight={() => "auto"}
        disableColumnFilter
        disableColumnSelector
        treeData
        getRowClassName={(params) => {
          if (params.row.isTitle) return "title-row";
          if (params.row.isSubTitle) return "subtitle-row";
          return "";
        }}
        disableColumnMenu
      />
    </>
  );
};

export default CustomDataTable;
