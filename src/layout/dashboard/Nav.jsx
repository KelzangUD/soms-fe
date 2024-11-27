import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
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
import MenuIcon from '@mui/icons-material/Menu';

const Nav = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const [paddingY, setPaddingY] = useState("16px");
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
  useEffect(() => {
    function handleResize() {
      setPaddingY(
        window.innerWidth > 1286
          ? "24px"
          : window.innerWidth < 1286 && window.innerWidth > 1230
          ? "18px"
          : "16px"
      );
    }
    handleResize();
    window.addEventListener("resize", handleResize);
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
            boxShadow: "none",
            paddingY: paddingY,
          }}
        >
          <Toolbar
            sx={{ justifyContent: "space-between" }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 400,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {currentLocation.toUpperCase()}
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle sx={{ height: 35, width: "auto" }} />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="small"
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
