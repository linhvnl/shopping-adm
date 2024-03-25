// import React/Hook/Router...
import React from "react";

// function Component
const UsersTableRowContent = (props) => {
  // lấy data từ props
  const items = props.items;

  // render 1 cell
  const tdCell = (content) => (
    <td
      className="text-nowrap overflow-hidden opacity-90 p-3"
      style={{ textOverflow: "ellipsis" }}
    >
      {content}
    </td>
  );

  // render row transactions
  const renderRow = items?.map((item, i) => {
    const classRole =
      item.role === "admin"
        ? "text-danger fw-bold"
        : item.role === "cs"
        ? "text-primary fw-bold"
        : "";

    // return render content
    return (
      <tr key={i} className="text-secondary">
        {tdCell(item._id)}
        {tdCell(item.userName)}
        {tdCell(item.fullName)}
        {tdCell(item.email)}
        {tdCell(item.phoneNumber)}

        {tdCell(<span className={classRole}>{item.role}</span>)}
      </tr>
    );
  });

  // return
  return <>{renderRow}</>;
};

export default UsersTableRowContent;
