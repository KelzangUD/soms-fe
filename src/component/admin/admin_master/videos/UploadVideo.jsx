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
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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

const UploadVideo = ({
  open,
  setOpen,
  setOpenNotification,
  setMessage,
  fetchVideos,
}) => {
  // init states
  const [title, setTitle] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [selectVideoUpload, setSelectVideoUpload] = useState(null);
  const [video, setVideo] = useState("");
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState("");

  // handlers
  const titlehandle = (e) => {
    setTitle(e.target.value);
  };
  const selectHandle = (e) => {
    e.target.value === 1
      ? setSelectVideoUpload(true)
      : setSelectVideoUpload(false);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
    }
    setVideo(file);
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
    formData.append("videos", video);
    formData.append("url", url);
    formData.append("visible", visible);
    formData.append("description", description);
    const response = await Route(
      "POST",
      `/videos`,
      token,
      formData,
      null,
      "multipart/form-data"
    );

    if (response?.status === 201) {
      fetchVideos();
      setOpen(false);
      setMessage(response?.data?.message);
      setOpenNotification(true);
    } else {
      fetchVideos();
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
      <DialogTitle>Upload Video</DialogTitle>
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
            {/* <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="select-label">Select</InputLabel>
                <Select
                  labelId="select-label"
                  id="select-small"
                  label="Select"
                  required
                  onChange={selectHandle}
                  defaultValue={2}
                >
                  <MenuItem value={1}>Upload Video</MenuItem>
                  <MenuItem value={2}>Url</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {selectVideoUpload ? (
              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                  size="large"
                >
                  Upload
                  <VisuallyHiddenInput
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                  />
                </Button>
                {uploadedFileName && (
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    File Name: {uploadedFileName}
                  </Typography>
                )}
              </Grid>
            ) : (
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
            )} */}
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

export default UploadVideo;
