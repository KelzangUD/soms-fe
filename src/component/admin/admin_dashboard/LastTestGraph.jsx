import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
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
import { calculateLatestTestResults } from "../../../util/CommonUtil";


const LastTestGraph = () => {
  const [latestResults, setLatestResults] = useState([]);
  const token = localStorage.getItem("token");
  const fetchLatestResults = async () => {
    const res = await Route("GET", "/results/latest", token, null, null);
    if (res?.status === 200) {
      setLatestResults(calculateLatestTestResults(res?.data?.results));
    }
  };
  useEffect(() => {
    fetchLatestResults();
  }, []);
  return (
    <Box>
      <Typography variant="subtitle1">Last Test</Typography>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", alignItems: "left" }}>
          <Box>
            <BarChart
              width={600}
              height={300}
              data={latestResults}
              margin={{
                top: 5,
                right: 30,
                left: -30,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="excel" fill="#2AAF74" />
              <Bar dataKey="good" fill="#3081D0" />
              <Bar dataKey="average" fill="#EE7214" />
              <Bar dataKey="failed" fill="#D3756B" />
            </BarChart>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default LastTestGraph;
