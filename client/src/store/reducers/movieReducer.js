import * as types from "../actions/action_types";

const initialState = {
  error: null,
  loading: false,
  selectedMovie: {},
  movies: [],
  curentPage: 0,
};
const movie = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload.movies,
        loading: action.payload.loading,
      };
    case types.GET_MOVIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.GET_MOVIE_SUCCESS:
      return {
        ...state,
        selectedMovie: action.payload.movie,
        loading: false,
      };
    case types.GET_MOVIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_MOVIE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.REMOVE_LIKE_SELECTED_MOVIE:
      return {
        ...state,
        loading: false,
        selectedMovie: action.payload.selectedMovie,
      };
    case types.ADD_LIKE_SELECTED_MOVIE:
      return {
        ...state,
        loading: false,
        selectedMovie: action.payload.selectedMovie,
      };
    default:
      return state;
  }
};

export default movie;
