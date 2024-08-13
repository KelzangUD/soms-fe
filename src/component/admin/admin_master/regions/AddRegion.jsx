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

const AddRegion = ({
  open,
  setOpen,
  setOpenNotification,
  setMessage,
  fetchRegions,
}) => {
  // init states
  const [data, setData] = useState({
    region: "",
    description: "",
  });
  const nameHandle = (e) => {
    setData((prev) => ({
      ...prev,
      region: e.target.value,
    }));
  };
  const descriptionHandle = (e) => {
    setData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };
  const token = localStorage.getItem("token");
  const addHandle = async() => {
    const response = await Route("POST", `/regions`, token, data);
    if (response?.status === 201) {
      setMessage(response?.data?.message);
      setOpenNotification(true);
      fetchRegions();
      setOpen(false);
    } else {
      setMessage(response?.response?.data?.message);
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
      <DialogTitle>Add Region</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 3, mt: 2 }}>
          <Grid container>
            <TextField
              label="Region"
              variant="outlined"
              fullWidth
              name="region"
              required
              size="small"
              onChange={nameHandle}
            />
          </Grid>
          <Grid container>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              name="description"
              required
              size="small"
              multiline
              rows={3}
              onChange={descriptionHandle}
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

export default AddRegion;
