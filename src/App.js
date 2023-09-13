import { Route, Switch } from "react-router-dom";
import Nav from "./components/Navigation/Nav";
import "./App.scss";
import Login from "./components/Login/login";
import Register from "./components/Register/register";

const App = () => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/news">News</Route>
        <Route path="/about">About</Route>
        <Route path="/contact">contact</Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">Home</Route>
        <Route path="*">nothing</Route>
      </Switch>
    </div>
  );
};

export default App;
