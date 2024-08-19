import React from "react";
import { Routes, Route } from "react-router-dom";
import { BusinessUnit, Geography, Department, Designation, Grade, StoreLocationMapping, Section } from "../../views/work_structures/index";

const WorkStructures = () => {
  return (
    <>
      <Routes>
        <Route path="/business-unit" element={<BusinessUnit />} />
        <Route path="/geography" element={<Geography />} />
        <Route path="/department" element={<Department />} />
        <Route path="/designation" element={<Designation />} />
        <Route path="/grade" element={<Grade />} />
        <Route path="/store-location-mapping" element={<StoreLocationMapping />} />
        <Route path="/section" element={<Section />} />
      </Routes>
    </>
  );
};

export default WorkStructures;
