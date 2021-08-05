import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.scss"; //css

//components
import Error from "./components/pages/Error";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/Signup";
import Footer from "./components/Footer";

import Blog from "./components/pages/Blog";
import AddBlog from "./components/pages/AddBlog";
import Dashboard from "./components/pages/Dashboard";

import LoadingMain from "./components/pages/LoadingMain";

// context
import { useGlobalContext } from "./context/context";


import axios from "axios";
axios.defaults.withCredentials = true;

const App = () => {
  const { loading } = useGlobalContext();

  if (loading) {
    return <LoadingMain />;
  }

  return (
    <>
      <Router>
        {/* navbar */}
        <Navbar />

        <Switch>

          {/* home page */}
          <Route exact path="/">
            <Home title="Home" bg="#fff" />
          </Route>

          {/* login page */}
          <Route path="/login">
            <Login title="Login" bg="#284b63" />
          </Route>

          {/* signup page */}
          <Route path="/signup">
            <SignUp
              title="Signup"
              bg="linear-gradient(to right, #485563, #29323c)"
            />
          </Route>


          {/* components after logging in */}

          {/* dashboard after logging in */}
          <Route path="/dashboard">
            <Dashboard title="Dashboard" bg="#fff" />
          </Route>

          {/* adding blog from current user */}
          <Route path="/addblog">
            <AddBlog title="Add Blog" />
          </Route>

          {/* routing to specific blog */}
          <Route path="/blog/:id">
            <Blog />
          </Route>


          {/* in case of invalid route */}
          <Route path="*">
            <Error title="404 error" />
          </Route>

        </Switch>

        {/* footer */}
        <Footer />
      </Router>
    </>
  );
};

export default App;
