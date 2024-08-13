import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Dialog,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Transition from "../../../../common/Transition";
import Route from "../../../../routes/Route";
import ReactPlayer from "react-player";
// import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";

const AudioPlay = ({ details, open, setOpen }) => {
  // init states
  const [audio, setAudio] = useState(null);
  const token = localStorage.getItem("token");

  const fetchVideo = async () => {
    try {
      const response = await Route(
        "GET",
        `/audios/${details?.id}`,
        token,
        null
      );
      if (response?.status === 200) {
        setAudio(response?.data?.audioPath);
      }
    } catch (error) {
      console.error("Error fetching video:", error.message);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [details?.id, token]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
    >
      <IconButton
        aria-label="close"
        onClick={() => setOpen(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Typography>Title: {details?.title}</Typography>
        <Box sx={{ display: "grid", gap: 3, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ReactPlayer
                url={audio}
                width="100%"
                height="100%"
                playing
                controls
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AudioPlay;
