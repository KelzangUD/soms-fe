import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Divider,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import MoreIcon from "@mui/icons-material/MoreVert";
import KeyIcon from "@mui/icons-material/Key";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import Notification from "../../ui/Notification";
import Route from "../../routes/Route";
import { useNavigate, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const [paddingY, setPaddingY] = useState("30px");
  const [message, setMessage] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  useEffect(() => {
    setCurrentLocation(location?.pathname?.split("/").pop());
  }, [location]);
  // useEffect(() => {
  //   setPaddingY(window.innerWidth > 1536 ? "36px" : (window.innerWidth > 1200) ? "36px" : "30px");
  // }, [window.innerWidth]);
  useEffect(() => {
    function handleResize() {
      setPaddingY(
        window.innerWidth > 1536
          ? "36px"
          : window.innerWidth > 1200
          ? "35px"
          : "30px"
      );
    }

    // Set padding on initial load
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const profileHandle = () => {
    navigation("/home/profile");
  };
  const changePasswordHandle = () => {
    navigation("/home/change-password");
  };
  const token = localStorage.getItem("access_token");
  const logoutHandle = async () => {
    const res = await Route("GET", "/api/v1/auth/logout", token, null, null);
    if (res?.status === 200) {
      localStorage.removeItem("username");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      localStorage.removeItem("privileges");
      localStorage.removeItem("userDetails");
      navigation("/");
    } else {
      setMessage(res?.response?.data?.message);
      setOpen(true);
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      id={menuId}
      keepMounted
      transformOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        width: 440,
        marginTop: 10,
      }}
    >
      <MenuItem onClick={profileHandle}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        My Profile
      </MenuItem>
      <MenuItem onClick={changePasswordHandle}>
        <ListItemIcon>
          <KeyIcon fontSize="small" />
        </ListItemIcon>
        Change Password
      </MenuItem>
      <MenuItem onClick={logoutHandle}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <PersonIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <AppBar
          position="static"
          sx={{
            background: "#F5F7F8",
            color: "#393E46",
            boxShadow: "none",
            height: "auto",
            paddingY: paddingY,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", alignItems: "cen" }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 300,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {currentLocation.toUpperCase()}
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle sx={{ width: 40, height: 40 }} />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Divider />
        {renderMobileMenu}
        {renderMenu}
      </Box>
      {open && <Notification open={open} setOpen={setOpen} message={message} />}
    </>
  );
};

export default Nav;
