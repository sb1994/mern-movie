import React from "react";
import { Col, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faEye as Watched,
  faCoffee,
  faHeart as Liked,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as NotLiked,
  faEye as NotWatched,
} from "@fortawesome/free-regular-svg-icons";

import { addMovieWatch, removeMovieWatch } from "../store/actions/movieActions";
const WatchedMovieListItem = ({ movie }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const auth = useSelector((state) => state.auth);

  const showMovieDetail = () => {
    history.push(`/movies/${movie._id}`);
  };
  const goToLoginPage = () => {
    history.push("/login");
  };
  const addToWatchedList = () => {
    console.log("add to watch list");
    console.log(alreadyWatched);
    console.log(user.watchedMovies);
    dispatch(addMovieWatch(movie._id));
  };
  const removeFromWatchedList = () => {
    console.log("remove from watch list");
    console.log(movie._id);
    dispatch(removeMovieWatch(movie._id));
  };
  let { isAuthenticated, user } = auth;
  const alreadyWatched = user.watchedMovies.some(
    (watch) => watch.user === auth.user._id
  );
  return (
    <Col
      md={3}
      sm={6}
      xs={6}
      className="image-container d-flex justify-content-around mb-4 "
    >
      <img
        className="img-fluid"
        style={movie.poster_path === null ? { width: "100%" } : {}}
        src={
          movie.poster_path !== null
            ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
            : "https://cinemaone.net/images/movie_placeholder.png"
        }
      />
      <div className="overlay mb-1">
        <Row>
          {isAuthenticated ? (
            <>
              <Col sm={6}>
                <Icon
                  icon={alreadyWatched ? Watched : NotWatched}
                  onClick={
                    alreadyWatched ? removeFromWatchedList : addToWatchedList
                  }
                  style={{ cursor: "pointer" }}
                />
                <span>{movie.watched.length}</span>
              </Col>
            </>
          ) : (
            <Col sm={6}>
              <Button onClick={goToLoginPage}>Login</Button>
            </Col>
          )}
          {/* <Row> */}
          <Col sm={isAuthenticated ? 4 : 6}>
            <Icon
              icon={faInfo}
              style={{ cursor: "pointer" }}
              onClick={showMovieDetail}
            />
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default WatchedMovieListItem;
