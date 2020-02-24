// How the store changes in response to actions  

//actions
import {
  LOADED_PLANTS,
  LOADING_PLANTS,
  LOADING_PLANTS_ERROR,
  LOGIN_USER,
  LOGOUT_USER
} from "../actions/actions";

// default state 
const defaultState = {
  user: {
    loggedIn: false,
    currentUser: null
  },
  plants: {
    error: null,
    isLoaded: false,
    items: []
  }
};


export const plantApp = (state, action) => {
  switch (action.type) {
    case LOADING_PLANTS_ERROR:
      return Object.assign({}, state, {
        plants: {
          ...state.plants,
          isLoaded: true,
          error: action.errorMessage
        }
      });
    case LOADING_PLANTS:
      return Object.assign({}, state, {
        plants: {
          ...state.plants,
          isLoaded: false
        }
      });
    case LOADED_PLANTS:
      return Object.assign({}, state, {
        plants: {
          ...state.plants,
          isLoaded: true,
          error: null,
          items: action.plants
        }
      });
    case LOGIN_USER:
      return Object.assign({}, state, {
        user: {
          loggedIn: true,
          currentUser: action.currentUser
        }
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        user: {
          loggedIn: false,
          currentUser: null
        }
      });
    default:
      return defaultState;
  }
};
