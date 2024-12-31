import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Route from "../../routes/Route";

const PermissionAccess = ({
  permission,
  moduleAccess,
  setNewPermission,
  type,
}) => {
  const [permissionList, setPermissionList] = useState([]);
  const [moduleList, setModuleList] = useState([]);
  const [access, setAccess] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setAccess(moduleAccess);
    setPermissionList(permission);

    if (type === "view") {
      setDisabled(true);
    }

    setTimeout(() => {
      setIsLoading(false); // Set loading to false once data is ready
    }, 20000);
  }, [moduleAccess, permission]);

  // Group permissions by page
  const groupedPermissions = permissionList.reduce((acc, permission) => {
    const { page_name, module_name } = permission;
    const key = `${module_name} - ${page_name}`;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(permission);
    return acc;
  }, {});

  const fetchAllModule = async () => {
    const res = await Route("GET", `/Common/getAllModule`, null, null, null);
    if (res?.status === 200) {
      const modulesWithIcons = res.data.map((module) => ({
        ...module,
      }));
      setModuleList(modulesWithIcons);
    }
  };

  useEffect(() => {
    fetchAllModule();
  }, []);

  const handleToggle = (id, user_permission_id) => {
    setPermissionList((prevList) =>
      prevList.map((item) =>
        item.role_permission_id === id
          ? {
              ...item,
              status: item.status === "Active" ? "In_Active" : "Active",
            }
          : item
      )
    );

    setNewPermission((prevChanges) => {
      const existingPermission = permissionList.find(
        (item) => item.role_permission_id === id
      );
      const updatedStatus =
        existingPermission.status === "Active" ? "In_Active" : "Active";

      const updatedPermission = {
        role_permission_id: id,
        status: updatedStatus,
        user_permission_id: user_permission_id,
      };

      const isAlreadyChanged = prevChanges.some(
        (change) => change.role_permission_id === id
      );

      if (isAlreadyChanged) {
        return prevChanges.map((change) =>
          change.role_permission_id === id ? updatedPermission : change
        );
      }

      return [...prevChanges, updatedPermission];
    });
  };

  const combinedModules = moduleList.map((module) => {
    const accessModule = access.find(
      (access) => access.module_id === module.module_id
    );
    return {
      ...module,
      isactive: accessModule ? accessModule.isactive : 0,
    };
  });

  if (isLoading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <Box>
        <Grid container spacing={4} alignItems="center">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              size="small"
            >
              <TableHead>
                <TableRow
                  sx={{
                    background: "rgb(245, 247, 248)",
                  }}
                >
                  <TableCell sx={{ fontWeight: "800" }}>
                    Module Permission
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "800" }}>
                    View
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "800" }}>
                    Create
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "800" }}>
                    Update
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "800" }}>
                    Import
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "800" }}>
                    Export
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(groupedPermissions).map(
                  ([page, permissions]) => {
                    const moduleId = permissions[0]?.module_id; // Assuming all permissions have the same module_id
                    const module = combinedModules.find(
                      (mod) => mod.module_id === moduleId
                    );
                    return (
                      module?.isactive === 1 && (
                        <TableRow
                          key={page}
                          id={`page-${page}`} // Set the id as "page-{page}"
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          {/* Combine module_name and page_name for the first cell */}
                          <TableCell>
                            {`${permissions[0]?.module_name} (${permissions[0]?.page_name})`}
                          </TableCell>

                          {/* Render checkboxes for each permission type */}
                          {["View", "Create", "Update", "Import", "Export"].map(
                            (perm) => {
                              const permission = permissions.find(
                                (p) => p.permission_name === perm
                              );
                              return (
                                <TableCell
                                  align="right"
                                  key={`${page}-${perm}`}
                                >
                                  <Checkbox
                                    checked={permission?.status === "Active"}
                                    onChange={() =>
                                      handleToggle(
                                        permission?.role_permission_id,
                                        permission?.user_permission_id
                                      )
                                    }
                                    disabled={disabled}
                                  />
                                </TableCell>
                              );
                            }
                          )}
                        </TableRow>
                      )
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Box>
    </>
  );
};

export default PermissionAccess;
