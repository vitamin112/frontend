import {
  faBarChart,
  faDashboard,
  faFileText,
  faLayerGroup,
  faNewspaper,
  faPlusCircle,
  faTags,
  faUser,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Link,
  NavLink,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { useUser } from "../../../service/authContext";
import { logout as userLogout } from "../../../service/userService";
import "./SideBar.scss";

const SideBar = ({ children }) => {
  const { isLoggedIn, logout } = useUser();
  const history = useHistory();

  const user = isLoggedIn ? JSON.parse(isLoggedIn) : {};

  async function logOut() {
    localStorage.removeItem("access_token");
    let res = await userLogout();

    toast.success(res.data.message);
    logout();
    history.push("/login");
  }

  return (
    <>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">
          AHA<span className="text-info fw-bolder">BRA</span>
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <div className="">
          <div className="">
            <div className=" px-3 d-none d-md-block">
              {isLoggedIn ? (
                <>
                  <div className="dropdown">
                    <button
                      className="btn text-capitalize text-white border-0 dropdown-toggle"
                      type="button"
                      id="userSettings"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="fw-bolder text-capitalize">
                        {user.group == "admin" ? (
                          <FontAwesomeIcon icon={faUserShield} />
                        ) : (
                          <FontAwesomeIcon icon={faUser} />
                        )}{" "}
                      </span>
                      {user.userName}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="userSettings"
                    >
                      <li>
                        <NavLink className="dropdown-item" to="/profile">
                          Action
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/profile">
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
                <Link
                  to="/login"
                  className="text-decoration-none btn border-0 text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <div className="dropdown p-3 ">
                <a
                  href="#"
                  className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                  id="dropdownUser1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="hugenerd"
                    width="30"
                    height="30"
                    className="rounded-circle"
                  />
                  <span className="d-none d-sm-inline mx-1 text-dark">
                    loser
                  </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                  <li>
                    <a className="dropdown-item" href="#">
                      New project...
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => logOut()}>
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    <FontAwesomeIcon className="px-1" icon={faDashboard} />
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/posts">
                    <FontAwesomeIcon className="px-1" icon={faNewspaper} />
                    Posts
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Users">
                    <FontAwesomeIcon className="px-1" icon={faUser} />
                    Users
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Categories">
                    <FontAwesomeIcon className="px-1" icon={faTags} />
                    Categories
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <FontAwesomeIcon className="px-1" icon={faBarChart} />
                    Reports
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <FontAwesomeIcon className="px-1" icon={faLayerGroup} />
                    Integrations
                  </a>
                </li>
              </ul>

              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Saved reports</span>
                <a
                  className="link-secondary"
                  href="/"
                  aria-label="Add a new report"
                >
                  <FontAwesomeIcon className="px-1" icon={faPlusCircle} />
                </a>
              </h6>
              <ul className="nav flex-column mb-2">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <FontAwesomeIcon className="px-1" icon={faFileText} />
                    Current month
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <FontAwesomeIcon className="px-1" icon={faFileText} />
                    Last quarter
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <FontAwesomeIcon className="px-1" icon={faFileText} />
                    Social engagement
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <FontAwesomeIcon className="px-1" icon={faFileText} />
                    Year-end sale
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Share
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Export
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary dropdown-toggle"
                >
                  <span data-feather="calendar"></span>
                  This week
                </button>
              </div>
            </div>

            <h2>Section title</h2>
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default SideBar;
