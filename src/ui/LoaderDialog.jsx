import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const LoaderDialog = ({ open, message = "Processing your request" }) => {
  return (
    <Dialog
      open={open}
      fullWidth
      size="sm"
      PaperProps={{
        style: {
          borderRadius: 10,
          padding: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
      }}
    >
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <CircularProgress color="primary" />
          <Typography variant="h6" style={{ marginTop: 16 }}>
            {message}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoaderDialog;
