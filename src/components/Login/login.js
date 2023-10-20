import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../service/authContext";
import { login as LoginService } from "../../service/userService";
import "./login.scss";

const Login = () => {
  let history = useHistory();
  const { login } = useUser();

  const [key, setKey] = useState("");
  const [password, setPassword] = useState("");

  let token = localStorage.getItem("access_token");
  if (token) {
    history.push("/posts");
  }

  const [checkObject, setCheckObject] = useState({
    isValidKey: true,
    isValidPassword: true,
  });

  const checkFields = (fields) => {
    for (let field in fields) {
      if (fields[field] === false) {
        return false;
      }
    }
    return true;
  };

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

    if (checkFields(newState) === false) {
      toast.warning("Your need to fill all fields");
    } else {
      LoginService({ key, password })
        .then((res) => {
          if (res.status === 200 && res.data.code === 1) {
            toast.success(res.data.message);

            localStorage.setItem("access_token", res.data.data.token);
            let userData = JSON.stringify(res.data.data.payload);

            login(userData);

            history.push("/");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    }
  };

  return (
    <div className="login-container">
      <div className="container py-5">
        <div className="row justify-content-center align-items-stretch align-items-center g-2">
          <div className="col-12 col-sm-6 d-none d-sm-block bg-secondary">
            <h2 className="text-center pt-auto"> Welcome to my website</h2>
            user2@gmail.com
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
                  onChange={(e) => setKey(e.target.value)}
                  required
                  autoComplete="on"
                />
                <div className="w-100 d-flex justify-content-center">
                  <label htmlFor="psw ">
                    <b>Password</b>
                  </label>
                  <a className="ms-auto " href="/forgot-password">
                    Forgot password?
                  </a>
                </div>

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
                  autoComplete="on"
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
                <a href="/register" className="btn my-2 p-2 w-100 btn-primary">
                  Register
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
