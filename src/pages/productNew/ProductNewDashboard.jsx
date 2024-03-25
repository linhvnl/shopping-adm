// import React/Hook/Router...
import React, { useState } from "react";
import { useActionData, Link } from "react-router-dom";

// import component
import ProductNewForm from "./ProductNewForm";

// function Component
const ProductNewDashboard = (props) => {
  // dữ liệu phản hồi khi submit form qua route
  const actionData = useActionData();
  const status = actionData?.status;
  const message = actionData?.message;
  const dataError = actionData?.dataError || [];

  // state disable nút Submit
  const [disableSubmit, setDisableSubmit] = useState({
    disable: true,
    message: "",
  });

  // hàm xử lý file upload
  const fileUploadHandler = function (e) {
    const files = e.target.files;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxFiles = 5;

    const invalidFile = () =>
      Array.from(files).some((file) => !allowedTypes.includes(file.type));

    if (files.length > maxFiles || invalidFile()) {
      setDisableSubmit({
        disable: true,
        message: `Chỉ được phép tải lên tối đa ${maxFiles} tệp. Chỉ chấp nhận loại tệp .jpg, .jpeg, .png.`,
      });
      return;
    }

    setDisableSubmit({
      disable: false,
      message: "",
    });
    return;
  };

  // return
  return (
    <>
      <div className="bg-light shadow-sm px-2 py-3 vh-100">
        {/* phản hồi ADD PRODUCT thành công */}
        {[200, 201].includes(status) ? (
          <div className="text-success text-center my-5">
            <h1 className="mb-5">__SUCCESS__</h1>
            <h4 className="mb-3">{message}</h4>
            <Link to="/products">
              {"<"}Go to Products Dashboard{">"}
            </Link>
          </div>
        ) : (
          <div className="row">
            {/* form add new product */}
            <div className="col-9">
              <ProductNewForm
                onChooseUploadFile={fileUploadHandler}
                disableSubmit={disableSubmit}
              />
            </div>

            {/* phản hồi ADD PRODUCT có lỗi gì hay không */}
            {status === 422 && (
              <div className="col-3 text-danger text-center">
                <p className="mb-0">__VALIDATION__</p>
                <p className="">{message}</p>
                <ul className="text-secondary text-start">
                  {dataError?.map((err, i) => (
                    <li key={i}>{err.msg}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductNewDashboard;
