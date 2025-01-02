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
                  <Avatar sx={{ width: 90, height: 90 }}>
                    {userDetails?.userName !== "" &&
                      userDetails?.userName[0].toUpperCase()}
                  </Avatar>
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "800",
                      fontSize: "24px",
                      color: "#263238",
                    }}
                  >
                    {userDetails?.userName}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#607d8b" }}
                    gutterBottom
                  >
                    {empID}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: "#607d8b" }}>
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
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                >
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={3} display="flex">
                    <CakeIcon
                      sx={{
                        color: "#607d8b",
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{
                        color: "#263238",
                        ml: 2,
                        alignContent: "center",
                        fontSize: 14,
                      }}
                    >
                      <span style={{ color: "#607d8b" }}>Birthday:</span>{" "}
                      {userDetails?.dob}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} display="flex">
                    <WcIcon
                      sx={{
                        color: "#607d8b",
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{
                        color: "#263238",
                        ml: 2,
                        alignContent: "center",
                        fontSize: 14,
                      }}
                    >
                      <span style={{ color: "#607d8b" }}>Gender:</span>{" "}
                      {userDetails?.gender}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
              <Grid sx={{ my: 2 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                >
                  Professional Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4} display="flex">
                    <LaptopIcon
                      sx={{
                        color: "#607d8b",
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{
                        color: "#263238",
                        ml: 2,
                        alignContent: "center",
                        fontSize: 14,
                      }}
                    >
                      <span style={{ color: "#607d8b" }}>Role:</span>{" "}
                      {userDetails?.roleName}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} display="flex">
                    <BorderInnerIcon
                      sx={{
                        color: "#607d8b",
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{
                        color: "#263238",
                        ml: 2,
                        alignContent: "center",
                        fontSize: 14,
                      }}
                    >
                      <span style={{ color: "#607d8b" }}>Section:</span>{" "}
                      {userDetails?.section}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} display="flex">
                    <BadgeIcon
                      sx={{
                        color: "#607d8b",
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{
                        color: "#263238",
                        ml: 2,
                        alignContent: "center",
                        fontSize: 14,
                      }}
                    >
                      <span style={{ color: "#607d8b" }}>Designation:</span>{" "}
                      {userDetails?.designation}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4} display="flex">
                    <CalendarMonthIcon
                      sx={{
                        color: "#607d8b",
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{
                        color: "#263238",
                        ml: 2,
                        alignContent: "center",
                        fontSize: 14,
                      }}
                    >
                      <span style={{ color: "#607d8b" }}>DOJ:</span>{" "}
                      {userDetails?.doj}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} display="flex">
                    <WorkIcon
                      sx={{
                        color: "#607d8b",
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{
                        color: "#263238",
                        ml: 2,
                        alignContent: "center",
                        fontSize: 14,
                      }}
                    >
                      <span style={{ color: "#607d8b" }}>Employment:</span>{" "}
                      {userDetails?.empType}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} display="flex">
                    <GradingIcon
                      sx={{
                        color: "#607d8b",
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{
                        color: "#263238",
                        ml: 2,
                        alignContent: "center",
                        fontSize: 14,
                      }}
                    >
                      <span style={{ color: "#607d8b" }}>Grade:</span>{" "}
                      {userDetails?.grade}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6} display="flex">
                    <MailIcon
                      sx={{
                        color: "#607d8b",
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{
                        color: "#263238",
                        ml: 2,
                        alignContent: "center",
                        fontSize: 14,
                      }}
                    >
                      <span style={{ color: "#607d8b" }}>Email:</span>{" "}
                      {userDetails?.email}
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
