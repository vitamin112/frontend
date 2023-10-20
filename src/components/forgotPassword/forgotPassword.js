import { useState } from "react";
import { resetPassword } from "../../service/userService";
import "./forgotPassword.scss";

const ForgotPassword = () => {
  const [key, setKey] = useState("");

  function handleForgotPassword(e) {
    e.preventDefault();
    resetPassword().then((res) => {
      console.log(res);
    });
  }

  return (
    <div id="forgot-password">
      <div className="container py-5">
        <div className="row justify-content-center align-items-stretch align-items-center g-2">
          <form action="" method="post">
            <label htmlFor="key">
              <b>Username</b>
            </label>
            <input
              className={true ? "form-control" : "form-control is-invalid"}
              type="text"
              placeholder="Enter Username"
              name="key"
              id="key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
              autoComplete="on"
            />

            <button
              type="submit"
              className="btn btn-info"
              onClick={(e) => handleForgotPassword(e)}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
