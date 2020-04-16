import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import oficinaReducer from "./reducers/oficinaReducer";

export default combineReducers({
  authState: authReducer,
  oficinaState: oficinaReducer,
});
