import { loginUser, logoutUser } from "../actions/actions";
import store from "../globals/store";
import { auth } from "firebase/app";

// Configure Firebase.
const configureAuthStateChange = () => {
  auth().onAuthStateChanged(function(user) {
    if (user) {
      store.dispatch(loginUser(user));
    } else {
      store.dispatch(logoutUser());
    }
  });
};

export default configureAuthStateChange;
