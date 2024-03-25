// ______________
// KHÔNG SỬ DỤNG DO KHÔNG GỬI FORM JSON
// ______________

// import React/Hook/Router...
import { redirect } from "react-router-dom";

// function helper to fetch data form
const handleActionForm = async function (url, formData, navigation) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // lấy dữ liệu response
  const data = await response.json();

  // xử lý response error
  if (response.status !== 200) console.log(data.message);
  // if (![200, 201].includes(response.status))
  //   console.log(data.message, data.dataError);

  // xử response success => redirect đến trang hotels
  return redirect(navigation);
};

// export
export default handleActionForm;
