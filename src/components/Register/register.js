import "./register.scss";

const Register = () => {
  return (
    <div className="register-container">
      <div className="container">
        <div className="row justify-content-center align-items-center g-2">
          <div className="col-12 col-sm-6 d-none d-sm-block bg-danger">
            Column
          </div>
          <div className="col-12 col-sm-6 bg-info">
            <form action="/register" method="post">
              <div className="container">
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
                <button type="submit">Register</button>
                <label>
                  <input type="checkbox" name="remember" />
                  Remember me{" "}
                </label>
              </div>
              <div className="container">
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
