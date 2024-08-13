import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import dashboard_img from "../assets/svgs/dashboard_1.svg";
import LoginIcon from "@mui/icons-material/Login";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Notification from "../ui/Notification";
import Route from "../routes/Route";

const SignIn = () => {
  const navigagte = useNavigate();
  const [formData, setFormData] = useState({
    empId: "",
    password: "",
  });
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigagte("/home/dashboard")
    // const res = await Route("POST", "/login", null, formData, null);
    // if (res?.status === 200) {
    //   localStorage.setItem("user", JSON.stringify(res?.data?.user));
    //   localStorage.setItem("token", res?.data?.token);
    //   res?.data?.user?.isAdmin
    //     ? navigagte("/admin/dashboard")
    //     : navigagte("/user/dashboard");
    // } else {
    //   setMessage(res?.data?.message);
    //   setOpen(true);
    // }
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
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={6}>
              <Container maxWidth="xs" sx={{ py: 2 }}>
                <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                  Welcome Back
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: "grid", gap: 2 }}>
                    <TextField
                      label="User Name"
                      variant="outlined"
                      fullWidth
                      type="text"
                      name="empId"
                      value={formData.empId}
                      onChange={handleChange}
                      required
                    />
                    <TextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      endIcon={<LoginIcon />}
                    >
                      Sign In
                    </Button>
                  </Box>
                </form>
              </Container>
            </Grid>
            <Grid item xs={6}>
              <img
                src={dashboard_img}
                alt="dashboard"
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </Container>
      {open && <Notification open={open} setOpen={setOpen} message={message} />}
    </>
  );
};

export default SignIn;
