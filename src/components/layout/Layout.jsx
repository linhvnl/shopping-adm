// import React/Hook/Router...
import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// import component
import Header from "./Header";
import Sidebar from "./Sidebar";

////////////////////
// function Component
const Layout = () => {
  // sử dụng cookie cho dữ liệu authentication
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "expires",
    "userName",
    "role",
  ]);
  const userName = cookies.userName;
  const role = cookies.role;

  // handler to logout
  const logoutHandler = () => {
    removeCookie("token");
    removeCookie("expires");
    removeCookie("userName");
    removeCookie("role");
  };

  // xử lý cookie hết hạn với useEffect
  useEffect(
    () => {
      if (cookies.expires) {
        const timeout = new Date(cookies.expires).getTime() - Date.now() + 1000;

        const timeoutAction = setTimeout(logoutHandler, timeout);

        // Xóa timeout khi component unmount hoặc khi cookie thay đổi
        return () => clearTimeout(timeoutAction);
      }
    },
    // eslint-disable-next-line
    [cookies.expires]
  );

  // render dashboard
  const dashboard = (
    <div className="container-fluid">
      {/* header */}
      <Header userName={userName} />

      {/* dashboard */}
      <div className="row" style={{ minHeight: "95vh" }}>
        {/* Sidebar */}
        <div className="col-2 border border-light border-2 p-3">
          <Sidebar role={role} onLogout={logoutHandler} />
        </div>

        {/* content of each page */}
        <div className="col-10 border border-light border-2 px-4 py-3">
          <main>
            <Outlet context={role} />
          </main>
        </div>
      </div>
    </div>
  );

  // return
  return userName ? dashboard : <Navigate to="/login" />;
};

export default Layout;
