import { useState } from "react";
import axios from "axios";
import "./login.scss";
import { toast } from "react-toastify";

const Login = () => {
  const [key, setkey] = useState("");
  const [password, setPassword] = useState("");

  const [checkObject, setCheckObject] = useState({
    isValidKey: true,
    isValidPassword: true,
  });

  const handleLogin = (e) => {
    e.preventDefault();

    let newState = {
      isValidKey: true,
      isValidPassword: true,
    };

    if (key === "") {
      newState = { ...newState, isValidKey: false };
    }
    if (password === "") {
      newState = { ...newState, isValidPassword: false };
    }
    setCheckObject(newState);

    axios
      .post("http://localhost:8080/api/login", {
        key,
        password,
      })
      .then((res) => {
        if (res.status === 200 && res.data.code === 1) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-container">
      <div className="container py-5">
        <div className="row justify-content-center align-items-stretch align-items-center g-2">
          <div className="col-12 col-sm-6 d-none d-sm-block bg-secondary">
            <h2 className="text-center pt-auto"> Welcome to my website</h2>
          </div>
          <div className="col-12 col-sm-6 p-2 rounded bg-light">
            <form action="/login" method="post">
              <div>
                <label htmlFor="uname">
                  <b>Username</b>
                </label>
                <input
                  className={
                    checkObject.isValidKey
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  type="text"
                  placeholder="Enter Username"
                  name="uname"
                  id="uname"
                  value={key}
                  onChange={(e) => setkey(e.target.value)}
                  required
                />

                <label htmlFor="psw">
                  <b>Password</b>
                </label>
                <input
                  className={
                    checkObject.isValidPassword
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  type="password"
                  placeholder="Enter Password"
                  name="psw"
                  id="psw"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  className="btn btn-info"
                  onClick={(e) => handleLogin(e)}
                >
                  Login
                </button>
              </div>
              <div className="">
                <button type="button" className="cancelbtn">
                  Cancel
                </button>
                <span className="psw">
                  You don't have a account? <a href="/register"> Register</a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
