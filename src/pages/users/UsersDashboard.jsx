// import React/Hook/Router...
import React from "react";
import { useLoaderData } from "react-router-dom";

// import component
import UsersTable from "./UsersTable";
import Pagination from "../../components/UI/Pagination";

// function Component
const UsersDashboard = (props) => {
  // data trả về từ Server
  const data = useLoaderData();

  // return
  return (
    <>
      <h3 className="fw-bold mb-3">Users List</h3>

      <UsersTable items={data.users} />
      <Pagination paginating={{ ...data }} />
    </>
  );
};

export default UsersDashboard;
