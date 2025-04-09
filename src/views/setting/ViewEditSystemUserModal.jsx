import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Route from "../../routes/Route";
import { Formik } from "formik";
import * as Yup from "yup";
import { Notification, SuccessNotification } from "../../ui/index";
import PermissionAccess from "../../component/roles_and_permission/PermissionAccess";

const ViewEditSystemUserModal = ({
  open,
  setOpen,
  fetchSystemUser,
  data,
  actionType,
}) => {
  ViewEditSystemUserModal.prototype = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    fetchSystemUser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    actionType: PropTypes.object.isRequired,
  };

  const access_token = localStorage.getItem("access_token");
  const ref = useRef(null);
  const [roleList, setRoleList] = useState([]);
  const [location, setLocation] = useState([]);
  const [subInventory, setSubInventory] = useState([]);
  const [locator, setLocator] = useState([]);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [severity, setSeverity] = useState("");
  const user = localStorage.getItem("username");
  const [userPrivileges, setUserPrivileges] = useState([]);
  const [moduleAccess, setModuleAccess] = useState([]);
  const [newPermission, setNewPermission] = useState([]);

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
    const res = await Route(
      "GET",
      `/Common/FetchSubinventry_By_Location?workLocation=${data?.storeId}`,
      null,
      null,
      null
    );
    if (res.status === 200) {
      setSubInventory(res?.data);
    }
  };

  const fetchLocator = async (id) => {
    const res = await Route(
      "GET",
      `/Common/Fetch_Locator?workLocation=${data?.storeId}&subInventory=${id}`,
      null,
      null,
      null
    );
    if (res.status === 200) {
      setLocator(res?.data);
    }
  };

  const fetchUserPrivileges = async (roleId, userId) => {
    const res = await Route(
      "GET",
      `/Common/fetchUserPermission?roleId=${roleId}&userId=${userId}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setUserPrivileges(res?.data);
    }
  };

  const fetchModuleAccess = async (id) => {
    const res = await Route(
      "GET",
      `/Common/fetchModuleAccess?roleId=${id}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setModuleAccess(res?.data);
    }
  };

  useEffect(() => {
    fetchRole();
    fetchWorkLocation();
    fetchSubInventory();
    if (data?.subInventoryId !== "") {
      fetchLocator(data?.subInventoryId);
    }
    fetchUserPrivileges(data.roleId, data.user_code);
    fetchModuleAccess(data.roleId);
  }, []);

  return (
    <>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="view_system_user"
        ref={ref}
        id="view_system_user"
        open={open}
        fullWidth
        maxWidth={"lg"}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            pl: 3,
            background: (theme) => theme.palette.bg.light,
            color: "#eee",
          }}
          id="add_system_user_dialog"
        >
          {actionType === "view" ? "View User" : "Edit User"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
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
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Employee Code"
                margin="normal"
                value={data?.employee_code}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="User Code(This will be used as login id)"
                margin="normal"
                name="user_code"
                value={data?.user_code}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Full Name"
                margin="normal"
                name="user_code"
                value={data?.full_name}
                disabled
              />
            </Grid>
          </Grid>
          {actionType === "view" ? (
            <>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Email Address"
                    margin="normal"
                    name="email_address"
                    value={data?.email_address}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Role"
                    margin="normal"
                    name="roleId"
                    type="text"
                    value={data?.roleName}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Work Location"
                    margin="normal"
                    name="storeId"
                    type="text"
                    value={data?.storeName}
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Sub Inventory"
                    margin="normal"
                    name="subInventoryId"
                    type="text"
                    value={data?.subInventoryId}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Locator"
                    margin="normal"
                    name="locatorId"
                    type="text"
                    value={data?.locatorId}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Status"
                    margin="normal"
                    name="status"
                    type="text"
                    value={data?.status}
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ my: 1, ml: 2 }}
                style={{ marginTop: "5%" }}
              >
                <PermissionAccess
                  permission={userPrivileges}
                  moduleAccess={moduleAccess}
                  setNewPermission={setNewPermission}
                  type="view"
                />
              </Grid>
              <DialogActions sx={{ justifyContent: "flex-end" }}>
                <Button
                  onClick={() => setOpen(false)}
                  type="button"
                  variant="outlined"
                  color="error"
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
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={Yup.object().shape({
                  roleId: Yup.string().required("Role is required"),
                  storeId: Yup.string().required("Store is required"),
                  status: Yup.string().required("Status is required"),
                  password: Yup.string()
                    .min(8, "Password must be at least 8 characters")
                    .notRequired(),
                  confirmPassword: Yup.string()
                    .oneOf([Yup.ref("password"), null], "Passwords must match")
                    .test(
                      "passwords-match",
                      "Passwords must match",
                      function (value) {
                        return (
                          !this?.parent?.password ||
                          value === this?.parent?.password
                        );
                      }
                    ),
                })}
                onSubmit={async (values, { setStatus, setSubmitting }) => {
                  try {
                    let data = {
                      person_id: values?.person_id,
                      roleId: values?.roleId,
                      storeId: values?.storeId,
                      subInventoryId: values?.subInventoryId,
                      locatorId: values?.locatorId,
                      updatedBy: user,
                      status: values?.status,
                      password: values?.password,
                      roleAndPermissionDtos: newPermission,
                    };

                    const res = await Route(
                      "PUT",
                      `/UserDtls/updateUser`,
                      access_token,
                      data,
                      null
                    );
                    if (res.data.responseCode === 0) {
                      setNotificationMsg(res?.data?.responseText);
                      setSeverity("success");
                      setShowNotification(true);
                      setStatus({ success: true });
                      setSubmitting(false);
                      fetchSystemUser();
                    } else {
                      setNotificationMsg(res?.data?.responseText);
                      setSeverity("error");
                      setShowNotification(true);
                      setStatus({ success: false });
                      setSubmitting(false);
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  values,
                  touched,
                }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Email Address"
                          margin="normal"
                          name="email_address"
                          value={values?.email_address}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Role"
                          margin="normal"
                          name="roleId"
                          type="text"
                          value={values?.roleId}
                          onChange={(e) => {
                            handleChange(e);
                            fetchUserPrivileges(
                              e?.target?.value,
                              data?.user_code
                            );
                            fetchModuleAccess(e?.target?.value);
                          }}
                          onBlur={handleBlur}
                          select
                        >
                          {roleList.map((item) => (
                            <MenuItem key={item?.id} value={item?.id}>
                              {item?.type}
                            </MenuItem>
                          ))}
                        </TextField>
                        {touched?.roleId && errors?.roleId && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text--register"
                          >
                            {errors?.roleId}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Work Location"
                          margin="normal"
                          name="storeId"
                          type="text"
                          value={values?.storeId}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          select
                        >
                          {location.map((item) => (
                            <MenuItem key={item?.id} value={item?.id}>
                              {item?.name}
                            </MenuItem>
                          ))}
                        </TextField>
                        {touched?.storeId && errors?.storeId && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text--register"
                          >
                            {errors?.storeId}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Sub Inventory"
                          margin="normal"
                          name="subInventoryId"
                          type="text"
                          value={values.subInventoryId}
                          onChange={(e) => {
                            handleChange(e);
                            fetchLocator(e?.target?.value);
                          }}
                          onBlur={handleBlur}
                          select
                        >
                          {subInventory.map((item) => (
                            <MenuItem key={item?.id} value={item?.id}>
                              {item?.id}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Locator"
                          margin="normal"
                          name="locatorId"
                          type="text"
                          value={values?.locatorId}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          select
                        >
                          {values?.subInventoryId === "FA" ? (
                            <MenuItem value={data?.full_name?.toUpperCase()}>
                              {data?.full_name?.toUpperCase()}
                            </MenuItem>
                          ) : (
                            locator.map((item) => (
                              <MenuItem key={item?.id} value={item?.id}>
                                {item?.id}
                              </MenuItem>
                            ))
                          )}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Status"
                          margin="normal"
                          name="status"
                          type="text"
                          value={values.status}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          select
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="In_Active">In_Active</MenuItem>
                        </TextField>
                        {touched?.status && errors?.status && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text--register"
                          >
                            {errors?.status}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Password"
                          margin="normal"
                          name="password"
                          type="text"
                          value={values?.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched?.password && errors?.password && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text--register"
                          >
                            {errors?.password}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Confirm Password "
                          margin="normal"
                          name="confirmPassword"
                          type="text"
                          value={values?.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched?.confirmPassword &&
                          errors?.confirmPassword && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text--register"
                            >
                              {errors?.confirmPassword}
                            </FormHelperText>
                          )}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ my: 1, ml: 4, marginTop: "3%" }}>
                      <PermissionAccess
                        permission={userPrivileges}
                        moduleAccess={moduleAccess}
                        setNewPermission={setNewPermission}
                        type="edit"
                      />
                    </Grid>
                    <DialogActions sx={{ justifyContent: "flex-end" }}>
                      <Button
                        autoFocus
                        disableElevation
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => setOpen(false)}
                        type="button"
                        variant="outlined"
                        color="error"
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
      </Dialog>
      {showNotification && severity === "error" && (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={notificationMsg}
          severity={severity}
        />
      )}
      {showNotification && severity === "success" && (
        <SuccessNotification
          showNotification={showNotification}
          setShowNotification={() => {
            setShowNotification(false);
            setOpen(false);
          }}
          notificationMsg="Successfully Updated!"
          alertMessage={notificationMsg}
        />
      )}
    </>
  );
};

export default ViewEditSystemUserModal;
