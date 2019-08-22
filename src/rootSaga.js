import { all, call } from "redux-saga/effects";

import { parseWatcher } from "react-parse";
function* rootSaga() {
  yield all([call(parseWatcher, "parseWatcher")]);
}

export default rootSaga;
