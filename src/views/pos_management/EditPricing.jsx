import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Route from "../../routes/Route";
import { Notification, LoaderDialog } from "../../ui/index";
import { LoadingButton } from "@mui/lab";
import { Transition } from "../../component/common/index";

const EditPricing = ({ open, setOpen, details, fetchAllItems }) => {
  const access_token = localStorage.getItem("access_token");
  const [newPrice, setNewPrice] = useState(details?.mrp || "");
  useEffect(() => {
    console.log("details", details);
  }, [details]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const priceHandle = (e) => {
    setNewPrice(e?.target?.value);
  };
  const updatePriceHandle = async () => {
    setIsLoading(true);
    try {
      const res = await Route(
        "PUT",
        `/Pricing/Update_Pricing?pricing_id=${
          details?.pricing_id
        }&mrp=${newPrice}&userId=${localStorage.getItem("username")}`,
        access_token,
        null,
        null
      );
      console.log(res);
      if (res?.status === 200) {
        setNotificationMessage("Price Updated Successfully");
        setSeverity("success");
        setShowNotification(true);
        fetchAllItems();
      } else {
        setNotificationMessage("Failed to Update Price");
        setSeverity("error");
        setShowNotification(true);
      }
    } catch (err) {
      setNotificationMessage("Failed to Update Price");
      setSeverity("error");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xl"
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
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
                <Typography variant="subtitle1">Edit Pricing</Typography>
              </Grid>
              <Grid container padding={4} spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Description"
                    value={details?.description}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Item Number"
                    value={details?.item_number}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    label="Current MRP"
                    value={details?.mrp}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    label="New MRP"
                    value={newPrice}
                    onChange={priceHandle}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                alignItems="right"
                paddingY={1}
                paddingX={4}
                marginBottom={2}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <LoadingButton
                  variant="contained"
                  onClick={updatePriceHandle}
                  sx={{ mr: 2 }}
                  loading={isLoading}
                >
                  Update
                </LoadingButton>
                <Button
                  variant="outlined"
                  onClick={() => setOpen(false)}
                  color="error"
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
      {isLoading && <LoaderDialog open={isLoading} />}
      {showNotification && (
        <Notification
          open={showNotification}
          setOpen={() => {
            setShowNotification(false);
            setOpen(false);
          }}
          message={notificationMessage}
          severity={severity}
        />
      )}
    </>
  );
};

export default EditPricing;
