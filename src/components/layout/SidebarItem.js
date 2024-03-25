// import React/Hook/Router...
import React from "react";
import { NavLink } from "react-router-dom";

// function Component
const SidebarItem = function (props) {
  // item cần render
  const item = props.item;

  // class style
  const classStyle =
    "text-secondary text-decoration-none fw-bold px-3 border-0 rounded";
  const classStyleActive = classStyle + " bg-info bg-opacity-25";

  // return
  return (
    <li
      key={item.title}
      className="d-flex align-content-baseline ps-2 py-1 mb-1"
    >
      <i
        className={`${item.icon} p-1`}
        style={{ color: "#364fc7", width: "30px", marginRight: "-5px" }}
      ></i>

      {item.route ? (
        <NavLink
          to={item.route}
          className={({ isActive }) =>
            isActive ? classStyleActive : classStyle
          }
        >
          {item.title}
        </NavLink>
      ) : (
        <button type="button" className={classStyle} onClick={item.onLogout}>
          {item.title}
        </button>
      )}
    </li>
  );
};

export default SidebarItem;
