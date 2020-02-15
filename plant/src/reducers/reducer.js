import {
  LOADED_PLANTS,
  INITIALIZE_GUEST_STORE,
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
    case INITIALIZE_GUEST_STORE:
      return action.newStore;
    default:
      return defaultState;
  }
};

// plants(null, null); // return defaultState
// plants(defaultState, { type: "ADD_PLANT", plant: {} }); // return { plants: [{}] }
// plants({ plants: [{}] }, { type: "ADD_FILTER", filter: "byIdblah" }); return { plants: [{}], filter: "byIdBlah" }
// plants({ plants: [{}] }, { type: "INIT_GUEST_STORE", newStore: { chocolate } }); return { chocolate }
