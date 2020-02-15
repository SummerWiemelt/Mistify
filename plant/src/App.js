import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Main from "./components/main/Main.component";

import { Provider } from "react-redux";
import store from "./store/store";
import { getAllPlants } from "./services/PlantApp.service";

class App extends React.Component {
  componentDidMount() {
    getAllPlants();
  }
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
