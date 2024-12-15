import React from "react";
import { Box, Paper, Grid, Avatar, Typography, Divider } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import WcIcon from "@mui/icons-material/Wc";
import WorkIcon from "@mui/icons-material/Work";
import BorderInnerIcon from "@mui/icons-material/BorderInner";
import LaptopIcon from "@mui/icons-material/Laptop";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BadgeIcon from "@mui/icons-material/Badge";
import GradingIcon from "@mui/icons-material/Grading";
import MailIcon from "@mui/icons-material/Mail";

const Profile = () => {
  const empID = localStorage.getItem("username");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Grid container spacing={2} sx={{ my: 4 }}>
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ width: 100, height: 100 }}>
                    {userDetails?.userName !== "" &&
                      userDetails?.userName[0].toUpperCase()}
                  </Avatar>
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "800", fontSize: "24px" }}
                    gutterBottom
                  >
                    {userDetails?.userName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "#424242" }}
                  >
                    {empID}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "#424242" }}
                  >
                    {userDetails?.subInventory !== "" &&
                    userDetails?.locator !== "Select"
                      ? `${userDetails?.subInventory}, ${userDetails?.locator},`
                      : ""}
                    {userDetails?.regionName}, {userDetails?.region}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid sx={{ my: 2 }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                >
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={3} display="flex">
                    <CakeIcon />
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#424242", ml: 2 }}
                    >
                      Birthday: {userDetails?.dob}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} display="flex">
                    <WcIcon />
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#424242", ml: 2 }}
                    >
                      Gender: {userDetails?.gender}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
              <Grid sx={{ my: 2 }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                >
                  Professional Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4} display="flex">
                    <WorkIcon />
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#424242", ml: 2 }}
                    >
                      Role: {userDetails?.roleName}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} display="flex">
                    <BorderInnerIcon />
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#424242", ml: 2 }}
                    >
                      Section: {userDetails?.section}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} display="flex">
                    <BadgeIcon />
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#424242", ml: 2 }}
                    >
                      Designation: {userDetails?.designation}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4} display="flex">
                    <CalendarMonthIcon />
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#424242", ml: 2 }}
                    >
                      DOJ: {userDetails?.doj}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} display="flex">
                    <LaptopIcon />
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#424242", ml: 2 }}
                    >
                      Employment: {userDetails?.empType}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} display="flex">
                    <GradingIcon />
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#424242", ml: 2 }}
                    >
                      Grade: {userDetails?.grade}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6} display="flex">
                    <MailIcon />
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#424242", ml: 2 }}
                    >
                      Email: {userDetails?.email}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Profile;
