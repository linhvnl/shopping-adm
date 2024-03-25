// import React/Hook/Router...
import React from "react";
import { Outlet, Navigate, useOutletContext } from "react-router-dom";

////////////////////
// function Component
const AdminDashboard = () => {
  const role = useOutletContext();

  // return
  return role === "admin" ? <Outlet /> : <Navigate to="/chat" />;
};

export default AdminDashboard;
