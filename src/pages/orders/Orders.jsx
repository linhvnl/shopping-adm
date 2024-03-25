// import React/Hook/Router...
import React from "react";
import { useLoaderData } from "react-router-dom";

// import component
import OrdersTable from "./OrdersTable";
import Pagination from "../../components/UI/Pagination";

// function Component
const Orders = () => {
  // data trả về từ Server
  const data = useLoaderData();

  // return
  return (
    <>
      {/* title */}
      <h3 className="fw-bold mb-3">Orders</h3>

      <OrdersTable items={data.orders} />
      <Pagination paginating={{ ...data }} />
    </>
  );
};

export default Orders;
