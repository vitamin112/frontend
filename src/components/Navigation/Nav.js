import { NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../service/authContext";
import { logout as userLogout } from "../../service/userService";
import "./Nav.scss";

const Nav = () => {
  const history = useHistory();
  const { isLoggedIn, logout } = useUser();
  const user = isLoggedIn ? JSON.parse(isLoggedIn) : {};

  async function logOut() {
    localStorage.removeItem("access_token");
    let res = await userLogout();

    toast.success(res.data.message);
    logout();
    history.push("/login");
  }

  return (
    <div className="nav-container">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            AHA<span className="text-info fw-bolder">BRA</span>
          </a>

          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/posts">
                  posts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">
                  Home
                </NavLink>
              </li>
            </ul>
            {isLoggedIn ? (
              <>
                <div className="flex-shrink-0 dropdown">
                  <a
                    href={`/profile/${user.userID}`}
                    className="d-block text-white text-decoration-none dropdown-toggle"
                    id="userSetting"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://via.placeholder.com/28?text=!"
                      alt="user"
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />{" "}
                    {user.userName}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end shadow"
                    aria-labelledby="userSetting"
                  >
                    <li>
                      <NavLink className="dropdown-item" to="/new">
                        Settings
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to={`/profile/${user.userID}`}
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        onClick={() => logOut()}
                        className=" btn-secondary dropdown-item border-0"
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <NavLink to="/register" className="btn btn-dark border-0">
                    Sign Up
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="btn btn-primary">
                    Login
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
