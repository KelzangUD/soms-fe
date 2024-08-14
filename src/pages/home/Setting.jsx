import React from "react";
import { Routes, Route } from "react-router-dom";
import CompanySetting from "../../views/CompanySetting";
import RolesAndPermission from "../../views/RolesAndPermission";
import SystemUsers from "../../views/SystemUsers";
import ApprovalRules from "../../views/ApprovalRules";
import Hierarchy from "../../views/Hierarchy";

const SystemSetting = () => {
  return (
    <>
      <Routes>
        <Route path="/company-setting" element={<CompanySetting />} />
        <Route path="/roles-and-permission" element={<RolesAndPermission />} />
        <Route path="/system-users" element={<SystemUsers />} />
        <Route path="/approval-rules" element={<ApprovalRules />} />
        <Route path="/hierarchy" element={<Hierarchy />} />
      </Routes>
    </>
  );
};

export default SystemSetting;
