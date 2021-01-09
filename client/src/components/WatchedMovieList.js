import React from "react";
import { Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import WatchedMovieListItem from "./WatchedMovieListItem";

const WatchedMovieList = ({ watched }) => {
  let renderMovies = watched.map((watch) => {
    console.log(watch);
    let { movie } = watch;
    return <WatchedMovieListItem movie={movie} />;
  });

  console.log(renderMovies);
  return (
    <>
      <Row>{renderMovies}</Row>
    </>
  );
};

export default WatchedMovieList;
