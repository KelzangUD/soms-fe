import React from "react";
import { Avatar, Box, Paper, Grid, Typography } from "@mui/material";
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

const color_array = ["#FFA534", "#87CB16", "#FB404B", "#1D62F0"];
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
        <Paper style={{ bgcolor: "#FFA534" }}>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 16px",
            }}
          >
            <Grid
              item
              alignItems="center"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Avatar sx={{ width: 50, height: 50, bgcolor: `${color_array[index]}` }}>{icon_array[index]}</Avatar>
            </Grid>
            <Grid item textAlign="right">
              <Typography variant="h6" color={`${color_array[index]}`}>
                {qty}
              </Typography>
              <Typography fontWeight="bold">{title}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default StatusCard;
