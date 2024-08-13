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
  styled,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Transition from "../../../../common/Transition";
import Route from "../../../../routes/Route";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const EditAudio = ({ details, open, setOpen, setOpenNotification, setMessage, fetchAudios }) => {
  // init states
  const [title, setTitle] = useState(details?.title);
  const [url, setUrl] = useState(details?.path);
  const [visible, setVisible] = useState(details?.visible);
  const [description, setDescription] = useState(details?.description);
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
  const updateHandle = async () => {
    formData.append("title", title);
    formData.append("url", url);
    formData.append("visible", visible);
    formData.append("description", description);
    const response = await Route(
      "PUT",
      `/audios/${details?.id}`,
      token,
      formData,
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
      <DialogTitle>Edit Video</DialogTitle>
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
                defaultValue={details?.title}
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
                  defaultValue={details?.path}
                  onChange={urlhandle}
                />
              </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch onChange={visibleHandle} defaultChecked={details?.visible} />}
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
                defaultValue={details?.description}
                rows={3}
                onChange={descriptionHandle}
              />
            </Grid>
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

export default EditAudio;
