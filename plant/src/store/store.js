import { createStore } from "redux";
import { plantApp } from "../reducers/Reducer";

const store = createStore(
  plantApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
