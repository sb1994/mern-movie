import { combineReducers } from "redux";
import authUserReducer from "./authUserReducer";
import movieReducer from "./movieReducer";

export default combineReducers({
  auth: authUserReducer,
  movie: movieReducer,
});
