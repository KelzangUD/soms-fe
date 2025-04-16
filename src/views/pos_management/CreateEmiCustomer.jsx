import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Notification, LoaderDialog } from "../../ui/index";
import Route from "../../routes/Route";

const CreateEmiCustomer = () => {
  const access_token = localStorage.getItem("access_token");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [severity, setSeverity] = useState("info");
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState({
    customerType: "EMI Customer",
    customerName: "",
    customerNumber: "",
    mobileNo: "",
    regionName: "",
    designation: "",
    email: "",
    emiFocalId: "",
    emi_FOCAL_ORGANIZATION: "",
    emiCustomerTypeId: "",
    emiCustomerTypeName: "",
    attachment: "",
  });
  const [emiFocalDetail, setEmiFocalDetail] = useState([]);
  const [emiCustomerTypes, setEmiCustomerTypes] = useState([]);
  const [isDocUploaded, setIsDocUploaded] = useState(false);

  const fetchEMICustomerTypes = async () => {
    const res = await Route(
      "GET",
      `/Common/getEMICustomerType`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      if (res?.data?.length === 0) {
        setNotificationMsg("EMI Customers Type Not Found!");
        setSeverity("info");
        setShowNotification(true);
      } else {
        setEmiCustomerTypes(res?.data);
      }
    }
  };
  const fetchEMIFocalDetail = async () => {
    const res = await Route(
      "GET",
      `/Common/getEMIFocalDetail`,
      access_token,
      null,
      null
    );
    if (res?.status === 200) {
      if (res?.data?.length === 0) {
        setNotificationMsg("EMI Focal Detail Not Found!");
        setSeverity("info");
        setShowNotification(true);
      } else {
        setEmiFocalDetail(res?.data);
      }
    }
  };
  useEffect(() => {
    fetchEMICustomerTypes();
    fetchEMIFocalDetail();
  }, []);
  const customerNameHandle = (e) => {
    setCustomer((prev) => ({
      ...prev,
      customerName: e?.target?.value,
    }));
  };
  const customerNoHandle = (e) => {
    setCustomer((prev) => ({
      ...prev,
      customerNumber: e?.target?.value,
    }));
  };
  const mobileNoHandle = (e) => {
    setCustomer((prev) => ({
      ...prev,
      mobileNo: e?.target?.value,
    }));
  };
  const emiCustomerTypeHandle = (e, value) => {
    setCustomer((prev) => ({
      ...prev,
      emiCustomerTypeId: value?.id,
      emiCustomerTypeName: value?.label,
      attachment: value?.id === 1 ? prev?.attachment : "",
    }));
  };
  const emiFocalDetailHandle = (e, value) => {
    setCustomer((prev) => ({
      ...prev,
      emiFocalId: value?.id,
      emi_FOCAL_ORGANIZATION: value?.label,
    }));
  };
  const addressHandle = (e) => {
    setCustomer((prev) => ({
      ...prev,
      regionName: e?.target?.value,
    }));
  };
  const designationHandle = (e) => {
    setCustomer((prev) => ({
      ...prev,
      designation: e?.target?.value,
    }));
  };
  const emailHandle = (e) => {
    setCustomer((prev) => ({
      ...prev,
      email: e?.target?.value,
    }));
  };
  const resetStateFn = () => {
    setCustomer((prev) => ({
      ...prev,
      customerType: "EMI Customer",
      customerName: "",
      customerNumber: "",
      mobileNo: "",
      regionName: "",
      designation: "",
      email: "",
      emiFocalId: "",
      emi_FOCAL_ORGANIZATION: "",
      emiCustomerTypeId: "",
      emiCustomerTypeName: "",
      attachment: "",
    }));
  };
  const docHandle = (e) => {
    setIsDocUploaded(true);
    setCustomer((prev) => ({
      ...prev,
      attachment: e?.target?.files[0],
    }));
  };
  const validationFunction = () => {
    if (
      customer?.customerName === "" ||
      customer?.customerNumber === "" ||
      customer?.mobileNo === "" ||
      customer?.regionName === "" ||
      customer?.designation === "" ||
      customer?.emiCustomerTypeId === "" ||
      customer?.email === ""
    ) {
      setNotificationMsg("Please Fill Up Necessary Information!");
      setSeverity("info");
      setShowNotification(true);
      return;
    }
    return true;
  };

  const submitHandle = async () => {
    if (validationFunction()) {
      if (customer?.emiCustomerTypeId === 1 && customer?.attachment === "") {
        setSeverity("info");
        setNotificationMsg("Please Upload Necessary File!");
        setShowNotification(true);
      } else {
        setIsLoading(true);
        try {
          let formData = new FormData();
          if (customer?.attachment !== "") {
            formData?.append("emiDocument", customer?.attachment);
          } else {
            const placeholderFile = new File([""], "emiDocument.png");
            formData.append("emiDocument", placeholderFile);
          }
          const data = customer;
          console.log(data);
          const jsonDataBlob = new Blob([JSON.stringify(data)], {
            type: "application/json",
          });
          formData.append("customer", jsonDataBlob, "data.json");
          const res = await Route(
            "POST",
            `/Customer/emiCustomerMaster`,
            access_token,
            formData,
            null,
            "multipart/form-data"
          );
          if (res?.status === 201) {
            resetStateFn();
            setSeverity("success");
            setNotificationMsg("EMI Customer Successfully Created!");
            setShowNotification(true);
          }
        } catch (error) {
          setNotificationMsg("Error", error);
          setSeverity("error");
          setShowNotification(true);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ overflow: "hidden" }}>
              <Grid
                container
                paddingX={4}
                paddingY={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: (theme) => theme.palette.bg.light,
                  color: "#fff",
                }}
              >
                <Grid item>
                  <Typography variant="subtitle1">
                    EMI Customer Details
                  </Typography>
                </Grid>
              </Grid>
              <Grid container padding={2}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <TextField
                      label="Customer Name"
                      name="customer_name"
                      required
                      onChange={customerNameHandle}
                      value={customer?.customerName}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Customer No (CID No)"
                      name="customer_no"
                      required
                      onChange={customerNoHandle}
                      value={customer?.customerNumber}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Mobile No"
                      name="mobile_no"
                      required
                      onChange={mobileNoHandle}
                      value={customer?.mobileNo}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ my: 0.5 }}>
                  <Grid item xs={4}>
                    <Autocomplete
                      disablePortal
                      options={emiCustomerTypes?.map((item) => ({
                        id: item?.emi_CUST_TYPE_ID,
                        label: item?.emi_CUST_TYPE_NAME,
                      }))}
                      onChange={(event, newValue) => {
                        if (newValue === null) {
                          resetStateFn();
                        } else {
                          emiCustomerTypeHandle(event, newValue);
                        }
                      }}
                      value={customer?.emiCustomerTypeName}
                      renderInput={(params) => (
                        <TextField {...params} label="EMI Customer Type" />
                      )}
                    />
                  </Grid>
                  {customer?.emiCustomerTypeId === 2 && (
                    <Grid item xs={4}>
                      <Autocomplete
                        disablePortal
                        options={emiFocalDetail?.map((item) => ({
                          id: item?.emi_FOCAL_ID,
                          label: item?.emi_FOCAL_ORGANIZATION,
                        }))}
                        onChange={(event, newValue) => {
                          if (newValue === null) {
                            setCustomer((prev) => ({
                              ...prev,
                              customerType: "EMI Customer",
                              customerName: "",
                              customerNumber: "",
                              mobileNo: "",
                              regionName: "",
                              designation: "",
                              email: "",
                              emiFocalId: "",
                              emi_FOCAL_ORGANIZATION: "",
                              emiCustomerTypeId: "",
                              emiCustomerTypeName: "",
                            }));
                          } else {
                            emiFocalDetailHandle(event, newValue);
                          }
                        }}
                        value={customer?.emi_FOCAL_ORGANIZATION}
                        renderInput={(params) => (
                          <TextField {...params} label="Organization" />
                        )}
                      />
                    </Grid>
                  )}
                  <Grid item xs={4}>
                    <TextField
                      label="Address/Location"
                      name="address"
                      required
                      value={customer?.regionName}
                      onChange={addressHandle}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Designation"
                      name="designation"
                      required
                      value={customer?.designation}
                      onChange={designationHandle}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Email"
                      name="email"
                      required
                      type="email"
                      value={customer?.email}
                      onChange={emailHandle}
                    />
                  </Grid>
                  {customer?.emiCustomerTypeId === 1 && (
                    <>
                      <Grid item xs={4}>
                        <TextField
                          type="file"
                          label={isDocUploaded ? "Attached File" : ""}
                          InputLabelProps={{ shrink: true }}
                          onChange={docHandle}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid container display="flex" justifyContent="flex-end" marginY={4}>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              size="small"
              onClick={submitHandle}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{
                background: "#fff",
              }}
              onClick={resetStateFn}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
      {showNotification && (
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

export default CreateEmiCustomer;
