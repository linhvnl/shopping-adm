// import React/Hook/...
import { useCallback } from "react";
import { useCookies } from "react-cookie";

//________________________________
// function custom hook
// => tạo object chứa endPoints đầy đủ và các phương thức để fetch API từ SERVER
const useHttpAdmin = () => {
  //________________________________
  // server
  const origin = process.env.REACT_APP_API_ENDPOINT_ORIGIN;

  // url - route
  const requests = {
    // authorization dùng custom hook này
    fetchLogin: `/login/admin`,

    // ----------
    // fetch dữ liệu home các page dashboard
    // dùng router loader
    fetchDashboard: `/admin/dashboard`,
    fetchProducts: `/admin/products`,
    fetchProduct: `/admin/product/:productId`,
    fetchOrders: `/admin/orders`,

    // ----------
    // dùng router action
    fetchProductAdd: `/admin/product/add`,
    fetchProductEdit: `/admin/product/edit`,

    // ----------
    // DELETE dùng custom hook này
    // fetchProductDelete: `/admin/product/:productId`,
    // cần thêm productId ở components
    fetchProductDelete: `/admin/product/`,
  };

  // tạo object chứa endPoints đầy đủ để fetch
  let endPoints = {};
  for (const key in requests) {
    const endPoint = origin + requests[key];
    endPoints[key] = endPoint;
  }

  // sử dụng cookie cho dữ liệu authentication
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "expires",
    "userName",
    "role",
  ]);

  //________________________________
  // phương thức để fetch
  const customFetch = useCallback(async function ({
    auth = false,
    token,
    method = "GET",
    url,
    bodyObj = {},
    errFunc = (data) => {},
    successFunc = (data) => {},
  }) {
    // send request
    let response, options;

    // if API needs no authentication (auth = false)
    if (!auth) {
      // configuration to fetch
      options =
        method === "GET"
          ? {}
          : {
              method,
              body: JSON.stringify(bodyObj),
              headers: {
                "Content-Type": "application/json",
              },
            };
    } else {
      // if API needs authentication (auth = true)
      // check token
      if (!token) return;

      // configuration to fetch
      options =
        method === "GET"
          ? {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          : {
              method,
              body: JSON.stringify(bodyObj),
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            };
    }

    // fetch
    response = await fetch(url, options);

    // xử lý response data
    const data = await response.json();
    // console.log(data);

    response.status === 200 || response.status === 201
      ? successFunc(data)
      : errFunc(data);
  },
  []);

  //________________________________
  // return về 1 object
  return {
    endPoints,
    customFetch,
    cookies,
    setCookie,
    removeCookie,
  };
};

// export
export default useHttpAdmin;

/*
// ____________________
// sử dụng CUSTOM HOOK
// ____________________
// import CUSTOM HOOK
import useHttpAdmin from "../../hooks/use-http-admin";
import useHttpAdmin from "../hooks/use-http-admin";

// dùng Custom Hook để fetch to Server và use cookies
const { endPoints, customFetch, cookies, setCookie, removeCookie, } = useHttpAdmin();
// "token", "expires", "userName", "role"

// send request POST
customFetch({
  auth: true, // default false
  token: cookies.token, // nếu auth true thì phải truyền token
  method: "POST",
  url: endPoints.fetchSignup,
  bodyObj: { username: inputUsername.enteredValue,},
  errFunc: (data) => {console.log(data.message)},
  successFunc: (data) => {},
});

// send request GET
customFetch({
  auth: true, // default false
  token: cookies.token, // nếu auth true thì phải truyền token
  url: endPoints.fetchSignup,
  errFunc: (data) => {console.log(data.message)},
  successFunc: (data) => {},
});
*/

/*
// ____________________
// sử dụng ROUTE LOADER
// ____________________
// import React/Hook/Router...
import { useLoaderData } from "react-router-dom";

// a product detail trả về từ Server
const product = useLoaderData();

// hàm loader để lấy dữ liệu HOTELS từ API
export async function loader({ request, params }) {
  // lấy id của product từ params
  const productId = params.productId;

  // fetch dữ liệu
  return fetch(`${process.env.REACT_APP_API_ENDPOINT_ORIGIN}/client/detail/` + productId);
}
*/
