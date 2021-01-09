import { combineReducers } from "redux";
import authUserReducer from "./authUserReducer";

export default combineReducers({
  auth: authUserReducer,
});
