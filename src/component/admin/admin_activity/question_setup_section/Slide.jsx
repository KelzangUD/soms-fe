import React, { useState } from "react";
import {
  Box,
  Card,
  Paper,
  Grid,
  Divider,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// import FileCopyIcon from '@mui/icons-material/FileCopy';
import Transition from "../../../../common/Transition";

const Slide = ({index, setQuestions }) => {
  const [deleteSilde, setDeleteSlide] = useState(false);
  const removeQuestion = () => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.splice(index, 1);
      return updatedQuestions;
    });
    setDeleteSlide(false)
  };

  return (
    <>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <Box p={2}>
          <Typography variant="subtitle2">MCQ</Typography>
        </Box>
        <Box px={2}>
          <Typography variant="body2">A mistake in an algorithm that generates incorrect results or output is called:</Typography>
        </Box>
        <Divider />
        <Box p={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          {/* <Button
            aria-label="duplicate"
            size="small"
            variant="outlined"
            color="primary"
            endIcon={<FileCopyIcon />}
            sx={{ mr: 1 }}
          >
            Duplicate
          </Button> */}
          <Button
            aria-label="delete"
            size="small"
            variant="outlined"
            color="error"
            endIcon={<DeleteIcon />}
            onClick={() => setDeleteSlide(true)}
          >
            Delete
          </Button>
        </Box>
      </Card>

      {deleteSilde ? (
        <Dialog
          open={deleteSilde}
          onClose={() => setDeleteSlide(false)}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <Typography variant="h6">Confirmation</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              Are you sure you want to delete this slide?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ mb: 2, mx: 2 }}>
            <Button
              onClick={() => removeQuestion()}
              variant="contained"
              autoFocus
              size="small"
            >
              Confirm
            </Button>
            <Button
              onClick={() => setDeleteSlide(false)}
              variant="outlined"
              color="error"
              size="small"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
};

export default Slide;
