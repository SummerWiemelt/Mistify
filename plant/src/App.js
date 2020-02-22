import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import ConnectMain from "./components/main/ConnectMain";

import { Provider } from "react-redux";
import store from "./globals/store";
import configureAuthStateChange from "./config/fire";
configureAuthStateChange();

class App extends React.Component {
  // app.js
  render() {
    return (
      <Provider store={store}>
        <div>
          <ConnectMain />
        </div>
      </Provider>
    );
  }
}

export default App;
