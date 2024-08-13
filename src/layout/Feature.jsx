import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import mcq from '../assets/svgs/mcq.svg';
import matching from '../assets/svgs/matching.svg';
import fill from '../assets/svgs/fill.svg';
import yes_no from '../assets/svgs/yes_no.svg';
import audio from '../assets/svgs/audio.svg';
import true_false from '../assets/svgs/true_false.svg';
import video from '../assets/svgs/video.svg';

const Feature = () => {
  return (
    <Box sx={{ backgroundColor: "#f4f4f4", py: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4 }}>
          Features
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 4, color: "text.secondary" }}
        >
          Test Your Knowledge with a diverse range of assessment tools.
        </Typography>
        <Container sx={{ py: 4 }}>
          <Grid container spacing={4} alignItems="center" sx={{ py: 4 }}>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Multiple Choice Questions
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Experience interactive learning with advanced features like
                dynamic MCQs for an engaging educational journey.
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={mcq}
                alt="online_test"
                style={{ width: "60%", height: "auto" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} alignItems="center" sx={{ py: 4 }}>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={fill}
                alt="online_test"
                style={{ width: "60%", height: "auto" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Fill in the Blanks
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Elevate learning with 'Fill in the Blanks' for interactive and
                customized assessments.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                True/False
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Streamline learning with our user-friendly True/False feature
                for effortless assessment and reinforcement.
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={true_false}
                alt="online_test"
                style={{ width: "60%", height: "auto" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} alignItems="center" sx={{ py: 4 }}>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={matching}
                alt="online_test"
                style={{ width: "60%", height: "auto" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Matching
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Enhance learning on with an immersive Matching feature for
                interactive knowledge challenges.
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Yes/No
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Simplify your learning experience with straightforward Yes or No
                feature, enabling quick assessments for efficient comprehension.
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={yes_no}
                alt="online_test"
                style={{ width: "60%", height: "auto" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} alignItems="center" sx={{ py: 4 }}>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={video}
                alt="online_test"
                style={{ width: "60%", height: "auto" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Video-Centric
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Transform education with video-centric approach, offering a
                visually immersive experience.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Audio-Centric
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Enhance learning with innovative audio feature for a dynamic
                auditory experience
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={audio}
                alt="online_test"
                style={{ width: "60%", height: "auto" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Container>
    </Box>
  );
};

export default Feature;
