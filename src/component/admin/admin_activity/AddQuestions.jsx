import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Divider,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  InputBase,
} from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import EditQuestion from "./question_setup_section/EditQuestion";
import Transition from "../../../common/Transition";
import QuestionsSetup from "./QuestionsSetup";
import Notification from "../../../ui/Notification";
import Route from "../../../routes/Route";

const AddQuestions = () => {
  const [questionsSetUp, setQuestionsSetUp] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState({});
  const [options, setOptions] = useState([]);
  const [optionsTwo, setOptionsTwo] = useState([]);
  const [deleteQuestion, setDeleteQuestion] = useState(false);
  const [id, setId] = React.useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  // handlers
  const searchHandle = (e) => {
    setSearchQuery(e.target.value);
  };
  const fetchQuestion = async (id) => {
    const res = await Route("GET", "/questions", token, null, id);
    if (res?.status === 200) {
      setId(id);
      setDetails(res?.data?.question);
      setOptions(res?.data?.options);
      setOptionsTwo(res?.data?.optionsTwo);
      setEdit(true);
    }
  };
  const editHandle = (param) => {
    fetchQuestion(param?.row?.id);
  };
  const deleteHandle = (param) => {
    setId(param?.id);
    setDeleteQuestion(true);
  };
  const userColumns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "question", headerName: "Question", width: 550 },
    { field: "point", headerName: "Point", width: 60 },
    {
      field: "type",
      headerName: "Question Type",
      width: 250,
      valueGetter: (params) => params.row.QuestionType?.title || "N/A",
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => editHandle(params)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => deleteHandle(params)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  const questionSetUpHandle = () => {
    setQuestionsSetUp(true);
  };
  const token = localStorage.getItem("token");
  const fetchQuestions = async () => {
    const res = await Route("GET", "/questions", token, null, null);
    if (res?.status === 200) {
      setQuestions(res?.data?.questions);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);
  const filteredData = questions.filter((item) =>
    item?.question.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const confirmDeleteHandler = async () => {
    const res = await Route("DELETE", `/questions`, token, null, id);
    if (res?.status === 201) {
      setDeleteQuestion(false);
      setMessage(res?.data?.message);
      fetchQuestions();
      setOpenNotification(true);
    } else {
      setMessage(res?.data?.message);
      setOpenNotification(true);
    }
  };
  return (
    <>
      {questionsSetUp ? (
        <QuestionsSetup
          setQuestionsSetUp={setQuestionsSetUp}
          setOpenNotification={setOpenNotification}
          setMessage={setMessage}
          fetchQuestions={fetchQuestions}
        />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
            <SubHeader text="Add Questions" />
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid item>
                <Paper
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 400,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    inputProps={{ "aria-label": "search" }}
                    onChange={searchHandle}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  endIcon={<PersonAddIcon />}
                  sx={{ mr: 2 }}
                  onClick={questionSetUpHandle}
                >
                  Add Questions
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<FileDownloadIcon />}
                >
                  Export
                </Button>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
              <div style={{ height: "auto", width: "100%" }}>
                <DataGrid
                  rows={filteredData?.map((row, index) => ({
                    ...row,
                    sl: index + 1,
                  }))}
                  columns={userColumns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                />
              </div>
            </Grid>
          </Grid>
        </Box>
      )}
      {edit ? (
        <EditQuestion
          id={id}
          details={details}
          options={options}
          optionsTwo={optionsTwo}
          open={edit}
          setOpen={setEdit}
          fetchQuestions={fetchQuestions}
          setOpenNotification={setOpenNotification}
          setMessage={setMessage}
        />
      ) : null}
      {deleteQuestion ? (
        <Dialog
          open={deleteQuestion}
          onClose={() => setDeleteQuestion(false)}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <Typography variant="h6">Confirmation</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              Are you sure you want to delete this question?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ mb: 2, mx: 2 }}>
            <Button
              onClick={confirmDeleteHandler}
              variant="contained"
              autoFocus
              size="small"
            >
              Confirm
            </Button>
            <Button
              onClick={() => setDeleteQuestion(false)}
              variant="outlined"
              color="error"
              size="small"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
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

export default AddQuestions;
