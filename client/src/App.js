import Header from "./components/Header";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import LandingScreen from "./screens/layout/LandingScreen";

import jwt_decode from "jwt-decode";
import ProfileScreen from "./screens/profile/ProfileScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Container } from "react-bootstrap";
import React, { Component } from "react";
import { getCurrentUser } from "./store/actions/userAuthActions";
import setUserToken from "./utils/setUserToken";
import store from "./store";
import MovieListScreen from "./screens/movies/MovieListScreen";

if (localStorage.token) {
  setUserToken(localStorage.token);
  const decoded = jwt_decode(localStorage.token);

  // Set user and isAuthenticated
  store.dispatch(getCurrentUser());
} else {
  console.log("user not logged in");
}

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Switch>
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route exact path="/" component={LandingScreen} />
              <Route exact path="/profile" component={ProfileScreen} />
              <Route exact path="/movies" component={MovieListScreen} />
            </Switch>
          </Container>
        </main>
        {/* <Footer /> */}
      </Router>
    );
  }
}

export default App;
