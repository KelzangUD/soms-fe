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
    rcv: 2400,
    sam: 100,
  },
  {
    name: "Feb",
    rcv: 2210,
    sam: 200,
  },
  {
    name: "Mar",
    rcv: 2290,
    sam: 500,
  },
  {
    name: "Apr",
    rcv: 200,
    sam: 200,
  },
  {
    name: "May",
    rcv: 2181,
    sam: 1000,
  },
  {
    name: "Jun",
    rcv: 500,
    sam: 1100,
  },
  {
    name: "Jul",
    rcv: 2100,
    sam: 2100,
  },
  {
    name: "Aug",
    rcv: 2290,
    sam: 2000,
  },
  {
    name: "Sept",
    rcv: 2000,
    sam: 300,
  },
  {
    name: "Oct",
    rcv: 1181,
    sam: 700,
  },
  {
    name: "Nov",
    rcv: 2500,
    sam: 1000,
  },
  {
    name: "Dec",
    rcv: 1100,
    sam: 600,
  },
];

const RCVStockVSimStock = () => {
  return (
    <Paper sx={{ width: "100%", height: 400, padding: 2 }}>
      <Typography variant="subtitle2" align="center">
        RCV Stock Vs Samsung Stock
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
          <Bar dataKey="rcv" stackId="a" fill="#FB404B" />
          <Bar dataKey="sam" stackId="a" fill="#1e88e5" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};
export default RCVStockVSimStock;
