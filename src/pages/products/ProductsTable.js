// import React/Hook/Router...
import React from "react";

// import component
import ProductsTableRowContent from "./ProductsTableRowContent";

// function Component
const ProductsTable = (props) => {
  // lấy dữ liệu từ props
  const items = props.items;

  // ------------- render row title
  const titleArr = [
    ["ID", "20%"],
    ["Name", "28%"],
    ["Price", "12%"],
    ["Image", "10%"],
    ["Category", "10%"],
    ["Edit", "20%"],
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
      <thead className="">
        <tr>{renderRowTitle}</tr>
      </thead>

      {/* content transactions */}
      <tbody>
        <ProductsTableRowContent items={items} />
      </tbody>
    </table>
  );
};

export default ProductsTable;
