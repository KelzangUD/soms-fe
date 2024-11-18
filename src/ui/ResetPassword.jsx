import React, { useState } from "react";
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
import { Notification } from "../ui/index";
import Route from "../routes/Route";

const ResetPassword = ({
  openForgotPasswordDialog,
  setOpenForgotPasswordDialog,
}) => {
  const [email, setEmail] = useState([]);
  const [openNotification, setOpenNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const resetPasswordHandle = async () => {
    const res = await Route(
      "POST",
      `/Reset/Link?email=${email}`,
      null,
      null,
      null,
      null
    );
    console.log(res);
    if (res?.status === 200) {
    } else {
      setMessage(res?.response?.data);
      setSeverity("error");
      setOpenNotification(true);
    }
  };
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
              onChange={(e) => setEmail(e?.target?.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ marginBottom: "16px" }}>
          <Button onClick={resetPasswordHandle} variant="contained">
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
      {openNotification && (
        <Notification
          open={openNotification}
          setOpen={setOpenNotification}
          message={message}
          severity={severity}
        />
      )}
    </>
  );
};

export default ResetPassword;
