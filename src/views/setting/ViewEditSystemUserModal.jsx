import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Route from '../../routes/Route';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Notification from '../../ui/Notification';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const ViewEditSystemUserModal = ({ open, handleClose, fetchSystemUser, data, actionType }) => {
  ViewEditSystemUserModal.prototype = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    fetchSystemUser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    actionType: PropTypes.object.isRequired
  };
  const ref = useRef(null);
  const [roleList, setRoleList] = useState([]);
  const [location, setLocation] = useState([]);
  const [subInventory, setSubInventory] = useState([]);
  const [locator, setLocator] = useState([]);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [showNotification, setShowNofication] = useState(false);
  const [severity, setSeverity] = useState('');
  const user = localStorage.getItem('username');

  const fetchRole = async () => {
    const res = await Route("GET", "/Common/FetchRole", null, null, null);
    if (res.status === 200) {
      setRoleList(res?.data);
    }
  };

  const fetchWorkLocation = async () => {
    const res = await Route("GET", "/Common/FetchStore", null, null, null);
    if (res.status === 200) {
      setLocation(res?.data);
    }
  };

  const fetchSubInventory = async () => {
    const res = await Route("GET", `/Common/FetchSubinventry_By_Location?workLocation=${data?.storeId}`, null, null, null);
    if (res.status === 200) {
      setSubInventory(res?.data);
    }
  };

  const fetchLocator = async (id) => {
    const res = await Route("GET", `/Common/Fetch_Locator?workLocation=${data?.storeId}&subInventory=${id}`, null, null, null);
    if (res.status === 200) {
      setLocator(res?.data);
    }
  };

  useEffect(() => {
    fetchRole();
    fetchWorkLocation();
    fetchSubInventory();
    if (data?.subInventoryId !== '') {
      fetchLocator(data?.subInventoryId);
    }
  }, []);

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="view_system_user"
        ref={ref}
        id="view_system_user"
        open={open}
        // fullScreen
        fullWidth
        maxWidth={'lg'}
      >
        {actionType === 'view' ? (
          <>
            <DialogTitle sx={{ m: 0, p: 2 }} id="add_system_user_dialog">
              View User
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
          </>
        ) : (
          <>
            <DialogTitle sx={{ m: 0, p: 2 }} id="add_system_user_dialog">
              Edit User
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
          </>
        )}
        <DialogContent dividers>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Employee Code"
                margin="normal"
                defaultValue='eg. E00001'
                value={data?.employee_code}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4} style={{ paddingLeft: '1%' }}>
              <TextField
                fullWidth
                label="User Code(This will be used as login id)"
                margin="normal"
                name="user_code"
                defaultValue='eg. E00001'
                value={data?.user_code}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4} style={{ paddingLeft: '1%' }}>
              <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                name="user_code"
                defaultValue='eg. John'
                value={data?.full_name}
                disabled
              />
            </Grid>
          </Grid>
          {actionType === 'view' ? (
            <>
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    margin="normal"
                    name="email_address"
                    defaultValue='eg. john@example.com'
                    value={data?.email_address}
                    disabled
                  />
                </Grid><Grid item xs={12} sm={4} style={{ paddingLeft: '1%' }}>
                  <TextField
                    fullWidth
                    label="Role"
                    margin="normal"
                    name="roleId"
                    type="text"
                    value={data?.roleName}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4} style={{ paddingLeft: '1%' }}>
                  <TextField
                    fullWidth
                    label="Work Location"
                    margin="normal"
                    name="storeId"
                    type="text"
                    value={data?.storeName}
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Sub Inventory"
                    margin="normal"
                    name="subInventoryId"
                    type="text"
                    value={data?.subInventoryId}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4} style={{ paddingLeft: '1%' }}>
                  <TextField
                    fullWidth
                    label="Locator"
                    margin="normal"
                    name="locatorId"
                    type="text"
                    value={data?.locatorId}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4} style={{ paddingLeft: '1%' }}>
                  <TextField
                    fullWidth
                    label="Status"
                    margin="normal"
                    name="status"
                    type="text"
                    value={data?.status}
                    disabled
                  />
                </Grid>
              </Grid>
              <DialogActions sx={{ justifyContent: 'center' }}>
                <Button
                  onClick={handleClose}
                  size="large"
                  type='button'
                  variant="contained"
                  color="warning"
                >
                  close
                </Button>
              </DialogActions>
            </>
          ) : (
            <>
              <Formik
                enableReinitialize
                initialValues={{
                  person_id: data?.person_id,
                  email_address: data?.email_address,
                  roleId: data?.roleId,
                  storeId: data?.storeId,
                  subInventoryId: data?.subInventoryId,
                  locatorId: data?.locatorId,
                  createdBy: user,
                  status: data?.status,
                  password: '',
                  confirmPassword: ''
                }}
                validationSchema={Yup.object().shape({
                  roleId: Yup.string().required('Role is required'),
                  storeId: Yup.string().required('Store is required'),
                  status: Yup.string().required('Status is required'),
                  password: Yup.string()
                    .min(8, 'Password must be at least 8 characters')
                    .notRequired(),
                  confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .test('passwords-match', 'Passwords must match', function (value) {
                      return !this.parent.password || value === this.parent.password;
                    })
                })}
                onSubmit={async (values, { setStatus, setSubmitting }) => {
                  try {
                    let data = {
                      'person_id': values.person_id,
                      'roleId': values.roleId,
                      'storeId': values.storeId,
                      'subInventoryId': values.subInventoryId,
                      'locatorId': values.locatorId,
                      'updatedBy': user,
                      'status': values.status,
                      'password': values.password
                    };
    
                    const res = await Route("PUT", `/UserDtls/updateUser`, null, data, null);
                    if (res.data.responseCode === 0) {
                      setNotificationMsg(res.data.responseText);
                      setSeverity("info");
                      setShowNofication(true);
    
                      setStatus({ success: true });
                      setSubmitting(false);
    
                      fetchSystemUser();
                      // handleClose();
                    } else {
                      setNotificationMsg(res.data.responseText);
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
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, values, touched }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    <Grid container>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          margin="normal"
                          name="email_address"
                          defaultValue='eg. john@example.com'
                          value={values.email_address}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} style={{ paddingLeft: '1%' }}>
                        <TextField
                          fullWidth
                          label="Role"
                          margin="normal"
                          name="roleId"
                          type="text"
                          value={values.roleId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          select
                        >
                          {roleList.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.type}
                            </MenuItem>
                          ))}
                        </TextField>
                        {touched.roleId && errors.roleId && (
                          <FormHelperText error id="standard-weight-helper-text--register">
                            {errors.roleId}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={4} style={{ paddingLeft: '1%' }}>
                        <TextField
                          fullWidth
                          label="Work Location"
                          margin="normal"
                          name="storeId"
                          type="text"
                          value={values.storeId}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          variant="outlined"
                          select
                        >
                          {location.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </TextField>
                        {touched.storeId && errors.storeId && (
                          <FormHelperText error id="standard-weight-helper-text--register">
                            {errors.storeId}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Sub Inventory"
                          margin="normal"
                          name="subInventoryId"
                          type="text"
                          value={values.subInventoryId}
                          onChange={(e) => {
                            handleChange(e);
                            fetchLocator(e.target.value);
                          }}
                          onBlur={handleBlur}
                          variant="outlined"
                          select
                        >
                          {subInventory.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.id}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={4} style={{ paddingLeft: '1%' }}>
                        <TextField
                          fullWidth
                          label="Locator"
                          margin="normal"
                          name="locatorId"
                          type="text"
                          value={values.locatorId}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          variant="outlined"
                          select
                        >
                          {locator.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.id}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={4} style={{ paddingLeft: '1%' }}>
                        <TextField
                          fullWidth
                          label="Status"
                          margin="normal"
                          name="status"
                          type="text"
                          value={values.status}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          variant="outlined"
                          select
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="In_Active">In_Active</MenuItem>
                        </TextField>
                        {touched.status && errors.status && (
                          <FormHelperText error id="standard-weight-helper-text--register">
                            {errors.status}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Password"
                          margin="normal"
                          name="password"
                          type="text"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.password && errors.password && (
                          <FormHelperText error id="standard-weight-helper-text--register">
                            {errors.password}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={4} style={{ paddingLeft: '1%' }}>
                        <TextField
                          fullWidth
                          label="Confirm Password "
                          margin="normal"
                          name="confirmPassword"
                          type="text"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                          <FormHelperText error id="standard-weight-helper-text--register">
                            {errors.confirmPassword}
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
                        Edit User
                      </Button>
                      <Button
                        onClick={handleClose}
                        size="large"
                        type='button'
                        variant="contained"
                        color="warning"
                      >
                        close
                      </Button>
                    </DialogActions>
                  </form>
                )}
              </Formik>
            </>
          )}
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
  );
}

export default ViewEditSystemUserModal;
