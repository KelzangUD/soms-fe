import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Divider,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Logo from "../../assets/images/logo.ico";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { MenuItems } from "./SideBar";
import { menuListFilter } from "../../util/CommonUtil";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "#0F67B1",
    color: "#fff",
  },
});

export default function SideNav() {
  const navigation = useNavigate();
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

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
      }}
    >
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
                style={{ width: "30%", height: "auto" }}
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
                          sx={{ color: "#fff" }}
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
    </Drawer>
  );
}
