// import React/Hook/Router...
import React from "react";
import { useNavigate } from "react-router-dom";

// function Component
const OrdersTableRowContent = (props) => {
  // lấy data từ props
  const items = props.items;

  // sử dụng điều hướng
  const navigate = useNavigate();

  // render row
  const renderRow = items?.map((item, i) => {
    // render 1 cell
    const tdCell = (content) => (
      <td
        className="text-nowrap overflow-hidden opacity-90 p-3"
        style={{ textOverflow: "ellipsis" }}
      >
        {content}
      </td>
    );

    // return render content
    return (
      <tr key={i} className="text-secondary">
        {tdCell(item.userId)}
        {tdCell(item.fullName)}
        {tdCell(item.phoneNumber)}
        {tdCell(item.address)}
        {tdCell(new Intl.NumberFormat("vi-VN").format(item.total))}
        {tdCell(item.delivery)}
        {tdCell(item.status)}
        {tdCell(
          <button
            className="btn btn-success rounded-0 p-2"
            onClick={() => navigate(`/order/${item._id}`)}
          >
            View
          </button>
        )}
      </tr>
    );
  });

  // return
  return <>{renderRow}</>;
};

export default OrdersTableRowContent;
