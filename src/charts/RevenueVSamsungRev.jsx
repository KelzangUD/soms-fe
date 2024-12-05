import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { Paper, Typography } from "@mui/material";

const data = [
  {
    name: "Jan",
    rev: 2400,
    sam: 100,
  },
  {
    name: "Feb",
    rev: 2210,
    sam: 200,
  },
  {
    name: "Mar",
    rev: 2290,
    sam: 500,
  },
  {
    name: "Apr",
    rev: 200,
    sam: 200,
  },
  {
    name: "May",
    rev: 2181,
    sam: 1000,
  },
  {
    name: "Jun",
    rev: 500,
    sam: 1100,
  },
  {
    name: "Jul",
    rev: 2100,
    sam: 2100,
  },
  {
    name: "Aug",
    rev: 2290,
    sam: 2000,
  },
  {
    name: "Sept",
    rev: 2000,
    sam: 300,
  },
  {
    name: "Oct",
    rev: 1181,
    sam: 700,
  },
  {
    name: "Nov",
    rev: 2500,
    sam: 1000,
  },
  {
    name: "Dec",
    rev: 1100,
    sam: 600,
  },
];

const RevenueVSamsungRev = () => {
  return (
    <Paper sx={{ width: "100%", height: 400, padding: 2 }}>
      <Typography variant="subtitle2" align="center">
        Revenue Vs Samsung Revenue
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <Bar
            dataKey="rev"
            fill="#4caf50"
            activeBar={<Rectangle fill="#388e3c" />}
          />
          <Bar
            dataKey="sam"
            fill="#1e88e5"
            activeBar={<Rectangle fill="#1976d2"/>}
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};
export default RevenueVSamsungRev;
