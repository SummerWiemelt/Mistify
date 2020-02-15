import { createStore } from "redux";
import { plantApp } from "../reducers/Reducer";

const store = createStore(plantApp);

export default store;
