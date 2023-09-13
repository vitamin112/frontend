import { useEffect } from "react";
import "./login.scss";
import axios from "axios";

const Login = () => {
  useEffect(() => {
    axios
      .get("https://reqres.in/api/users?page=2")
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="login-container">
      <div className="container py-5">
        <div className="row justify-content-center align-items-center g-2">
          <div className="col-12 col-sm-6 d-none d-sm-block bg-secondary">
            <h2> Welcome to back</h2>
            <p></p>
          </div>
          <div className="col-12 col-sm-6 bg-info p-2 rounded">
            <form action="/login" method="post">
              <div className=" ">
                <label htmlFor="uname">
                  <b>Username</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="uname"
                  required
                />

                <label htmlFor="psw">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="psw"
                  required
                />

                <button type="submit btn btn-info">Login</button>
                <label>
                  <input type="checkbox" name="remember" />
                  Remember me
                </label>
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
