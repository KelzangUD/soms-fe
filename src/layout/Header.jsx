import React from "react";
import Logo from "../assets/images/logo.ico";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ backgroundColor: "#F5F7F8", p: 1 }}
      >
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
            {isMdUp ? "Sales & Order Management System" : "SOMS"}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Header;
