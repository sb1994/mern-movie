import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../store/actions/movieActions";
import "./index.css";
import Loader from "../../components/Loader";
import MovieListItem from "../../components/movie/MovieListItem";

import { Row } from "react-bootstrap";
const MovieListScreen = () => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie);
  useEffect(() => {
    dispatch(getMovies());
  }, []);

  let { loading, movies } = movie;
  return (
    <div className="movie-app">
      {loading ? (
        <Loader />
      ) : (
        <Row className="mt-3">
          {movies.map((movie, i) => (
            <MovieListItem movie={movie} key={i} />
          ))}
        </Row>
      )}
    </div>
  );
};

export default MovieListScreen;
