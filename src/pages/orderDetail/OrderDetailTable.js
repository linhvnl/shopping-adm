// import React/Hook/Router...
import React from "react";

// import component
import OrderDetailTableRowContent from "./OrderDetailTableRowContent";

////////////////////
// function Component
const OrderDetailTable = (props) => {
  // get data from props
  const items = props.items;

  // render row title
  const titleArr = [
    ["ID PRODUCT", "25%"],
    ["IMAGE", "18%"],
    ["NAME", "30%"],
    ["PRICE", "15%"],
    ["QUANTITY", "12%"],
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
    <div className="pt-4 mb-5">
      <div className="table-responsive">
        <table
          className="table table-hover table-striped table-bordered no-wrap"
          style={{ tableLayout: "fixed" }}
        >
          <thead className="">
            <tr className="">{renderRowTitle}</tr>
          </thead>
          <tbody>
            {items &&
              items?.map((item) => {
                return (
                  <OrderDetailTableRowContent key={item._id} item={item} />
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetailTable;
