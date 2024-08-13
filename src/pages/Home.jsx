import React from "react";
import Nav from "../layout/dashboard/Nav";
import SideNav from "../layout/dashboard/SideNav";
import { Box, Grid, Paper } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Profile from "./home/Profile";
import Dashboard from "./home/Dashboard";
import SystemSetting from "./home/SystemSetting";
import Report from "./home/Report";
import ChangePassword from "./home/ChangePassword";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  minHeight: "100vh",
}));

const Home = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={2}>
            <SideNav />
          </Grid>
          <Grid item xs={10}>
            <Nav />
            <Grid container>
                <Grid item xs={12}>
                  <Item>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/change-password" element={<ChangePassword />} />
                      <Route path="/system-setting/*" element={<SystemSetting />} />
                      <Route path="/report/*" element={<Report />} />
                    </Routes>
                  </Item>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
