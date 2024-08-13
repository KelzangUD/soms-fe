import React, { useState } from "react";
import {
  Grid,
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Transition from "../../../../common/Transition";
import Route from "../../../../routes/Route";

const AddDepartment = ({ open, setOpen, setOpenNotification, setMessage, fetchDepartments }) => {
  const [data, setData] = useState({
    title: "",
  }); 
  const titleHandle = (e) => {
    setData({
      title: e.target.value
    })
  };
  const token = localStorage.getItem("token");
  const addHandle = async() => {
    const response = await Route("POST", `/departments`, token, data);
    if (response?.status === 201) {
      setMessage(response?.data?.message);
      setOpenNotification(true);
      fetchDepartments();
      setOpen(false);
    } else {
      setMessage(response?.data?.message);
      setOpenNotification(true);
    }
  };
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
    >
      <DialogTitle>Add Department</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 3, mt: 2 }}>
          <Grid container>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              name="title"
              required
              size="small"
              onChange={titleHandle}
            />
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

export default AddDepartment;
