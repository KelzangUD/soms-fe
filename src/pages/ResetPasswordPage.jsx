import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Notification } from "../ui/index";
import bg_img from "../assets/images/bg.png";
import Route from "../routes/Route";

const ResetPasswordPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const uid = params.get("uid");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !uid) {
      navigate("/");
    }
  }, [token, uid, navigate]);

  const handlePasswordChange = (e) => {
    setNewPassword(e?.target?.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e?.target?.value);
  };

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
    } else {
      const res = await Route(
        "PUT",
        `/Reset/Password?token=${token}&uid=${uid}&password=${newPassword}`,
        null,
        null,
        null
      );
      console.log(res);
      if (res?.status === 200) {
        setMessage(res?.data?.message);
        setSeverity("success");
        setShowNotification(true);
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage(res?.response?.data?.message);
        setSeverity("error");
        setShowNotification(true);
      }
    }
  };

  return (
    <>
      <Container>
        <Header />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
            backgroundImage: `url(${bg_img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
        >
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={8} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <Avatar sx={{ m: "auto", bgcolor: "primary.main" }}>
                    <LockIcon />
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Reset Your Password
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Please enter your new password and confirm it below.
                  </Typography>
                </Box>
                <Box component="form" sx={{ display: "grid", gap: 2 }}>
                  <TextField
                    label="New Password"
                    variant="outlined"
                    fullWidth
                    value={newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <TextField
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                  {errorMessage && (
                    <Typography variant="caption" color="error">
                      {errorMessage}
                    </Typography>
                  )}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        onClick={handleSubmit}
                      >
                        Reset Password
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="outlined"
                        color="error"
                        size="large"
                        fullWidth
                        onClick={() => navigate("/")}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </Container>
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={message}
          severity={severity}
        />
      )}
    </>
  );
};

export default ResetPasswordPage;
