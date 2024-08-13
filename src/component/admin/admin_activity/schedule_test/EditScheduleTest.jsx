import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  // FormGroup,
  // FormControlLabel,
  // Checkbox,
  Button,
} from "@mui/material";
import SubHeader from "../../../../common/SubHeader";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Route from "../../../../routes/Route";
import dayjs from "dayjs";

const EditScheduleTest = ({
  testDetails,
  setOpen,
  setMessage,
  setOpenNotification,
  fetchTest,
  route="tests"
}) => {
  // const [questions, setQuestions] = useState([]);
  // const [selectAll, setSelectAll] = useState(false);
  const [details, setDetails] = useState({
    testName: testDetails?.name,
    startDate: testDetails?.start_date,
    endDate: testDetails?.end_date,
    duration: testDetails?.duration,
    startTime: new Date().toISOString().split("T")[0]+"T"+testDetails?.start_time+".000Z",
    endTime: new Date().toISOString().split("T")[0]+"T"+testDetails?.end_time+".000Z",
    message: testDetails?.message,
    status: testDetails?.status,
    // questions: [],
  });
  const token = localStorage.getItem("token");
  // const fetchQuestions = async () => {
  //   const res = await Route("GET", "/questions", token, null, null);
  //   if (res?.status === 200) {
  //     setQuestions(res?.data?.questions);
  //   }
  // };
  // useEffect(() => {
  //   fetchQuestions();
  // }, []);
  const testNameHandler = (e) => {
    setDetails((prev) => ({
      ...prev,
      testName: e.target.value,
    }));
  };
  const startDateHandler = (e) => {
    setDetails((prev) => ({
      ...prev,
      startDate: e?.$d.toISOString(),
    }));
  };
  const endDateHandler = (e) => {
    setDetails((prev) => ({
      ...prev,
      endDate: e?.$d.toISOString(),
    }));
  };
  const durationHandler = (e) => {
    setDetails((prev) => ({
      ...prev,
      duration: e.target.value,
    }));
  };
  const startTimeHandler = (e) => {
    setDetails((prev) => ({
      ...prev,
      startTime: e?.$d,
    }));
  };
  const endTimeHandler = (e) => {
    setDetails((prev) => ({
      ...prev,
      endTime: e?.$d,
    }));
  };
  const messageHandler = (e) => {
    setDetails((prev) => ({
      ...prev,
      message: e.target.value,
    }));
  };
  const statusHandler = (e) => {
    setDetails((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };
  // const selectAllHandler = (e) => {
  //   setSelectAll(e.target.checked);
  //   const allQuestionIds = questions.map((question) => question.id);
  //   setDetails((prev) => ({
  //     ...prev,
  //     questions: e.target.checked ? allQuestionIds : [],
  //   }));
  // };
  // const itemHandler = (e, id) => {
  //   const isChecked = e.target.checked;
  //   setDetails((prev) => ({
  //     ...prev,
  //     questions: isChecked
  //       ? [...prev.questions, id] // Add the question id if checked
  //       : prev.questions.filter((questionId) => questionId !== id), // Remove the question id if unchecked
  //   }));
  // };
  const editScheduleHandle = async () => {
    const res = await Route("PUT", `/${route}`, token, details, testDetails?.id);
    if (res?.status === 201) {
      fetchTest();
      setOpen(false);
      setMessage(res?.data?.message);
      setOpenNotification(true);
    } else {
      setMessage(res?.response?.data?.message);
      setOpenNotification(true);
    }
  };
  return (
    <>
      <>
        <Grid container spacing={2} sx={{ px: 2 }}>
          <SubHeader text="Scheduled Tests | Schedule Test" />
          <Grid
            container
            sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}
          >
            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              onClick={editScheduleHandle}
              sx={{ mr: 2 }}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              color="error"
              endIcon={<HighlightOffIcon />}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
            <Card variant="outlined" sx={{ width: 1100 }}>
              <Grid item xs={12} sx={{ p: 2 }}>
                <Typography as="h6">Schedule Test</Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                alignItems="center"
                spacing={2}
                sx={{ px: 2 }}
              >
                <Grid item xs={4} sx={{ mt: 1 }}>
                  <TextField
                    id="outlined-basic"
                    label="Test Name"
                    variant="outlined"
                    fullWidth
                    defaultValue={testDetails?.name}
                    onChange={testNameHandler}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["startDatePicker"]}>
                      <DatePicker
                        label="Start Date"
                        sx={{ width: "100%" }}
                        defaultValue={
                          testDetails ? dayjs(testDetails.start_date) : null
                        }
                        onChange={startDateHandler}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["endDatePicker"]}>
                      <DatePicker
                        label="End Date"
                        sx={{ width: "100%" }}
                        defaultValue={
                          testDetails ? dayjs(testDetails.end_date) : null
                        }
                        onChange={endDateHandler}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
                alignItems="center"
                spacing={2}
                sx={{ p: 2 }}
              >
                <Grid item xs={4} sx={{ mt: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="duration-select-label">Duration</InputLabel>
                    <Select
                      labelId="duration-select-label"
                      id="duration-select-small"
                      label="Duration"
                      defaultValue={testDetails?.duration}
                      onChange={durationHandler}
                    >
                      <MenuItem value="30 mins">30 mins</MenuItem>
                      <MenuItem value="1 Hr">1 Hour</MenuItem>
                      <MenuItem value="2 Hrs">2 Hours</MenuItem>
                      <MenuItem value="3 Hrs">3 Hours</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        label="Start Time"
                        sx={{ width: "100%" }}
                        defaultValue={
                          testDetails
                            ? dayjs(`2022-01-01T${testDetails.start_time}`)
                            : null
                        }
                        onChange={startTimeHandler}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        label="End Time"
                        sx={{ width: "100%" }}
                        defaultValue={
                          testDetails
                            ? dayjs(`2022-01-01T${testDetails.end_time}`)
                            : null
                        }
                        onChange={endTimeHandler}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <Grid item xs={4} sx={{ mt: 1 }}>
                    <FormControl fullWidth>
                      <InputLabel id="duration-select-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="duration-select-label"
                        id="duration-select-small"
                        label="Duration"
                        defaultValue={testDetails?.status}
                        onChange={statusHandler}
                      >
                        <MenuItem value={true}>Active</MenuItem>
                        <MenuItem value={false}>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <TextField
                    id="outlined-basic"
                    label="Message"
                    multiline
                    defaultValue={testDetails?.message}
                    rows={3}
                    variant="outlined"
                    fullWidth
                    onChange={messageHandler}
                    required
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Select All Questions"
                      onClick={selectAllHandler}
                    />
                  </FormGroup>
                </Grid>
                {questions?.map((question, index) => (
                  <Grid item xs={12} key={question?.id}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={details?.questions.includes(question?.id)||false}
                            onChange={(e) => itemHandler(e, question?.id)}
                          />
                        }
                        label={`${index + 1}. ${question?.question}`}
                      />
                    </FormGroup>
                  </Grid>
                ))} */}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </>
    </>
  );
};

export default EditScheduleTest;
