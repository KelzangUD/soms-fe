import React from "react";
import { Avatar, Box, Paper, Grid, Typography } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BadgeIcon from "@mui/icons-material/Badge";

const color_array = ["#FB773C", "#0B8494", "#F05A7E", "#125B9A"];
const icon_array = [
  <StoreIcon sx={{ fontSize: 50, padding: "8px" }} />,
  <PeopleIcon sx={{ fontSize: 50, padding: "8px"  }} />,
  <ReceiptIcon sx={{ fontSize: 50, padding: "8px" }} />,
  <BadgeIcon sx={{ fontSize: 50, padding: "8px" }} />,
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
              <Avatar sx={{ bgcolor: color_array[index], width: 56, height: 56 }}>{icon_array[index]}</Avatar>
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
