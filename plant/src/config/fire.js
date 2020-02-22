import { loginUser, logoutUser } from '../actions/actions';
import store from "../globals/store";
import { initializeApp, auth } from 'firebase/app';

// Configure Firebase.
var config = {
  apiKey: 'AIzaSyD45g6sU7WqfcJP_CjHat7Ety05Mv3oqJY',
  authDomain: 'plant-app-81b1e.firebaseapp.com',
  databaseURL: 'https://plant-app-81b1e.firebaseio.com',
  projectId: 'plant-app-81b1e',
  storageBucket: 'plant-app-81b1e.appspot.com',
  messagingSenderId: '196736420711',
  appId: '1:196736420711:web:998cd54734e861fc833dc2',
  measurementId: 'G-1JTKXBWVCS'
};
const fire = initializeApp(config);
auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch(loginUser(user));
  } else {
    store.dispatch(logoutUser());
  }
});
console.log(auth());

export default fire;
