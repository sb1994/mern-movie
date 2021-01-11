import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LandingScreen = () => {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  const { loading, error, isAuthenticated } = auth;
  useEffect(() => {
    if (isAuthenticated || isAuthenticated === undefined) {
      history.push("/profile");
    }
  }, [auth]);

  return (
    <div>
      <h1>LandingScreen</h1>
    </div>
  );
};

export default LandingScreen;
