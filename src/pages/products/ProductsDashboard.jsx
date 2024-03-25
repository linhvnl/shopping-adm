// import React/Hook/Router...
import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

// import component
import ProductsTable from "./ProductsTable";

// function Component
const ProductsDashboard = (props) => {
  // data trả về từ Server
  const data = useLoaderData();

  // state cho từ khóa search theo tên của products
  const [searchName, setSearchName] = useState("");

  // dữ liệu lọc theo searchName
  const productsBySearchName =
    searchName === ""
      ? data
      : data?.filter((item) => item.name.toLowerCase().includes(searchName));

  // return
  return (
    <>
      {/* title - link "Add New */}
      <div className="d-flex justify-content-between align-items-end bd-highlight mb-4">
        <div className="" style={{ width: "25%" }}>
          <h3 className="fw-bold">Products</h3>
          <input
            type="text"
            className="form-control form-control-lg rounded-1"
            placeholder="Enter Search!"
            name="searchName"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchName(e.target.value.trim().toLowerCase());
              }
            }}
          />
        </div>

        <Link to="/product/add" className="btn btn-success rounded-0 p-2">
          Add New
        </Link>
      </div>

      {/* table */}
      {data?.message ? (
        <h1 className="text-danger text-center py-5 my-5">{data.message}</h1>
      ) : !data.length ? (
        <h1 className="text-info text-center py-5 my-5">
          No product was created yet!
        </h1>
      ) : (
        <ProductsTable items={productsBySearchName} />
      )}
    </>
  );
};

export default ProductsDashboard;
