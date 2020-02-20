export const LOGIN_USER = "LOGIN_USER";

export const loginUser = currentUser => {
  return {
    type: LOGIN_USER,
    currentUser
  };
};

export const LOGOUT_USER = "LOGOUT_USER";

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};

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
