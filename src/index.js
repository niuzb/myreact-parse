import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import Main from "./Main";
import { config as reactParseConfig, setReactParseDispatch } from "react-parse";

const apiConfig = {
  baseURL: "https://demo-react-parse.herokuapp.com/parse",
  appId: "REACT_PARSE_DEMO_ID"
};

reactParseConfig.init(apiConfig);

function App() {
  const store = configureStore();
  setReactParseDispatch(store.dispatch);
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
