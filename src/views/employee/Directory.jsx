import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Grid,
  Button,
  InputBase,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import DirectoryCard from "../../ui/DirectoryCard";
import Route from "../../routes/Route";

const Directory = () => {
  //   const token = localStorage.getItem("token");
  //   const fetchResults = async () => {
  //     const res = await Route("GET", "/results", token, null, null);
  //     if (res?.status === 200) {
  //       setResults(res?.data?.results);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchResults();
  //   }, []);
  const directory = [
    {
      id: 1,
      name: "Tashi Tshering",
      empID: 2,
      designation: "Managing Director",
    },
    {
      id: 2,
      name: "Ganga Sharma",
      empID: 4,
      designation: "Senior General Manager, CNCS",
    },
    {
      id: 3,
      name: "Bhim Khatiwara",
      empID: 20,
      designation: "IN Engineer",
    },
    {
      id: 4,
      name: "Sangay Tenzin",
      empID: 24,
      designation: "Executive Manager, HRA",
    },
    {
      id: 5,
      name: "Kinga Wangmo",
      empID: 2,
      designation: "Manager, International SE",
    },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 1 }}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ width: "100%" }}>
              <Grid container spacing={1} alignItems="center">
                {directory?.map((item) => (
                  <Grid item xs={4} key={item?.id} marginBottom={1}>
                    <DirectoryCard
                      name={item?.name}
                      empID={item?.empID}
                      designation={item?.designation}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Directory;
