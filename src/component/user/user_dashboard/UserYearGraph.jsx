import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Route from "../../../routes/Route";
import { filterDataBasedOnYear, userYearGraphData } from "../../../util/CommonUtil";

const UserYearGraph = () => {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [data, setData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const yearHandle = (e) => {
    setYear(e.target.value);
  };
  const token = localStorage.getItem("token");
  const fetchYearlyData = async () => {
    const res = await Route("GET", `/results/${user?.id}`, token, null, null);
    if (res?.status === 200) {
      setData(res?.data?.results);
    };
  };
  useEffect(() => {
    fetchYearlyData();
  }, [])
  useEffect(() => {
    setYearData(userYearGraphData(filterDataBasedOnYear(data, year)));
  },[data, year]);
  return (
    <Box>
      <Typography variant="subtitle1">One Year Graph</Typography>
      <Grid item xs={12}>
        <Grid sx={{ display: "flex", justifyContent: "flex-end", py: "4px" }}>
          <Box>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={year}
                label="Year"
                onChange={yearHandle}
              >
                <MenuItem value={"2023"}>2023</MenuItem>
                <MenuItem value={"2024"}>2024</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Box sx={{ display: "flex", alignItems: "left" }}>
          <Box>
            <BarChart
              width={1140}
              height={500}
              data={yearData}
              margin={{
                top: 5,
                right: 30,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#3081D0" />
            </BarChart>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default UserYearGraph;
