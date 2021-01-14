import axios from "axios";
import * as types from "./action_types";
import { setLoggedUser } from "./userAuthActions";
export const getSelectedMovie = (id) => async (dispatch) => {
  axios
    .get(`/api/movies/${id}`)
    // .get(`https://jsonplaceholder.typicode.com/todos/1`)
    .then((result) => {
      // dispatch(setSearchedUser(result.data));
      console.log(result.data);
      // console.log(result)
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addMovieLike = (id) => async (dispatch) => {
  console.log(id);
  const { data } = await axios.post(`/api/movies/${id}/like/add`);

  dispatch({
    type: types.GET_MOVIES_SUCCESS,
    payload: { movies: data, loading: false },
  });
};
export const removeMovieLike = (id) => async (dispatch) => {
  console.log(id);
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
    // .get(`https://jsonplaceholder.typicode.com/todos/1`)
    .then((result) => {
      // dispatch(setSearchedUser(result.data));
      console.log(result.data);
      let { data } = result;
      let { totalMovies, pagination, page, totalPages, movies } = result.data;

      dispatch({
        type: types.GET_MOVIES_SUCCESS,
        payload: { movies, loading: false },
      });
      // console.log(result)
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addMovieWatch = (id) => async (dispatch) => {
  console.log(id);
  const { data } = await axios.post(`/api/movies/${id}/watch/add`);

  console.log(data);
  // console.log(data.updatedUser.watchedMovies);
  // console.log(data.updatedMovies[0].watched);
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
