import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import McqOptions from "./McqOptions";
import FillInTheBlankOptions from "./FillInTheBlankOptions";
import TrueOrFalseOptions from "./TrueOrFalseOptions";
import YesOrNoOptions from "./YesOrNoOptions";
import MatchingOptions from "./MatchingOptions";
import Route from "../../../routes/Route";
import Notification from "../../../ui/Notification";
import ReactPlayer from "react-player";

const Solution = ({ index, question, setResult, setSolvedQuestions }) => {
  const [options, setOptions] = useState([]);
  const [optionsTwo, setOptionsTwo] = useState([]);
  const [message, setMessage] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const token = localStorage.getItem("token");
  const fetchOptions = async () => {
    const res = await Route("GET", "/options", token, null, question?.id);
    if (res?.status === 200) {
      setOptions(res?.data?.options);
      setOptionsTwo(res?.data?.optionsTwo);
    } else {
      setMessage(res?.data?.message);
      setOpenNotification(true);
    }
  };
  useEffect(() => {
    setOptions([]);
    setOptionsTwo([]);
    fetchOptions();
  }, [question]);
  const renderOptions = () => {
    switch (question?.question_type) {
      case 1:
        return (
          <McqOptions
            options={options}
            point={question?.point}
            setResult={setResult}
            setSolvedQuestions={setSolvedQuestions}
            questionId={question?.id}
          />
        );
      case 2:
        return (
          <FillInTheBlankOptions
            options={options}
            point={question?.point}
            setResult={setResult}
            setSolvedQuestions={setSolvedQuestions}
            questionId={question?.id}
          />
        );
      case 3:
        return (
          <TrueOrFalseOptions
            options={options}
            point={question?.point}
            setResult={setResult}
            setSolvedQuestions={setSolvedQuestions}
            questionId={question?.id}
          />
        );
      case 4:
        return (
          <YesOrNoOptions
            options={options}
            point={question?.point}
            setResult={setResult}
            setSolvedQuestions={setSolvedQuestions}
            questionId={question?.id}
          />
        );
      case 5:
        return (
          <MatchingOptions
            options={options}
            optionsTwo={optionsTwo}
            point={question?.point}
            setResult={setResult}
            setSolvedQuestions={setSolvedQuestions}
            questionId={question?.id}
          />
        );
      default:
        return null;
    }
  };
  useEffect(() => {
    renderOptions();
  }, [options]);
  return (
    <>
      <Paper>
        <Box sx={{ flexGrow: 1, marginBottom: 2, padding: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h5">
              {index}. {question?.question}
            </Typography>
          </Grid>
          {
            question?.video !== null || question?.audio !== null ? <Grid item xs={12} sx={{ paddingY: 2 }}>
            <ReactPlayer
              className="react-player"
              url={question?.Video?.path || question?.Audio?.path}
              width="100%"
              height="400px"
              controls
              config={{
                youtube: {
                  playerVars: { rel: 0 },
                },
              }}
            />
          </Grid> : null
          }
          <Grid item xs={12}>
            {options?.length > 0 && renderOptions()}
          </Grid>
        </Box>
      </Paper>
      {openNotification && (
        <Notification
          open={openNotification}
          setOpen={setOpenNotification}
          message={message}
        />
      )}
    </>
  );
};

export default Solution;
