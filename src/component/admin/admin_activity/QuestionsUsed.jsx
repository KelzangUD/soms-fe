import React, { useState, useEffect } from "react";
import { Box, Grid, Button, IconButton, Paper, InputBase } from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import Route from "../../../routes/Route";

const QuestionsUsed = () => {
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // handlers
  const searchHandle = (e) => {
    setSearchQuery(e.target.value);
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
  ];

  const token = localStorage.getItem("token");
  const fetchQuestions = async () => {
    const res = await Route("GET", "/questions/used", token, null, null);
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
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Questions Used" />
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
    </>
  );
};

export default QuestionsUsed;
