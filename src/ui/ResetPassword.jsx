import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Transition } from "../component/common/index";

const ResetPassword = ({
  openForgotPasswordDialog,
  setOpenForgotPasswordDialog,
}) => {
  return (
    <>
      <Dialog
        open={openForgotPasswordDialog}
        onClose={() => setOpenForgotPasswordDialog(false)}
        aria-labelledby="title"
        aria-describedby="description"
        TransitionComponent={Transition}
      >
        <DialogTitle id="title">Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText id="description">
            <Typography mb={1} variant="subtitle1">
              Enter your account's email address, and we will send you a link to
              reset your password.
            </Typography>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              name="email"
              required
              size="small"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ marginBottom: "16px" }}>
          <Button
            onClick={() => setOpenForgotPasswordDialog(false)}
            variant="contained"
          >
            Submit
          </Button>
          <Button
            onClick={() => setOpenForgotPasswordDialog(false)}
            variant="outlined"
            color="error"
            style={{ marginRight: "16px" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ResetPassword;
