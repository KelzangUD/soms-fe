import React, {  useState, useEffect } from "react";
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

const EditRegion = ({
  details,
  open,
  setOpen,
  setOpenNotification,
  setMessage,
  fetchRegions,
}) => {
  // init states
  const [data, setData] = useState({
    region: details?.region,
    description: details?.description
  });

  // handlers
  const nameHandle = (e) => {
    setData((prev) => ({
      ...prev,
      region: e.target.value
    }));
  };
  const descriptionHandle = (e) => {
    setData((prev) => ({
      ...prev,
      description: e.target.value
    }));
  };
  const token = localStorage.getItem("token");
  const editHandle = async () => {
    const response = await Route(
      "PUT",
      `/regions/${details?.id}`,
      token,
      data
    );
    if (response?.status === 201) {
      setMessage(response?.data?.message);
      setOpenNotification(true);
      fetchRegions();
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
      <DialogTitle>Add Region</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 3, mt: 2 }}>
          <Grid container>
            <TextField
              label="Region"
              variant="outlined"
              fullWidth
              name="region"
              defaultValue={details?.region}
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
              defaultValue={details?.description}
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

export default EditRegion;
