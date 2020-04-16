import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import "./global.css";
import "./App.css";

import Nav from "./components/nav/Nav";
import Routes from "./components/routes/Routes";
import { history } from "./components/routes/history";
import store from "./store";

function App() {
  return (
    <div className="App container-fluid">
      <Provider store={store}>
        <Router history={history}>
          <Nav />
          <Routes />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
