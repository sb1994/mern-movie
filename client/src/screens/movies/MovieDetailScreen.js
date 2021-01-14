import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const MovieDetailScreen = ({ match }) => {
  //using the id from the
  let { id } = match.params;
  const dispatch = useDispatch();

  const history = useHistory();

  console.log(match.params);
  return <div></div>;
};

export default MovieDetailScreen;
