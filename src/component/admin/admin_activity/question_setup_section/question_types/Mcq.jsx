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

const Mcq = ({choiceHandle, answerHandle}) => {
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
                  onChange={(e) => choiceHandle("first", e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel value="first" control={<Radio onChange={(e) => answerHandle(e.target.value)} />} />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Option 2"
                  id="your-text"
                  variant="outlined"
                  onChange={(e) => choiceHandle("second", e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel value="second" control={<Radio onChange={(e) => answerHandle(e.target.value)} />} />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Option 3"
                  id="your-text"
                  variant="outlined"
                  onChange={(e) => choiceHandle("third", e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel value="third" control={<Radio onChange={(e) => answerHandle(e.target.value)} />} />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Option 4"
                  id="your-text"
                  variant="outlined"
                  onChange={(e) => choiceHandle("fourth", e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel value="fourth" control={<Radio onChange={(e) => answerHandle(e.target.value)} />} />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export default Mcq;
