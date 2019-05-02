import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import navReducer from "./navReducer";

export default combineReducers({
  form: formReducer,
  nav: navReducer
});
