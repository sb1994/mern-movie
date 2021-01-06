import React from "react";
import Login from "./components/Screens/auth/Login/Login";
import Register from "./components/Screens/auth/Register/Register";
import HomeScreen from "./components/Screens/HomeScreen";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <main className="py-3">
        {/* <Container> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={HomeScreen} />
        {/* </Container> */}
      </main>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
