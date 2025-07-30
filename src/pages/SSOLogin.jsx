import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Container, LinearProgress } from "@mui/material";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Notification from "../ui/Notification";
import Route from "../routes/Route";
import { jwtDecode } from "jwt-decode";

const SSOLogin = () => {
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window?.location?.search);
  const token = queryParameters.get("token");
  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  // });
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");

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
  const ssoAuth = async (token) => {
    const response = await Route(
      "POST",
      `/api/v1/auth/sso?token=${token}`,
      null,
      null,
      null
    );
    if (response?.status === 200) {
      // setFormData((prev) => ({
      //   ...prev,
      //   username: response?.data?.empID,
      //   password: response?.data?.password,
      // }));
      const res = await Route(
        "POST",
        "/api/v1/auth/authenticate",
        null,
        {
          username: response?.data?.empID,
          password: response?.data?.password,
        },
        null
      );
      if (res.status === 200) {
        const decoded = jwtDecode(res?.data?.access_token);
        if (decoded) {
          const roleResponse = await Route(
            "GET",
            `/UserDtls/Module?role=${decoded?.roles[1]}&userId=${response?.data?.empID}`,
            res?.data?.access_token,
            null,
            null
          );
          if (roleResponse?.status === 200) {
            fetchUserDetails(response?.data?.empID);
            localStorage.setItem("username", response?.data?.empID);
            localStorage.setItem("access_token", res?.data?.access_token);
            localStorage.setItem("refresh_token", res?.data?.refresh_token);
            localStorage.setItem("privileges", JSON.stringify(roleResponse?.data));
            navigate("/home/dashboard");
          } else {
            setMessage(roleResponse?.response?.data?.message);
            setSeverity("error");
            setOpen(true);
          }
        }
      } else {
        setMessage(res?.response?.data?.message);
        setSeverity("error");
        setOpen(true);
      }
    }
  };
  useEffect(() => {
    if (token !== "") {
      ssoAuth(encodeURIComponent(token));
    }
  }, [token]);

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
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
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
    </>
  );
};

export default SSOLogin;
