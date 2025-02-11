import React from "react";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { Transition } from "../component/common";

const SuccessNotification = ({
  showNotification,
  setShowNotification,
  notificationMsg,
  alertMessage,
  openInNewTab,
}) => {
  return (
    <>
      <Dialog
        open={showNotification}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        size="sm"
        aria-describedby="alert-dialog-slide-description"
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            setShowNotification(false);
          }
        }}
      >
        <DialogTitle>{notificationMsg}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Alert severity="success">{alertMessage}</Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {openInNewTab && (
            <Button
              onClick={openInNewTab}
              variant="contained"
              size="small"
              sx={{
                mb: 2,
              }}
            >
              View Receipt
            </Button>
          )}
          <Button
            onClick={() => setShowNotification(false)}
            variant="outlined"
            color="error"
            sx={{
              mr: 2,
              mb: 2,
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SuccessNotification;
