import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Link,
} from "@mui/material";
import bg_img from "../assets/images/bg.png";
import LoginIcon from "@mui/icons-material/Login";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Notification, ResetPassword } from "../ui/index";
import Route from "../routes/Route";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] =
    useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const fetchUserDetails = async (username) => {
    const res = await Route(
      "GET",
      `/Common/fetchUserDtls?userId=${username}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      localStorage.setItem("userDetails", JSON.stringify(res?.data));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData?.username === "" || formData?.password === "") {
      setMessage("Please Fill Up with neccessary information");
      setOpen(true);
    } else {
      const res = await Route(
        "POST",
        "/api/v1/auth/authenticate",
        null,
        formData,
        null
      );
      if (res?.status === 200) {
        const decoded = jwtDecode(res?.data?.access_token);
        if (decoded) {
          const response = await Route(
            "GET",
            `/UserDtls/Module?role=${decoded?.roles[1]}&userId=${formData?.username}`,
            null,
            null,
            null
          );
          if (response?.status === 200) {
            fetchUserDetails(formData?.username);
            localStorage.setItem("username", formData?.username);
            localStorage.setItem("access_token", res?.data?.access_token);
            localStorage.setItem("refresh_token", res?.data?.refresh_token);
            localStorage.setItem("privileges", JSON.stringify(response?.data));
            navigate("/home/dashboard");
          } else {
            setMessage(res?.data?.message);
            setSeverity("error");
            setOpen(true);
          };
        }
      } else {
      }
    }
  };

  const forgotPasswordHandle = () => {
    setOpenForgotPasswordDialog(true);
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
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12}>
              <Container maxWidth="xs" sx={{ py: 2 }}>
                <Paper sx={{ py: 4 }}>
                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Avatar sx={{ m: "auto", bgcolor: "primary.main", mb: 1 }}>
                      <LockIcon />
                    </Avatar>
                    <Typography variant="h5" fontWeight="bold">
                      Welcome Back!
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Sign in to continue.
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gap: 2,
                      paddingX: "24px",
                      paddingBottom: "24px",
                    }}
                  >
                    <TextField
                      label="User Name"
                      variant="outlined"
                      fullWidth
                      type="text"
                      name="username"
                      value={formData?.username}
                      onChange={handleChange}
                      required
                      InputProps={{
                        endAdornment: <PersonIcon />,
                      }}
                    />
                    <TextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      type="password"
                      name="password"
                      value={formData?.password}
                      onChange={handleChange}
                      required
                      InputProps={{
                        endAdornment: <KeyIcon />,
                      }}
                    />
                    <Link
                      component="button"
                      onClick={forgotPasswordHandle}
                      variant="body2"
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      Forgot your password?
                    </Link>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={handleSubmit}
                      endIcon={<LoginIcon />}
                    >
                      Sign In
                    </Button>
                  </Box>
                </Paper>
              </Container>
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </Container>
      {open && (
        <Notification
          open={open}
          setOpen={setOpen}
          message={message}
          severity={severity}
        />
      )}
      {openForgotPasswordDialog && (
        <ResetPassword
          openForgotPasswordDialog={openForgotPasswordDialog}
          setOpenForgotPasswordDialog={setOpenForgotPasswordDialog}
        />
      )}
    </>
  );
};

export default SignIn;
