import React, { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, IconButton, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
import { Formik } from 'formik';
import Route from '../../routes/Route';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const AddConditionModal = ({ handleClose, open, setConditions, type, condition }) => {
  const ref = useRef(null);
  const [hierarchyList, setHierarchyList] = useState([]);
  const [hierarchyLevelList, sethierarchyLevelList] = useState([]);
  const [systemUser, setSystemUser] = useState([]);

  const fetchHierarchyList = async () => {
    const res = await Route("GET", `/Common/FetchHierarchyName`, null, null, null);
    if (res?.status === 200) {
      setHierarchyList(res?.data);
    }
  };

  const fetchHierarchyLevel = async (e) => {
    const res = await Route("GET", `/Common/FetchHierarchyLevel/${e}`, null, null, null);
    if (res?.status === 200) {
      sethierarchyLevelList(res?.data);
    }
  };

  const fetchSystemUserList = async () => {
    const res = await Route("GET", `/UserDtls/getAllUserList`, null, null, null);
    if (res?.status === 200) {
      setSystemUser(res?.data);
    }
  };

  useEffect(() => {
    fetchHierarchyList();
    fetchSystemUserList();
    if(condition?.hierarchyLevel !== null || condition?.hierarchyLevel !== '') {
      fetchHierarchyLevel(condition?.hierarchyName);
    }
  }, [condition?.hierarchyLevel, condition?.hierarchyName]);

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="add_new_role"
        ref={ref}
        id="add_new_role"
        open={open}
        fullWidth
        maxWidth={'md'}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="add_new_role_dialog">
          Conditions
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Formik
            enableReinitialize
            initialValues={{
              'hierarchyName': condition?.hierarchyName || '',
              'hierarchyLevel': condition?.hierarchyLevel || '',
              'employeeId': condition?.employeeId || '',
              'employeeName': condition?.employeeName || '',
              'approvalType': condition?.approvalType || '',
              'frequency': condition?.frequency || '',
              'fyiEmail': condition?.fyiEmail || '',
              'fyiEmployeeId': condition?.fyiEmployeeId || '',
              'fyiEmployeeName': condition?.fyiEmployeeName || '',
              'fyiChecked': condition?.fyiChecked || '',
              'hierarchyId': condition?.hierarchyId || '',
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);

              // Send form values to the parent component
              setConditions([values]);

              setSubmitting(false);
              resetForm();
              handleClose();
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container>
                  <Grid item xs={12} sm={12} style={{ marginBottom: '2%' }}>
                    <TextField
                      fullWidth
                      label="Type"
                      margin="normal"
                      name="type"
                      value={type}
                      disabled={true}
                    />
                  </Grid>
                </Grid>
                <FormLabel id="approval-row-radio-buttons-group-label" required>Approval</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="approval-radio-buttons-group-label"
                  name="approvalType"
                  value={values.approvalType}
                  onChange={handleChange}
                >
                  <FormControlLabel value="hierarchy" control={<Radio />} label="Hierarchy" />
                  <FormControlLabel value="singleUser" control={<Radio />} label="Single User" />
                  <FormControlLabel value="auto" control={<Radio />} label="Auto Approval" />
                </RadioGroup>
                {values.approvalType === "hierarchy" && (
                  <Grid container style={{ marginTop: '2%' }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        margin="normal"
                        name="hierarchyId"
                        type="text"
                        value={values.hierarchyId}
                        onChange={(e) => {
                          handleChange(e);
                          const selectedItem = hierarchyList.find(item => item.id === e.target.value);
                          if (selectedItem) {
                            setFieldValue('hierarchyId', selectedItem.id);
                            setFieldValue('hierarchyName', selectedItem.hierarchyName);
                            fetchHierarchyLevel(selectedItem.hierarchyName);
                          }
                        }}
                        onBlur={handleBlur}
                        variant="outlined"
                        select
                      >
                        {hierarchyList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.hierarchyName}
                          </MenuItem>
                        ))}
                      </TextField>
                      {touched.hierarchyName && errors.hierarchyName && (
                        <FormHelperText error id="standard-weight-helper-text--register">
                          {errors.hierarchyName}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ paddingLeft: '1%' }}>
                      <TextField
                        fullWidth
                        label="Level"
                        margin="normal"
                        name="hierarchyLevel"
                        type="text"
                        value={values.hierarchyLevel}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        select
                      >
                        {hierarchyLevelList.map((item) => (
                          <MenuItem key={item.hierarchyLevel} value={item.hierarchyLevel}>
                            {item.hierarchyLevel}
                          </MenuItem>
                        ))}
                      </TextField>
                      {touched.hierarchyLevel && errors.hierarchyLevel && (
                        <FormHelperText error id="standard-weight-helper-text--register">
                          {errors.hierarchyLevel}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                )}
                {values.approvalType === "singleUser" && (
                  <Grid container style={{ marginTop: '2%' }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Employee"
                        margin="normal"
                        name="employeeId"
                        type="text"
                        value={values.employeeId}
                        onChange={(e) => {
                          handleChange(e);

                          const selectedItem = systemUser.find(item => item.user_code === e.target.value);
                          if (selectedItem) {
                            setFieldValue('employeeId', selectedItem.user_code);
                            setFieldValue('employeeName', `${selectedItem.employee_code} (${selectedItem.full_name})`);
                          }
                        }}
                        onBlur={handleBlur}
                        variant="outlined"
                        select
                      >
                        {systemUser.map((item) => (
                          <MenuItem key={item.user_code} value={item.user_code}>
                            {`${item.employee_code} (${item.full_name})`}
                          </MenuItem>
                        ))}
                      </TextField>
                      {touched.employeeId && errors.employeeId && (
                        <FormHelperText error id="standard-weight-helper-text--register">
                          {errors.employeeId}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                )}
                <FormLabel id="approval-row-radio-buttons-group-label">FYI</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="fyiChecked"
                        checked={values.fyiChecked}
                        onChange={handleChange}
                      />
                    }
                    label="FYI"
                  />
                </FormGroup>
                <Grid container>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Frequency"
                      margin="normal"
                      name="frequency"
                      type="text"
                      value={values.frequency}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      select
                      disabled={!values.fyiChecked} // Disable when checkbox is unchecked
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Level1">Level 1</MenuItem>
                      <MenuItem value="Level2">Level 2</MenuItem>
                      <MenuItem value="Level3">Level 3</MenuItem>
                    </TextField>
                    {touched.frequency && errors.frequency && (
                      <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.frequency}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4} style={{ paddingLeft: '1%' }}>
                    <TextField
                      fullWidth
                      label="Email"
                      margin="normal"
                      name="fyiEmail"
                      value={values.fyiEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={!values.fyiChecked} // Disable when checkbox is unchecked
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} style={{ paddingLeft: '1%' }}>
                    <TextField
                      fullWidth
                      label="Employee"
                      margin="normal"
                      name="fyiEmployeeId"
                      type="text"
                      value={values.fyiEmployeeId}
                      onChange={(e) => {
                        handleChange(e);

                        const selectedItem = systemUser.find(item => item.user_code === e.target.value);
                        if (selectedItem) {
                          setFieldValue('fyiEmployeeId', selectedItem.user_code);
                          setFieldValue('fyiEmployeeName', `${selectedItem.employee_code} (${selectedItem.full_name})`);
                        }
                      }}
                      onBlur={handleBlur}
                      variant="outlined"
                      select
                      disabled={!values.fyiChecked} // Disable when checkbox is unchecked
                    >
                      {systemUser.map((item) => (
                        <MenuItem key={item.user_code} value={item.user_code}>
                          {`${item.employee_code} (${item.full_name})`}
                        </MenuItem>
                      ))}
                    </TextField>
                    {touched.fyiEmployeeId && errors.fyiEmployeeId && (
                      <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.fyiEmployeeId}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
                <DialogActions sx={{ justifyContent: 'center' }}>
                  <Button
                    autoFocus
                    disableElevation
                    disabled={isSubmitting}
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={handleClose}
                    size="large"
                    type='button'
                    variant="contained"
                    color="warning"
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}

export default AddConditionModal;
