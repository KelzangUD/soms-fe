import React, { useState, useEffect } from "react";
import { Box, Paper, Grid, Avatar, Typography, Divider } from "@mui/material";
import Route from "../../routes/Route";

const Profile = () => {
  const empID = localStorage.getItem("username");
  const [userDetails, setUserDetails] = useState({
    userName: "",
    roleName: "",
    region: "",
    subInventory: "",
    locator: "",
    storeId: null,
    toStoreName: null,
    toStoreId: null,
    customer_NAME: null,
    region_NAME: "",
    city: null,
    country: null,
    person_FIRST_NAME: null,
    person_LAST_NAME: null,
    store_LOCATION: null,
    customerId: null,
    customer_NUMBER: null,
    customer_TYPE: null,
    address1: null,
    address2: null,
    address3: null,
    address4: null,
    mobile_NUMBER: null,
  });
  const fetchUserDetails = async () => {
    const res = await Route(
      "GET",
      `/Common/fetchUserDtls?userId=${empID}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setUserDetails((prev) => ({
        ...prev,
        userName: res?.data?.userName,
        roleName: res?.data?.roleName,
        region: res?.data?.region,
        subInventory: res?.data?.subInventory,
        locator: res?.data?.locator,
        storeId: res?.data?.storeId,
        region_NAME: res?.data?.region_NAME,
      }));
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

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
                    sx={{ color: "#758694" }}
                  >
                    {empID}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "#758694" }}
                  >
                    {userDetails?.region_NAME}, {userDetails?.region}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid sx={{ my: 4 }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                >
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
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                >
                  Professional Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#758694" }}
                    >
                      Role: {userDetails?.roleName}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#758694" }}
                    >
                      Section: SAS
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#758694" }}
                    >
                      Designation: Software Developer
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#758694" }}
                    >
                      Manager: Dechen Dorji
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#758694" }}
                    >
                      DOJ: 2-Aug-2021
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#758694" }}
                    >
                      Employment: Regular
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#758694" }}
                    >
                      Grade: P.12
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
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
