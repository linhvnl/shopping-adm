// IMPORT
import Cookies from "js-cookie";

// HELPER FUNCTIONS
const setOptions = () => {
  const token = Cookies.get("token");
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return options;
};

const setUrlFetchByPage = (request, keyFetch) => {
  // quy định số documents trên 1 page
  const perPage = 8;

  // lấy search params động để fetch theo page
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;

  // tạo url động
  const urlFetch = `${process.env.REACT_APP_API_ENDPOINT_ORIGIN}/admin/${keyFetch}?perPage=${perPage}&page=${page}`;

  return urlFetch;
};

// FUNCTION LOADER
const homeLoader = async function ({ request, params }) {
  const urlFetch = `${process.env.REACT_APP_API_ENDPOINT_ORIGIN}/admin/home`;
  const options = setOptions();

  // fetch dữ liệu
  return fetch(urlFetch, options);
};

// FUNCTION LOADER
const usersLoader = async function ({ request, params }) {
  const urlFetch = setUrlFetchByPage(request, "users");
  const options = setOptions();

  return fetch(urlFetch, options);
};

// FUNCTION LOADER
const productsLoader = async function ({ request, params }) {
  const urlFetch = setUrlFetchByPage(request, "products");
  const options = setOptions();

  return fetch(urlFetch, options);
};

// FUNCTION LOADER
const productLoader = async function ({ request, params }) {
  // lấy params động từ url để fetch
  const productId = params.productId;

  const urlFetch = `${process.env.REACT_APP_API_ENDPOINT_ORIGIN}/admin/product/${productId}`;

  const options = setOptions();

  return fetch(urlFetch, options);
};

// FUNCTION LOADER
const ordersLoader = async function ({ request, params }) {
  const urlFetch = setUrlFetchByPage(request, "orders");
  const options = setOptions();

  return fetch(urlFetch, options);
};

// FUNCTION LOADER
const orderLoader = async function ({ request, params }) {
  // lấy params động từ url để fetch
  const orderId = params.orderId;

  const urlFetch = `${process.env.REACT_APP_API_ENDPOINT_ORIGIN}/admin/order/${orderId}`;

  const options = setOptions();

  return fetch(urlFetch, options);
};

// ----------------
// EXPORT
const loaders = {
  homeLoader,
  usersLoader,
  productsLoader,
  productLoader,
  ordersLoader,
  orderLoader,
};

export default loaders;
