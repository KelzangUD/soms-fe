import React, { useRef, useState } from 'react';
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
  TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from 'formik';
import Route from '../../routes/Route';
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Notification from '../../ui/Notification';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AddHierarchyDialog = ({ hierarchyRole, handleClose, fetchHierarchyList, open }) => {
  const ref = useRef(null);
  const user = localStorage.getItem('username');
  const [hierarchyDetails, setHierarchyDetails] = useState([]);
  const [hierarchyName, setHierarchyName] = useState('');
  const [isHierarchyNameDisabled, setHierarchyNameDisabled] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [showNotification, setShowNofication] = useState(false);
  const [severity, setSeverity] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleHierarchyName = (val) => {
    setHierarchyName(val);
  };

  const [initialValues, setInitialValues] = useState({
    hierarchyName: hierarchyName,
    createdBy: user,
    approvalStatus: '',
    approvalRoleId: '',
    roleName: '',
    maxHierarchyLevel: '',
  });

  const handleDelete = (indexToRemove) => {
    setHierarchyDetails(prevDetails => prevDetails.filter((_, index) => index !== indexToRemove));
  };

  const handleEdit = (index) => {
    const rowData = hierarchyDetails[index];
    setInitialValues(rowData); // Initialize form with row data
    setIsEditing(true); // Set editing state to true
    setCurrentIndex(index);
  };

  const saveNewHierarchy = async () => {
    try {
      let data = hierarchyDetails;
      const res = await Route("POST", `/UserDtls/addHierarchy`, null, data, null);
      if (res.data.responseCode === 0) {
        setNotificationMsg(res.data.responseText);
        setSeverity("info");
        setShowNofication(true);

        fetchHierarchyList();
        handleClose();
      } else {
        setNotificationMsg(res.data.responseText);
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
        aria-labelledby="add_hierarchy"
        ref={ref}
        id="add_hierarchy"
        open={open}
        fullWidth
        maxWidth={'lg'}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="add_hierarchy_dialog">
          Add Hierarchy
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
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              hierarchyName: Yup.string().required('Hierarchy name is required'),
              approvalStatus: Yup.string().required('Approval status is required'),
              approvalRoleId: Yup.string().required('Role is required'),
              maxHierarchyLevel: Yup.string().required('Level is required')
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              if (isEditing && currentIndex !== null) {
                setHierarchyDetails(prevDetails =>
                  prevDetails.map((detail, index) =>
                    index === currentIndex ? values : detail
                  )
                );
                setInitialValues({
                  hierarchyName: hierarchyName,
                  createdBy: user,
                  approvalStatus: '',
                  approvalRoleId: '',
                  roleName: '',
                  maxHierarchyLevel: '',
                });
                setIsEditing(false);
                setCurrentIndex(null);
              } else {
                setHierarchyDetails(prevDetails => [...prevDetails, values]);
                resetForm();
              }
              setSubmitting(false);
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Hierarchy name"
                      margin="normal"
                      name="hierarchyName"
                      value={hierarchyName}
                      onChange={(e) => {
                        handleChange(e);
                        handleHierarchyName(e.target.value);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        if (e.target.value) {
                          setHierarchyNameDisabled(true); // Disable field after input is complete
                        }
                      }}
                      disabled={isHierarchyNameDisabled}
                    />
                    {touched.hierarchyName && errors.hierarchyName && (
                      <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.hierarchyName}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4} style={{ paddingLeft: '1%' }}>
                    <TextField
                      fullWidth
                      label="Level"
                      margin="normal"
                      name="maxHierarchyLevel"
                      type="text"
                      value={values.maxHierarchyLevel}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      select
                    >
                      <MenuItem value="Level1">Level 1</MenuItem>
                      <MenuItem value="Level2">Level 2</MenuItem>
                      <MenuItem value="Level3">Level 3</MenuItem>
                    </TextField>
                    {touched.maxHierarchyLevel && errors.maxHierarchyLevel && (
                      <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.maxHierarchyLevel}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4} style={{ paddingLeft: '1%' }}>
                    <TextField
                      fullWidth
                      label="Value"
                      margin="normal"
                      name="approvalRoleId"
                      type="text"
                      value={values.approvalRoleId}
                      onChange={(e) => {
                        const selectedRole = hierarchyRole.find(role => role.id === e.target.value);
                        setFieldValue('approvalRoleId', selectedRole.id);  // Set the id
                        setFieldValue('roleName', selectedRole.type);
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
                    </TextField>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Status"
                        margin="normal"
                        name="approvalStatus"
                        type="text"
                        value={values.approvalStatus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        select
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="In_Active">In_Active</MenuItem>
                      </TextField>
                      {touched.approvalStatus && errors.approvalStatus && (
                        <FormHelperText error id="standard-weight-helper-text--register">
                          {errors.approvalStatus}
                        </FormHelperText>
                      )}
                    </Grid>
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
                    {isEditing ? 'Update' : 'Add'}
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
          {hierarchyDetails.length > 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Sr. No</StyledTableCell>
                      <StyledTableCell align="right">Hierarchy Level</StyledTableCell>
                      <StyledTableCell align="right">Hierarchy Value</StyledTableCell>
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
                        <StyledTableCell align="right">{row.maxHierarchyLevel}</StyledTableCell>
                        <StyledTableCell align="right">{row.roleName}</StyledTableCell>
                        <StyledTableCell align="right">{row.approvalStatus}</StyledTableCell>
                        <StyledTableCell align="right">
                          <IconButton color="primary" aria-label="edit" onClick={() => handleEdit(index)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="secondary" aria-label="delete" onClick={() => handleDelete(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <DialogActions sx={{ justifyContent: 'center' }}>
                <Button
                  size="large"
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={saveNewHierarchy}
                >
                  Save
                </Button>
              </DialogActions>
            </>
          ) : ("")}
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

export default AddHierarchyDialog;
