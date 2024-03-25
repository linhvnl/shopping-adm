// import React/Hook/Router...
import React from "react";

// import component
import OrdersTableRowContent from "./OrdersTableRowContent";

// function Component
const OrdersTable = (props) => {
  // lấy dữ liệu từ props
  const items = props.items;

  // ------------- render row title
  const titleArr = [
    ["ID User", "18%"],
    ["Name", "10%"],
    ["Phone", "10%"],
    ["Address", "12%"],
    ["Total", "12%"],
    ["Delivery", "18%"],
    ["Status", "12%"],
    ["Detail", "8%"],
  ];

  const renderRowTitle = titleArr.map(([title, width], i) => (
    <th
      scope="col"
      key={i}
      className="text-nowrap opacity-90 p-3"
      style={{ width }}
    >
      {title}
    </th>
  ));

  // return
  return (
    <table
      className="table table-hover table-striped table-bordered no-wrap"
      style={{ tableLayout: "fixed" }}
    >
      {/* title */}
      <thead>
        <tr>{renderRowTitle}</tr>
      </thead>

      {/* content orders */}
      <tbody>
        <OrdersTableRowContent items={items} />
      </tbody>
    </table>
  );
};

export default OrdersTable;
