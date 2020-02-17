import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Main from "./components/main/Main.component";

import { Provider } from "react-redux";
import store from "./globals/store";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App;
