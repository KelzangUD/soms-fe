import React, { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, Grid, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Route from '../../routes/Route';
import Notification from '../../ui/Notification';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const AddNewRoleModal = ({ handleClose, fetchRole, open }) => {
  console.log(open);
  const ref = useRef(null);
  const user = localStorage.getItem('username');
  const [notificationMsg, setNotificationMsg] = useState('');
  const [showNotification, setShowNofication] = useState(false);
  const [severity, setSeverity] = useState('');

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
          Add Role
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
            initialValues={{
              roleName: ''
            }}
            validationSchema={Yup.object().shape({
              roleName: Yup.string().required('Role name i required.')
            })}
            onSubmit={async (values, { setStatus, setSubmitting, resetForm }) => {
              try {
                const res = await Route("POST", `/UserDtls/createRole?roleName=${values.roleName}&createdBy=${user}`, null, null, null);
                if (res?.status === 201) {
                  setNotificationMsg('New Role is created successfully.');
                  setSeverity("info");
                  setShowNofication(true);

                  setStatus({ success: true });
                  setSubmitting(false);
                  resetForm();

                  fetchRole();
                  handleClose();
                } else {
                  setNotificationMsg('Error occured in creating new role. Try again!');
                  setSeverity("error");
                  setShowNofication(true);

                  setStatus({ success: false });
                  setSubmitting(false);
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Role name"
                      margin="normal"
                      name="roleName"
                      value={values.roleName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.roleName && errors.roleName && (
                      <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.roleName}
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
                    Create Role
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </BootstrapDialog>
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={setShowNofication}
          message={notificationMsg}
          severity={severity}
        />
      )}
    </>
  )
}

export default AddNewRoleModal;
