import React, { useEffect, useRef, useState } from "react";
import Notification from "../../ui/Notification";
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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Route from "../../routes/Route";
import { Formik } from "formik";
import * as Yup from "yup";
import AddConditionModal from "./AddConditionModal";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewConditionModal from "./ViewConditionModal";

const AddApprovalRuleDialog = ({
  handleClose,
  open,
  ruleId,
  fetchApprovalRules,
}) => {
  const ref = useRef(null);
  const user = localStorage.getItem("username");
  const access_token = localStorage.getItem("access_token");
  const [notificationMsg, setNotificationMsg] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [severity, setSeverity] = useState("");
  const [type, setType] = useState([]);
  const [approvalFor, setApprovalFor] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [conditions, setConditions] = useState([]);
  const [approvalRuleFor, setApprovalRuleFor] = useState("");
  const [viewCondition, setViewCondition] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editCondition, setEditCondition] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [ruleDetails, setRuleDetails] = useState("");
  const [approvalId, setAppovalId] = useState("");

  const fetchApprovalFor = async () => {
    const res = await Route("GET", `/Common/ApprovalType`, null, null, null);
    if (res?.status === 200) {
      setApprovalFor(res?.data);
    }
  };

  const fetchRole = async () => {
    const res = await Route("GET", "/Common/FetchRole", null, null, null);
    if (res.status === 200) {
      setRoles(res?.data);
    }
  };

  const fetchRuleDetails = async () => {
    const res = await Route(
      "GET",
      `/UserDtls/getEditApprovalRules/${ruleId}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      setRuleDetails(res?.data);
      setAppovalId(
        res?.data?.approvalForName === "Requisition"
          ? 1
          : res?.data?.approvalForName === "Transfer Order"
          ? 2
          : res?.data?.approvalForName === "EMI"
          ? 3
          : ""
      );
      setFor(res?.data?.approvalForName);

      fetchApprovalType(
        res?.data?.approvalForName === "Requisition"
          ? 1
          : res?.data?.approvalForName === "Transfer Order"
          ? 2
          : res?.data?.approvalForName === "EMI"
          ? 3
          : ""
      );
      setConditions((prevConditions) => [
        ...prevConditions,
        {
          hierarchyId: res?.data?.hierarchyId,
          hierarchyName: res?.data?.hierarchyName,
          hierarchyLevel: res?.data?.maxHierarchyLevel,
          approvalType:
            res?.data?.is_Auto_Approval === 1
              ? "auto"
              : res?.data?.is_Single_User === 1
              ? "singleUser"
              : "hierarchy",
          employeeId:
            res?.data?.is_Single_User === 1 ? res?.data?.employeeId : "",
          fyiChecked: res?.data?.fyiChecked === 1 ? "on" : "off",
          frequency: res?.data?.frequency,
          fyiEmail: res?.data?.fyiEmail,
          fyiEmployeeId:
            res?.data?.fyiChecked === 1 ? res?.data?.employeeId : "",
        },
      ]);
    }
  };

  useEffect(() => {
    fetchApprovalFor();
    fetchRole();
    if (ruleId !== null && ruleId !== "") {
      fetchRuleDetails();
    }
  }, []);

  const fetchApprovalType = async (type) => {
    const res = await Route(
      "GET",
      `/Common/RequisitionType?type=${type}`,
      null,
      null,
      null
    );
    if (res?.status === 200) {
      setType(res?.data);
    }
  };

  const handleAddCondition = () => {
    setShowConditionModal(true);
  };

  const handleCloseCondition = () => {
    setShowConditionModal(false);
  };

  const setFor = (val) => {
    setApprovalRuleFor(val);
  };

  const handleView = (condition) => {
    setViewCondition(condition);
    setShowViewModal(true);
  };

  const handleEdit = (condition) => {
    setEditCondition(condition);
    setShowEditModal(true);
  };

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
          sx={{
            px: 4,
            backgroundColor: "bg.light",
            color: "#eee",
          }}
          id="add_new_role_dialog"
        >
          {ruleId ? "Edit Approval Rule" : "Add Approval Rule"}
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
          <Formik
            enableReinitialize
            initialValues={{
              approvalTypeId: ruleDetails?.approvalTypeId || "",
              approvalFor: approvalId || "",
              approvalRoleId: ruleDetails?.roleId || "",
              approvalService: "",
              approvalRuleName: ruleDetails?.approvalRuleName || "",
              approvalStatus: ruleDetails?.approvalStatus || "",
              createdBy: user,
              approvalTypeName: "",
            }}
            validationSchema={Yup.object().shape({
              approvalTypeId: Yup.string().required("Type is required"),
              approvalRoleId: Yup.string().required("Role is required"),
              approvalFor: Yup.string().required(
                "Approval Rule For is required"
              ),
            })}
            onSubmit={async (
              values,
              { setStatus, setSubmitting, resetForm }
            ) => {
              try {
                const condition = conditions[0] || {};
                let data = {
                  approvalForName: condition?.approvalType || "",
                  approvalTypeId: values?.approvalTypeId || null,
                  approvalRoleId: values?.approvalRoleId || null,
                  approvalService: values?.approvalService || null,
                  approvalRuleName: values?.approvalRuleName || null,
                  approvalStatus: values?.approvalStatus || null,
                  createdBy: user || null,
                  // hierarchyName: condition?.hierarchyName || "",
                  // hierarchyId: condition?.hierarchyId || "",
                  // maxHierarchyLevel: condition?.hierarchyLevel || "",
                  employeeId: condition?.employeeId || "",
                  frequency: condition?.frequency || "",
                  fyiEmail: condition?.fyiEmail || "",
                  fyiEmployeeId: condition?.fyiEmployeeId || "",
                  // fyiChecked: condition?.fyiChecked[0].includes("on") ? 1 : 0,
                  fyiChecked:
                    condition?.fyiChecked?.length > 0
                      ? condition?.fyiChecked[0].includes("on")
                        ? 1
                        : 0
                      : 0,
                  approvalId: ruleDetails?.approvalId,
                  updatedBy: user || null,
                  hierarchyNamesDTOList: conditions?.map((item) => ({
                    hierarchyName: item?.hierarchyName,
                    hierarchyLevel: item?.hierarchyLevel,
                  })),
                };
                if (ruleId === "" || ruleId === null) {
                  const res = await Route(
                    "POST",
                    `/UserDtls/addApprovalRule`,
                    access_token,
                    data,
                    null
                  );
                  if (res?.data?.responseCode === 0) {
                    setNotificationMsg(res?.data?.responseText);
                    setSeverity("info");
                    setShowNotification(true);
                    setStatus({ success: true });
                    setSubmitting(false);
                    resetForm();
                    fetchApprovalRules();
                  } else {
                    setNotificationMsg(res?.data?.responseText);
                    setSeverity("error");
                    setShowNotification(true);
                    setStatus({ success: false });
                    setSubmitting(false);
                  }
                } else {
                  const res = await Route(
                    "PUT",
                    `/UserDtls/updateApprovalRule`,
                    access_token,
                    data,
                    null
                  );
                  if (res?.data?.responseCode === 0) {
                    setNotificationMsg(res?.data?.responseText);
                    setSeverity("info");
                    setShowNotification(true);
                    setStatus({ success: true });
                    setSubmitting(false);
                    resetForm();
                    handleClose();
                  } else {
                    setNotificationMsg(res?.data?.responseText);
                    setSeverity("error");
                    setShowNotification(true);
                    setStatus({ success: false });
                    setSubmitting(false);
                  }
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
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="For"
                      name="approvalFor"
                      type="text"
                      value={values?.approvalFor}
                      onChange={(e) => {
                        handleChange(e);
                        const selectedItem = approvalFor.find(
                          (item) => item?.id === e?.target?.value
                        );
                        if (selectedItem) {
                          setFieldValue("approvalFor", selectedItem?.id);
                          setFieldValue("approvalService", selectedItem?.type);
                          setFor(selectedItem?.type);
                        }
                        fetchApprovalType(e?.target?.value);
                      }}
                      onBlur={handleBlur}
                      select
                      required
                    >
                      {approvalFor.map((item) => (
                        <MenuItem key={item?.id} value={item?.id}>
                          {item?.type}
                        </MenuItem>
                      ))}
                    </TextField>
                    {touched?.approvalFor && errors?.approvalFor && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors?.approvalFor}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Type"
                      name="approvalTypeId"
                      type="text"
                      value={values?.approvalTypeId || ""}
                      onChange={(e) => {
                        handleChange(e);
                        const selectedItem = type.find(
                          (item) => item?.id === e?.target?.value
                        );
                        if (selectedItem) {
                          setFieldValue("approvalTypeId", selectedItem?.id);
                          setFieldValue("approvalTypeName", selectedItem?.type);
                        }
                      }}
                      onBlur={handleBlur}
                      select
                      required
                    >
                      {type.map((item) => (
                        <MenuItem key={item?.id} value={item?.id}>
                          {item?.type}
                        </MenuItem>
                      ))}
                    </TextField>
                    {touched?.approvalTypeId && errors?.approvalTypeId && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors?.approvalTypeId}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Approval For"
                      name="approvalRoleId"
                      type="text"
                      value={values?.approvalRoleId || ""}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      select
                      required
                    >
                      {roles.map((item) => (
                        <MenuItem key={item?.id} value={item?.id}>
                          {item?.type}
                        </MenuItem>
                      ))}
                    </TextField>
                    {touched?.approvalRoleId && errors?.approvalRoleId && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors?.approvalRoleId}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
                <Grid container spacing={1} mt={1}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Rule Name"
                      name="approvalRuleName"
                      value={values?.approvalRuleName}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Status"
                      name="approvalStatus"
                      type="text"
                      value={values?.approvalStatus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      select
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="In_Active">In_Active</MenuItem>
                      <MenuItem value="Draft">Draft</MenuItem>
                    </TextField>
                    {touched?.approvalStatus && errors?.approvalStatus && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors?.approvalStatus}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
                <Grid container mt={2}>
                  <Button variant="contained" onClick={handleAddCondition}>
                    Conditions
                  </Button>
                </Grid>
                <Grid container marginY={2}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Hierarchy Name </TableCell>
                          <TableCell align="right">Single User</TableCell>
                          <TableCell align="right">Auto Approval</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {conditions.map((condition, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {condition.approvalType === "hierarchy"
                                ? condition.hierarchyName
                                : "No"}
                            </TableCell>
                            <TableCell align="right">
                              {condition.approvalType === "singleUser"
                                ? "Yes"
                                : "No"}
                            </TableCell>
                            <TableCell align="right">
                              {condition.approvalType === "auto" ? "Yes" : "No"}
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                aria-label="edit"
                                size="small"
                                color="primary"
                                onClick={() => handleEdit(condition)}
                              >
                                <EditIcon fontSize="inherit" />
                              </IconButton>
                              <IconButton
                                aria-label="view"
                                size="small"
                                color="secondary"
                                onClick={() => handleView(condition)}
                              >
                                <VisibilityIcon fontSize="inherit" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <DialogActions sx={{ justifyContent: "flex-end", mr: -1 }}>
                  <Button
                    autoFocus
                    disableElevation
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {ruleId ? "Update" : "Save"}
                  </Button>
                  <Button
                    onClick={() => {
                      resetForm();
                      setConditions([]);
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
      {showConditionModal && (
        <AddConditionModal
          open={showConditionModal}
          handleClose={handleCloseCondition}
          setConditions={setConditions}
          condition={editCondition}
          type={approvalRuleFor}
        />
      )}
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={() => {
            setShowNotification(true);
            handleClose();
          }}
          message={notificationMsg}
          severity={severity}
        />
      )}
      {showViewModal && (
        <ViewConditionModal
          open={showViewModal}
          handleClose={() => setShowViewModal(false)}
          condition={viewCondition}
          type={approvalRuleFor}
        />
      )}
      {showEditModal && (
        <AddConditionModal
          open={showEditModal}
          handleClose={() => setShowEditModal(false)}
          condition={editCondition}
          setConditions={setConditions}
          type={approvalRuleFor}
        />
      )}
    </>
  );
};

export default AddApprovalRuleDialog;
