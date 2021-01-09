import React from "react";
import { Col } from "react-bootstrap";

const WatchedMovieListItem = ({ movie }) => {
  return (
    <Col md={3} sm={3} xs={6}>
      {movie.title}
    </Col>
  );
};

export default WatchedMovieListItem;
