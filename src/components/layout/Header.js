// import React/Hook/Router...
import React from "react";

// function Component
const Header = function (props) {
  // get data from props
  const userName = props.userName;

  // return
  return (
    <header className="row text-center">
      <div className="col-2 border border-light border-2 py-2">
        <h5 className="text-primary-cus fw-bold mb-0">Admin Page</h5>
      </div>
      <div className="col-10 border border-light border-2 px-4 py-2">
        <p className="text-primary-cus text-end fw-bold mb-0">
          Hello, {userName}
        </p>
      </div>
    </header>
  );
};

export default Header;
