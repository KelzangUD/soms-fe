import React from "react";
import { Routes, Route } from "react-router-dom";
import { EmployeeList, Directory } from "../../views/employee/index";

const Employee = () => {
  return (
    <>
      <Routes>
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/directory" element={<Directory />} />
      </Routes>
    </>
  );
};

export default Employee;
