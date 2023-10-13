import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./register.scss";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidSex, setIsValidSex] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);

  let history = useHistory();

  const isValidate = () => {
    if (userName === "") {
      toast.warning("You need to enter a username!");
      setIsValidName(false);
      return false;
    }
    setIsValidName(true);

    if (email === "") {
      toast.warning("You need to enter a email!");
      setIsValidEmail(false);
      return false;
    }

    const regx = "^w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$";
    const validateEmail = (email) => {
      return email.match(regx);
    };

    if (validateEmail(email)) {
      toast.warning("Invalid email!");
      setIsValidEmail(false);
      return false;
    }
    setIsValidEmail(true);

    if (address === "") {
      toast.warning("You need to enter a address!");
      setIsValidPhone(false);
      return false;
    }
    setIsValidPhone(true);

    if (phone === "") {
      toast.warning("You need to enter a phone!");
      setIsValidSex(false);
      return false;
    }
    setIsValidSex(true);

    if (sex === "") {
      toast.warning("You need to enter a sex!");
      setIsValidAddress(false);
      return false;
    }
    setIsValidAddress(true);

    if (password === "") {
      toast.warning("You need to enter a password!");
      setIsValidPassword(false);
      return false;
    }
    setIsValidPassword(true);

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match!");
      setIsValidConfirmPassword(false);
      return false;
    }
    setIsValidConfirmPassword(true);

    return true;
  };

  const handleValidate = (e) => {
    e.preventDefault();
    if (isValidate()) {
      axios
        .post("http://localhost:8080/api/v1/register", {
          userName,
          email,
          phone,
          sex,
          address,
          password,
        })
        .then((res) => {
          if (res.data.code !== 1) {
            toast.error(res.data.message ?? "Something went wrong!");
          } else {
            toast.success("You have successfully registered");
            setTimeout(() => {
              history.push("/login");
            }, 1000);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <div className="register-container">
      <div className="container py-5">
        <div className="row justify-content-center align-items-stretch  align-items-center g-2">
          <div className="col-12 col-sm-6 d-none d-sm-block bg-secondary">
            <h2 className="text-center pt-auto"> Welcome to my website</h2>
            <p> ngloc@gmail.com</p>
          </div>
          <div className="col-12 col-sm-6 bg-info rounded p-3">
            <form action="" method="post" onSubmit={(e) => handleValidate(e)}>
              <div>
                <label htmlFor="uname">
                  <b>Username</b>
                </label>
                <input
                  autoComplete="on"
                  className={
                    isValidName ? "form-control" : "form-control is-invalid"
                  }
                  type="text"
                  placeholder="Enter Username"
                  name="uname"
                  id="uname"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />

                <label htmlFor="email">
                  <b>Email</b>
                </label>
                <input
                  autoComplete="on"
                  className={
                    isValidEmail ? "form-control" : "form-control is-invalid"
                  }
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="address">
                  <b>Address</b>
                </label>
                <input
                  autoComplete="on"
                  className={
                    isValidPhone ? "form-control" : "form-control is-invalid"
                  }
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <label htmlFor="phone">
                  <b>Phone number</b>
                </label>
                <input
                  autoComplete="on"
                  className={
                    isValidSex ? "form-control" : "form-control is-invalid"
                  }
                  type="text"
                  placeholder="Enter Phone number"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <label htmlFor="sex">
                  <b>sex</b>
                </label>
                <input
                  autoComplete="on"
                  className={
                    isValidAddress ? "form-control" : "form-control is-invalid"
                  }
                  type="text"
                  placeholder="Enter sex"
                  name="sex"
                  id="sex"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                />

                <label htmlFor="psw">
                  <b>Password</b>
                </label>
                <input
                  autoComplete="on"
                  className={
                    isValidPassword ? "form-control" : "form-control is-invalid"
                  }
                  type="password"
                  placeholder="Enter Password"
                  name="psw"
                  id="psw"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="confirm-psw">
                  <b>Confirm Password</b>
                </label>
                <input
                  autoComplete="on"
                  className={
                    isValidConfirmPassword
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  type="password"
                  placeholder="Enter Confirm Password"
                  name="confirm-psw"
                  id="confirm-psw"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button type="submit" className="btn btn-info">
                  Register
                </button>
              </div>
              <div>
                <button type="button" className="cancelbtn">
                  Cancel
                </button>
                <span className="psw">
                  you early have an account? <a href="/login"> Login</a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
