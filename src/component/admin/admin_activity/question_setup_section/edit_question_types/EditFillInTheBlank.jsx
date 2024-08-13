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

const EditFillInTheBlank = ({ options, choiceHandle, answerHandle }) => {
  return (
    <>
      <Box p={2}>
        <FormControl fullWidth>
          <RadioGroup aria-labelledby="group-label" name="radio-group" defaultValue={1}>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  label="Add Answer"
                  id="your-text"
                  variant="outlined"
                  size="small"
                  defaultValue={options[0].description}
                  onChange={(e) => choiceHandle("first", e.target.value)}
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel
                  value={1}
                  control={
                    <Radio onChange={() => answerHandle("first")} />
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

export default EditFillInTheBlank;
