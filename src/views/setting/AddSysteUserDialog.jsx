import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import {
  Autocomplete,
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
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from 'formik';
import Route from '../../routes/Route';
import * as Yup from 'yup';
import { FixedSizeList } from 'react-window';
import Notification from '../../ui/Notification';

const VirtualizedListboxComponent = forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  // const theme = useTheme();
  const itemData = React.Children.toArray(children);

  return (
    <div ref={ref} {...other}>
      <FixedSizeList
        height={200} // Define the height of the listbox
        width='100%'  // Define the width of the listbox
        itemSize={35} // Define the height of each item
        itemCount={itemData.length}
        outerElementType="ul" // Ensure it behaves as a list
        innerElementType="ul" // Ensure the inner element behaves as a list
      >
        {({ index, style }) => (
          <li style={{ ...style, display: 'block' }} key={index}>
            {itemData[index]}
          </li>
        )}
      </FixedSizeList>
    </div>
  );
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const AddSystemUserDialog = ({ open, handleClose, fetchSystemUser }) => {
  AddSystemUserDialog.prototype = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    fetchSystemUser: PropTypes.func.isRequired
  };
  const ref = useRef(null);
  const user = localStorage.getItem('username');
  const [employeeCode, setEmployeeCode] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [location, setLocation] = useState([]);
  const [subInventory, setSubInventory] = useState([]);
  const [locator, setLocator] = useState([]);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [showNotification, setShowNofication] = useState(false);
  const [severity, setSeverity] = useState('');

  const fetchEmployeeList = async () => {
    const res = await Route("GET", "/UserDtls/fetchEmpCodeList", null, null, null);
    if (res.status === 200) {
      setEmployeeCode(res?.data);
    }
  };

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

  const fetchSubInventory = async (id) => {
    const res = await Route("GET", `/Common/FetchSubinventry_By_Location?workLocation=${id}`, null, null, null);
    if (res.status === 200) {
      setSubInventory(res?.data);
    }
  };

  const fetchLocator = async (id, storeId) => {
    const res = await Route("GET", `/Common/Fetch_Locator?workLocation=${storeId}&subInventory=${id}`, null, null, null);
    if (res.status === 200) {
      setLocator(res?.data);
    }
  };

  useEffect(() => {
    fetchEmployeeList();
    fetchRole();
    fetchWorkLocation();
  }, []);

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="add_system_user"
        ref={ref}
        id="add_system_user"
        open={open}
        // fullScreen
        fullWidth
        maxWidth={'lg'}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="add_system_user_dialog">
          Add User
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
              employee_code: '',
              user_code: '',
              full_name: '',
              email_address: '',
              roleId: '',
              storeId: '',
              subInventoryId: '',
              locatorId: '',
              createdBy: ''
            }}
            validationSchema={Yup.object().shape({
              employee_code: Yup.string().required('Select the employee details.'),
              roleId: Yup.string().required('Role is required'),
              storeId: Yup.string().required('Store is required')
            })}
            onSubmit={async (values, { setStatus, setSubmitting, resetForm }) => {
              try {
                let data = {
                  'user_code': values.employee_code,
                  'roleId': values.roleId,
                  'storeId': values.storeId,
                  'subInventoryId': values.subInventoryId,
                  'locatorId': values.locatorId,
                  'createdBy': user
                };

                const res = await Route("POST", `/UserDtls/addEmployeeDetails`, null, data, null);
                if (res.data.responseCode === 0) {
                  setNotificationMsg(res.data.responseText);
                  setSeverity("info");
                  setShowNofication(true);

                  setStatus({ success: true });
                  setSubmitting(false);
                  resetForm();

                  fetchSystemUser();
                  handleClose();
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
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, resetForm }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      disableListWrap
                      options={employeeCode}
                      getOptionLabel={(option) => option.employee_code || ""}
                      value={employeeCode.find(option => option.user_code === values.employee_code) || null} // Set value from Formik's values
                      onChange={(e, newValue) => {
                        setFieldValue('employee_code', newValue ? newValue.user_code : '');
                        setFieldValue('full_name', newValue ? newValue.full_name : '');
                        setFieldValue('email_address', newValue ? newValue.email_address : '');
                      }}
                      onBlur={handleBlur}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Employee Code"
                          name="employee_code"
                          margin="normal"
                          variant="outlined"
                        />
                      )}
                      renderOption={(props, option) => (
                        <MenuItem {...props} key={option.user_code} value={option.user_code}>
                          {option.employee_code}
                        </MenuItem>
                      )}
                      ListboxComponent={VirtualizedListboxComponent} // Use the virtualized list with forwardRef
                      fullWidth
                      style={{ width: '100%' }}
                    />
                    {touched.employee_code && errors.employee_code && (
                      <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.employee_code}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4} style={{ paddingLeft: '1%' }}>
                    <TextField
                      fullWidth
                      label="User Code(This will be used as login id)"
                      margin="normal"
                      name="user_code"
                      defaultValue='eg. E00001'
                      value={values.employee_code}
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
                      value={values.full_name}
                      disabled
                    />
                  </Grid>
                </Grid>
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
                        fetchSubInventory(e.target.value);
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
                        fetchLocator(e.target.value, values.storeId);
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
                    Create User
                  </Button>
                  <Button
                    onClick={resetForm}
                    size="large"
                    type='button'
                    variant="contained"
                    color="warning"
                  >
                    Reset
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
  );
};

export default AddSystemUserDialog;