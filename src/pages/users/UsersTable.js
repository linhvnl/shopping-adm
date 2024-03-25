// import React/Hook/Router...
import React from "react";

// import component
import UsersTableRowContent from "./UsersTableRowContent";

// function Component
const UsersTable = (props) => {
  // lấy dữ liệu từ props
  const items = props.items;

  // ------------- render row title
  const titleArr = [
    ["ID", "25%"],
    ["Username", "12%"],
    ["Full Name", "18%"],
    ["Email", "20%"],
    ["Phone", "15%"],
    ["Role", "15%"],
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

      {/* content users */}
      <tbody>
        <UsersTableRowContent items={items} />
      </tbody>
    </table>
  );
};

export default UsersTable;
