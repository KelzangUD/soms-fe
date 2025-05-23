import React, { useState, useEffect } from "react";
import { Box, Grid, Button, IconButton, Tabs, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Route from "../../routes/Route";
import AddApprovalRuleDialog from "./AddApprovalRuleDialog";
import ViewApprovalRule from "./ViewApprovalRule";
import { CustomDataTable } from "../../component/common/index";
import { useCommon } from "../../contexts/CommonContext";
import { RenderStatus } from "../../ui";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const ApprovalRules = () => {
  const { isMdUp } = useCommon();
  const access_token = localStorage.getItem("access_token");
  const [value, setValue] = useState(0);
  const [ruleList, setRuleList] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("Requisition");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewRule, setShowViewRule] = useState(false);
  const [ruleId, setRuleId] = useState("");

  const fetchApprovalRules = async (type) => {
    const res = await Route(
      "GET",
      `/UserDtls/getApprovalRules/${type}`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      const rowsWithIds = (res?.data || []).map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      setRuleList(rowsWithIds);
    }
  };

  useEffect(() => {
    fetchApprovalRules(selectedLabel);
  }, [selectedLabel]);

  const approval_rules_columns = [
    {
      field: "sl",
      headerName: "Sl. No",
      flex: isMdUp ? 0.4 : undefined,
      width: isMdUp ? undefined : 80,
    },
    {
      field: "approvalUserRoleName",
      headerName: "For",
      flex: isMdUp ? 1.2 : undefined,
      width: isMdUp ? undefined : 150,
    },
    {
      field: "approvalTypeName",
      headerName: "Type",
      flex: isMdUp ? 1.4 : undefined,
      width: isMdUp ? undefined : 140,
    },
    {
      field: "approvalRuleName",
      headerName: "Rule Name",
      flex: isMdUp ? 1.4 : undefined,
      width: isMdUp ? undefined : 140,
    },
    {
      field: "approvalStatus",
      headerName: "Status",
      flex: isMdUp ? 1.2 : undefined,
      width: isMdUp ? undefined : 100,
      renderCell: (params) => <RenderStatus status={params?.row?.approvalStatus} />,
    },
    {
      field: "action",
      headerName: "Action",
      flex: isMdUp ? 1 : undefined,
      width: isMdUp ? undefined : 100,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => handleEditApprovalRule(params?.row?.approvalId)}
            color="primary"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="view"
            size="small"
            onClick={() => handleViewApprovalRule(params?.row?.approvalId)}
            color="success"
          >
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
  const handleChange = (_, newValue) => {
    setValue(newValue);
    const labels = ["Requisition", "Transfer Order", "EMI"];
    setSelectedLabel(labels[newValue]);
  };

  const handleViewApprovalRule = (id) => {
    setRuleId(id);
    setShowViewRule(true);
  };

  const handleEditApprovalRule = (id) => {
    setRuleId(id);
    setShowAddModal(true);
  };

  const handleAddNewRule = () => {
    setShowAddModal(true);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              endIcon={<AddIcon />}
              sx={{ mr: 1 }}
              onClick={handleAddNewRule}
            >
              Add New
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Requisition" {...a11yProps(0)} />
                  <Tab label="Transfer Order" {...a11yProps(1)} />
                  <Tab label="EMI" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <CustomDataTable
                  rows={ruleList?.map((row, index) => ({
                    ...row,
                    sl: index + 1,
                  }))}
                  cols={approval_rules_columns}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <CustomDataTable
                  rows={ruleList?.map((row, index) => ({
                    ...row,
                    sl: index + 1,
                  }))}
                  cols={approval_rules_columns}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <CustomDataTable
                  rows={ruleList?.map((row, index) => ({
                    ...row,
                    sl: index + 1,
                  }))}
                  cols={approval_rules_columns}
                />
              </CustomTabPanel>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {showAddModal && (
        <AddApprovalRuleDialog
          open={showAddModal}
          handleClose={() => {
            setShowAddModal(false);
            setRuleId("");
          }}
          ruleId={ruleId}
          fetchApprovalRules={() => fetchApprovalRules("Requisition")}
        />
      )}
      {showViewRule && (
        <ViewApprovalRule
          open={ViewApprovalRule}
          handleClose={() => setShowViewRule(false)}
          ruleId={ruleId}
        />
      )}
    </>
  );
};

export default ApprovalRules;
