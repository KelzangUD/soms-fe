import * as React from "react";
import OnlineTest from "../assets/svgs/onlineTest.svg";
import { Box, Container, Typography, Grid } from "@mui/material";

const Hero = () => {
  return (
    <Container maxWidth="xl" sx={{ paddingY: 8 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Knowledge Enhancement Platform
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
              Empower Your Mind: Elevate Your Potential with our Knowledge Enhancement Platform.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <img src={OnlineTest} alt="online_test" style={{ width: "100%", height: "auto" }} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Hero;
