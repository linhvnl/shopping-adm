// import React/Hook/Router...
import React from "react";
import { useLoaderData } from "react-router-dom";

// import component
import OrderDetailTable from "./OrderDetailTable";

// function Component
const OrderDetail = () => {
  // data trả về từ Server
  const order = useLoaderData();

  // return
  return (
    <>
      {/* title */}
      <h3 className="fw-bold mb-5">Order Detail</h3>

      <div className="px-5 mb-5">
        <h3 className="opacity-90">INFORMATION ORDER</h3>
        <p className="opacity-90 mb-0">ID User: {order.userId}</p>
        <p className="opacity-90 mb-0">Full Name: {order.fullName}</p>
        <p className="opacity-90 mb-0">Phone: {order.phoneNumber}</p>
        <p className="opacity-90 mb-0">Address: {order.address}</p>
        <p className="opacity-90 mb-0">
          Total: {new Intl.NumberFormat("vi-VN").format(order.total)} VND
        </p>
        <p className="opacity-90 mb-0">Status: {order.status}</p>
      </div>

      <OrderDetailTable items={order.items} />
    </>
  );
};

export default OrderDetail;
