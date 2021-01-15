import React, { useEffect } from "react";
import { Button, Col, Jumbotron, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader";
import "./MovieDetail.css";
import { getSelectedMovie } from "../../store/actions/movieActions";
import MovieUserInputs from "./MovieUserInputs";
const MovieDetailScreen = ({ match }) => {
  //using the id from the to get the movie from the db whih the
  //redux dispatcher
  let { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => dispatch(getSelectedMovie(id)), []);

  const auth = useSelector((state) => state.auth);
  const movie = useSelector((state) => state.movie);

  const goToLogin = () => {
    history.push("/login");
  };

  let { isAuthenticated, user } = auth;

  let { loading, selectedMovie } = movie;

  let { crew, cast } = selectedMovie;

  let filteredCast = [];

  let renderCast = [];

  if (cast !== undefined) {
    filteredCast = cast.filter((member) => member.profile_path !== null);
  }
  console.log(cast);
  filteredCast.slice([0], [11]).map((item, i) => {
    renderCast.push(item);
  });

  return (
    <div className="movie-detail">
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col className="hero-container" style={{ color: "white" }} lg={12}>
            <img
              className="hero-img"
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`}
              alt=""
            />
            <div className="col-12 hero-title">
              <div className="row">
                <h2>{selectedMovie.title}</h2>
              </div>
            </div>
          </Col>
          <Col lg={12} sm={12} className="movie-info mt-3">
            <Row>
              <Col lg={3} sm={12}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
                  alt=""
                  srcset=""
                  className="img-fluid"
                />
              </Col>
              <Col lg={6} sm={12} className="movie-description">
                <Row>
                  <Col lg={12} sm={12}>
                    <h4>Description</h4>
                    <p>{selectedMovie.overview}</p>
                  </Col>
                  <Col lg={12} sm={12} className="genre-section mb-3">
                    {selectedMovie.genres !== undefined
                      ? selectedMovie.genres.map((genre) => (
                          <span className="genre-tag">{genre.name}</span>
                        ))
                      : null}
                  </Col>
                  <Col lg={12} sm={12} className="credits-section">
                    <Row>
                      <Col lg={6} sm={6}>
                        <h3>Crew</h3>
                        {crew !== undefined
                          ? crew.map((member) => (
                              <p>
                                {member.job}: {member.name}
                              </p>
                            ))
                          : null}
                      </Col>
                      <Col lg={6} sm={6}>
                        <h3>Cast</h3>
                        <Row>
                          {renderCast !== undefined
                            ? renderCast.map((member) => (
                                <Col lg={3} sm={3} xs={3} className="mb-2">
                                  <img
                                    className="img-fluid"
                                    src={`https://image.tmdb.org/t/p/original/${member.profile_path}`}
                                    alt=""
                                    srcset=""
                                  />
                                </Col>
                              ))
                            : null}
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col lg={3} sm={12} className="user-inputs">
                {isAuthenticated ? (
                  <MovieUserInputs
                    likes={selectedMovie.likes}
                    watched={selectedMovie.watched}
                    id={id}
                  />
                ) : (
                  <Button onClick={goToLogin}>Login</Button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default MovieDetailScreen;
