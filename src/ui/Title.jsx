import React from "react";
import { Grid, Typography } from "@mui/material";

const Title = ({ title }) => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "bg.light",
        padding: 2,
      }}
    >
      <Typography variant="subtitle1" color="#eee">
        {title}
      </Typography>
    </Grid>
  );
};

export default Title;
