import React from "react";
import {
  Box,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const McqOptions = ({
  options,
  point,
  setResult,
  setSolvedQuestions,
  questionId,
}) => {
  const answerHandle = (value) => {
    setSolvedQuestions((prevQuestions) => [...prevQuestions, questionId]);
    if (value) {
      setResult((prev) => ({
        ...prev,
        score: prev.score + point,
      }));
    } else {
      setResult((prev) => ({
        ...prev,
        score: prev.score === 0 ? 0 : prev.score - point,
      }));
    }
  };
  return (
    <>
      <Box p={2}>
        <FormControl fullWidth>
          <RadioGroup aria-labelledby="group-label" name="radio-group">
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Option 1"
                  id="your-text"
                  variant="outlined"
                  defaultValue={options[0]?.description}
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel
                  value="first"
                  control={
                    <Radio onChange={() => answerHandle(options[0]?.isTrue)} />
                  }
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Option 2"
                  id="your-text"
                  variant="outlined"
                  defaultValue={options[1]?.description}
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel
                  value="second"
                  control={
                    <Radio onChange={() => answerHandle(options[1]?.isTrue)} />
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Option 3"
                  id="your-text"
                  variant="outlined"
                  defaultValue={options[2]?.description}
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel
                  value="third"
                  control={
                    <Radio onChange={() => answerHandle(options[2]?.isTrue)} />
                  }
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Option 4"
                  id="your-text"
                  variant="outlined"
                  defaultValue={options[3]?.description}
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel
                  value="fourth"
                  control={
                    <Radio onChange={() => answerHandle(options[3]?.isTrue)} />
                  }
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export default McqOptions;
