import React from "react";
import { Box, Grid } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BadgeIcon from "@mui/icons-material/Badge";
import SubHeader from "../../common/SubHeader";
import StatusCard from "../../component/StatusCard";
import Revenue from "../../charts/Revenue";

const Dashboard = () => {
  const status = [
    {
      icon: <StoreIcon sx={{ fontSize: 40 }} />,
      title: "Stores",
      qty: 52,
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: "Customers",
      qty: 21193,
    },
    {
      icon: <ReceiptIcon sx={{ fontSize: 40 }} />,
      title: "Invoices",
      qty: 213,
    },
    {
      icon: <BadgeIcon sx={{ fontSize: 40 }} />,
      title: "Employees",
      qty: 176,
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
        <SubHeader text="Dashboard" />
        <Grid item container xs={12} spacing={2}>
          {status?.map((item) => (
            <Grid item xs={3} key={item?.title}>
              <StatusCard
                icon={item?.icon}
                title={item?.title}
                qty={item?.qty}
              />
            </Grid>
          ))}
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={6}>
            <Revenue />
          </Grid>
          <Grid item xs={6}>
            <Revenue />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={6}>
            <Revenue />
          </Grid>
          <Grid item xs={6}>
            <Revenue />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={6}>
            <Revenue />
          </Grid>
          <Grid item xs={6}>
            <Revenue />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={6}>
            <Revenue />
          </Grid>
          <Grid item xs={6}>
            <Revenue />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
