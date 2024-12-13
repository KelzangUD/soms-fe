import React from "react";
import { Box, Grid } from "@mui/material";
import StatusCard from "../../ui/StatusCard";
import Revenue from "../../charts/Revenue";
import RevenueVSamsungRev from "../../charts/RevenueVSamsungRev";
import SamsungStock from "../../charts/SamsungStock";
import RCVStockVSimStock from "../../charts/RCVStockVSimStock";
import Sales from "../../charts/Sales";
import PostPaidVLeaseLine from "../../charts/PostPaidVLeaseLine";

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
      <Grid container spacing={2} alignItems="center" sx={{ px: 2 }}>
        <Grid item container xs={12} spacing={1}>
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
        <Grid item container xs={12} spacing={1}>
          <Grid item xs={6}>
            <Revenue />
          </Grid>
          <Grid item xs={6}>
            <RevenueVSamsungRev />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={1}>
          <Grid item xs={6}>
            <SamsungStock />
          </Grid>
          <Grid item xs={6}>
            <RCVStockVSimStock />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={1} sx={{ mb: 4 }}>
          <Grid item xs={6}>
            <Sales />
          </Grid>
          <Grid item xs={6}>
            <PostPaidVLeaseLine />
          </Grid>
        </Grid>
        {/* <Grid item container xs={12} spacing={1} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Revenue />
          </Grid>
          <Grid item xs={6}>
            <Revenue />
          </Grid>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default Dashboard;
