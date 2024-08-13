import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SubHeader from "../../common/SubHeader";
import Notification from "../../ui/Notification";
import Route from "../../routes/Route";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    empId: "",
    name: "",
    email: "",
    designation: "",
    gender: "",
    contact: "",
    region: "",
    extension: "",
  });
  const [designations, setDesignations] = useState([]);
  const [regions, setRegions] = useState([]);
  const [extensions, setExtensions] = useState([]);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setUserDetails((prev) => ({
      ...prev,
      empId: user?.empId,
      name: user?.name,
      email: user?.email,
      designation: user?.designation,
      gender: user?.gender,
      contact: user?.contact,
      region: user?.region,
      extension: user?.extension,
    }));
  }, [user]);
  const [message, setMessage] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const fetchDesignations = async() => {
    const response = await Route("GET", `/designations`, token, null, null);
    if (response?.status === 200) {
      setDesignations(response?.data?.designations);
    }
  };
  const fetchRegions = async() => {
    const response = await Route("GET", `/regions`, token, null, null);
    if (response?.status === 200) {
      setRegions(response?.data?.regions);
    }
  };
  const fetchExtensions = async() => {
    const response = await Route("GET", `/extensions`, token, null, null);
    if (response?.status === 200) {
      setExtensions(response?.data?.extensions);
    }
  };
  useEffect(() => {
    fetchDesignations();
    fetchRegions();
    fetchExtensions();
  });

  const nameHandle = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };
  const emailHandle = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      email: e.target.value 
    }));
  };
  const designationHandle = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      designation: e.target.value
    }));
  };
  const genderHandle = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      gender: e.target.value
    }));
  };
  const contactHandle = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      contact: e.target.value
    }));
  };
  const regionHandle = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      region: e.target.value,
    }));
  };
  const extensionHandle = (e)=> {
    setUserDetails((prev) => ({
      ...prev,
      extension: e.target.value
    }));
  };
  const cancleHandle = () => {
    navigate("/admin/dashboard");
  };
  const fetchUser = async() => {
    const response = await Route(
      "GET",
      "/users",
      token,
      null,
      user?.id,
    );
    if (response?.status === 200) {
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(response?.data?.user));
      setUserDetails((prev) => ({
        ...prev,
        empId: response?.data?.user?.empId,
        name: response?.data?.user?.name,
        email: response?.data?.user?.email,
        designation: response?.data?.user?.designation,
        gender: response?.data?.user?.gender,
        contact: response?.data?.user?.contact,
        region: response?.data?.user?.region,
        extension: response?.data?.user?.extension,
      }));
    } else {
      setMessage(response?.data?.message);
      setOpenNotification(true);
    };
  };
  const updateHandle = async() => {
    const response = await Route(
      "PUT",
      "/users",
      token,
      userDetails,
      user?.id
    );
    if (response?.status === 201) {
      setMessage(response?.data?.message);
      setOpenNotification(true);
      fetchUser();
    } else {
      setMessage(response?.data?.message);
      setOpenNotification(true);
    };
  }
  return (
    <>
    <Box sx={{ px: 2 }}>
      <Grid container spacing={4} alignItems="center">
        <SubHeader text="My Profile" />
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid item xs={4}>
                <TextField
                  label="Employee ID"
                  variant="outlined"
                  fullWidth
                  name="employeeID"
                  defaultValue={user?.empId}
                  required
                  disabled
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  name="fullName"
                  required
                  defaultValue={user?.name}
                  onChange={nameHandle}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid item xs={8}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  required
                  defaultValue={user?.email}
                  onChange={emailHandle}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="designation-select-label">Designation</InputLabel>
                  <Select
                    labelId="designation-select-label"
                    id="designation-simple-select"
                    label="Designation"
                    defaultValue={user?.designation}
                    onChange={designationHandle}
                  >
                    {
                      designations?.map((item) => (<MenuItem key={item?.id} value={item?.id}>{item?.title}</MenuItem>))
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid item xs={5}>
                <FormControl fullWidth>
                  <InputLabel id="gender-select-label">Gender</InputLabel>
                  <Select
                    labelId="gender-select-label"
                    id="gender-simple-select"
                    label="Gender"
                    defaultValue={user?.gender}
                    onChange={genderHandle}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  label="Contact"
                  variant="outlined"
                  fullWidth
                  name="contact"
                  required
                  defaultValue={user?.contact}
                  onChange={contactHandle}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="region-select-label">Region</InputLabel>
                  <Select
                    labelId="region-select-label"
                    id="region-simple-select"
                    label="Region"
                    defaultValue={user?.region}
                    onChange={regionHandle}
                  >
                    {
                      regions?.map((item) => (<MenuItem key={item?.id} value={item?.id}>{item?.region}</MenuItem>))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="extension-select-label">Extension</InputLabel>
                  <Select
                    labelId="extension-select-label"
                    id="extension-simple-select"
                    label="Extension"
                    onChange={extensionHandle}
                  >
                    {
                      extensions?.map((item) => (<MenuItem key={item?.id} value={item?.id}>{item?.extension}</MenuItem>))
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              sx={{ my: 2, display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item>
                <Button variant="contained" size="large" sx={{ mr: 2 }} onClick={updateHandle}>
                  Update
                </Button>
                <Button variant="outlined" color="error" size="large" onClick={cancleHandle}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    {openNotification && (
      <Notification
        open={openNotification}
        setOpen={setOpenNotification}
        message={message}
      />
    )}
    </>
  );
};

export default Profile;
