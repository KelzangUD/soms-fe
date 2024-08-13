import React from "react";
import Logo from "../assets/images/logo.ico";
import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ backgroundColor: "#F5F7F8", p: 1 }}>
        <Box display="flex" alignItems="center">
          <Box sx={{ px: 2 }}>
            <img
              src={Logo}
              alt="logo"
              style={{ width: "60px", height: "auto", marginRight: "8px" }}
            />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              color: "#000",
              textDecoration: "none",
            }}
          >
            Sales & Order Management System
          </Typography>
        </Box> 
      </Box>
    </>
  );
};

export default Header;
