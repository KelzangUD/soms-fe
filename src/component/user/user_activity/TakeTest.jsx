import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Alert, Stack } from "@mui/material";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PublishIcon from '@mui/icons-material/Publish';
import SubHeader from "../../../common/SubHeader";
import Notification from "../../../ui/Notification";
import Counter from "../../../ui/Counter";
import Solution from "./Solution";
import DialogUi from "../../../ui/DialogUi";
import Route from "../../../routes/Route";
import { calculateDuration } from "../../../util/CommonUtil";

const TakeTest = ({ id, details, setTakeTest, questions, route="results" }) => {
  const [testDetails, setTestDetails] = useState(details);
  const [message, setMessage] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [result, setResult] = useState({
    user: JSON.parse(localStorage.getItem("user"))?.id,
    test: details?.id,
    score: 0,
    total: null,
  });
  const [showSubmit, setShowSubmit] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    setResult(prev => ({
      ...prev,
      total: questions?.reduce((accumulator, item) => {
        return accumulator + item?.point;
      }, 0)
    }));
  }, [questions]);
  let intervalId = null;
  const deadline = new Date().getTime() + calculateDuration(details?.duration);
  // const deadline = new Date().getTime() + 1 * 60 * 1000;
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const timeLeft = deadline - now;
      // Handle timer reaching zero
      if (deadline <= now) {
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setShowSubmit(true);
        return;
      }

      // Calculate remaining days, hours, minutes, and seconds
      setHours(Math.floor(timeLeft / (1000 * 60 * 60)));
      setMinutes(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((timeLeft % (1000 * 60)) / 1000));
    };

    let intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const submitSolutionHandle = async() => {
    const res = await Route("POST", `/${route}`, token, result, null);
    if (res?.status === 201) {
      setMessage(res?.data?.message);
      setOpenNotification(true);
      setShowSubmit(false);
      setTakeTest(false);
    } else {
      setMessage(res?.data?.message);
      setOpenNotification(true);
    }
  }
  // Handle timer reaching zero (optional)
  if (hours === 0 && minutes === 0 && seconds === 0) {
    clearInterval(intervalId);
  }
  const currentItem = (
    <Solution index={currentIndex + 1} question={questions[currentIndex]} setResult={setResult} setSolvedQuestions={setSolvedQuestions} />
  );
  const nextHandle = () => {
    if(solvedQuestions?.length < currentIndex+1) {
      setMessage("Please Submit a answer");
      setOpenNotification(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Take Test" />
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {testDetails?.message !== "" && (
              <Stack sx={{ width: "80%" }} spacing={2}>
                <Alert severity="info">{testDetails?.message}</Alert>
              </Stack>
            )}
            <Counter value={hours} name="Hours" />
            <Counter value={minutes} name="Mins" />
            <Counter value={seconds} name="Secs" />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              endIcon={<StopCircleIcon />}
              sx={{ mr: 2 }}
              onClick={submitSolutionHandle}
            >
              End Test
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }}>
            {currentItem && currentItem}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            {questions?.length - 1 > currentIndex ? (
              <Button
                variant="outlined"
                endIcon={<ArrowForwardIcon />}
                sx={{ mr: 2 }}
                onClick={nextHandle}
              >
                Next
              </Button>
            ) : (<Button
            variant="outlined"
            startIcon={<PublishIcon />}
            sx={{ mr: 2 }}
            onClick={submitSolutionHandle}
          >
            Submit
          </Button>
        )}
          </Grid>
        </Grid>
      </Box>
      {openNotification && (
        <Notification
          open={openNotification}
          setOpen={setOpenNotification}
          message={message}
        />
      )}
      {
        showSubmit && (<DialogUi title="" message="Thank you for taking the time to participate in the test. Please submit your solutions." open={showSubmit} cancelHandle={() => setShowSubmit(false)} submitHandle={submitSolutionHandle} />)
      }
    </>
  );
};

export default TakeTest;
