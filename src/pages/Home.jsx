import React from "react";
import Nav from "../layout/dashboard/Nav";
import SideNav from "../layout/dashboard/SideNav";
import Footer from "../layout/Footer";
import { Box, Paper, Stack } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Profile from "./home/Profile";
import Dashboard from "./home/Dashboard";
import WorkStructures from "./home/WorkStructures";
import Employee from "./home/Employee";
import POSManagement from "./home/POSManagement";
import Collections from "./home/Collections";
import Purchase from "./home/Purchase";
import Inventory from "./home/Inventory";
import Reports from "./home/Reports";
import EBSReports from "./home/EBSReport";
import Setting from "./home/Setting";
import ChangePassword from "./home/ChangePassword";
import { styled } from "@mui/material/styles";
import bg from "../assets/images/bg.png";

const Item = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  minHeight: "100vh",
  width: "100%",
}));

const Home = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box
          // component="main"
          sx={{
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          {/* <Stack
            sx={{
              alignItems: "center",
            }}
          >
            
          </Stack> */}
          <Item style={{ backgroundImage: `url(${bg})` }}>
            <Nav />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/work-structures/*" element={<WorkStructures />} />
              <Route path="/employee/*" element={<Employee />} />
              <Route path="/pos-management/*" element={<POSManagement />} />
              <Route path="/collections/*" element={<Collections />} />
              <Route path="/purchase/*" element={<Purchase />} />
              <Route path="/inventory/*" element={<Inventory />} />
              <Route path="/reports/*" element={<Reports />} />
              <Route path="/ebs-reports/*" element={<EBSReports />} />
              <Route path="/setting/*" element={<Setting />} />
            </Routes>
          </Item>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default Home;
