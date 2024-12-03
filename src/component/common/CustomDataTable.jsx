import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";

const CustomDataTable = ({rows, cols}) => {
  return (
    <>
      <DataGrid
        rows={rows}
        autoHeight
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        columns={cols}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{
          background: "#fff",
          "--DataGrid-overlayHeight": "300px",
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#F5F7F8',
          },
        }}
      />
    </>
  );
};

export default CustomDataTable;
