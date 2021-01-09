import * as types from "../actions/action_types";
import isEmpty from "../../validation/isEmpty";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  isAuthenticated: false,
  user: {},
  searchedUser: {},
  users: [],
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOGGED_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        error: null,
        loading: false,
      };
    case types.SET_LOGGED_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case types.SET_SEARCHED_USER:
      return {
        ...state,
        searchedUser: action.payload,
      };
    case types.START_AUTH:
      return {
        ...state,
        loading: true,
      };
    case types.FAIL_AUTH:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
