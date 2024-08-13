import React, { useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  RadioGroup,
} from "@mui/material";

const MatchingOptions = ({
  options,
  optionsTwo,
  point,
  setResult,
  setSolvedQuestions,
  questionId,
}) => {
  const answerHandle = (option, value) => {
    setSolvedQuestions((prevQuestions) => {
      if (!prevQuestions.includes(questionId)) {
        return [...prevQuestions, questionId];
      } else {
        return prevQuestions;
      }
    });
    if (option === value) {
      setResult((prev) => ({
        ...prev,
        score: prev.score + point / 4,
      }));
    } else {
      setResult((prev) => ({
        ...prev,
        score: prev.score === 0 ? 0 : prev.score - point / 4,
      }));
    }
  };
  return (
    <>
      <Box p={2}>
        <FormControl fullWidth>
          <RadioGroup aria-labelledby="group-label" name="radio-group">
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="A"
                  id="your-text"
                  variant="outlined"
                  size="small"
                  defaultValue={options[0]?.description}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="I"
                  id="your-text"
                  variant="outlined"
                  size="small"
                  defaultValue={optionsTwo[0]?.description}
                  disabled
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="B"
                  id="your-text"
                  variant="outlined"
                  size="small"
                  defaultValue={options[1]?.description}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="II"
                  id="your-text"
                  variant="outlined"
                  size="small"
                  defaultValue={optionsTwo[1]?.description}
                  disabled
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="C"
                  id="your-text"
                  variant="outlined"
                  size="small"
                  defaultValue={options[2]?.description}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="III"
                  id="your-text"
                  variant="outlined"
                  size="small"
                  defaultValue={optionsTwo[2]?.description}
                  disabled
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="D"
                  id="your-text"
                  variant="outlined"
                  size="small"
                  defaultValue={options[3]?.description}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="IV"
                  id="your-text"
                  variant="outlined"
                  size="small"
                  defaultValue={optionsTwo[3]?.description}
                  disabled
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
      <Box p={2}>
        <FormControl fullWidth>
          <RadioGroup aria-labelledby="group-label" name="radio-group">
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="question-type-label">Option A</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    onChange={(e) =>
                      answerHandle(options[0]?.id, e.target.value)
                    }
                  >
                    {optionsTwo?.map((item) => (
                      <MenuItem key={item?.id} value={item?.optionOne}>
                        {item?.description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="question-type-label">Option B</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    onChange={(e) =>
                      answerHandle(options[1]?.id, e.target.value)
                    }
                  >
                    {optionsTwo?.map((item) => (
                      <MenuItem key={item?.id} value={item?.optionOne}>
                        {item?.description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="question-type-label">Option C</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    onChange={(e) =>
                      answerHandle(options[2]?.id, e.target.value)
                    }
                  >
                    {optionsTwo?.map((item) => (
                      <MenuItem key={item?.id} value={item?.optionOne}>
                        {item?.description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="question-type-label">Option D</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    onChange={(e) =>
                      answerHandle(options[3]?.id, e.target.value)
                    }
                  >
                    {optionsTwo?.map((item) => (
                      <MenuItem key={item?.id} value={item?.optionOne}>
                        {item?.description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export default MatchingOptions;
