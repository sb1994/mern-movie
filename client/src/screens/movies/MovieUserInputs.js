import React from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
//import redux actions
import {
  addSelectedMovieLike,
  removeSelectedMovieLike,
  addSelectedMovieWatch,
  removeSelectedMovieWatch,
} from "../../store/actions/movieActions";

const MovieUserInputs = ({ likes, watched, id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  let { isAuthenticated } = auth;

  const likeMovie = () => {
    console.log("add movie like");
    dispatch(addSelectedMovieLike(id));
  };
  const removeFromLikesList = () => {
    console.log("remove like");
    dispatch(removeSelectedMovieLike(id));
  };
  const addToWatchedList = () => {
    console.log("add to watch list");
    console.log(alreadyWatched);
    dispatch(addSelectedMovieWatch(id));
  };
  const removeFromWatchedList = () => {
    console.log("remove from watch list");
    console.log(alreadyWatched);
    dispatch(removeSelectedMovieWatch(id));
  };

  let alreadyLiked, alreadyWatched;

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
    <>
      {watched !== undefined || likes !== undefined ? (
        <Col sm={12}>
          <>
            <Row className="text-center mt-2">
              <Col sm={6} xs={6}>
                {alreadyLiked ? (
                  <span>
                    <Icon
                      icon={Liked}
                      onClick={removeFromLikesList}
                      style={{ cursor: "pointer", color: "red" }}
                      className="mr-1"
                      size="lg"
                    />
                    Unlike
                  </span>
                ) : (
                  <span>
                    <Icon
                      icon={NotLiked}
                      onClick={likeMovie}
                      style={{ cursor: "pointer" }}
                      className="mr-1"
                      size="lg"
                    />
                    Like
                  </span>
                )}
              </Col>
              <Col sm={6} xs={6}>
                {alreadyWatched ? (
                  <span>
                    <Icon
                      icon={Watched}
                      onClick={removeFromWatchedList}
                      style={{ cursor: "pointer", color: "yellow" }}
                      className="mr-1"
                      size="lg"
                    />
                    Unwatch
                  </span>
                ) : (
                  <span>
                    <Icon
                      icon={NotWatched}
                      onClick={addToWatchedList}
                      style={{ cursor: "pointer" }}
                      className="mr-1"
                      size="lg"
                    />
                    Watch
                  </span>
                )}
              </Col>
            </Row>
          </>
          <hr />
        </Col>
      ) : null}
      <Col></Col>
    </>
  );
};

export default withRouter(MovieUserInputs);
