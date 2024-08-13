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
import SearchIcon from "@mui/icons-material/Search";
import QuizIcon from "@mui/icons-material/Quiz";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ScheduleTest from "./schedule_test/ScheduleTest";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditScheduleTest from "./schedule_test/EditScheduleTest";
import ReScheduleTest from "./schedule_test/ReScheduleTest";
import Transition from "../../../common/Transition";
import Notification from "../../../ui/Notification";
import Route from "../../../routes/Route";

const ScheduleTests = () => {
  const [tests, setTests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [scheduleTest, setScheduleTest] = useState(false);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState({});
  const [deleteTest, setDeleteTest] = useState(false);
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [absents, setAbsents] = useState([]);
  const [rescheduleTest, setRescheduleTest] = useState(false);
  // handlers
  const searchHandle = (e) => {
    setSearchQuery(e.target.value);
  };
  const editHandle = (param) => {
    setDetails(param?.row);
    setEdit(true);
  };
  const deleteHandle = (param) => {
    setId(param?.id);
    setDeleteTest(true);
  };
  const token = localStorage.getItem("token");
  const fetchTest = async () => {
    const res = await Route("GET", "/tests", token, null, null);
    if (res?.status === 200) {
      setTests(res?.data?.tests);
    }
  };
  const fetchTestDetails = async (id) => {
    const res = await Route("GET", "/tests/test_details", token, null, id);
    if (res?.status === 200) {
      if (res?.data?.absent?.length > 0) {
        setAbsents(res?.data?.absent);
        setRescheduleTest(true);
      } else {
        setMessage(res?.data?.message);
        setOpenNotification(true);
      }
    } else {
      setMessage(res?.data?.message);
      setOpenNotification(true);
    }
  };
  useEffect(() => {
    fetchTest();
  }, []);
  const retestHandle = (params) => {
    setId(params?.row?.id)
    fetchTestDetails(params?.row?.id)
  };
  const userColumns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "name", headerName: "Test Name", width: 250 },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 150,
      valueGetter: (params) => params.row.start_date.split("T")[0],
    },
    { field: "start_time", headerName: "Start Time", width: 100 },
    {
      field: "end_date",
      headerName: "End Date",
      width: 150,
      valueGetter: (params) => params.row.end_date.split("T")[0],
    },
    { field: "end_time", headerName: "End Time", width: 100 },
    { field: "duration", headerName: "Duration", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      valueGetter: (params) => params.row.status === true ? "Active" : "Inactive",
    },
    {
      field: "action",
      headerName: "Action",
      width: 140,
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
          <IconButton
            aria-label="view"
            size="small"
            onClick={() => retestHandle(params)}
          >
            <VisibilityIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  const filteredData = tests?.filter((item) =>
    item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const deleteTestHandler = async() => {
    const res = await Route("DELETE", `/tests`, token, null, id);
    if (res?.status === 201) {
      setDeleteTest(false);
      setMessage(res?.data?.message);
      fetchTest();
      setOpenNotification(true);
    } else {
      setMessage(res?.data?.message);
      setOpenNotification(true);
    }
  }
  return (
    <>
      {scheduleTest ? (
        <ScheduleTest
          setScheduleTest={setScheduleTest}
          setMessage={setMessage}
          setOpenNotification={setOpenNotification}
          fetchTest={fetchTest}
        />
      ) : rescheduleTest ? (
        <ReScheduleTest
          setScheduleTest={setRescheduleTest}
          setMessage={setMessage}
          setOpenNotification={setOpenNotification}
          fetchTest={fetchTest}
          absents={absents}
          id={id}
        />
      ): edit ? (
        <EditScheduleTest
          testDetails={details}
          setOpen={setEdit}
          setMessage={setMessage}
          setOpenNotification={setOpenNotification}
          fetchTest={fetchTest}
        />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
            <SubHeader text="Scheduled Tests" />
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
                  endIcon={<QuizIcon />}
                  sx={{ mr: 2 }}
                  onClick={() => setScheduleTest(true)}
                >
                  Schedule Test
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
      {deleteTest ? (
        <Dialog
          open={deleteTest}
          onClose={() => setDeleteTest(false)}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <Typography variant="h6">Confirmation</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              Are you sure you want to delete this test?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ mb: 2, mx: 2 }}>
            <Button
              onClick={deleteTestHandler}
              variant="contained"
              autoFocus
              size="small"
            >
              Confirm
            </Button>
            <Button
              onClick={() => setDeleteTest(false)}
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

export default ScheduleTests;
