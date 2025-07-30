import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Drawer,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import KeyIcon from "@mui/icons-material/Key";
import HomeIcon from "@mui/icons-material/Home";
import Logout from "@mui/icons-material/Logout";
import Notification from "../../ui/Notification";
import Route from "../../routes/Route";
import { useNavigate, useLocation } from "react-router-dom";
import { drawerClasses } from "@mui/material/Drawer";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { MenuItems } from "./SideBar";
import { menuListFilter } from "../../util/CommonUtil";
import Logo from "../../assets/images/logo.ico";

const Nav = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const [message, setMessage] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  useEffect(() => {
    setCurrentLocation(location?.pathname?.split("/").pop());
  }, [location]);

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
    setAnchorEl(false);
  };
  const changePasswordHandle = () => {
    navigation("/home/change-password");
    setAnchorEl(false);
  };
  const routeHandle = (route) => {
    navigation(route);
  };
  const handleNestedItemClick = (index) => {
    setOpenStates((prevOpenStates) => {
      const isAlreadyOpen = prevOpenStates[index];
      const newOpenStates = prevOpenStates.map(() => false);
      newOpenStates[index] = !isAlreadyOpen;
      return newOpenStates;
    });
  };
  const [openStates, setOpenStates] = useState(MenuItems.map(() => false));
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    if (localStorage?.getItem("privileges")?.length > 0) {
      setMenuList(
        menuListFilter(
          MenuItems,
          JSON.parse(localStorage?.getItem("privileges"))
        )
      );
    }
  }, []);
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
      // window.location.assign("https://hub.tashicell.com/dashboard");
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
      {/* <MenuItem onClick={changePasswordHandle}>
        <ListItemIcon>
          <KeyIcon fontSize="small" />
        </ListItemIcon>
        Change Password
      </MenuItem> */}
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
    <Drawer
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{
        flexShrink: 0,
        boxSizing: "border-box",
        mt: 10,
        [`& .${drawerClasses.paper}`]: {
          boxSizing: "border-box",
          color: "#fff",
          backgroundColor: "#0277bd",
        },
      }}
    >
      <Box sx={{ width: 250 }} role="presentation">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container alignItems="center">
            <Grid item xs={12} alignItems="center">
              <Button
                type="button"
                variant="text"
                color="primary"
                size="large"
                fullWidth
              >
                <img
                  src={Logo}
                  alt="Logo"
                  style={{
                    width: "30%",
                    height: "auto",
                  }}
                />
              </Button>
            </Grid>
            <Grid item xs={12} marginBottom={1}>
              <Typography variant="body2" align="center">
                Sales & Order Management System
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            maxHeight: "100vh",
            overflowY: "auto",
            marginTop: "-8px",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {menuList?.map((item, index) => (
            <React.Fragment key={index}>
              {item?.nestedItems !== undefined ? (
                item?.nestedItems?.length > 0 && (
                  <ListItemButton
                    onClick={() => {
                      routeHandle(item?.route);
                      handleNestedItemClick(item?.itemNumber);
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText style={{ marginLeft: -26 }}>
                      <Typography variant="body2">{item?.module}</Typography>
                    </ListItemText>
                    {item.nestedItems &&
                      (openStates[index] ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                )
              ) : (
                <ListItemButton
                  onClick={() => {
                    routeHandle(item?.route);
                    handleNestedItemClick(item?.itemNumber);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText style={{ marginLeft: -26 }}>
                    <Typography variant="body2">{item?.module}</Typography>
                  </ListItemText>
                  {item.nestedItems &&
                    (openStates[index] ? (
                      <ExpandLess fontSize="small" />
                    ) : (
                      <ExpandMore fontSize="small" />
                    ))}
                </ListItemButton>
              )}
              {item.nestedItems && (
                <Collapse in={openStates[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.nestedItems.map((nestedItem, nestedIndex) => (
                      <ListItemButton
                        key={nestedIndex}
                        onClick={() => routeHandle(nestedItem?.route)}
                      >
                        <ListItemIcon>
                          <KeyboardArrowRightIcon
                            fontSize="small"
                            sx={{
                              color: "#fff",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText style={{ marginLeft: -26 }}>
                          <Typography variant="body2">
                            {nestedItem?.page}
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
          paddingY: "21px",
          marginBottom: 4,
          background: (theme) => theme.palette.bg.light,
          color: "#fff",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="small"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: "flex",
              fontWeight: 400,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {currentLocation.toUpperCase()}
          </Typography>

          <Box>
            <Tooltip title="Redirect to SSO">
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => {
                  window.location.assign("https://hub.tashicell.com/dashboard");
                }}
                color="inherit"
              >
                <HomeIcon sx={{ height: { xs: 20, md: 25 }, width: "auto" }} />
              </IconButton>
            </Tooltip>
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{
                marginLeft: 2,
              }}
            >
              <AccountCircle
                sx={{ height: { xs: 20, md: 25 }, width: "auto" }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {open && <Notification open={open} setOpen={setOpen} message={message} />}
    </>
  );
};

export default Nav;
