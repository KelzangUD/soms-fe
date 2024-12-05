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
    voc: 100,
    sim: 200,
    etop: 2400,
    sam: 100,
  },
  {
    name: "Feb",
    voc: 100,
    sim: 200,
    etop: 2210,
    sam: 200,
  },
  {
    name: "Mar",
    voc: 100,
    sim: 200,
    etop: 2290,
    sam: 500,
  },
  {
    name: "Apr",
    voc: 100,
    sim: 200,
    etop: 200,
    sam: 200,
  },
  {
    name: "May",
    voc: 100,
    sim: 200,
    etop: 2181,
    sam: 1000,
  },
  {
    name: "Jun",
    voc: 100,
    sim: 200,
    etop: 500,
    sam: 1100,
  },
  {
    name: "Jul",
    voc: 100,
    sim: 200,
    etop: 2100,
    sam: 2100,
  },
  {
    name: "Aug",
    voc: 100,
    sim: 200,
    etop: 2290,
    sam: 2000,
  },
  {
    name: "Sept",
    voc: 100,
    sim: 200,
    etop: 2000,
    sam: 300,
  },
  {
    name: "Oct",
    voc: 100,
    sim: 200,
    etop: 1181,
    sam: 700,
  },
  {
    name: "Nov",
    voc: 100,
    sim: 200,
    etop: 2500,
    sam: 1000,
  },
  {
    name: "Dec",
    voc: 100,
    sim: 200,
    etop: 1100,
    sam: 600,
  },
];

const Sales = () => {
  return (
    <Paper sx={{ width: "100%", height: 400, padding: 2 }}>
      <Typography variant="subtitle2" align="center">
        Voucher Vs SIM Vs Samsung Vs ETopUp
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
            dataKey="voc"
            fill="#FB404B"
            activeBar={<Rectangle fill="#d84315" />}
          />
          <Bar
            dataKey="sim"
            fill="#fb8c00"
            activeBar={<Rectangle fill="#ef6c00"/>}
          />
          <Bar
            dataKey="etop"
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
export default Sales;
