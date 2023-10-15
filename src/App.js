import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Login from "./components/Login/login";
import UserList from "./components/ManageUser/user";
import Nav from "./components/Navigation/Nav";
import Register from "./components/Register/register";
import Sidebar from "./components/pages/home";
import Posts from "./components/pages/post";
import CreateUser from "./components/pages/user/create/create";
import { UserProvider } from "./service/authContext";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Nav />
        <Switch>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/contact">contact</Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/" exact>
            <Sidebar />
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
    </UserProvider>
  );
};

export default App;
