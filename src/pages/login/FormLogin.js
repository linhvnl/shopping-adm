// import React/Hook/Router...
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import CUSTOM HOOK
import useInput from "../../hooks/use-input";
import useHttpAdmin from "../../hooks/use-http-admin";
// import useLocalStorage from "../../hooks/use-local-storage";

// import component
import FormInputItem from "./FormInputItem";

/////////////////////////
// logic xác thực là hợp lệ
// email có "@" // const isEmail = (value) => value.includes("@");
// value không được rỗng
const isNotEmpty = (value) => value.trim() !== "" && value.includes("@");
// value có ít nhất 6 ký tự
const is8Chars = (value) => value.trim().length >= 8;

/////////////////////////
// function Component
const FormLogin = (props) => {
  // state message phản hồi xác thực
  const [authMessage, setAuthMessage] = useState(null);

  // dùng điều hướng
  const navigate = useNavigate();

  // dùng Custom Hook cho mỗi đầu vào
  const { input: inputEmail } = useInput(isNotEmpty);
  const { input: inputPassword } = useInput(is8Chars);

  // dùng Custom Hook để fetch to Server
  const { endPoints, customFetch } = useHttpAdmin();

  // hiệu lực form tổng, form chỉ valid khi tất cả input đều valid
  let isValidForm = false;
  if (inputEmail.isValidValue && inputPassword.isValidValue) {
    isValidForm = true;
  }

  // hàm xử lý Submit cho form
  const submitFormHandler = async (event) => {
    event.preventDefault();

    // submit là đã "touch"
    inputEmail.inputBlurHandler();
    inputPassword.inputBlurHandler();

    // tổng form không hợp lệ thì return
    if (!isValidForm) return;

    // logic muốn thực hiện khi tổng form hợp lệ => send request
    customFetch({
      method: "POST",
      url: endPoints.fetchLogin,
      bodyObj: {
        email: inputEmail.enteredValue,
        password: inputPassword.enteredValue,
      },
      errFunc: (data) => setAuthMessage(data.dataError),
      successFunc: (data) => {
        props.onLoginSuccess(data);
        navigate("/");
      },
    });

    // đặt lại giá trị ban đầu (reset) input PASSWORD (yêu cầu nhập lại)
    inputPassword.resetInput();
  };

  // return
  return (
    <div className="container d-flex justify-content-center py-5">
      <div className="py-5" style={{ minWidth: "360px" }}>
        <h1 className="text-center fw-bold pb-4">Login</h1>

        {/* phản hồi SIGN UP có lỗi gì hay không */}
        {authMessage && (
          <div className="text-danger text-center">
            <p className="mb-0">__VALIDATION__</p>
            <ul className="list-unstyled">
              {authMessage?.map((err, i) => (
                <li key={i}>{err.msg}</li>
              ))}
            </ul>
          </div>
        )}

        {/* form input */}
        <form onSubmit={submitFormHandler}>
          <FormInputItem items={{ inputEmail, inputPassword }} />

          {/* nút submit CREATE ACCOUNT */}
          <div className="">
            <button
              type="submit"
              disabled={!isValidForm}
              className="btn btn-primary w-100 fw-bold fs-5 p-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
