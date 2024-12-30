import PropTypes from "prop-types";
import React, { useState, useRef, useEffect, forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
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
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik } from "formik";
import Route from "../../routes/Route";
import * as Yup from "yup";
import { FixedSizeList } from "react-window";
import { Notification, SuccessNotification } from "../../ui/index";
import PermissionAccess from "../../component/roles_and_permission/PermissionAccess";

const VirtualizedListboxComponent = forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);

  return (
    <div ref={ref} {...other}>
      <FixedSizeList
        height={200}
        width="100%"
        itemSize={35}
        itemCount={itemData.length}
        outerElementType="ul"
        innerElementType="ul"
      >
        {({ index, style }) => (
          <li style={{ ...style, display: "block" }} key={index}>
            {itemData[index]}
          </li>
        )}
      </FixedSizeList>
    </div>
  );
});

const AddSystemUserDialog = ({ open, setOpen, fetchSystemUser }) => {
  AddSystemUserDialog.prototype = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    fetchSystemUser: PropTypes.func.isRequired,
  };
  const ref = useRef(null);
  const user = localStorage.getItem("username");
  const access_token = localStorage.getItem("access_token");
  const [employeeCode, setEmployeeCode] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [location, setLocation] = useState([]);
  const [subInventory, setSubInventory] = useState([]);
  const [locator, setLocator] = useState([]);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [showNotification, setShowNofication] = useState(false);
  const [severity, setSeverity] = useState("");
  const [rolePrivileges, setRolePrivileges] = useState([]);
  const [moduleAccess, setModuleAccess] = useState([]);
  const [newPermission, setNewPermission] = useState([]);

  const fetchEmployeeList = async () => {
    const res = await Route(
      "GET",
      "/UserDtls/fetchEmpCodeList",
      access_token,
      null,
      null
    );
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
    const res = await Route(
      "GET",
      `/Common/FetchSubinventry_By_Location?workLocation=${id}`,
      null,
      null,
      null
    );
    if (res.status === 200) {
      setSubInventory(res?.data);
    }
  };

  const fetchLocator = async (id, storeId) => {
    const res = await Route(
      "GET",
      `/Common/Fetch_Locator?workLocation=${storeId}&subInventory=${id}`,
      null,
      null,
      null
    );
    if (res.status === 200) {
      setLocator(res?.data);
    }
  };

  const fetchRolePriviledges = async (id) => {
    const res = await Route(
      "GET",
      `/Common/fetchModulePermission?roleId=${id}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setRolePrivileges(res?.data);
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
    fetchEmployeeList();
    fetchRole();
    fetchWorkLocation();
  }, []);

  return (
    <>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="add_system_user"
        ref={ref}
        id="add_system_user"
        open={open}
        fullWidth
        maxWidth={"lg"}
      >
        <DialogTitle
          sx={{ p: 2, pl: 3, background: "#1976d2", color: "#eee" }}
          id="add_system_user_dialog"
        >
          Add User
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
          <Formik
            initialValues={{
              empNo: "",
              employee_code: "",
              user_code: "",
              full_name: "",
              email_address: "",
              roleId: "",
              storeId: "",
              subInventoryId: "",
              locatorId: "",
              createdBy: "",
            }}
            validationSchema={Yup.object().shape({
              employee_code: Yup.string().required(
                "Select the employee details."
              ),
              roleId: Yup.string().required("Role is required"),
              storeId: Yup.string().required("Store is required"),
            })}
            onSubmit={async (
              values,
              { setStatus, setSubmitting, resetForm }
            ) => {
              try {
                let data = {
                  empNo: values?.empNo,
                  user_code: values.employee_code,
                  roleId: values.roleId,
                  storeId: values.storeId,
                  subInventoryId: values.subInventoryId,
                  locatorId: values.locatorId,
                  createdBy: user,
                  roleAndPermissionDtos: newPermission,
                };

                const res = await Route(
                  "POST",
                  `/UserDtls/addEmployeeDetails`,
                  access_token,
                  data,
                  null
                );
                if (res?.data?.responseCode === 0) {
                  setNotificationMsg(res.data.responseText);
                  setSeverity("success");
                  setShowNofication(true);
                  setStatus({ success: true });
                  setSubmitting(false);
                  resetForm();
                  fetchSystemUser();
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
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
              setFieldValue,
              resetForm,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={1} mb={2}>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      disableListWrap
                      options={employeeCode}
                      getOptionLabel={(option) => option.employee_code || ""}
                      value={
                        employeeCode.find(
                          (option) => option.user_code === values.employee_code
                        ) || null
                      }
                      onChange={(e, newValue) => {
                        setFieldValue("empNo", newValue ? newValue?.empNo : "");
                        setFieldValue(
                          "employee_code",
                          newValue ? newValue.user_code : ""
                        );
                        setFieldValue(
                          "full_name",
                          newValue ? newValue.full_name : ""
                        );
                        setFieldValue(
                          "email_address",
                          newValue ? newValue.email_address : ""
                        );
                      }}
                      onBlur={handleBlur}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Employee Code"
                          name="employee_code"
                          variant="outlined"
                        />
                      )}
                      renderOption={(props, option) => (
                        <MenuItem
                          {...props}
                          key={option.user_code}
                          value={option.user_code}
                        >
                          {option.employee_code}
                        </MenuItem>
                      )}
                      ListboxComponent={VirtualizedListboxComponent}
                      fullWidth
                      style={{ width: "100%" }}
                      size="small"
                    />
                    {touched?.employee_code && errors?.employee_code && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors?.employee_code}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="User Code(This will be used as login id)"
                      name="user_code"
                      value={values?.employee_code}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Full Name"
                      name="full_name"
                      value={values?.full_name}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} mb={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Email Address"
                      name="email_address"
                      value={values?.email_address}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Role"
                      name="roleId"
                      type="text"
                      value={values.roleId}
                      onChange={(e) => {
                        handleChange(e);
                        fetchRolePriviledges(e.target.value);
                        fetchModuleAccess(e.target.value);
                      }}
                      onBlur={handleBlur}
                      select
                    >
                      {roleList.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.type}
                        </MenuItem>
                      ))}
                    </TextField>
                    {touched.roleId && errors.roleId && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.roleId}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Work Location"
                      name="storeId"
                      type="text"
                      value={values.storeId}
                      onChange={(e) => {
                        handleChange(e);
                        fetchSubInventory(e.target.value);
                      }}
                      onBlur={handleBlur}
                      select
                    >
                      {location.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    {touched.storeId && errors.storeId && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.storeId}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
                <Grid container spacing={1} mb={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Sub Inventory"
                      name="subInventoryId"
                      type="text"
                      value={values?.subInventoryId}
                      onChange={(e) => {
                        handleChange(e);
                        fetchLocator(e.target.value, values.storeId);
                      }}
                      onBlur={handleBlur}
                      select
                    >
                      {subInventory.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.id}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Locator"
                      name="locatorId"
                      type="text"
                      value={values.locatorId}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      select
                    >
                      {values?.subInventoryId === "FA" ? (
                        <MenuItem value={values?.full_name}>
                          {values?.full_name}
                        </MenuItem>
                      ) : (
                        locator.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.id}
                          </MenuItem>
                        ))
                      )}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ my: 4, ml: 4, mt: 6 }}>
                  <PermissionAccess
                    permission={rolePrivileges}
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
                    Create User
                  </Button>
                  <Button
                    onClick={() => {
                      resetForm();
                      setRolePrivileges([]);
                      setModuleAccess([]);
                    }}
                    type="button"
                    variant="outlined"
                    color="error"
                  >
                    Reset
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      {showNotification && severity === "success" && (
        <SuccessNotification
          showNotification={showNotification}
          setShowNofication={() => {
            setShowNofication(false);
            setOpen(false);
          }}
          notificationMsg="Successfully Created!"
          alertMessange={notificationMsg}
        />
      )}
      {showNotification && severity === "error" &&(
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
