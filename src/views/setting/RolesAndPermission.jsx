import React from "react";
import {
  Box,
  Button,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SubHeader from "../../common/SubHeader";
import ModuleAccess from "../../component/roles_and_permission/ModuleAccess";

const RolesAndPermission = () => {
  const roles_list = [
    {
      id: 1,
      role: "Administrator",
    },
    {
      id: 2,
      role: "CC Executive Region",
    },
    {
      id: 3,
      role: "CC Executive Extension",
    },
    {
      id: 4,
      role: "Regional Accountant",
    },
    {
      id: 5,
      role: "Regional Manager",
    },
    {
      id: 6,
      role: "General Manager",
    },
    {
      id: 7,
      role: "Samsung Technician",
    },
  ];
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <SubHeader text="Roles And Permission" />
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={3} container spacing={2} sx={{ mb: 1 }}>
                <Grid item xs={12} sx={{ my: 1 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    // onClick={updateHandle}
                    startIcon={<AddIcon />}
                    sx={{ mb: 2 }}
                  >
                    Add Roles
                  </Button>
                  <Paper>
                    <List>
                      {roles_list?.map((item) => (
                        <ListItem disablePadding key={item?.id}>
                          <ListItemButton>
                            <ListItemText primary={item?.role} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
              <Grid item xs={9} sx={{ my: 1 }}>
                <ModuleAccess />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RolesAndPermission;
