import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Route from "../../routes/Route";

const ViewApprovalRule = ({ open, handleClose, ruleId }) => {
  const ref = useRef(null);
  const access_token = localStorage.getItem("access_token");
  const [ruleDetails, setRuleDetails] = useState("");
  const [hierarchyLevel, setHierarchylevel] = useState([]);

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
      setHierarchylevel(res?.data?.hierarchyLevelInterfaceList);
    }
  };

  useEffect(() => {
    fetchRuleDetails();
  }, []);

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="view-approval_rule"
        ref={ref}
        id="view-approval_rule"
        open={open}
        fullWidth
        maxWidth={"lg"}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            pl: 4,
            background: (theme) => theme.palette.bg.light,
            color: "#eee",
          }}
          id="view_approval_rule_dialog"
        >
          View Approval Rules
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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <TextField
                  label="For"
                  name="approvalFor"
                  type="text"
                  value={ruleDetails?.approvalForName}
                  disabled
                ></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Type"
                  name="type"
                  type="text"
                  value={ruleDetails?.approvalTypeName}
                  disabled
                ></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Role"
                  name="role"
                  type="text"
                  value={ruleDetails?.approvalUserRoleName}
                  disabled
                ></TextField>
              </Grid>
            </Grid>
            <Grid container spacing={1} style={{ marginTop: "2px" }}>
              <Grid item xs={4}>
                <TextField
                  label="Rule Name"
                  name="rule_name"
                  type="text"
                  value={ruleDetails?.approvalRuleName}
                  disabled
                ></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Status"
                  name="rule_name"
                  type="text"
                  value={ruleDetails?.approvalStatus}
                  disabled
                ></TextField>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1 }} style={{ marginTop: "3%" }}>
            <Typography variant="subtitle2">Conditions</Typography>
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
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
                      <TableCell align="right">
                        {row.is_single_user === 1 ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="right">
                        {row.is_auto_approval === 1 ? "Yes" : "No"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewApprovalRule;
