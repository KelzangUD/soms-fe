import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Dialog, DialogContent, DialogTitle, FormLabel, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Route from '../../routes/Route';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const ViewApprovalRule = ({ open, handleClose, ruleId }) => {
  const ref = useRef(null);
  const [ruleDetails, setRuleDetails] = useState('');
  const [hierarchyLevel, setHierarchylevel] = useState([]);

  const fetchRuleDetails = async () => {
    const res = await Route("GET", `/UserDtls/getEditApprovalRules/${ruleId}`, null, null, null);
    if (res?.status === 200) {
      setRuleDetails(res?.data);
      setHierarchylevel(res?.data?.hierarchyLevelInterfaceList);
    }
  };

  useEffect(() => {
    fetchRuleDetails();
  }, []);
  
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="view-approval_rule"
        ref={ref}
        id="view-approval_rule"
        open={open}
        fullWidth
        maxWidth={'md'}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="view_approval_rule_dialog">
          View Approval Rules
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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                For
              </Grid>
              <Grid item xs={8}>
                {ruleDetails?.approvalForName}
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: '2px' }}>
              <Grid item xs={4}>
                Type
              </Grid>
              <Grid item xs={8}>
                {ruleDetails?.approvalTypeName}
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: '2px' }}>
              <Grid item xs={4}>
                Role
              </Grid>
              <Grid item xs={8}>
                {ruleDetails?.approvalUserRoleName}
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: '2px' }}>
              <Grid item xs={4}>
                Rule Name
              </Grid>
              <Grid item xs={8}>
                {ruleDetails?.approvalRuleName}
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: '2px' }}>
              <Grid item xs={4}>
                Status
              </Grid>
              <Grid item xs={8}>
                {ruleDetails?.approvalStatus}
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1 }} style={{ marginTop: '3%' }}>
            <FormLabel id="condition-group-label">Conditions</FormLabel>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="Condition View">
                <TableHead>
                  <TableRow>
                    <TableCell>Hierarchy Name</TableCell>
                    <TableCell align="right">Single User</TableCell>
                    <TableCell align="right">Auto Approval</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hierarchyLevel?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.hierarchyLevel}
                      </TableCell>
                      <TableCell align="right">{row.is_single_user === 1 ? 'Yes' : 'No'}</TableCell>
                      <TableCell align="right">{row.is_auto_approval === 1 ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}

export default ViewApprovalRule;
