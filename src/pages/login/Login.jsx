// import React/Hook/Router...
import React from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// import component
import FormLogin from "./FormLogin";

// function Component
const Login = function () {
  // sử dụng cookie cho dữ liệu authentication
  const [cookies, setCookie] = useCookies([
    "token",
    "expires",
    "userName",
    "role",
  ]);
  const userName = cookies.userName;

  // function thiết lập cookies sau khi đăng nhập thành công
  const loginSuccessHandler = (data) => {
    const expires = new Date(data.data.expires);
    setCookie("token", data.data.token, { path: "/", expires });
    setCookie("expires", data.data.expires, {
      path: "/",
      expires,
    });
    setCookie("userName", data.data.userName, {
      path: "/",
      expires,
    });
    setCookie("role", data.data.role, {
      path: "/",
      expires,
    });
  };

  // return
  return (
    <div className="bg-light min-vh-100 p-5">
      {userName ? (
        <Navigate to="/" />
      ) : (
        <FormLogin onLoginSuccess={loginSuccessHandler} />
      )}
    </div>
  );
};

export default Login;
