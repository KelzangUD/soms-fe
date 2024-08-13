import React from "react";
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
import { option } from "../../../../../data/Static";

const EditMatching = ({ options, optionsTwo, choiceHandle, choiceTwoHandle, answerHandle }) => {
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
                  defaultValue={options[0]?.description}
                  onChange={(e) => choiceHandle("first", e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="I"
                  id="your-text"
                  variant="outlined"
                  defaultValue={optionsTwo[0]?.description}
                  onChange={(e) => choiceTwoHandle("first", e.target.value)}
                  size="small"
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
                  defaultValue={options[1]?.description}
                  onChange={(e) => choiceHandle("second", e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="II"
                  id="your-text"
                  variant="outlined"
                  defaultValue={optionsTwo[1]?.description}
                  onChange={(e) => choiceTwoHandle("second", e.target.value)}
                  size="small"
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
                  defaultValue={options[2]?.description}
                  onChange={(e) => choiceHandle("third", e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="III"
                  id="your-text"
                  variant="outlined"
                  defaultValue={optionsTwo[2]?.description}
                  onChange={(e) => choiceTwoHandle("third", e.target.value)}
                  size="small"
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
                  defaultValue={options[3]?.description}
                  onChange={(e) => choiceHandle("fourth", e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="IV"
                  id="your-text"
                  variant="outlined"
                  defaultValue={optionsTwo[3]?.description}
                  onChange={(e) => choiceTwoHandle("fourth", e.target.value)}
                  size="small"
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
                    onChange={(e) => answerHandle("first", e.target.value)}
                  >
                    {option?.map((item) => (
                      <MenuItem key={item?.id} value={item?.value}>
                        {item?.title}
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
                    onChange={(e) => answerHandle("second", e.target.value)}
                  >
                    {option?.map((item) => (
                      <MenuItem key={item?.id} value={item?.value}>
                        {item?.title}
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
                    onChange={(e) => answerHandle("third", e.target.value)}
                  >
                    {option?.map((item) => (
                      <MenuItem key={item?.id} value={item?.value}>
                        {item?.title}
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
                    onChange={(e) => answerHandle("fourth", e.target.value)}
                  >
                    {option?.map((item) => (
                      <MenuItem key={item?.id} value={item?.value}>
                        {item?.title}
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

export default EditMatching;
