import store from "../store/store";
import {
  initializeGuestStore,
  loadingPlants,
  loadingPlantsError,
  loadedPlants
} from "../actions/actions";
import { PLANTS_API_HOST_ADDRESS } from "../config";

export const createGuestStore = () => {
  const guestStore = {
    plants: {
      error: null,
      isLoaded: true,
      items: [
        {
          img: "",
          name: "Monstera",
          species: "Monstera acacoyaguensis matuda",
          nickname: "",
          description: "Original monstera, currently in office",
          watering: "Weekly, when dry",
          sunlight: "Bright, indirect"
        },
        {
          img: "",
          name: "name2",
          species: "species2",
          nickname: "nickname2",
          description: "description2",
          watering: "watering2",
          sunlight: "sunlight2"
        },
        {
          img: "",
          name: "name3",
          species: "species3",
          nickname: "nickname3",
          description: "description3",
          watering: "watering3",
          sunlight: "sunlight3"
        },
        {
          img: "",
          name: "name4",
          species: "species4",
          nickname: "nickname4",
          description: "description4",
          watering: "watering4",
          sunlight: "sunlight4"
        },
        {
          img: "",
          name: "name5",
          species: "species5",
          nickname: "nickname5",
          description: "description5",
          watering: "watering5",
          sunlight: "sunlight5"
        },
        {
          img: "",
          name: "name6",
          species: "species6",
          nickname: "nickname6",
          description: "description6",
          watering: "watering6",
          sunlight: "sunlight6"
        }
      ]
    }
  };

  store.dispatch(initializeGuestStore(guestStore));
};

export const getAllPlants = async () => {
  store.dispatch(loadingPlants());
  const request = new Request(`${PLANTS_API_HOST_ADDRESS}/plants`);
  await fetch(request)
    .then(response => {
      response.json().then(data => {
        store.dispatch(loadedPlants(data));
      });
    })
    .catch(err => {
      console.log("ERROR: ", err);
      store.dispatch(loadingPlantsError("Failed to load plants data"));
    });
};
