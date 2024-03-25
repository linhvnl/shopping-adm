// import React/Hook/Router...
import React from "react";
import { useNavigate } from "react-router-dom";

// import CUSTOM HOOK
import useHttpAdmin from "../../hooks/use-http-admin";

// import helpers functions
import srcImg from "../../utils/srcImg";

// function Component
const ProductsTableRowContent = (props) => {
  // lấy data từ props
  const items = props.items;

  // dùng Custom Hook để fetch to Server và use cookies
  const { endPoints, customFetch, cookies } = useHttpAdmin();

  // dùng navigate điều hướng
  const navigate = useNavigate();

  // function xử lý Delete Product
  const handleDeleteProduct = function (productId) {
    // confirmation
    const confirmMessage = window.confirm(
      "Are you sure you want to delete this product?"
    );

    // check confirmation
    if (!confirmMessage) return;

    customFetch({
      auth: true, // default false
      token: cookies.token, // nếu auth true thì phải truyền token
      method: "DELETE",
      url: endPoints.fetchProductDelete + productId,
      errFunc: (data) => {
        alert(data?.message);
      },
      successFunc: (data) => {
        alert(data.message);
        // tải lại trang để update dữ liệu products sau khi xóa
        return navigate("/products");
      },
    });
  };

  // render row transactions
  const renderRowProducts = items?.map((item, i) => {
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
        {tdCell(item._id)}
        {tdCell(item.name)}

        {tdCell(new Intl.NumberFormat("vi-VN").format(item.price))}

        {tdCell(
          <img
            // crossorigin="anonymous"
            src={srcImg(item.img1)}
            alt="product"
            style={{ width: "72px" }}
          />
        )}

        {tdCell(item.category)}
        {tdCell(
          <>
            {/* UPDATE button */}
            <button
              className="btn btn-success rounded-0 p-2 me-2"
              onClick={() => navigate(`/product/${item._id}/edit`)}
            >
              Update
            </button>

            {/* DELETE button */}
            <button
              className="btn btn-danger rounded-0 p-2"
              onClick={handleDeleteProduct.bind(null, item._id)}
            >
              Delete
            </button>
          </>
        )}
      </tr>
    );
  });

  // return
  return <>{renderRowProducts}</>;
};

export default ProductsTableRowContent;
