import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from "recharts";
import { Paper, Typography } from "@mui/material";

const data = [
  {
    name: "Jan",
    amt: 2400,
  },
  {
    name: "Feb",
    amt: 2210,
  },
  {
    name: "Mar",
    amt: 2290,
  },
  {
    name: "Apr",
    amt: 200,
  },
  {
    name: "May",
    amt: 2181,
  },
  {
    name: "Jun",
    amt: 500,
  },
  {
    name: "Jul",
    amt: 2100,
  },
  {
    name: "Aug",
    amt: 2290,
  },
  {
    name: "Sept",
    amt: 2000,
  },
  {
    name: "Oct",
    amt: 1181,
  },
  {
    name: "Nov",
    amt: 2500,
  },
  {
    name: "Dec",
    amt: 1100,
  },
];

const Revenue = () => {
  return (
    <Paper sx={{ width: "100%", height: 400, padding: 2 }}>
      <Typography variant="subtitle2" align="center">
        Revenue
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis>
            <Label
              value="Revenue (in K)"
              angle={-90}
              position="left"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amt"
            stroke="#4caf50"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};
export default Revenue;
