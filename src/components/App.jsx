import React, { useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "../history";
import axios from "axios";

import Header from "./layout/NavBar/Header";
import Home from "./pages/Home";

import "../styles/App.css";

axios.defaults.baseURL = "https://content.fbslo.net/";

const App = () => {
  const [formOpen, setFormOpen] = useState(false);

  const toggleForm = () => {
    setFormOpen(!formOpen);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/hivesigner-helper.js";
    script.async = true;
    document.body.appendChild(script);

    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get("access_token");
      const username = urlParams.get("username");

      sessionStorage.setItem("hs_token", accessToken);
      sessionStorage.setItem("username", username);

      history.push("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Router history={history}>
      <Header toggleForm={toggleForm} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/posts/trending" />}
        />
        <Route
          path="/posts/:filter"
          render={props => <Home {...props} formOpen={formOpen} />}
        />
        <Route
          path="/posts/?access_token=:token"
          render={() => <Redirect to="/posts/trending" />}
        />
      </Switch>
    </Router>
  );
};

export default App;
