// IMPORT
import Cookies from "js-cookie";

// HELPER FUNCTIONS
const actionHandler = async function (urlFetch, formData) {
  // options to fetch
  const token = Cookies.get("token");
  const options = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: "Bearer " + token,
      // "Content-Type": "multipart/form-data",
    },
  };

  // fetch
  const response = await fetch(urlFetch, options);

  // lấy dữ liệu response
  const data = await response.json();

  return {
    status: response.status,
    message: data.message,
    dataError: data.dataError || [],
  };
};

// FUNCTION ACTION
const productAddAction = async function ({ request, params }) {
  // lấy dữ liệu form
  const formData = await request.formData();

  // url to fetch
  const urlFetch = `${process.env.REACT_APP_API_ENDPOINT_ORIGIN}/admin/product/add`;

  return actionHandler(urlFetch, formData);
};

// FUNCTION ACTION
const productEditAction = async function ({ request, params }) {
  // lấy dữ liệu params từ route
  const productId = params.productId;

  // lấy dữ liệu form
  const formData = await request.formData();

  // url to fetch
  const urlFetch = `${process.env.REACT_APP_API_ENDPOINT_ORIGIN}/admin/product/${productId}`;

  return actionHandler(urlFetch, formData);
};

// ----------------
// EXPORT
const actions = {
  productAddAction,
  productEditAction,
};

export default actions;
