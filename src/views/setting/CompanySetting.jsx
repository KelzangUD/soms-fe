import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Grid,
  TextField,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import Route from "../../routes/Route";
import { Formik } from "formik";
import * as Yup from 'yup';
import Notification from "../../ui/Notification";

const CompanySetting = () => {
  const user = localStorage.getItem('username');
  const [companyDtls, setCompanyDtls] = useState({
    shortName: '',
    mobileNo: '',
    companyName: '',
    companyId: '',
    companyPhoneNo: '',
    tpn: '',
    contactPerson: '',
    contactEmail: '',
    postalCode: '',
    incorporateDate: '',
    companyAddress: '',
    region_id: '',
    country_id: '',
    dzongkhag_id: '',
    location_id: '',
    updatedBy: user,
    companyEmail: '',
    website: ''
  });
  const [country, setCountry] = useState([]);
  const [dzongkhag, setDzongkhag] = useState([]);
  const [location, setlocation] = useState([]);
  const [region, setRegion] = useState([]);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [showNotification, setShowNofication] = useState(false);
  const [severity, setSeverity] = useState('');

  const fetchCountry = async () => {
    const res = await Route("GET", `/Common/getCountry`, null, null, null);
    if (res?.status === 200) {
      setCountry(res?.data);
    }
  };

  const fetchRegion = async () => {
    const res = await Route("GET", `/Common/getRegion`, null, null, null);
    if (res?.status === 200) {
      setRegion(res?.data);
    }
  };

  const fetchState = async () => {
    const res = await Route("GET", `/Common/getState`, null, null, null);
    if (res?.status === 200) {
      setDzongkhag(res?.data);
    }
  };

  const fetchLocation = async () => {
    const res = await Route("GET", `/Common/FetchAllRegionOrExtension`, null, null, null);
    if (res?.status === 200) {
      setlocation(res?.data);
    }
  };

  const fetchCompanyDtls = async () => {
    const res = await Route("GET", `/UserDtls/getCompanyDetail`, null, null, null);
    if (res?.status === 200) {
      setCompanyDtls(prevState => ({
        ...prevState,
        ...res?.data,
        updatedBy: user
      }));
    }
  };

  useEffect(() => {
    fetchCountry();
    fetchRegion();
    fetchState();
    fetchLocation();
    fetchCompanyDtls();
  }, []);

  return (
    <>
      <Box sx={{ px: 2 }}>
        <Formik
          enableReinitialize
          initialValues={companyDtls}
          validationSchema={Yup.object().shape({
            shortName: Yup.string().required('Company short name is required.'),
            companyName: Yup.string().required('Company Name is required'),
            tpn: Yup.string().required('TPN is required'),
            companyPhoneNo: Yup.string().required('Phone No. is required'),
            companyAddress: Yup.string().required('Company Address is required'),
            country_id: Yup.string().required('Country is required'),
            dzongkhag_id: Yup.string().required('State is required'),
            region_id: Yup.string().required('Region is required'),
            location_id: Yup.string().required('Location is required'),
            postalCode: Yup.string().required('Post code is required'),
            contactPerson: Yup.string().required('Contact Person is required'),
            contactEmail: Yup.string().required('Contact Email is required'),
            mobileNo: Yup.string().required('Contact No. is required'),
            website: Yup.string().required('Website is required')
          })}
          onSubmit={async (values, { setStatus, setSubmitting, resetForm }) => {
            try {
              let data = { ...values };
              const res = await Route("PUT", `/UserDtls/updateCompanyDetail`, null, data, null);
              if (res.data.responseCode === 0) {
                setNotificationMsg(res.data.responseText);
                setSeverity("info");
                setShowNofication(true);

                setStatus({ success: true });
                setSubmitting(false);
                resetForm();

                fetchCompanyDtls();
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
              <Grid container spacing={4} alignItems="center">
                {/* <SubHeader text="Company Setting" /> */}
                <Grid item xs={12}>
                  <Paper elevation={1} sx={{ px: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sx={{ my: 1 }}>
                        <TextField
                          label="Company Name"
                          variant="outlined"
                          fullWidth
                          name="companyName"
                          onChange={handleChange}
                          value={values.companyName}
                          onBlur={handleBlur}
                        />
                        {touched.companyName && errors.companyName && (
                          <FormHelperText error id="standard-weight-helper-text--register">
                            {errors.companyName}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item container spacing={2} sx={{ mb: 1 }}>
                        <Grid item xs={4}>
                          <TextField
                            label="Company Short Name"
                            variant="outlined"
                            fullWidth
                            name="shortName"
                            onChange={handleChange}
                            value={values.shortName}
                            onBlur={handleBlur}
                            defaultValue='shortName'
                          />
                          {touched.shortName && errors.shortName && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                              {errors.shortName}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            label="Incorporation Date"
                            variant="outlined"
                            fullWidth
                            name="incorporateDate"
                            value={values.incorporateDate}
                            defaultValue='shortName'
                            disabled='true'
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            label="TPN Number"
                            variant="outlined"
                            fullWidth
                            name="tpn"
                            onChange={handleChange}
                            value={values.tpn}
                            onBlur={handleBlur}
                            defaultValue='tpn'
                          />
                          {touched.tpn && errors.tpn && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                              {errors.tpn}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sx={{ mb: 1 }}>
                        <TextField
                          label="Address"
                          variant="outlined"
                          fullWidth
                          name="companyAddress"
                          onChange={handleChange}
                          value={values.companyAddress}
                          onBlur={handleBlur}
                          defaultValue='companyAddress'
                        />
                        {touched.companyAddress && errors.companyAddress && (
                          <FormHelperText error id="standard-weight-helper-text--register">
                            {errors.companyAddress}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item container spacing={2} sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            label="Country"
                            margin="normal"
                            name="country_id"
                            type="text"
                            value={values.country_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            select
                          >
                            {country.map((item) => (
                              <MenuItem key={item.country_id} value={item.country_id}>
                                {item.country_name}
                              </MenuItem>
                            ))}
                          </TextField>
                          {touched.country_id && errors.country_id && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                              {errors.country_id}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            label="Region"
                            margin="normal"
                            name="region_id"
                            type="text"
                            value={values.region_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            select
                          >
                            {region.map((item) => (
                              <MenuItem key={item.region_id} value={item.region_id}>
                                {item.region_name}
                              </MenuItem>
                            ))}
                          </TextField>
                          {touched.region_id && errors.region_id && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                              {errors.region_id}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            label="Dzongkhag"
                            margin="normal"
                            name="dzongkhag_id"
                            type="text"
                            value={values.dzongkhag_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            select
                          >
                            {dzongkhag.map((item) => (
                              <MenuItem key={item.state_id} value={item.state_id}>
                                {item.state_name}
                              </MenuItem>
                            ))}
                          </TextField>
                          {touched.dzongkhag_id && errors.dzongkhag_id && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                              {errors.dzongkhag_id}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            label="Location"
                            margin="normal"
                            name="location_id"
                            type="text"
                            value={values.location_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            select
                          >
                            {location.map((item) => (
                              <MenuItem key={item.locationId} value={item.locationId}>
                                {item.extensionName}
                              </MenuItem>
                            ))}
                          </TextField>
                          {touched.location_id && errors.location_id && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                              {errors.location_id}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                      <Grid item container spacing={2} sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                          <TextField
                            label="Postal Code"
                            variant="outlined"
                            fullWidth
                            name="postalCode"
                            onChange={handleChange}
                            value={values.postalCode}
                            onBlur={handleBlur}
                            defaultValue='postalCode'
                          />
                          {touched.postalCode && errors.postalCode && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                              {errors.postalCode}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Company Email"
                            variant="outlined"
                            fullWidth
                            name="companyEmail"
                            onChange={handleChange}
                            value={values.companyEmail}
                            onBlur={handleBlur}
                            defaultValue='companyEmail'
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            name="companyPhoneNo"
                            onChange={handleChange}
                            value={values.companyPhoneNo}
                            onBlur={handleBlur}
                            defaultValue='companyPhoneNo'
                          />
                          {touched.companyPhoneNo && errors.companyPhoneNo && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                              {errors.companyPhoneNo}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                      <Grid item container spacing={2} sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                          <TextField
                            label="Contact Person"
                            variant="outlined"
                            fullWidth
                            name="contactPerson"
                            onChange={handleChange}
                            value={values.contactPerson}
                            onBlur={handleBlur}
                            defaultValue='contactPerson'
                          />
                          {touched.contactPerson && errors.contactPerson && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                              {errors.contactPerson}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Contact Email"
                            variant="outlined"
                            fullWidth
                            name="contactEmail"
                            onChange={handleChange}
                            value={values.contactEmail}
                            onBlur={handleBlur}
                            defaultValue='contactEmail'
                          />
                          {touched.contactEmail && errors.contactEmail && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                              {errors.contactEmail}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            label="Mobile Number"
                            variant="outlined"
                            fullWidth
                            name="mobileNo"
                            onChange={handleChange}
                            value={values.mobileNo}
                            onBlur={handleBlur}
                            defaultValue='mobileNo'
                          />
                          {touched.mobileNo && errors.mobileNo && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                              {errors.mobileNo}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sx={{ mb: 1 }}>
                        <TextField
                          label="Website"
                          variant="outlined"
                          fullWidth
                          name="website"
                          onChange={handleChange}
                          value={values.website}
                          onBlur={handleBlur}
                          defaultValue='website'
                        />
                        {touched.website && errors.website && (
                          <FormHelperText error id="standard-weight-helper-text--register">
                            {errors.website}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid
                        container
                        spacing={2}
                        sx={{ my: 2, display: "flex", justifyContent: "center" }}
                      >
                        <Grid item>
                          <Button
                            autoFocus
                            disableElevation
                            disabled={isSubmitting}
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Save & Update
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="large"
                            onClick={resetForm}
                            style={{ marginLeft: '10px'}}
                          >
                            Reset
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
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

export default CompanySetting;
