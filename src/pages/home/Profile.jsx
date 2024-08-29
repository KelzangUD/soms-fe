import React from "react";
import { Box, Paper, Grid, Avatar, Typography, Divider } from "@mui/material";
import SubHeader from "../../common/SubHeader";
// import Route from "../../routes/Route";

const Profile = () => {
  // const fetchUser = async () => {
  //   const response = await Route("GET", "/users", token, null, user?.id);
  //   if (response?.status === 200) {
  //     localStorage.removeItem("user");
  //     localStorage.setItem("user", JSON.stringify(response?.data?.user));
  //     setUserDetails((prev) => ({
  //       ...prev,
  //       empId: response?.data?.user?.empId,
  //       name: response?.data?.user?.name,
  //       email: response?.data?.user?.email,
  //       designation: response?.data?.user?.designation,
  //       gender: response?.data?.user?.gender,
  //       contact: response?.data?.user?.contact,
  //       region: response?.data?.user?.region,
  //       extension: response?.data?.user?.extension,
  //     }));
  //   } else {
  //     setMessage(response?.data?.message);
  //     setOpenNotification(true);
  //   }
  // };

  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          {/* <SubHeader text="My Profile" /> */}
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
                  <Avatar sx={{ width: 100, height: 100 }}>T</Avatar>
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "800", fontSize: "24px" }}
                    gutterBottom
                  >
                    Tshedup Gyeltshen
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "#758694" }}
                  >
                    E00882
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "#758694" }}
                  >
                    TICL_Dagapela Extension, Thimphu
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid sx={{ my: 4 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "600" }}>
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#758694" }}
                    >
                      Birthday: 2-Aug-1994
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#758694" }}
                    >
                      Gender: Male
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
              <Grid sx={{ my: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "600" }}>
                  Professional Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#758694" }}
                    >
                      Role: Administration
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#758694" }}
                    >
                      Section: SAS
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#758694" }}
                    >
                      Designation: Software Developer
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#758694" }}
                    >
                      Manager: Dechen Dorji
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#758694" }}
                    >
                      DOJ: 2-Aug-2021
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#758694" }}
                    >
                      Employment: Regular
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#758694" }}
                    >
                      Grade: P.12
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#758694" }}
                    >
                      Email: sw_engineer8.mis@tashicell.com
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
