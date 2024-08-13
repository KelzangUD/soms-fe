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

const VideoPlayer = ({ details, open, setOpen }) => {
  // init states
  const [video, setVideo] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const token = localStorage.getItem("token");

  const fetchVideo = async () => {
    try {
      const response = await Route(
        "GET",
        `/videos/${details?.id}`,
        token,
        null
      );
      if (response?.status === 200) {
        if (response?.data?.videoPath) {
          setVideo(response?.data?.videoPath);
        } else {
          setVideoBlob(response);
        }
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
              {videoBlob ? (
                <ReactPlayer
                  className="react-player"
                  url={videoBlob && URL.createObjectURL(
                    new Blob([videoBlob], { type: "video/mp4" })
                  )}
                  // url={videoBlob}
                  width="100%"
                  height="320px"
                  controls
                />
              ) : (
                <ReactPlayer
                  className="react-player"
                  url={video}
                  width="100%"
                  height="320px"
                  controls
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;
