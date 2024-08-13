import React from "react";
import { Routes, Route } from "react-router-dom";
import CompanySetting from "../../views/CompanySetting";

const SystemSetting = () => {
  return (
    <>
      <Routes>
        <Route path="/company-setting" element={<CompanySetting />} />
      </Routes>
    </>
  );
};

export default SystemSetting;
