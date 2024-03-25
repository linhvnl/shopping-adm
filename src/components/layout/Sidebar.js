// import React/Hook/Router...
import React from "react";
import SidebarItem from "./SidebarItem";

// function Component
const Sidebar = function (props) {
  // get data from props
  const role = props.role;
  const onLogout = props.onLogout;

  // list thông tin để render sidebar
  const dummySidebar = [
    {
      title: "Dashboard",
      icon: "fas fa-th-large",
      route: "/",
    },
    {
      title: "Users",
      icon: "far fa-user",
      route: "/users",
    },
    {
      title: "Products",
      icon: "fas fa-store-alt",
      route: "/products",
    },
    {
      title: "Orders",
      icon: "fas fa-truck",
      route: "/orders",
    },
    {
      title: "New Product",
      icon: "fas fa-store-alt",
      route: "/product/add",
    },
    {
      title: "Chat",
      icon: "fab fa-rocketchat",
      route: "/chat",
    },
    {
      title: "Logout",
      icon: "fas fa-sign-out-alt",
      route: null,
      onLogout: onLogout,
    },
  ];

  // return
  return (
    <nav className="">
      <ul className="list-unstyled">
        {role === "admin" && (
          <>
            <li className="text-secondary fw-bold mb-3">
              MAIN
              <ul className="list-unstyled">
                <SidebarItem item={dummySidebar[0]} />
              </ul>
            </li>

            <li className="text-secondary fw-bold mb-3">
              LISTS
              <ul className="list-unstyled">
                <SidebarItem item={dummySidebar[1]} />
                <SidebarItem item={dummySidebar[2]} />
                <SidebarItem item={dummySidebar[3]} />
              </ul>
            </li>

            <li className="text-secondary fw-bold mb-3">
              NEW
              <ul className="list-unstyled">
                <SidebarItem item={dummySidebar[4]} />
              </ul>
            </li>
          </>
        )}

        <li className="text-secondary fw-bold mb-3">
          SERVICES
          <ul className="list-unstyled">
            <SidebarItem item={dummySidebar[5]} />
          </ul>
        </li>

        <li className="text-secondary fw-bold mb-3">
          USER
          <ul className="list-unstyled">
            <SidebarItem item={dummySidebar[6]} />
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
