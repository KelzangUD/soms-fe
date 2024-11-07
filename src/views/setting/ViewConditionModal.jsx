import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Dialog, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1)
    }
  }));

const ViewConditionModal = ({ open, handleClose, condition, type }) => {
  const ref = useRef(null);
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
          Conditions
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Condition View">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">Type</TableCell>
                  <TableCell align="left">{type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" style={{ fontSize:'20px', fontFamily: 'bold' }}>Approval</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" style={{ fontSize:'18px', fontFamily: 'bold' }}>Hierarchy</TableCell>
                  <TableCell align="left">{condition.approvalType === "hierarchy" ? "Yes" : "No"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Name</TableCell>
                  <TableCell align="left">{condition.approvalType === "hierarchy" ? condition.hierarchyName : "No"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Max level</TableCell>
                  <TableCell align="left">{condition.hierarchyLevel}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" style={{ fontSize:'18px', fontFamily: 'bold' }}>Single User</TableCell>
                  <TableCell align="left">{condition.approvalType === "singleUser" ? "Yes" : "No"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Name</TableCell>
                  <TableCell align="left">{condition.employeeName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" style={{ fontSize:'18px', fontFamily: 'bold' }}>Auto Approval</TableCell>
                  <TableCell align="left">{condition.approvalType === "auto" ? "Yes" : "No"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" style={{ fontSize:'20px', fontFamily: 'bold' }}>FYI</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Frequency</TableCell>
                  <TableCell align="left">{condition.frequency}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Email</TableCell>
                  <TableCell align="left">{condition.fyiEmail}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Employee</TableCell>
                  <TableCell align="left">{condition.fyiEmployeeName}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </BootstrapDialog>
    </>
  )
}

export default ViewConditionModal;
