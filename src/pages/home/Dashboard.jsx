import React from "react";
import { Box, Grid } from "@mui/material";
import StatusCard from "../../ui/StatusCard";
import Revenue from "../../charts/Revenue";

const Dashboard = () => {
  const status = [
    {
      title: "Stores",
      qty: 52,
    },
    {
      title: "Customers",
      qty: 21193,
    },
    {
      title: "Invoices",
      qty: 213,
    },
    {
      title: "Employees",
      qty: 176,
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
        <Grid item container xs={12} spacing={2}>
          {status?.map((item, index) => (
            <Grid item xs={3} key={item?.title}>
              <StatusCard
                index={index}
                // icon={item?.icon}
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
