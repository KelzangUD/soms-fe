import { createTheme } from "@mui/material/styles";
export const customizedTheme = createTheme({
  typography: {
    fontSize: 12,
  },
  palette: {
    bg: {
      light: "#0277bd",
    },
    addBtnColor: {
      light: "#009688",
      dark: "#4db6ac",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
        fullWidth: true,
      },
      styleOverrides: {
        root: {},
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          width: "100%",
          background: "#fff",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small", // Set default button size to small
      },
      styleOverrides: {
        root: {},
        outlined: {
          backgroundColor: "#fff",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            backgroundColor: "#f5f5f5",
          },
          "&.Mui-disabled .MuiInputBase-input": {
            color: "#37474f",
            WebkitTextFillColor: "#37474f",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#263238",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#263238",
          },
        },
      },
    },
    MuiDatePicker: {
      defaultProps: {
        slotProps: {
          textField: {
            size: "small",
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          background: "#fff",
          "--DataGrid-overlayHeight": "300px",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F5F7F8",
          },
          "& .MuiDataGrid-row": {
            // padding: "4px 0 4px",
          },
          "& .MuiTablePagination-actions": {
            "& .MuiButtonBase-root": {
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              padding: "4px",
              margin: "0 4px",
            },
          },
          /* Styling the title rows */
          "& .title-row": {
            fontWeight: "bold",
            background: "#cfd8dc",
          },
          "& .subtitle-row": {
            fontWeight: "bold",
            background: "#eceff1",
          },
        },
      },
    },
    MuiGridToolbarQuickFilter: {
      styleOverrides: {
        root: {
          width: "400px",
          backgroundColor: "#fff", // Set background color
          "& .MuiInputBase-root": {
            padding: "0 12px",
            height: "40px", // Set input height
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "4px", // Rounded borders
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2", // Default border color
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2", // Border color on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2", // Border color when focused
            borderWidth: "2px", // Focused border width
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5",
        },
      },
    },
  },
});
