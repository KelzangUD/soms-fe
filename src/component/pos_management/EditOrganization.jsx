import React, { useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import {
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Route from "../../routes/Route";
import {
  Notification,
  SuccessNotification,
  LoaderDialog,
} from "../../ui/index";

const EditOrganization = ({
  open,
  setOpen,
  oldDetails,
  fetchEmiOrganization,
}) => {
  const ref = useRef(null);
  const access_token = localStorage.getItem("access_token");
  const [notificationMsg, setNotificationMsg] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({
    customerName: oldDetails?.emi_FOCAL_NAME,
    mobileNo: oldDetails?.emi_FOCAL_MOBILE_NO,
    organization: oldDetails?.emi_FOCAL_ORGANIZATION,
    regionName: oldDetails?.emi_FOCAL_ADDRESS,
    designation: oldDetails?.emi_FOCAL_DESIGNATION,
    email: oldDetails?.emi_FOCAL_EMAIL,
    status: oldDetails?.emi_FOCAL_STATUS,
  });
  const changeHandle = (e) => {
    setDetails((prev) => ({
      ...prev,
      [e?.target?.name]: e?.target?.value,
    }));
  };

  const updateHandle = async () => {
    if (
      details?.customerName === "" ||
      details?.mobileNo === "" ||
      details?.organization === "" ||
      details?.regionName === "" ||
      details?.designation === "" ||
      details?.email === ""
    ) {
      setShowNotification(true);
      setSeverity("warning");
      setNotificationMsg("Please Fill Up All The Necessary Details");
    } else {
      setIsLoading(true);
      try {
        const res = await Route(
          "POST",
          `/sapApiController/emiFocalPersonMaster`,
          access_token,
          [details],
          null
        );
        if (res?.status === 201) {
          fetchEmiOrganization();
          setNotificationMsg("Success");
          setSeverity("success");
          setShowNotification(true);
        }
      } catch (err) {
        setNotificationMsg("Failed To Update Organization");
        setSeverity("error");
        setShowNotification(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="update_organization"
        ref={ref}
        id="update_organization"
        open={open}
        fullWidth
        maxWidth={"lg"}
      >
        <DialogTitle
          sx={{ p: 2, pl: 3, backgroundColor: "bg.light", color: "#eee" }}
          id="update_organization_dialog"
        >
          Update Organization
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
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Organization"
                name="organization"
                value={details?.organization}
                onChange={changeHandle}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Name"
                name="customerName"
                value={details?.customerName}
                onChange={changeHandle}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Mobile No."
                name="mobileNo"
                value={details?.mobileNo}
                onChange={changeHandle}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Designation"
                name="designation"
                value={details?.designation}
                onChange={changeHandle}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Region"
                name="regionName"
                value={details?.regionName}
                onChange={changeHandle}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Email"
                name="email"
                value={details?.email}
                type="email"
                onChange={changeHandle}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={details?.status}
                  label="Status"
                  name="status"
                  onChange={changeHandle}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="In-Active">In-Active</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            my={2}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="contained" onClick={updateHandle}>
              Update
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{
                marginLeft: 2,
              }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
      {showNotification && severity === "success" && (
        <SuccessNotification
          showNotification={showNotification}
          setShowNotification={() => {
            setShowNotification(false);
            setOpen(false);
          }}
          notificationMsg="Organization Updated Successfully!"
          alertMessage={notificationMsg}
        />
      )}
      {showNotification && severity !== "success" && (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={notificationMsg}
          severity={severity}
        />
      )}
      {isLoading && <LoaderDialog open={isLoading} />}
    </>
  );
};

export default EditOrganization;
