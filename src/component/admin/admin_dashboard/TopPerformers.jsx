import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Route from "../../../routes/Route";

const TopPerformers = () => {
  const [topPerformersData, setTopPerformarsData] = useState([]);
  const token = localStorage.getItem("token");
  const fetchTopPerformers = async () => {
    const res = await Route("GET", "/results/top_performers", token, null, null);
    if (res?.status === 200) {
      setTopPerformarsData(res?.data?.results);
    };
  };
  useEffect(() => {
    fetchTopPerformers();
  }, []);
  return (
    <>
      <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
        <Grid item xs={12}>
          <Typography>Top Five Performers</Typography>
        </Grid>
        <Grid item xs={12}>
          {/* <TableContainer> */}
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sl.No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Average Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topPerformersData?.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {row.name}
                    </TableCell>
                    <TableCell>{row.employeeID}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell align="right">{row.averageScore}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          {/* </TableContainer> */}
        </Grid>
      </Grid>
    </>
  );
};

export default TopPerformers;
