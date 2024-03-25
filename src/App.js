// import React/Hook/Router...
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// import component LAYOUT
import Layout from "./components/layout/Layout.jsx";
import AdminDashboard from "./components/layout/AdminDashboard.jsx";

// import component
import Login from "./pages/login/Login.jsx";

import HomeDashboard from "./pages/home/HomeDashboard.jsx";
import UsersDashboard from "./pages/users/UsersDashboard.jsx";
import ProductsDashboard from "./pages/products/ProductsDashboard.jsx";
import ProductNewDashboard from "./pages/productNew/ProductNewDashboard.jsx";
import ProductEdit from "./pages/productEdit/ProductEdit.jsx";
import Orders from "./pages/orders/Orders.jsx";
import OrderDetail from "./pages/orderDetail/OrderDetail.jsx";

// chat
import LiveChat from "./pages/livechat/LiveChat.jsx";

// import function loaders
import loaders from "./utils/loaders";
import actions from "./utils/actions";

//////////////////////
// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // admin
      {
        path: "",
        element: <AdminDashboard />,
        children: [
          // home
          {
            index: true,
            element: <HomeDashboard />,
            loader: loaders.homeLoader,
          },

          // users
          {
            path: "users",
            element: <UsersDashboard />,
            loader: loaders.usersLoader,
          },

          // products
          {
            path: "products",
            element: <ProductsDashboard />,
            loader: loaders.productsLoader,
          },
          {
            path: "product/add",
            element: <ProductNewDashboard />,
            action: actions.productAddAction,
          },
          {
            path: "product/:productId/edit",
            element: <ProductEdit />,
            loader: loaders.productLoader,
            action: actions.productEditAction,
          },

          // Orders
          {
            path: "orders",
            element: <Orders />,
            loader: loaders.ordersLoader,
          },
          {
            path: "order/:orderId",
            element: <OrderDetail />,
            loader: loaders.orderLoader,
          },
        ],
      },

      // Chat
      {
        path: "chat",
        element: <LiveChat />,
      },
    ],
  },

  // login
  { path: "/login", element: <Login /> },
]);

//////////////////////
// function component
const App = () => {
  return <RouterProvider router={router} />;
};

// export
export default App;
