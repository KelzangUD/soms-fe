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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Transition from "../../../../common/Transition";
import Route from "../../../../routes/Route";

const EditExtension = ({
  details,
  open,
  setOpen,
  setOpenNotification,
  setMessage,
  fetchExtensions,
}) => {
  // init states
  const [regions, setRegions] = useState([]);
  const [data, setDate] = useState({
    extension: details?.extension,
    region: details?.region,
    description: details?.description,
  });

  const token = localStorage.getItem("token");
  const fetchRegions = async () => {
    const res = await Route("GET", "/regions", token, null);
    if (res?.status === 200) {
      setRegions(res?.data?.regions);
    }
  };
  useEffect(() => {
    fetchRegions();
  }, []);
  // handlers

  const extensionHandler = (e) => {
    setDate((prev) => ({
      ...prev,
      extension: e.target.value
    }));
  };
  const regionHandler = (e) => {
    setDate((prev) => ({
      ...prev,
      region: e.target.value
    }));
  };
  const descriptionHandler = (e) => {
    setDate((prev) => ({
      ...prev,
      description: e.target.value
    }));
  };
  const updateHandle = async() => {
    const response = await Route(
      "PUT",
      `/extensions/${details?.id}`,
      token,
      data
    );
    if (response?.status === 201) {
      setMessage(response?.data?.message);
      setOpenNotification(true);
      fetchExtensions();
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
      <DialogTitle>Edit Extension</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 3, mt: 2 }}>
          <Grid container>
            <TextField
              label="Extension"
              variant="outlined"
              fullWidth
              name="extension"
              defaultValue={details?.extension}
              required
              size="small"
              onChange={extensionHandler}
            />
          </Grid>
          <Grid container>
            <FormControl fullWidth size="small">
              <InputLabel id="region-select-label">Region</InputLabel>
              <Select
                labelId="region-select-label"
                id="region-simple-select"
                required
                defaultValue={details?.region}
                label="Region"
                onChange={regionHandler}
              >
                {
                  regions?.map((item) => (<MenuItem key={item?.id} value={item?.id}>{item?.region}</MenuItem>))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid container>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              name="description"
              defaultValue={details?.description}
              required
              size="small"
              multiline
              rows={3}
              onChange={descriptionHandler}
            />
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 2, mx: 2 }}>
        <Button variant="contained" onClick={updateHandle}>
          Update
        </Button>
        <Button onClick={() => setOpen(false)} variant="outlined" color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExtension;
