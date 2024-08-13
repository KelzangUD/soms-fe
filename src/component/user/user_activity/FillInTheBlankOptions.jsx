import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const FillInTheBlankOptions = ({
  options,
  point,
  setResult,
  setSolvedQuestions,
  questionId,
}) => {
  const [answer, setAnswer] = useState("");
  const fillInTheBlankHandle = (e) => {
    setAnswer(e?.target?.value);
  };
  const answerHandle = (e) => {
    setSolvedQuestions((prevQuestions) => {
      if (!prevQuestions.includes(questionId)) {
        return [...prevQuestions, questionId];
      } else {
        return prevQuestions;
      }
    });
    if (
      answer?.toLowerCase().trim() ===
      options[0]?.description.toLowerCase().trim()
    ) {
      setResult((prev) => ({
        ...prev,
        score: prev.score + point,
      }));
    } else {
      setResult((prev) => ({
        ...prev,
        score: prev.score - point,
      }));
    }
  };
  return (
    <>
      <Box p={2}>
        <FormControl fullWidth>
          <RadioGroup aria-labelledby="group-label" name="radio-group">
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  label="Add Answer"
                  id="your-text"
                  variant="outlined"
                  size="small"
                  onChange={fillInTheBlankHandle}
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel
                  value="fourth"
                  control={<Radio onChange={answerHandle} />}
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export default FillInTheBlankOptions;
