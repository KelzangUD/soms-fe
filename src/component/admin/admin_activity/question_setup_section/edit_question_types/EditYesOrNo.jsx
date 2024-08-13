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

const EditYesOrNo = ({ options, answerHandle }) => {
  return (
    <>
      <Box p={2}>
        <FormControl fullWidth>
          <RadioGroup
            aria-labelledby="group-label"
            name="radio-group"
            defaultValue={options[0].isTrue ? 1 : 2}
          >
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Yes"
                  id="yes"
                  variant="outlined"
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel
                  value={1}
                  control={<Radio onChange={() => answerHandle("Yes")} />}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="No"
                  id="no"
                  variant="outlined"
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel
                  value={2}
                  control={<Radio onChange={() => answerHandle("No")} />}
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export default EditYesOrNo;
