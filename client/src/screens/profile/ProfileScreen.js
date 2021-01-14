import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import WatchedMovieList from "../../components/WatchedMovieList";
import { Card, Col, Row, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../../store/actions/userAuthActions";
import "./index.css";
const ProfileScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let auth = useSelector((state) => state.auth);
  let { loading, error, user, isAuthenticated } = auth;

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      // history.push("/login");
      dispatch(getCurrentUser());
    } else {
      console.log("not logged in");
    }
  }, []);
  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, []);

  return (
    <div>
      {loading || user === undefined || user.watched === undefined ? (
        <Loader />
      ) : (
        <div>hello</div>
      )}
    </div>
  );
};

export default ProfileScreen;
