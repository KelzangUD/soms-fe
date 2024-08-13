import React, { useState, useEffect } from "react";
import {
  Box,
  InputLabel,
  Card,
  Divider,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import Transition from "../../../../common/Transition";
import DeleteIcon from "@mui/icons-material/Delete";
import Mcq from "./question_types/Mcq";
import FillInTheBlank from "./question_types/FillInTheBlank";
import TrueOrFalse from "./question_types/TrueOrFalse";
import YesOrNo from "./question_types/YesOrNo";
import Matching from "./question_types/Matching";
import { attachment } from "../../../../data/Static";
import Route from "../../../../routes/Route";

const MainSlide = ({ index, questionTypes, deleteRowHandle, addQuestion }) => {
  // init states
  const [data, setData] = useState({
    questionType: null,
    question: "",
    point: 1,
    video: null,
    audio: null,
    choice: [],
    choiceTwo: [],
    answer: null,
  });
  const [attachFile, setAttachFile] = useState(1);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const [deleteSilde, setDeleteSlide] = useState(false);
  const removeQuestion = (index) => {
    deleteRowHandle(index);
    setDeleteSlide(false);
  };
  const token = localStorage.getItem("token");
  const fetchVideos = async () => {
    const res = await Route("GET", "/videos", token, null, null);
    if (res?.status === 200) {
      setVideos(res?.data?.videos);
    }
  };
  const fetchAudios = async () => {
    const res = await Route("GET", "/audios", token, null, null);
    if (res?.status === 200) {
      setAudios(res?.data?.audios);
    }
  };
  // handlers
  const questionTypeHandle = (e) => {
    setData((prev) => ({
      ...prev,
      questionType: e.target.value
    }))
    addQuestion(index, "questionType", e.target.value);
    addQuestion(index, "choice", []);
    addQuestion(index, "choice2", []);
    addQuestion(index, "answer", null);;
  };

  const pointHandle = (e) => {
    addQuestion(index, "point", parseInt(e.target.value));
  };
  const questionHandle = (e) => {
    addQuestion(index, "question", e.target.value);
  };
  const attachmentHandle = (e) => {
    addQuestion(index, "video", null);
    addQuestion(index, "audio", null);
    if (!isNaN(e.target.value)) {
      if (e.target.value === 2) {
        fetchVideos();
      } else if (e.target.value === 3) {
        fetchAudios();
      }
    }
    setAttachFile(e.target.value);
  };
  const videoHandle = (e) => {
    addQuestion(index, "video", e.target.value);
  };
  const audioHandle = (e) => {
    addQuestion(index, "audio", e.target.value);
  };
  const choiceHandle = (option, text) => {
    addQuestion(index, "choice", {
      [option]: text,
    });
  };
  const choiceTwoHandle = (option, text) => {
    addQuestion(index, "choice2", {
      [option]: text,
    });
  };
  const answerHandle = (option) => {
    addQuestion(index, "answer", option)
  };
  const matchingAnswerHandle = (option, text) => {
    addQuestion(index, "matching", {
      [option]: text,
    });
  };
  const renderQuestionType = () => {
    switch (data?.questionType) {
      case 1:
        return <Mcq choiceHandle={choiceHandle} answerHandle={answerHandle} />;
      case 2:
        return <FillInTheBlank choiceHandle={choiceHandle} answerHandle={answerHandle} />;
      case 3:
        return <TrueOrFalse answerHandle={answerHandle} />;
      case 4:
        return <YesOrNo answerHandle={answerHandle} />;
      case 5:
        return <Matching choiceHandle={choiceHandle} choiceTwoHandle={choiceTwoHandle} answerHandle={matchingAnswerHandle} />;
      default:
        return null;
    }
  };
  return (
    <>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <Box p={2} sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl required sx={{ minWidth: 300 }}>
            <InputLabel id="question-type-label">Question Type</InputLabel>
            <Select
              labelId="question-type-label"
              id="question-type-select"
              label="Question Type"
              onChange={questionTypeHandle}
            >
              {questionTypes?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item?.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200 }}>
            <TextField
              fullWidth
              label="Point"
              id="point"
              required
              onChange={pointHandle}
            />
          </FormControl>
        </Box>
        <Box p={2}>
          <TextField
            fullWidth
            label="Question"
            id="question"
            multiline
            rows={9}
            required
            onChange={questionHandle}
          />
        </Box>
        <Box p={2} sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl sx={{ minWidth: 300 }}>
            <InputLabel id="attachment-label">Attachment</InputLabel>
            <Select
              labelId="attachment-label"
              id="attachment-select"
              label="Attachment"
              onChange={attachmentHandle}
            >
              {attachment?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item?.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {attachFile === 2 ? (
            <FormControl sx={{ minWidth: 300 }}>
              <InputLabel id="video-label">Video</InputLabel>
              <Select
                labelId="video-label"
                id="video-select"
                label="Video"
                onChange={videoHandle}
              >
                {videos?.map((item) => (
                  <MenuItem key={item?.id} value={item?.id}>
                    {item?.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
          {attachFile === 3 ? (
            <FormControl sx={{ minWidth: 300 }}>
              <InputLabel id="audio-label">Audio</InputLabel>
              <Select
                labelId="audio-label"
                id="audio-select"
                label="Audio"
                onChange={audioHandle}
              >
                {audios?.map((item) => (
                  <MenuItem key={item?.id} value={item?.id}>
                    {item?.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
        </Box>
        {renderQuestionType()}
        <Box p={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
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
              onClick={() => removeQuestion(index)}
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

export default MainSlide;
