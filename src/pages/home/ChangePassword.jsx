import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SubHeader from "../../common/SubHeader";
import Notification from "../../ui/Notification";
import Route from "../../routes/Route";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const oldPasswordHandle = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      oldPassword: e.target.value,
    }));
  };
  const newPasswordHandle = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      newPassword: e.target.value,
    }));
  };
  const confirmPasswordHandle = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      confirmPassword: e.target.value,
    }));
  };
  const cancleHandle = () => {
    navigate("/home/dashboard");
  };
  const fetchUser = async () => {
    // const response = await Route("GET", "/users", token, null, user?.id);
    // if (response?.status === 200) {
    //   localStorage.removeItem("user");
    //   localStorage.setItem("user", JSON.stringify(response?.data?.user));
    //   setUserDetails((prev) => ({
    //     ...prev,
    //     empId: response?.data?.user?.empId,
    //     name: response?.data?.user?.name,
    //     email: response?.data?.user?.email,
    //     designation: response?.data?.user?.designation,
    //     gender: response?.data?.user?.gender,
    //     contact: response?.data?.user?.contact,
    //     region: response?.data?.user?.region,
    //     extension: response?.data?.user?.extension,
    //   }));
    // } else {
    //   setMessage(response?.data?.message);
    //   setOpenNotification(true);
    // }
  };
  const updateHandle = async () => {
    // const response = await Route("PUT", "/users", token, userDetails, user?.id);
    // if (response?.status === 201) {
    //   setMessage(response?.data?.message);
    //   setOpenNotification(true);
    //   fetchUser();
    // } else {
    //   setMessage(response?.data?.message);
    //   setOpenNotification(true);
    // }
  };
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Grid container spacing={2} sx={{ my: 2 }}>
                <Grid item xs={12}>
                  <TextField
                    label="Old Password"
                    variant="outlined"
                    fullWidth
                    name="old_password"
                    required
                    onChange={oldPasswordHandle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="New Password"
                    variant="outlined"
                    fullWidth
                    name="new_password"
                    required
                    onChange={newPasswordHandle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    name="confirm_password"
                    required
                    onChange={confirmPasswordHandle}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                sx={{ my: 2, display: "flex", justifyContent: "flex-end" }}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ mr: 2 }}
                    onClick={updateHandle}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="large"
                    onClick={cancleHandle}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      {openNotification && (
        <Notification
          open={openNotification}
          setOpen={setOpenNotification}
          message={message}
        />
      )}
    </>
  );
};

export default ChangePassword;
