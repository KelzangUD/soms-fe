import React, {useState, useEffect} from "react";
import {
  Box,
  Grid,
  // Divider,
  // Typography,
  // Button,
  // IconButton,
  // Dialog,
  // DialogActions,
  // DialogContent,
} from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
// import AddIcon from "@mui/icons-material/Add";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import Transition from "../../../common/Transition";
// import AddGrade from "./grades/AddGrade";
// import EditGrade from "./grades/EditGrade";
import Route from "../../../routes/Route";

const rows = [
  {
    id: 1,
    sl: 1,
    title: "Excel",
    range: "90-100",
    min: 90,
    max: 100,
  },
  {
    id: 2,
    sl: 2,
    title: "Good",
    range: "70-89",
    min: 70,
    max: 89,
  },
  {
    id: 3,
    sl: 3,
    title: "Average",
    range: "50-69",
    min: 50,
    max: 69,
  },
  {
    id: 4,
    sl: 4,
    title: "Failed",
    range: "0-49",
    min: 0,
    max: 49,
  },
];

const Grades = () => {
  // init states
  const [grades, setGrades] = useState([]);
  // const [add, setAdd] = useState(false);
  // const [edit, setEdit] = useState(false);
  // const [details, setDetails] = useState({});
  // const [deleteGrade, setDeleteGrade] = useState(false);
  // const [id, setId] = useState("");

  const token = localStorage.getItem("token");
  const fetchGrades = async () => {
    const res = await Route("GET", "/grades", token, null);
    if (res?.status === 200) {
      setGrades(res?.data?.grades?.map(((item,index) => ({
        sl: index+1,
        title: item?.title,
        range: `${item?.min}-${item?.max}`
      }))));
    }
  };
  useEffect(() => {
    fetchGrades();
  }, []);
  // handlers
  // const editHandle = (param) => {
  //   setDetails(param?.row);
  //   setEdit(true);
  // };
  // const deleteHandle = (param) => {
  //   setId(param?.id);
  //   setDeleteGrade(true);
  // };
  const userColumns = [
    {
      field: "sl",
      headerName: "Sl. No",
      width: 40,
    },
    { field: "title", headerName: "Title", width: 200 },
    { field: "range", headerName: "Range", width: 200 },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 120,
    //   renderCell: (params) => (
    //     <div>
    //       <IconButton
    //         aria-label="edit"
    //         size="small"
    //         onClick={() => editHandle(params)}
    //       >
    //         <EditIcon />
    //       </IconButton>
    //       <IconButton
    //         aria-label="delete"
    //         size="small"
    //         onClick={() => deleteHandle(params)}
    //       >
    //         <DeleteIcon />
    //       </IconButton>
    //     </div>
    //   ),
    // },
  ];
  // const addHandle = () => {
  //   setAdd(true);
  // };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Grades" />
          {/* <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Grid item>
              <Button
                variant="outlined"
                endIcon={<AddIcon />}
                sx={{ mr: 2 }}
                onClick={addHandle}
              >
                Add Grade
              </Button>
              <Button
                variant="contained"
                color="success"
                endIcon={<FileDownloadIcon />}
              >
                Export
              </Button>
            </Grid>
          </Grid> */}
          <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
            <div style={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={rows}
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
      {/* {add ? <AddGrade open={add} setOpen={setAdd} /> : null}
      {edit ? (
        <EditGrade details={details} open={edit} setOpen={setEdit} />
      ) : null}
      {deleteGrade ? (
        <Dialog
          open={deleteGrade}
          onClose={() => setDeleteGrade(false)}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <Typography variant="h6">Confirmation</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              Are you sure you want to delete this Grade? After deletion, the
              impact will be reflected in the dashboard graphs.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ mb: 2, mx: 2 }}>
            <Button
              onClick={() => setDeleteGrade(false)}
              variant="contained"
              autoFocus
              size="small"
            >
              Confirm
            </Button>
            <Button
              onClick={() => setDeleteGrade(false)}
              variant="outlined"
              color="error"
              size="small"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : null} */}
    </>
  );
};

export default Grades;
