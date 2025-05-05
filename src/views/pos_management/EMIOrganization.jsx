import React, { useState, useEffect } from "react";
import { Box, Button, Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { CustomDataTable } from "../../component/common/index";
import { LoaderDialog, Notification, RenderStatus } from "../../ui/index";
import {
  AddOrganization,
  EditOrganization,
} from "../../component/pos_management";
import Route from "../../routes/Route";

const EMIOrganization = () => {
  // const access_token = localStorage.getItem("access_token");
  const [emiOrganization, setEmiOrganization] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState([]);
  const editOrganizationHandle = async (params) => {
    setDetails(params?.row);
    setEdit(true);
  };
  const emi_organization_columns = [
    { field: "sl", headerName: "Sl.No", width: 30 },
    { field: "emi_FOCAL_ORGANIZATION", headerName: "Organization", width: 250 },
    { field: "emi_FOCAL_NAME", headerName: "Focal Person's Name", width: 200 },
    { field: "emi_FOCAL_DESIGNATION", headerName: "Designation", width: 120 },
    { field: "emi_FOCAL_MOBILE_NO", headerName: "Mobile No", width: 100 },
    { field: "emi_FOCAL_EMAIL", headerName: "Email", width: 300 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <RenderStatus status={params?.row?.emi_FOCAL_STATUS} />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="view"
            size="small"
            onClick={() => editOrganizationHandle(params)}
            color="primary"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
  const fetchEmiOrganization = async () => {
    setIsLoading(true);
    try {
      const res = await Route(
        "GET",
        `/Common/getEMIFocalDetail`,
        null,
        null,
        null
      );
      if (res?.status === 200) {
        setEmiOrganization(res?.data);
      }
    } catch (err) {
      setNotificationMessage("Error Fetching Report");
      setSeverity("error");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchEmiOrganization();
  }, []);

  return (
    <>
      {edit ? (
        <EditOrganization
          open={edit}
          setOpen={setEdit}
          oldDetails={details}
          fetchEmiOrganization={fetchEmiOrganization}
        />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box sx={{ width: "100%" }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid
                    item
                    container
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      aria-label="add"
                      onClick={() => setAdd(true)}
                      color="primary"
                      variant="contained"
                      endIcon={<AddIcon />}
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item container alignItems="center" xs={12}>
                    <CustomDataTable
                      rows={emiOrganization?.map((item, index) => ({
                        sl: index + 1,
                        id: index,
                        ...item,
                      }))}
                      cols={emi_organization_columns}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
      {add && (
        <AddOrganization
          open={add}
          setOpen={setAdd}
          fetchEmiOrganization={fetchEmiOrganization}
        />
      )}
      {isLoading && <LoaderDialog open={isLoading} />}
      {showNotification && severity === "error" && (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={notificationMessage}
          severity={severity}
        />
      )}
    </>
  );
};

export default EMIOrganization;
