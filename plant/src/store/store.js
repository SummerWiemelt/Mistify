import { createStore } from "redux";
import { plantApp } from "../reducers/reducer";

const store = createStore(plantApp);

export default store;
