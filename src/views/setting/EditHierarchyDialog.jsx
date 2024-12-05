import React, { useEffect, useRef, useState } from "react";
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
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik } from "formik";
import Route from "../../routes/Route";
import * as Yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import Notification from "../../ui/Notification";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(245, 247, 248)",
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: "3px 12px"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const EditHierarchyDialog = ({
  hierarchyDtls,
  handleClose,
  hierarchyRole,
  hierarchyName,
  open,
}) => {
  const ref = useRef(null);
  const user = localStorage.getItem("username");
  const [hierarchyDetails, setHierarchyDetails] = useState([]);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [showNotification, setShowNofication] = useState(false);
  const [severity, setSeverity] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    const updatedHierarchyDetails = hierarchyDtls.map((detail) => ({
      ...detail,
      updatedBy: user,
    }));

    setHierarchyDetails(updatedHierarchyDetails);
  }, [hierarchyDtls, user]);

  const [initialValues, setInitialValues] = useState({
    hierarchyName: hierarchyName,
    updatedBy: user,
    hierarchyLevel: "",
    status: "",
    roleId: "",
    hierarchyId: null,
  });

  const handleEdit = (index) => {
    const rowData = hierarchyDetails[index];
    setInitialValues(rowData); // Initialize form with row data
    setIsEditing(true); // Set editing state to true
    setCurrentIndex(index);
  };

  const saveNewHierarchy = async () => {
    try {
      let data = hierarchyDetails;
      const res = await Route(
        "PUT",
        `/UserDtls/updateHierarchyName`,
        null,
        data,
        null
      );
      if (res?.data?.responseCode === 0) {
        setNotificationMsg(res?.data?.responseText);
        setSeverity("info");
        setShowNofication(true);
        handleClose();
      } else {
        setNotificationMsg(res?.data?.responseText);
        setSeverity("error");
        setShowNofication(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="edit_hierarchy"
        ref={ref}
        id="edit_hierarchy"
        open={open}
        fullWidth
        maxWidth={"lg"}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, background: "#1976d2", color: "#eee" }}
          id="edit_hierarchy_dialog"
        >
          Edit Hierarchy
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
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              hierarchyName: Yup.string().required(
                "Hierarchy name is required"
              ),
              status: Yup.string().required("Approval status is required"),
              roleId: Yup.string().required("Role is required"),
              hierarchyLevel: Yup.string().required("Level is required"),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              if (isEditing && currentIndex !== null) {
                setHierarchyDetails((prevDetails) =>
                  prevDetails.map((detail, index) =>
                    index === currentIndex ? values : detail
                  )
                );
                setInitialValues({
                  hierarchyName: hierarchyName,
                  updatedBy: user,
                  status: "",
                  roleId: "",
                  roleName: "",
                  hierarchyLevel: "",
                });
                setIsEditing(false);
                setCurrentIndex(null);
              } else {
                setHierarchyDetails((prevDetails) => [...prevDetails, values]);
                resetForm();
              }
              setSubmitting(false);
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
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={1} mb={1}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Hierarchy name"
                      size="small"
                      name="hierarchyName"
                      value={hierarchyName}
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Level"
                      size="small"
                      name="hierarchyLevel"
                      type="text"
                      value={values.hierarchyLevel}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      select
                    >
                      <MenuItem value="Level1">Level 1</MenuItem>
                      <MenuItem value="Level2">Level 2</MenuItem>
                      <MenuItem value="Level3">Level 3</MenuItem>
                    </TextField>
                    {touched.hierarchyLevel && errors.hierarchyLevel && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.hierarchyLevel}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Value"
                      size="small"
                      name="roleId"
                      type="text"
                      value={values.roleId}
                      onChange={(e) => {
                        const selectedRole = hierarchyRole.find(
                          (role) => role.id === e.target.value
                        );
                        setFieldValue("roleId", selectedRole.id); // Set the id
                        setFieldValue("roleName", selectedRole.type);
                      }}
                      onBlur={handleBlur}
                      variant="outlined"
                      select
                    >
                      {hierarchyRole.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.type}
                        </MenuItem>
                      ))}
                      {touched.roleId && errors.roleId && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text--register"
                        >
                          {errors.roleId}
                        </FormHelperText>
                      )}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container spacing={1} mb={1}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Status"
                      size="small"
                      name="status"
                      type="text"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      select
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="In_Active">In_Active</MenuItem>
                    </TextField>
                    {touched.status && errors.status && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.status}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  mb={2}
                  sx={{ justifyContent: "flex-end" }}
                >
                  <Button
                    autoFocus
                    disableElevation
                    disabled={isSubmitting}
                    size="small"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {isEditing ? "Update" : "Add"}
                  </Button>
                </Grid>
              </form>
            )}
          </Formik>
          {hierarchyDetails.length > 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell >Sr. No</StyledTableCell>
                      <StyledTableCell align="right">
                        Hierarchy Level
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Hierarchy Value
                      </StyledTableCell>
                      <StyledTableCell align="right">Status</StyledTableCell>
                      <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {hierarchyDetails.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.hierarchyLevel}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.roleName}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.status}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <IconButton
                            color="primary"
                            aria-label="edit"
                            onClick={() => handleEdit(index)}
                          >
                            <EditIcon />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <DialogActions sx={{ justifyContent: "flex-end", mr:-1, mt: 2 }}>
                <Button
                  size="small"
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={saveNewHierarchy}
                >
                  Save
                </Button>
              </DialogActions>
            </>
          ) : (
            ""
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
};

export default EditHierarchyDialog;
