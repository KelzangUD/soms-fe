import React from "react";
import { Box, Container, Typography, Grid, IconButton } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#f4f4f4", py: 5, width: "100%" }}>
      <Container maxWidth="xl">
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ color: "text.secondary", textAlign: "right" }}>
              © {new Date().getFullYear()} Software & Application Section. All Right Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
