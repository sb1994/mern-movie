import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import WatchedMovieList from "../../components/WatchedMovieList";
import { Card, Col, Row, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../../store/actions/userAuthActions";

const ProfileScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let auth = useSelector((state) => state.auth);
  let { loading, error, user, isAuthenticated } = auth;

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === undefined) {
      history.push("/login");
    } else {
      console.log("on profile page");
      dispatch(getCurrentUser());
    }
  }, [isAuthenticated, history]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : user !== null || user.watchedMovies !== undefined ? (
        <Col md={12} sm={12}>
          <p>{user.name}</p>

          <Row>
            {user.watchedMovies !== undefined ? (
              <WatchedMovieList watched={user.watchedMovies} />
            ) : null}
          </Row>
          {/* <Row>
            <ProfileSocialPanel user={currentUser} history={history} />
          </Row>
          <Row>
            <PostList posts={posts} history={history} />
          </Row> */}
        </Col>
      ) : null}
    </div>
  );
};

export default ProfileScreen;
