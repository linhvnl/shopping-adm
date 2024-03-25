// import React/Hook/Router...
import React from "react";
import { Form } from "react-router-dom";

// function Component
const ProductEditForm = function (props) {
  // lấy data từ props
  const item = props.item;

  // tạo mảng các thông tin input
  const inputInfoList = [
    {
      label: "Product Name",
      name: "name",
      type: "text",
      placeholder: "Enter Product Name",
      defaultValue: item.name,
    },
    {
      label: "Category",
      name: "category",
      type: "text",
      placeholder: "Enter Category",
      defaultValue: item.category,
    },

    {
      label: "Short Description",
      name: "short_desc",
      type: "textarea",
      placeholder: "Enter Short Description",
      defaultValue: item.short_desc,
    },
    {
      label: "Long Description",
      name: "long_desc",
      type: "textarea",
      placeholder: "Enter Long Description",
      defaultValue: item.long_desc,
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "Enter Price",
      defaultValue: item.price,
    },
    {
      label: "Count",
      name: "count",
      type: "number",
      placeholder: "Enter Count",
      defaultValue: item.count,
    },
  ];

  // tạo html cho các input từ mảng thông tin input
  const inputList = inputInfoList.map((info) => {
    // return render
    return (
      <div key={info.name} className="mb-3">
        <label htmlFor={info.name} className="fw-bold fs-5 opacity-75 mb-2">
          {info.label}
        </label>
        {info.type === "textarea" ? (
          <textarea
            id={info.name}
            name={info.name}
            required
            rows={info.name === "short_desc" ? 3 : 5}
            placeholder={info.placeholder}
            className="form-control form-control-lg rounded-1 opacity-75"
            defaultValue={info.defaultValue}
          />
        ) : (
          <input
            type={info.type}
            id={info.name}
            name={info.name}
            required
            placeholder={info.placeholder}
            className="form-control form-control-lg rounded-1 opacity-75"
            defaultValue={info.defaultValue}
          />
        )}
      </div>
    );
  });

  // return
  return (
    <Form
      method="post"
      action={`/product/${item._id}/edit`}
      className="ps-5"
      // encType="multipart/form-data"
    >
      {inputList.slice(0, 4)}

      <div className="row row-cols-2">
        {inputList[4]}
        {inputList[5]}
      </div>

      {/* SUBMIT button */}
      <button
        type="submit"
        className="btn btn-primary rounded-1 fw-bold opacity-90 px-3 py-2"
      >
        Submit
      </button>
    </Form>
  );
};

export default ProductEditForm;
