import { combineReducers } from "redux";
import { parseReducer } from "react-parse";

const reducers = combineReducers({
  parse: parseReducer
});

export default reducers;
