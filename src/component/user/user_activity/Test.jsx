import React, { useState, useEffect } from "react";
import { Box, Grid, IconButton, Paper, InputBase } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SubHeader from "../../../common/SubHeader";
import Notification from "../../../ui/Notification";
import Route from "../../../routes/Route";
import TakeTest from "./TakeTest";
import { shuffleArray } from "../../../util/CommonUtil";

const Test = () => {
  const [tests, setTests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [id, setId] = useState(null);
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [takeTest, setTakeTest] = useState(false);
  const [details, setDetails] = useState({});
  const [questions, setQuestions] = useState([]);
  const token = localStorage.getItem("token");
  const fetchTests = async () => {
    const res = await Route("GET", "/tests", token, null, null);
    if (res?.status === 200) {
      setTests(res?.data?.tests);
    }
  };
  useEffect(() => {
    fetchTests();
  }, []);
  const filteredData = tests?.filter((item) =>
    item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // handlers
  const searchHandle = (e) => {
    setSearchQuery(e.target.value);
  };
  const fetchQuestions = async (id, row) => {
    const res = await Route("GET", "/tests", token, null, id);
    if (res?.status === 200) {
      if (res?.data?.message == "You have Already Appeared for Test") {
        setMessage(res?.data?.message);
        setShowNotification(true);
      } else {
        setQuestions(shuffleArray(res?.data?.questions));
        setDetails(row);
        setTakeTest(true);
      }
    } else {
      setMessage(res?.data?.message);
      setShowNotification(true);
    }
  };
  const testHandle = (param) => {
    if (param?.row?.end_date < new Date().toJSON()) {
      setMessage("You're unable to take the test at this time because registration is closed.");
      setShowNotification(true);
    } else {
      fetchQuestions(param?.row?.id, param?.row);
    }
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
      valueGetter: (params) =>
        params.row.status === true ? "Active" : "Inactive",
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
            onClick={() => testHandle(params)}
          >
            <EditNoteIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  return (
    <>
      {takeTest ? (
        <TakeTest
          details={details}
          setTakeTest={setTakeTest}
          questions={questions}
        />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
            <SubHeader text="Test" />
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

      {showNotification ? (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={message}
        />
      ) : null}
    </>
  );
};

export default Test;
