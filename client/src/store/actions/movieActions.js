import axios from "axios";
import * as types from "./action_types";
import { setLoggedUser } from "./userAuthActions";
export const getSelectedMovie = (id) => async (dispatch) => {
  dispatch({
    type: types.GET_MOVIE_REQUEST,
  });
  axios
    .get(`/api/movies/${id}`)
    .then((result) => {
      dispatch({
        type: types.GET_MOVIE_SUCCESS,
        payload: { movie: result.data, loading: false },
      });
      console.log(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addMovieLike = (id) => async (dispatch) => {
  const { data } = await axios.post(`/api/movies/${id}/like/add`);

  dispatch({
    type: types.GET_MOVIES_SUCCESS,
    payload: { movies: data, loading: false },
  });
};
export const removeMovieLike = (id) => async (dispatch) => {
  const { data } = await axios.post(`/api/movies/${id}/like/remove`);
  console.log(data);
  dispatch({
    type: types.GET_MOVIES_SUCCESS,
    payload: { movies: data, loading: false },
  });
};
export const getMovies = () => async (dispatch) => {
  dispatch({
    type: types.GET_MOVIES_REQUEST,
    payload: { loading: true },
  });
  axios
    .get(`/api/movies`)
    .then((result) => {
      console.log(result.data);
      let { data } = result;
      let { totalMovies, pagination, page, totalPages, movies } = result.data;

      dispatch({
        type: types.GET_MOVIES_SUCCESS,
        payload: { movies, loading: false },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addMovieWatch = (id) => async (dispatch) => {
  console.log(id);
  const { data } = await axios.post(`/api/movies/${id}/watch/add`);
  dispatch({
    type: types.GET_MOVIES_SUCCESS,
    payload: { movies: data.updatedMovies, loading: false },
  });
  dispatch(setLoggedUser(data.updatedUser));
};
export const removeMovieWatch = (id) => async (dispatch) => {
  console.log(id);
  const { data } = await axios.post(`/api/movies/${id}/watch/remove`);
  console.log(data);

  dispatch({
    type: types.GET_MOVIES_SUCCESS,
    payload: { movies: data.updatedMovies, loading: false },
  });
  dispatch(setLoggedUser(data.updatedUser));
};
export const addSelectedMovieLike = (id) => async (dispatch, getState) => {
  const { data } = await axios.post(`/api/movies/${id}/like/add`);
  // console.log(data);
  let movie = data.filter((movie) => movie._id.toString() === id.toString());
  dispatch({
    type: types.ADD_LIKE_SELECTED_MOVIE,
    payload: { selectedMovie: movie[0], loading: false },
  });
};
export const removeSelectedMovieLike = (id) => async (dispatch, getState) => {
  const { data } = await axios.post(`/api/movies/${id}/like/remove`);

  //getting the updatedMOvie from the returned movies list

  let movie = data.filter((movie) => movie._id.toString() === id.toString());

  //passing the filtered movie into state
  dispatch({
    type: types.REMOVE_LIKE_SELECTED_MOVIE,
    payload: { selectedMovie: movie[0], loading: false },
  });
};
export const addSelectedMovieWatch = (id) => async (dispatch) => {
  const { data } = await axios.post(`/api/movies/${id}/watch/add`);

  let movie = data.updatedMovies.filter(
    (movie) => movie._id.toString() === id.toString()
  );

  console.log(movie);
  dispatch({
    type: types.ADD_LIKE_SELECTED_MOVIE,
    payload: { selectedMovie: movie[0], loading: false },
  });
  dispatch(setLoggedUser(data.updatedUser));
};
export const removeSelectedMovieWatch = (id) => async (dispatch) => {
  // console.log(id);
  const { data } = await axios.post(`/api/movies/${id}/watch/remove`);

  let movie = data.updatedMovies.filter(
    (movie) => movie._id.toString() === id.toString()
  );
  dispatch({
    type: types.REMOVE_LIKE_SELECTED_MOVIE,
    payload: { selectedMovie: movie[0], loading: false },
  });
  dispatch(setLoggedUser(data.updatedUser));
};
