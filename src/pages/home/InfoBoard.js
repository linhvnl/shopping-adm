// import React/Hook/Router...
import React from "react";

// function Component
const InfoBoard = function (props) {
  // lấy dữ liệu từ props
  const { numClients, numOrders, averageTotal } = props.data;

  // hàm định dạng hiển thị dạng số
  const formatNumber = (number) =>
    new Intl.NumberFormat("vi-VN").format(number);

  // list thông tin để render info board
  const dummyInfoBoard = [
    {
      title: "Clients",
      data: formatNumber(numClients) || 0,
      icon: "far fa-user",
    },
    {
      title: "Earnings of Month",
      data: formatNumber(averageTotal)  || 0,
      icon: "fa fa-usd",
    },
    {
      title: "New Order",
      data: formatNumber(numOrders) || 0,
      icon: "far fa-file",
    },
  ];

  // render list info board
  const list = dummyInfoBoard.map((item, i) => {
    return (
      <div key={i} className="col">
        <div className="d-flex justify-content-between align-items-center border shadow-sm p-4">
          <div>
            <p className="fs-2 fw-bold mb-0">
              {item.data}
              {i === 1 && <sup className="fs-5">VND</sup>}
            </p>
            <p className="fw-bold opacity-75 mb-0">{item.title}</p>
          </div>

          <div className="text-centeyr">
            <i
              className={`${item.icon}`}
              style={{
                fontSize: "24px",
                color: "#777",
              }}
            ></i>
          </div>
        </div>
      </div>
    );
  });

  // return
  return <div className="row row-cols-3 g-0">{list}</div>;
};

export default InfoBoard;
