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
    sam: 100,
  },
  {
    name: "Feb",
    sam: 200,
  },
  {
    name: "Mar",
    sam: 500,
  },
  {
    name: "Apr",
    sam: 200,
  },
  {
    name: "May",
    sam: 1000,
  },
  {
    name: "Jun",
    sam: 1100,
  },
  {
    name: "Jul",
    sam: 2100,
  },
  {
    name: "Aug",
    sam: 2000,
  },
  {
    name: "Sept",
    sam: 300,
  },
  {
    name: "Oct",
    sam: 700,
  },
  {
    name: "Nov",
    sam: 1000,
  },
  {
    name: "Dec",
    sam: 600,
  },
];

const SamsungStock = () => {
  return (
    <Paper sx={{ width: "100%", height: 400, padding: 2 }}>
      <Typography variant="subtitle2" align="center">
        Samsung Stock
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
              value="Qty (in K)"
              angle={-90}
              position="left"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip />
          <Legend />
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
export default SamsungStock;
