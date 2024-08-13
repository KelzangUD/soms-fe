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
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Transition from "../../../../common/Transition";
import Route from "../../../../routes/Route";

const UploadAudio = ({
  open,
  setOpen,
  setOpenNotification,
  setMessage,
  fetchAudios
}) => {
  // init states
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState("");

  // handlers
  const titlehandle = (e) => {
    setTitle(e.target.value);
  };
  const urlhandle = (e) => {
    setUrl(e.target.value);
  };
  const visibleHandle = (e) => {
    setVisible(e.target.checked);
  };
  const descriptionHandle = (e) => {
    setDescription(e.target.value);
  };
  const token = localStorage.getItem("token");
  const formData = new FormData();
  const addHandle = async () => {
    formData.append("title", title);
    formData.append("url", url);
    formData.append("visible", visible);
    formData.append("description", description);
    const response = await Route(
      "POST",
      `/audios`,
      token,
      formData,
      null,
      "multipart/form-data"
    );

    if (response?.status === 201) {
      fetchAudios();
      setOpen(false);
      setMessage(response?.data?.message);
      setOpenNotification(true);
    } else {
      fetchAudios();
      setOpen(false);
      setMessage(response?.response?.data?.message);
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
      <DialogTitle>Upload Audio</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 3, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                name="title"
                required
                size="small"
                onChange={titlehandle}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Url"
                variant="outlined"
                fullWidth
                name="Url"
                required
                size="small"
                onChange={urlhandle}
              />
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch onChange={visibleHandle} />}
                  label="Make it Visible"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
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

export default UploadAudio;
