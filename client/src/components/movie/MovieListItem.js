import React, { useEffect } from "react";
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
import "./MovieListItem.css";

//import redux actions
import {
  addMovieLike,
  removeMovieLike,
  addMovieWatch,
  removeMovieWatch,
} from "../../store/actions/movieActions";

const MovieListItem = ({ movie }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const auth = useSelector((state) => state.auth);

  let { isAuthenticated, user } = auth;
  const showMovieDetail = () => {
    history.push(`/movies/${movie._id}`);
  };
  const goToLoginPage = () => {
    history.push("/login");
  };

  const likeMovie = () => {
    console.log("add movie like");
    dispatch(addMovieLike(movie._id));
  };
  const removeFromLikesList = () => {
    console.log("remove like");
    dispatch(removeMovieLike(movie._id));
  };
  const addToWatchedList = () => {
    console.log("add to watch list");
    console.log(alreadyWatched);
    dispatch(addMovieWatch(movie._id));
  };
  const removeFromWatchedList = () => {
    console.log("remove from watch list");
    console.log(movie._id);
    console.log(alreadyWatched);
    dispatch(removeMovieWatch(movie._id));
  };

  let alreadyLiked,
    alreadyWatched = false;

  //filter wether the user as already liked the movie
  let { likes, watched } = movie;

  if (!isAuthenticated) {
    alreadyLiked = false;
    alreadyWatched = false;
  } else {
    alreadyLiked = likes.some(
      (like) => like.user.toString() === auth.user._id.toString()
    );
    // filter wether the user as already watched the movie
    alreadyWatched = watched.some(
      (watch) => watch.user.toString() === auth.user._id.toString()
    );
  }

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
              <Col sm={4}>
                {alreadyLiked ? (
                  <Icon
                    icon={Liked}
                    onClick={removeFromLikesList}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                ) : (
                  <Icon
                    icon={NotLiked}
                    onClick={likeMovie}
                    style={{ cursor: "pointer" }}
                  />
                )}
                <span>{movie.likes.length}</span>
              </Col>
              <Col sm={4}>
                {alreadyWatched ? (
                  <Icon
                    icon={Watched}
                    onClick={removeFromWatchedList}
                    style={{ cursor: "pointer", color: "yellow" }}
                  />
                ) : (
                  <Icon
                    icon={NotWatched}
                    onClick={addToWatchedList}
                    style={{ cursor: "pointer" }}
                  />
                )}
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

export default withRouter(MovieListItem);
