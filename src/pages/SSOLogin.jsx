import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Container, LinearProgress } from "@mui/material";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Notification from "../ui/Notification";
import Route from "../routes/Route";

const SSOLogin = () => {
  const navigagte = useNavigate();
  const [formData, setFormData] = useState({
    empId: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const queryParameters = new URLSearchParams(window.location.search);
  const token = queryParameters.get("token");

  const ssoAuth = async (e) => {
    e.preventDefault();
    const response = await Route("GET", `/sso/${token}`, null, null, null);
    if (response?.data?.message === "SSO Verified Successfully") {
      const formData = {
        empId: response?.data?.empId,
        password: response?.data?.password,
      };
      const res = await Route("POST", "/login", null, formData, null);
      if (res?.status === 200) {
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
        localStorage.setItem("token", res?.data?.token);
        res?.data?.user?.isAdmin
          ? navigagte("/admin/dashboard")
          : navigagte("/user/dashboard");
      } else {
        setMessage(res?.data?.message);
        setOpen(true);
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
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Box sx={{ width: "100%" }}>
              <LinearProgress
                variant="buffer"
                value={progress}
                valueBuffer={buffer}
              />
            </Box>
          </Grid>
        </Box>
        <Footer />
      </Container>
      {open && <Notification open={open} setOpen={setOpen} message={message} />}
    </>
  );
};

export default SSOLogin;
