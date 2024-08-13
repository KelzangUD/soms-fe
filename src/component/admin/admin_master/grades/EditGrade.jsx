import * as React from "react";
import {
  Grid,
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
import Transition from "../../../../common/Transition";

const EditGrade = ({ details, open, setOpen }) => {
  const editHandle = () => {
    setOpen(false);
  };
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
    >
      <DialogTitle>Edit Grade</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 3, mt: 2 }}>
          <Grid container>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              name="title"
              required
              defaultValue={details?.title}
              size="small"
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl size="small" fullWidth>
                <InputLabel id="min-select-label">Min</InputLabel>
                <Select
                  labelId="min-select-label"
                  id="min-select-small"
                  label="Min"
                  defaultValue={details?.min}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={40}>40</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={60}>60</MenuItem>
                  <MenuItem value={70}>70</MenuItem>
                  <MenuItem value={80}>80</MenuItem>
                  <MenuItem value={90}>90</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl size="small" fullWidth>
                <InputLabel id="max-select-label">Max</InputLabel>
                <Select
                  labelId="max-select-label"
                  id="max-select-small"
                  // value={age}
                  label="Max"
                  defaultValue={details?.max}
                  // onChange={handleChange}
                >
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={19}>19</MenuItem>
                  <MenuItem value={29}>29</MenuItem>
                  <MenuItem value={39}>39</MenuItem>
                  <MenuItem value={49}>49</MenuItem>
                  <MenuItem value={59}>59</MenuItem>
                  <MenuItem value={69}>69</MenuItem>
                  <MenuItem value={79}>79</MenuItem>
                  <MenuItem value={89}>89</MenuItem>
                  <MenuItem value={99}>99</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 2, mx: 2 }}>
        <Button variant="contained" onClick={editHandle}>
          Update
        </Button>
        <Button onClick={() => setOpen(false)} variant="outlined" color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditGrade;
