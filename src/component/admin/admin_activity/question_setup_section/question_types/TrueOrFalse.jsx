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

const TrueOrFalse = ({answerHandle}) => {
  return (
    <>
      <Box p={2}>
        <FormControl fullWidth>
          <RadioGroup aria-labelledby="group-label" name="radio-group">
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="True"
                  id="true"
                  variant="outlined"
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel value={true} control={<Radio onChange={() => answerHandle(true)} />} />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="False"
                  id="false"
                  variant="outlined"
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel value={false} control={<Radio onChange={() => answerHandle(false)} />} />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export default TrueOrFalse;
