export const LOADING_PLANTS_ERROR = "LOADING_PLANTS_ERROR";

export const loadingPlantsError = errorMessage => {
  return {
    type: LOADING_PLANTS_ERROR,
    errorMessage
  };
};

export const LOADING_PLANTS = "LOADING_PLANTS";

export const loadingPlants = plants => {
  return {
    type: LOADING_PLANTS
  };
};

export const LOADED_PLANTS = "LOADED_PLANTS";

export const loadedPlants = plants => {
  return {
    type: LOADED_PLANTS,
    plants
  };
};

export const INITIALIZE_GUEST_STORE = "INITIALIZE_GUEST_STORE";

export const initializeGuestStore = newStore => {
  return {
    type: INITIALIZE_GUEST_STORE,
    newStore
  };
};
