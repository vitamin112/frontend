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
import Dashboard from "./components/pages/dashboard/dashboard";
import ForgotPassword from "./components/pages/forgotPassword/forgotPassword";
import Home from "./components/pages/home";
import NotFound from "./components/pages/notFound/notFound";
import Posts from "./components/pages/post";
import Trash from "./components/pages/post/trash";
import Profile from "./components/pages/profile/profile";
import CreateUser from "./components/pages/user/create/create";
import UserList from "./components/pages/user/user";
import Footer from "./components/partials/footer/footer";
import { UserProvider } from "./service/authContext";

const App = () => {
  return (
    <UserProvider>
      <main>
        <Switch>
          <Route path="/posts">
            <SideBar>
              <Posts />
            </SideBar>
          </Route>

          <Route path="/trash">
            <SideBar>
              <Trash />
            </SideBar>
          </Route>

          <Route path="/post/:id/update">
            <Nav />
            <PostDetail />
          </Route>

          <Route path="/post/:id">
            <Nav />
            <PostDetail />
          </Route>

          <Route path="/user/create">
            <CreateUser />
          </Route>

          <Route path="/users">
            <SideBar>
              <UserList />
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

          <Route path="/dashboard" exact>
            <SideBar>
              <Dashboard />
            </SideBar>
          </Route>

          <Route path="/" exact>
            <Nav />
            <UserLayout />
          </Route>

          <Route path="/frontend" exact>
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
      </main>
      <Footer />
    </UserProvider>
  );
};

export default App;
