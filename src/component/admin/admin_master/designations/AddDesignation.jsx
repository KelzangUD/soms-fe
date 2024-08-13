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
} from "@mui/material";
import Transition from "../../../../common/Transition";
import Route from "../../../../routes/Route";

const AddDesignation = ({ open, setOpen, setOpenNotification, setMessage, fetchDesignations }) => {
  // init states
  const [departments, setDepartments] = useState([]);
  const [data, setData] = useState({
    title: "",
    department: null,
  });
  const token = localStorage.getItem("token");
  const fetchDepartments = async () => {
    const res = await Route("GET", "/departments", token, null, null);
    if (res?.status === 200) {
      setDepartments(res?.data?.departments);
    };
  };
  useEffect(() => {
    fetchDepartments();
  }, []);

  // handlers
  const titleHandle = (e) => {
    setData(prev => ({
      ...prev,
      title: e.target.value
    }))
  };
  const departmentHandle = (e) => {
    setData(prev => ({
      ...prev,
      department: e.target.value
    }))
  };
  const addHandle = async() => {
    const response = await Route("POST", `/designations`, token, data, null);
    if (response?.status === 201) {
      setMessage(response?.data?.message);
      setOpenNotification(true);
      fetchDesignations();
      setOpen(false);
    } else {
      setMessage(response?.data?.message);
      setOpenNotification(true);
    };
  };
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
    >
      <DialogTitle>Add Designation</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 3, mt: 2 }}>
          <Grid container>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              name="title"
              onChange={titleHandle}
              required
              size="small"
            />
          </Grid>
          <Grid container>
            <FormControl fullWidth size="small">
              <InputLabel id="select-label">Department/Unit</InputLabel>
              <Select
                labelId="select-label"
                id="select-small"
                label="Department/Unit"
                required
                onChange={departmentHandle}
              >
                {
                  departments?.map((item) => (<MenuItem key={item?.id} value={item?.id}>{item?.title}</MenuItem>))
                }
              </Select>
            </FormControl>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 2, mx: 2 }}>
        <Button variant="contained" onClick={addHandle}>
          Add
        </Button>
        <Button onClick={() => setOpen(false)} variant="outlined" color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDesignation;
