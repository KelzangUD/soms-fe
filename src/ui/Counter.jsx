import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Counter = ({ value, name }) => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Paper
        sx={{
          padding: 1,
          display: "flex",
          flexDirection: "column", // Set flex direction to column
          alignItems: "center", // Align items within the column to center
          justifyContent: "center",
          width: 80,
          height: 80,
          marginLeft: 2
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: -1 }}>
          {value}
        </Typography>
        <Typography variant="p">
          {name}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Counter;
