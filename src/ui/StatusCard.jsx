import React from "react";
import { Avatar, Box, Paper, Grid, Typography } from "@mui/material";
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

// const color_array = ["#FB773C", "#0B8494", "#F05A7E", "#125B9A"];
const icon_array = [
  <StoreOutlinedIcon sx={{ fontSize: 50, padding: "8px" }} />,
  <GroupsOutlinedIcon sx={{ fontSize: 50, padding: "8px"  }} />,
  <ReceiptLongOutlinedIcon sx={{ fontSize: 50, padding: "8px" }} />,
  <BadgeOutlinedIcon sx={{ fontSize: 50, padding: "8px" }} />,
];

const StatusCard = ({ index, title, qty }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Paper>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "16px 32px",
            }}
          >
            <Grid
              item
              alignItems="center"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Avatar sx={{ width: 60, height: 60 }}>{icon_array[index]}</Avatar>
            </Grid>
            <Grid item textAlign="right">
              <Typography variant="h5" fontWeight="bold">
                {qty}
              </Typography>
              <Typography color="#A9A9A9">{title}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default StatusCard;
