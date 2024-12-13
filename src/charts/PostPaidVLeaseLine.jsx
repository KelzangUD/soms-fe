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
    pos: 240,
    lea: 100,
  },
  {
    name: "Feb",
    pos: 210,
    lea: 200,
  },
  {
    name: "Mar",
    pos: 220,
    lea: 500,
  },
  {
    name: "Apr",
    pos: 200,
    lea: 200,
  },
  {
    name: "May",
    pos: 181,
    lea: 100,
  },
  {
    name: "Jun",
    pos: 500,
    lea: 110,
  },
  {
    name: "Jul",
    pos: 210,
    lea: 210,
  },
  {
    name: "Aug",
    pos: 290,
    lea: 200,
  },
  {
    name: "Sept",
    pos: 200,
    lea: 300,
  },
  {
    name: "Oct",
    pos: 181,
    lea: 70,
  },
  {
    name: "Nov",
    pos: 250,
    lea: 100,
  },
  {
    name: "Dec",
    pos: 100,
    lea: 600,
  },
];

const PostPaidVLeaseLine = () => {
  return (
    <Paper sx={{ width: "100%", height: 400, padding: 2 }}>
      <Typography variant="subtitle2" align="center">
        PostPaid Vs Leaseline
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
            dataKey="pos"
            fill="#ffa000"
            activeBar={<Rectangle fill="#ff8f00" />}
          />
          <Bar
            dataKey="lea"
            fill="#43a047"
            activeBar={<Rectangle fill="#388e3c"/>}
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};
export default PostPaidVLeaseLine;
