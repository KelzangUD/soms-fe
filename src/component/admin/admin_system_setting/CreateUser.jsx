import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Transition from "../../../common/Transition";
import Route from "../../../routes/Route";

const CreateUser = ({ open, setOpen, setOpenNotification, setMessage, fetchUsers }) => {
  // set states
  const [designations, setDesignations] = useState([]);
  const [regions, setRegions] = useState([]);
  const [extensions, setExtensions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    empId: "",
    email: "",
    password: "",
    contact: "",
    status: true,
    gender: "",
    isAdmin: false,
    region: null,
    extension: null,
    designation: null,
  });

  const token = localStorage.getItem("token");
  // fetch Designations
  const fetchDesignations = async () => {
    const res = await Route("GET", `/designations`, token, null, null);
    if (res?.status === 200) {
      setDesignations(res?.data?.designations);
    }
  };
  // fetch Regions
  const fetchRegions = async () => {
    const res = await Route("GET", `/regions`, token, null, null);
    if (res?.status === 200) {
      setRegions(res?.data?.regions);
    }
  };
  // fetch Extensions based on Region
  const fetchExtensions = async (id) => {
    const res = await Route(
      "GET",
      `/regions/fetchAllExtensions`,
      token,
      null,
      id
    );
    if (res?.status === 200) {
      setExtensions(res?.data?.extensions);
    }
  };
  // call functions
  useEffect(() => {
    fetchDesignations();
    fetchRegions();
  }, []);

  // handlers
  const searchQueryHandle = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchHandle = async () => {
    const res = await Route("GET", `/users/sso/${searchQuery}`, token, null, null);
    if (res?.status === 200) {
      setUserDetails((prev) => ({
        ...prev,
        name: res?.data?.user?.fullName,
        empId: searchQuery,
        email: res?.data?.user?.email,
        password: res?.data?.user?.dateOfBirth,
        contact: res?.data?.user?.mobileNo,
      }));
    } else {
      setMessage(res?.response?.data?.message);
      setOpenNotification(true);
    }
  };
  const designationHandle = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      designation: e.target.value,
    }));
  };
  const genderHandle = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      gender: e.target.value,
    }));
  };
  const regionHandle = (e) => {
    setExtensions([]);
    fetchExtensions(e.target.value);
    setUserDetails((prev) => ({
      ...prev,
      region: e.target.value,
    }));
  };
  const extensionHandle = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      extension: e.target.value,
    }));
  };
  const isAdminHandle = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      isAdmin: e.target.checked,
    }));
  };
  // submit handle to add new user
  const handleSubmit = async () => {
    const response = await Route("POST", `/users`, token, userDetails, null);
    if (response?.status === 201) {
      setMessage(response?.data?.message);
      setOpenNotification(true);
      fetchUsers();
      setOpen(false);
    } else {
      setMessage(response?.response?.data?.message);
      setOpenNotification(true);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create new user, please enter Employee ID. Employee's details
            will be fetched and filled.
          </DialogContentText>
          <Box sx={{ display: "grid", gap: 2, mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <TextField
                  label="Employee ID"
                  variant="outlined"
                  fullWidth
                  name="employeeID"
                  required
                  size="small"
                  onChange={searchQueryHandle}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  fullWidth
                  size="medium"
                  onClick={fetchHandle}
                >
                  Fetch
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  name="fullName"
                  required
                  size="small"
                  disabled
                  value={userDetails?.name || ""}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  required
                  size="small"
                  value={userDetails?.email || ""}
                  disabled
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="designation-select-label">
                    Designation
                  </InputLabel>
                  <Select
                    labelId="designation-select-label"
                    id="designation-simple-select"
                    label="Designation"
                    onChange={designationHandle}
                  >
                    {designations?.map((item) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="gender-select-label">Gender</InputLabel>
                  <Select
                    labelId="gender-select-label"
                    id="gender-simple-select"
                    label="Gender"
                    onChange={genderHandle}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Contact"
                  variant="outlined"
                  fullWidth
                  name="contact"
                  required
                  size="small"
                  value={userDetails?.contact || ""}
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="region-select-label">Region</InputLabel>
                  <Select
                    labelId="region-select-label"
                    id="region-simple-select"
                    label="Region"
                    onChange={regionHandle}
                  >
                    {regions?.map((item) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.region}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="extension-select-label">Extension</InputLabel>
                  <Select
                    labelId="extension-select-label"
                    id="extension-simple-select"
                    label="Extension"
                    onChange={extensionHandle}
                  >
                    {extensions?.map((item) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.extension}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl component="fieldset">
                  <FormControlLabel
                    value="start"
                    control={<Checkbox />}
                    label="Assign as Admin"
                    labelPlacement="start"
                    onClick={isAdminHandle}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mx: 2 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Create
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateUser;
