import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.scss";
import Error from "./components/pages/Error";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/Signup";
// context
import { useGlobalContext } from "./context/context";
import Dashboard from "./components/pages/Dashboard";
import axios from "axios";
import LoadingMain from "./components/pages/LoadingMain";
import Footer from "./components/Footer";
import Blog from "./components/pages/Blog";
import AddBlog from "./components/pages/AddBlog";
axios.defaults.withCredentials = true;

const App = () => {
  const { loading } = useGlobalContext();

  if (loading) {
    return <LoadingMain />;
  }

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home title="Home" bg="#fff" />
          </Route>
          <Route path="/login">
            <Login title="Login" bg="#284b63" />
          </Route>
          <Route path="/signup">
            <SignUp
              title="Signup"
              bg="linear-gradient(to right, #485563, #29323c)"
            />
          </Route>
          <Route path="/dashboard">
            <Dashboard title="Dashboard" bg="#fff" />
          </Route>
          <Route path="/addblog">
            <AddBlog title="Add Blog" />
          </Route>
          <Route path="/blog/:id">
            <Blog />
          </Route>

          <Route path="*">
            <Error title="404 error" />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default App;
