import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Login from "./components/Login/login";
import UserList from "./components/ManageUser/user";
import Register from "./components/Register/register";
import SideBar from "./components/SideBar/SideBar";
import Home from "./components/pages/home";
import Posts from "./components/pages/post";
import CreateUser from "./components/pages/user/create/create";
import Footer from "./components/partials/footer/footer";
import { UserProvider } from "./service/authContext";

const App = () => {
  return (
    <UserProvider>
      <div>
        {/* <Nav /> */}
        <Switch>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/sideBar">
            <SideBar>
              <Posts />
            </SideBar>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/" exact>
            <Home />
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
      <Footer />
    </UserProvider>
  );
};

export default App;
