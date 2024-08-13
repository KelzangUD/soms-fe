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
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Transition from "../../../common/Transition";
import AddDesignation from "./designations/AddDesignation";
import EditDesignation from "./designations/EditDesignation";
import Notification from "../../../ui/Notification";
import Route from "../../../routes/Route";

const Designations = () => {
  // init states
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [designations, setDesignations] = useState([]);
  const [details, setDetails] = useState({});
  const [deleteDesignation, setDeleteDesignation] = useState(false);
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

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
    setDeleteDesignation(true);
  };
  const token = localStorage.getItem("token");
  const fetchDesignations = async () => {
    const res = await Route("GET", "/designations", token, null, null);
    if (res?.status === 200) {
      setDesignations(res?.data?.designations);
    }
  };
  useEffect(() => {
    fetchDesignations();
  }, []);
  const filteredData = designations.filter(
    (item) =>
      item?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.Department?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const userColumns = [
    {
      field: "sl",
      headerName: "Sl. No",
      width: 40,
      valueGetter: (params) => params.row.sl,
    },
    { field: "title", headerName: "Title", width: 400 },
    {
      field: "department_or_unit",
      headerName: "Department/Unit",
      width: 200,
      valueGetter: (params) => params.row.Department?.title || "N/A",
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
  const confirmDeleteHandler = async () => {
    const res = await Route("DELETE", `/designations`, token, null, id);
    if (res?.status === 201) {
      setDeleteDesignation(false);
      setMessage(res?.data?.message);
      fetchDesignations();
      setOpenNotification(true);
    } else {
      setMessage(res?.data?.message);
      setOpenNotification(true);
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Designations" />
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
                endIcon={<AddIcon />}
                sx={{ mr: 2 }}
                onClick={() => setAdd(true)}
              >
                Add Designation
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
      {add ? (
        <AddDesignation
          open={add}
          setOpen={setAdd}
          setOpenNotification={setOpenNotification}
          setMessage={setMessage}
          fetchDesignations={fetchDesignations}
        />
      ) : null}
      {edit ? (
        <EditDesignation
          details={details}
          open={edit}
          setOpen={setEdit}
          setOpenNotification={setOpenNotification}
          setMessage={setMessage}
          fetchDesignations={fetchDesignations}
        />
      ) : null}
      {deleteDesignation ? (
        <Dialog
          open={deleteDesignation}
          onClose={() => setDeleteDesignation(false)}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <Typography variant="h6">Confirmation</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              Are you sure you want to delete this Designation? After deletion,
              the impact will be reflected on users' designation.
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
              onClick={() => setDeleteDesignation(false)}
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

export default Designations;
