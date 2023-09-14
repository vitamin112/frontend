import { useEffect } from "react";
import "./login.scss";
import axios from "axios";

const Login = () => {
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/test-api")
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

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
                  className="form-control"
                  type="text"
                  placeholder="Enter Username"
                  name="uname"
                  id="uname"
                  required
                />

                <label htmlFor="psw">
                  <b>Password</b>
                </label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter Password"
                  name="psw"
                  id="psw"
                  required
                />

                <button type="submit" className="btn btn-info">
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
