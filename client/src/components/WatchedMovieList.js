import React from "react";
import { Col, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import WatchedMovieListItem from "./WatchedMovieListItem";

const WatchedMovieList = ({ watched }) => {
  let renderMovies = watched.map((watch) => {
    let { movie } = watch;
    return <WatchedMovieListItem key={movie._id} movie={movie} />;
  });

  return (
    <Col lg={12}>
      <Row>{renderMovies}</Row>
    </Col>
  );
};

export default WatchedMovieList;
