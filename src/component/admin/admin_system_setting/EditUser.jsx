import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
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

const EditUser = ({ details, open, setOpen, setOpenNotification, setMessage, fetchUsers }) => {
  // init states
  const [designations, setDesignations] = useState([]);
  const [regions, setRegions] = useState([]);
  const [extensions, setExtensions] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: details?.name,
    empId: details?.empId,
    email: details?.email,
    password: details?.password,
    contact: details?.contact,
    status: details?.true,
    gender: details?.gender,
    isAdmin: details?.isAdmin,
    region: details?.region,
    extension: details?.extension,
    designation: details?.designation,
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
  const emailHandle = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      email: e.target.value,
    }));
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
  // update function
  const handleSubmit = async() => {
    const response = await Route("PUT", `/users`, token, userDetails, details?.id);
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
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 3, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                label="Employee ID"
                variant="outlined"
                fullWidth
                defaultValue={details?.empId}
                name="employeeID"
                required
                size="small"
                disabled
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                defaultValue={details?.name}
                name="fullName"
                required
                size="small"
                disabled
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                defaultValue={details?.email}
                required
                size="small"
                onChange={emailHandle}
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
                  defaultValue={details?.designation}
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
                  defaultValue={details?.gender}
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
                defaultValue={details?.contact}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="region-select-label">Region</InputLabel>
                <Select
                  defaultValue={details?.region}
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
                  defaultValue={details?.extension}
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
            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormControlLabel
                  control={<Checkbox  defaultChecked={details?.isAdmin} />}
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
          Update
        </Button>
        <Button onClick={() => setOpen(false)} variant="outlined" color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default EditUser;
