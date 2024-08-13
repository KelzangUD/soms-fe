import React from "react";
import { Routes, Route } from "react-router-dom";
import User from "../../component/admin/admin_system_setting/User";
import ActivityLogs from "../../component/admin/admin_system_setting/ActivityLogs";

const SystemSetting = () => {
  return (
    <>
      <Routes>
        <Route path="/user" element={<User />} />
        <Route path="/activity-logs" element={<ActivityLogs />} />
      </Routes>
    </>
  );
};

export default SystemSetting;
