import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  CompanySetting,
  RolesAndPermission,
  SystemUsers,
  ApprovalRules,
  Hierarchy,
  Delegation,
} from "../../views/setting/index";

const SystemSetting = () => {
  return (
    <>
      <Routes>
        <Route path="/company-setting" element={<CompanySetting />} />
        <Route path="/roles-and-permission" element={<RolesAndPermission />} />
        <Route path="/system-users" element={<SystemUsers />} />
        <Route path="/approval-rules" element={<ApprovalRules />} />
        <Route path="/hierarchy" element={<Hierarchy />} />
        <Route path="/delegation" element={<Delegation />} />
      </Routes>
    </>
  );
};

export default SystemSetting;
