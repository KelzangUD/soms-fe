import React from "react";
import { Box, Paper, Grid, Typography } from "@mui/material";

const StatusCard = ({ icon, title, qty }) => {
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
              {icon}
            </Grid>
            <Grid item textAlign="right">
              <Typography variant="h5" fontWeight="bold">{qty}</Typography>
              <Typography color="#A9A9A9" >{title}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default StatusCard;
