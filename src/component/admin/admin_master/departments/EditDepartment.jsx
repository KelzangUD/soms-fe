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
} from "@mui/material";
import Transition from "../../../../common/Transition";
import Route from "../../../../routes/Route";

const EditDepartment = ({ details, open, setOpen, setMessage, setOpenNotification, fetchDepartments }) => {
  // init states
  const [data, setData] = React.useState({
    title: details?.title
  });
  
  // handlers
  const titleHandle = (e) => {
    setData({
      title: e.target.value
    });
  };
  const token = localStorage.getItem("token");
  const editHandle = async() => {
    const response = await Route("PUT", `/departments/${details?.id}`, token, data);
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
      <DialogTitle>Edit Designation</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 3, mt: 2 }}>
          <Grid container>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              name="title"
              required
              defaultValue={details?.title}
              size="small"
              onChange={titleHandle}
            />
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 2, mx: 2 }}>
        <Button variant="contained" onClick={editHandle}>
          Update
        </Button>
        <Button onClick={() => setOpen(false)} variant="outlined" color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDepartment;
