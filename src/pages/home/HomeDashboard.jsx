// import React/Hook/Router...
import React from "react";
import { useLoaderData } from "react-router-dom";

// import component
import InfoBoard from "./InfoBoard";
import LastestOrders from "./LastestOrders";

// function Component
const HomeDashboard = function (props) {
  // data trả về từ Server
  const { numClients, numOrders, averageTotal, lastestOrders } =
    useLoaderData();

  // return
  return (
    <>
      <InfoBoard
        data={{
          numClients,
          numOrders,
          averageTotal,
        }}
      />
      <LastestOrders items={lastestOrders} />
    </>
  );
};

export default HomeDashboard;
