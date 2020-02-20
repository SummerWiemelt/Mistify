import {
  LOADED_PLANTS,
  LOADING_PLANTS,
  LOADING_PLANTS_ERROR
} from "../actions/actions";

const defaultState = {
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
      
    default:
      return defaultState; 
  } 
};


