import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Notification from "../ui/Notification";
import Route from "../routes/Route";

const FeedbackPortal = () => {
  // init states
  const [formData, setFormData] = useState({
    empId: "",
    message: "",
  });
  const [message, setMessage] = React.useState("");
  const [openNotification, setOpenNotification] = useState(false);
  // handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      empId: "",
      message: ""
    }));
    const response = await Route("POST", `/feedbacks`, null, formData);
      if (response?.status === 201) {
        setMessage(response?.data?.message);
        setOpenNotification(true);
      } else {
        setMessage(response?.response?.data?.message);
        setOpenNotification(true);
      }
  };

  return (
    <>
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography variant="h4" align="center" sx={{ mb: 4 }}>
            Feedback Portal
          </Typography>
          <Typography variant="subtitle2" align="center" sx={{ mb: 4 }}>
            Kindly provide your username for verification purposes when
            submitting feedback. Only messages will be visible to administrators
            only.
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "grid", gap: 2 }}>
              <TextField
                label="Employee Id"
                variant="outlined"
                fullWidth
                name="empId"
                value={formData.empId}
                onChange={handleChange}
                required
              />
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                size="large"
                color="primary"
                sx={{ width: "fit-content", mt: 2 }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
      {openNotification && (
        <Notification
          open={openNotification}
          setOpen={setOpenNotification}
          message={message}
        />
      )}
    </>
  );
};

export default FeedbackPortal;
