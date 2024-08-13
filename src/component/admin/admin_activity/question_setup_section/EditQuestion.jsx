import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import EditMcq from "./edit_question_types/EditMcq";
import EditFillInTheBlank from "./edit_question_types/EditFillInTheBlank";
import EditTrueOrFalse from "./edit_question_types/EditTrueOrFalse";
import EditYesOrNo from "./edit_question_types/EditYesOrNo";
import EditMatching from "./edit_question_types/EditMatching";
import Transition from "../../../../common/Transition";
import Route from "../../../../routes/Route";
import { attachment } from "../../../../data/Static";

const EditQuestion = ({
  id,
  details,
  options,
  optionsTwo,
  open,
  setOpen,
  fetchQuestions,
  setOpenNotification,
  setMessage,
}) => {
  const keyArray = ["first", "second", "third", "fourth"];
  const optionsOnes = options.map((option, index) => ({
    id: option.id,
    position: keyArray[index],
  }));
  const optionsTwos = optionsTwo.map((option, index) => ({
    id: option.id,
    optionOne: option.optionOne,
    position: keyArray[index],
  }));
  const matchingOutput = {};
  optionsOnes.forEach((optionOne) => {
    const matchedOption = optionsTwos.find(
      (optionTwo) => optionTwo.optionOne === optionOne.id
    );
    if (matchedOption) {
      matchingOutput[optionOne.position] = matchedOption.position;
    }
  });
  // init states
  const [questionDetails, setQuestionDetails] = useState({
    questionType: details?.question_type,
    point: details?.point,
    question: details?.question,
    choice: [
      {
        first: options[0]?.description,
        second: options[1]?.description,
        third: options[2]?.description,
        fourth: options[3]?.description,
      },
    ],
    choice2:
      optionsTwo?.length > 0
        ? [
            {
              first: optionsTwo[0]?.description,
              second: optionsTwo[1]?.description,
              third: optionsTwo[2]?.description,
              fourth: optionsTwo[3]?.description,
            },
          ]
        : [],
    matching: [matchingOutput],
    video: details?.video,
    audio: details?.audio,
    answer:
      options[0]?.isTrue === true
        ? "first"
        : options[1]?.isTrue === true
        ? "second"
        : options[2]?.isTrue === true
        ? "third"
        : options[3]?.isTrue === true
        ? "fourth"
        : undefined,
  });
  const [questionTypes, setQuestionTypes] = useState([]);
  const [attachFile, setAttachFile] = useState(1);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const token = localStorage.getItem("token");
  // fetch Question Types
  const fetchQuestionTypes = async () => {
    const res = await Route("GET", `/question-types`, token, null, null);
    if (res?.status === 200) {
      setQuestionTypes(res?.data?.questionTypes);
    }
  };
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
  // call functions
  useEffect(() => {
    fetchQuestionTypes();
  }, []);
  // handlers
  const questionTypeHandle = (e) => {
    setQuestionDetails((prev) => ({
      ...prev,
      questionType: e.target.value,
    }));
  };
  const pointHandle = (e) => {
    setQuestionDetails((prev) => ({
      ...prev,
      point: parseInt(e.target.value),
    }));
  };
  const questionHandle = (e) => {
    setQuestionDetails((prev) => ({
      ...prev,
      question: e.target.value,
    }));
  };
  const attachmentHandle = (e) => {
    setQuestionDetails((prev) => ({
      ...prev,
      video: null,
      audio: null,
    }));
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
    setQuestionDetails((prev) => ({
      ...prev,
      question: e.target.value,
    }));
  };
  const audioHandle = (e) => {
    setQuestionDetails((prev) => ({
      ...prev,
      question: e.target.value,
    }));
  };
  const choiceHandle = (option, text) => {
    setQuestionDetails((prev) => ({
      ...prev,
      choice: prev.choice.map((existingOptions) => {
        if (existingOptions.hasOwnProperty(option)) {
          return { ...existingOptions, [option]: text };
        } else {
          return existingOptions;
        }
      }),
    }));
  };
  const choiceTwoHandle = (option, text) => {
    setQuestionDetails((prev) => ({
      ...prev,
      choice2: prev.choice2.map((existingOptions) => {
        if (existingOptions.hasOwnProperty(option)) {
          return { ...existingOptions, [option]: text };
        } else {
          return existingOptions;
        }
      }),
    }));
  };
  const answerHandle = (option) => {
    setQuestionDetails((prev) => ({
      ...prev,
      answer: option,
    }));
  };
  const matchingAnswerHandle = (option, text) => {
    setQuestionDetails((prev) => ({
      ...prev,
      matching: prev.matching.map((existingOptions) => {
        if (existingOptions.hasOwnProperty(option)) {
          return { ...existingOptions, [option]: text };
        } else {
          return existingOptions;
        }
      }),
    }));
  };
  const renderQuestionType = () => {
    switch (questionDetails?.questionType) {
      case 1:
        return (
          <EditMcq
            options={options}
            choiceHandle={choiceHandle}
            answerHandle={answerHandle}
          />
        );
      case 2:
        return (
          <EditFillInTheBlank
            options={options}
            choiceHandle={choiceHandle}
            answerHandle={answerHandle}
          />
        );
      case 3:
        return (
          <EditTrueOrFalse options={options} answerHandle={answerHandle} />
        );
      case 4:
        return <EditYesOrNo options={options} answerHandle={answerHandle} />;
      case 5:
        return (
          <EditMatching
            options={options}
            optionsTwo={optionsTwo}
            choiceHandle={choiceHandle}
            choiceTwoHandle={choiceTwoHandle}
            answerHandle={matchingAnswerHandle}
          />
        );
      default:
        return null;
    }
  };
  // update function
  const handleSubmit = async () => {
      const response = await Route("PUT", `/questions`, token, questionDetails, id);
      if (response?.status === 201) {
        setMessage(response?.data?.message);
        setOpenNotification(true);
        fetchQuestions();
        setOpen(false);
      } else {
        setMessage(response?.response?.data?.message);
        setOpenNotification(true);
      }
  };
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          <Box p={2} sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormControl required sx={{ minWidth: 300 }}>
              <InputLabel id="question-type-label">Question Type</InputLabel>
              <Select
                labelId="question-type-label"
                id="question-type-select"
                label="Question Type"
                defaultValue={details?.question_type}
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
                defaultValue={details?.point}
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
              defaultValue={details?.question}
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
                  defaultValue={details?.video}
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
                  defaultValue={details?.audio}
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
        </DialogContent>
        <DialogActions sx={{ mb: 2, mx: 2 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Update
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditQuestion;
