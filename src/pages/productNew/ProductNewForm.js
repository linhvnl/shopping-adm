// import React/Hook/Router...
import React from "react";
import { Form } from "react-router-dom";

// function Component
const ProductNewForm = (props) => {
  // lấy dữ liệu props
  const disableSubmit = props.disableSubmit;

  // tạo mảng các thông tin input
  const inputInfoList = [
    {
      label: "Product Name",
      name: "name",
      type: "text",
      placeholder: "Enter Product Name",
    },
    {
      label: "Category",
      name: "category",
      type: "text",
      placeholder: "Enter Category",
    },

    {
      label: "Short Description",
      name: "short_desc",
      type: "textarea",
      placeholder: "Enter Short Description",
    },
    {
      label: "Long Description",
      name: "long_desc",
      type: "textarea",
      placeholder: "Enter Long Description",
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "Enter Price",
    },
    {
      label: "Count",
      name: "count",
      type: "number",
      placeholder: "Enter Count",
    },
    // render riêng list
    // {
    //   label: "Upload image (max 5 images)",
    //   name: "images",
    //   type: "file",
    //   placeholder: "",
    // },
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
          />
        ) : (
          <input
            type={info.type}
            id={info.name}
            name={info.name}
            required
            placeholder={info.placeholder}
            className="form-control form-control-lg rounded-1 opacity-75"
          />
        )}
      </div>
    );
  });

  // return
  return (
    <Form
      method="post"
      action="/product/add"
      className="ps-5"
      encType="multipart/form-data"
    >
      {inputList.slice(0, 4)}

      <div className="row row-cols-2">
        {inputList[4]}
        {inputList[5]}
      </div>

      {/* INPUT FILE */}
      <div key="images" className="mb-3">
        <label htmlFor="images" className="fw-bold fs-5 opacity-75 mb-2">
          Upload image (max 5 images)
        </label>
        <input
          type="file"
          id="images"
          name="images"
          className="form-control form-control-lg rounded-1 opacity-75"
          required
          multiple
          accept=".jpg, .jpeg, .png"
          onChange={props.onChooseUploadFile}
        />
        {disableSubmit.message && (
          <p className="text-danger mt-2">{disableSubmit.message}</p>
        )}
      </div>

      {/* SUBMIT button */}
      <button
        type="submit"
        className="btn btn-primary rounded-1 fw-bold opacity-90 px-3 py-2"
        disabled={disableSubmit.disable}
      >
        Submit
      </button>
    </Form>
  );
};

export default ProductNewForm;
