// import React/Hook/Router...
import React from "react";
import { useLoaderData, useActionData, Link } from "react-router-dom";

// import component
import ProductEditForm from "./ProductEditForm";

// function Component
const ProductEdit = (props) => {
  // data trả về từ Server
  const data = useLoaderData();

  // dữ liệu phản hồi khi submit form qua route
  const actionData = useActionData();
  const status = actionData?.status;
  const message = actionData?.message;
  const dataError = actionData?.dataError || [];

  // return
  return (
    <>
      <div className="bg-light shadow-sm px-2 py-3 vh-100">
        {data?.message && (
          <h1 className="text-danger text-center py-5 my-5">{data.message}</h1>
        )}

        {!data?.message && (
          <>
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
                {/* form edit product */}
                <div className="col-9">
                  <ProductEditForm item={data} />
                </div>

                {/* phản hồi EDIT PRODUCT có lỗi gì hay không */}
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
          </>
        )}
      </div>
    </>
  );
};

export default ProductEdit;
