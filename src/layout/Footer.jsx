import React from "react";
import { Box, Container, Typography, Grid, IconButton } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#f4f4f4", py: 5 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={6}></Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              © 2024 Software & Application Section
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
