import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Nav from "./components/Navigation/Nav";
import SideBar from "./components/layouts/SideBar/SideBar";
import UserLayout from "./components/layouts/user/user";
import Login from "./components/pages/Login/login";
import PostDetail from "./components/pages/PostDetail/PostDetail";
import Register from "./components/pages/Register/register";
import ForgotPassword from "./components/pages/forgotPassword/forgotPassword";
import Home from "./components/pages/home";
import NotFound from "./components/pages/notFound/notFound";
import Posts from "./components/pages/post";
import Profile from "./components/pages/profile/profile";
import CreateUser from "./components/pages/user/create/create";
import UserList from "./components/pages/user/user";
import Footer from "./components/partials/footer/footer";
import { UserProvider } from "./service/authContext";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Switch>
          <Route path="/users">
            <SideBar>
              <UserList />
            </SideBar>
          </Route>

          <Route path="/posts">
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

          <Route path="/profile/:id">
            <Nav />
            <Profile />
          </Route>

          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>

          <Route path="/admin" exact>
            <SideBar>
              <Home />
            </SideBar>
          </Route>

          <Route path="/user/create" exact>
            <CreateUser />
          </Route>

          <Route path="/post/:id" exact>
            <Nav />
            <PostDetail />
          </Route>

          <Route path="/" exact>
            <Nav />
            <UserLayout />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
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
