import { Route, Switch } from "react-router-dom";
import Nav from "./components/Navigation/Nav";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import { ToastContainer } from "react-toastify";
import UserList from "./components/ManageUser/user";
import CreateUser from "./components/pages/user/create/create";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/about">About</Route>
        <Route path="/contact">contact</Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/" exact>
          Home
        </Route>
        <Route path="/user/create" exact>
          <CreateUser />
        </Route>
        <Route path="*">nothing</Route>
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
