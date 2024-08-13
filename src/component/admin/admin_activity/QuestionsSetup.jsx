import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Divider,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import Transition from "../../../common/Transition";
// import SlideSection from "./question_setup_section/SlideSection";
import MainSlide from "./question_setup_section/MainSlide";
import Route from "../../../routes/Route";
import { dynamicHandle } from "../../../util/CommonUtil";

const QuestionsSetup = ({
  setQuestionsSetUp,
  setOpenNotification,
  setMessage,
  fetchQuestions
}) => {
  // init states
  const [questionTypes, setQuestionTypes] = useState([]);
  const [cancel, setCancel] = useState(false);
  const [addedRow, setAddedRow] = React.useState([]);
  const [rows, setRows] = React.useState(0);
  const [questions, setQuestions] = useState([]);
  const addQuestion = (id, prop, value) => {
    dynamicHandle(id, prop, value, setQuestions);
  };
  const deleteRowHandle = (id) => {
    setQuestions((prevProductDetails) => {
      return prevProductDetails.filter((item) => item?.id !== id);
    });
    setAddedRow((prev) => prev.filter((row) => row.props?.id !== id));
  };

  const token = localStorage.getItem("token");
  const fetchQuestionTypes = async () => {
    const res = await Route("GET", "/question-types", token, null, null);
    if (res?.status === 200) {
      setQuestionTypes(res?.data?.questionTypes);
    }
  };
  useEffect(() => {
    fetchQuestionTypes();
  }, []);
  const row = (id) => (
    <MainSlide
      key={id}
      id={id}
      index={id}
      questionTypes={questionTypes}
      deleteRowHandle={deleteRowHandle}
      addQuestion={addQuestion}
    />
  );
  const addNewRowHandle = () => {
    const newId = rows + 1;
    setRows(newId);
    setAddedRow((prev) => [...prev, row(newId)]);
  };

  const saveHandle = async () => {
    if (questions.length > 0) {
      const response = await Route("POST", `/questions`, token, questions, null);
      if (response?.status === 201) {
        setMessage(response?.data?.message);
        setOpenNotification(true);
        fetchQuestions();
        setQuestionsSetUp(false);
      } else {
        setMessage(response?.response?.data?.message);
        setOpenNotification(true);
      }
    } else {
      setMessage("Please set up question/questions before saving them.");
      setOpenNotification(true);
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Add Questions | Questions Setup" />
          <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="contained"
                sx={{ mr: 2 }}
                endIcon={<SaveIcon />}
                onClick={saveHandle}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                endIcon={<CancelIcon />}
                onClick={() => setCancel(true)}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            {/* <Grid item xs={3}>
              <SlideSection setQuestions={setQuestions} addQuestion={addQuestion} questions={questions} />
            </Grid> */}
            {/* <Divider orientation="vertical" flexItem /> */}
            <Grid item xs={12} sx={{ px: 2, height: "100%" }}>
              {addedRow.length > 0 && addedRow?.map((item) => item)}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ px: 4, minWidth: "100%" }}>
        <Button
          aria-label="add slide"
          size="small"
          variant="contained"
          color="primary"
          endIcon={<AddIcon />}
          onClick={addNewRowHandle}
        >
          Add Question
        </Button>
      </Box>
      {cancel ? (
        <Dialog
          open={cancel}
          onClose={() => setCancel(false)}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <Typography variant="h6">Confirmation</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              Are you sure you want to cancel? All the questions set up will be
              lost.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ mb: 2, mx: 2 }}>
            <Button
              onClick={() => setQuestionsSetUp(false)}
              variant="contained"
              autoFocus
              size="small"
            >
              Confirm
            </Button>
            <Button
              onClick={() => setCancel(false)}
              variant="outlined"
              color="error"
              size="small"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
};

export default QuestionsSetup;
