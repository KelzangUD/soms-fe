import React, { useRef } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ViewConditionModal = ({ open, handleClose, condition, type }) => {
  const ref = useRef(null);
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="add_new_role"
        ref={ref}
        id="add_new_role"
        open={open}
        fullWidth
        maxWidth={"lg"}
      >
        <DialogTitle
          sx={{ px: 3, background: "#1976d2", color: "#eee" }}
          id="add_new_role_dialog"
        >
          Conditions
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#eee",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid container spacing={1} mb={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Type"
                size="small"
                name="approvalRuleName"
                value={type}
                disabled
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} mb={2}>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="approval-radio-button-group-label">
                  Approval*
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="approval-radio-button-group-label"
                  name="approval-radio-buttons-group"
                  value={condition?.approvalType}
                >
                  <FormControlLabel
                    value="hierarchy"
                    control={<Radio />}
                    label="Hierarchy"
                    disabled
                  />
                  <FormControlLabel
                    value="singleUser"
                    control={<Radio />}
                    label="Single User"
                    disabled
                  />
                  <FormControlLabel
                    value="auto"
                    control={<Radio />}
                    label="Auto Approval"
                    disabled
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                size="small"
                name="name"
                value={condition?.hierarchyName}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Level"
                size="small"
                name="level"
                value={condition?.hierarchyLevel}
                disabled
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} mb={2}>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="fyi-label">FYI</FormLabel>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Frequency"
                size="small"
                name="frequency"
                value={condition?.frequency}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Email"
                size="small"
                name="email"
                value={condition?.fyiEmail}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Employee"
                size="small"
                name="employee"
                value={condition?.fyiEmployeeName}
                disabled
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container sx={{ justifyContent: "flex-end", mt: 2 }}>
            <Button
              onClick={handleClose}
              size="small"
              type="button"
              variant="outlined"
              color="error"
            >
              Close
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewConditionModal;
