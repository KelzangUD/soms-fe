import React from "react";
import { Grid, Typography, Divider } from "@mui/material";

const SubHeader = ({ text }) => {
  return (
    <Grid item xs={12}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {text}
      </Typography>
      <Divider />
    </Grid>
  );
};

export default SubHeader;
