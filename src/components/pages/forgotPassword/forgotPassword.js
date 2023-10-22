import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { generateResetCode, resetPassword } from "../../../service/userService";
import "./forgotPassword.scss";

const ForgotPassword = () => {
  let history = useHistory();
  const [key, setKey] = useState("");
  const [count, setCount] = useState();
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [isValidKey, setIsValidKey] = useState(true);
  const [isValidCode, setIsValidCode] = useState(true);
  const [isValidNewPass, setIsValidNewPass] = useState(true);
  const [isValidConfirmPass, setIsValidConfirmPass] = useState(true);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [count]);

  function getResetCode(e) {
    e.preventDefault();

    generateResetCode(key)
      .then((res) => {
        if (res.status === 200 && res.data.code === 1) {
          setCount(90);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    //check input
    if (key) {
      setIsValidKey(true);
    } else {
      setIsValidKey(false);
    }
    if (code) {
      setIsValidCode(true);
    } else {
      setIsValidCode(false);
    }
    if (newPass) {
      setIsValidNewPass(true);
    } else {
      setIsValidNewPass(false);
    }
    if (confirmPass) {
      if (confirmPass === newPass) {
        setIsValidConfirmPass(true);
      } else {
        toast.warning("new pass is not match!");
      }
    } else {
      setIsValidConfirmPass(false);
    }

    if (
      isValidCode &&
      isValidConfirmPass &&
      isValidKey &&
      isValidNewPass &&
      code &&
      key &&
      newPass &&
      confirmPass
    ) {
      resetPassword(key, code, newPass)
        .then((res) => {
          if (res.status === 200 && res.data.code === 1) {
            history.push("/login");
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    }
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
              className={
                isValidKey ? "form-control" : "form-control is-invalid"
              }
              type="text"
              placeholder="Enter Username"
              name="key"
              id="key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
              autoComplete="on"
            />
            <div className="input-group mb-3">
              <button
                type="button"
                className="btn btn-info"
                onClick={(e) => getResetCode(e)}
              >
                Send code
              </button>
              <span className="input-group-text text-danger">
                {count <= 0 ? "!" : count}
              </span>
              <input
                className={
                  isValidCode ? "form-control" : "form-control is-invalid"
                }
                type="text"
                placeholder="Enter code..."
                name="code"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                autoComplete="on"
              />
            </div>

            <hr />
            <label htmlFor="newPass">
              <b>newPass</b>
            </label>
            <input
              className={
                isValidNewPass ? "form-control" : "form-control is-invalid"
              }
              type="text"
              placeholder="Enter newPass"
              name="newPass"
              id="newPass"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              required
              autoComplete="on"
            />
            <label htmlFor="confirmPass">
              <b>confirmPass</b>
            </label>
            <input
              className={
                isValidConfirmPass ? "form-control" : "form-control is-invalid"
              }
              type="text"
              placeholder="Enter confirmPass"
              name="confirmPass"
              id="confirmPass"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
              autoComplete="on"
            />

            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
