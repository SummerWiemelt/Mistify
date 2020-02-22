import store from "../globals/store";
import history from "../globals/history";
import { loadingPlants, loadingPlantsError, loadedPlants } from "../actions/actions";
import { PLANTS_API_HOST_ADDRESS } from "../config";

// Object Property Constants
export function Plant() {
  this.id = ""; //plant id
  this.name = "";
  this.species = "";
  this.location = "";
  this.description = "";
  this.wateringPreference = "";
  this.sunPreference = "";
  this.main_img_url = "";
  this.uid = "";

  // Local closure to prevent serialization
  let imageBase64String = "";
  this.setBase64String = base64String => {
    imageBase64String = base64String;
  };
  this.getBase64String = () => {
    return imageBase64String;
  };
}

export const getAllPlants = async () => {
  store.dispatch(loadingPlants());
  const request = new Request(`${PLANTS_API_HOST_ADDRESS}/plants`);
  await fetch(request)
    .then(response => {
      response.json().then(plants_array => {
        let plants = plants_array.map(plant_data => {
          let plant = new Plant();
          let keys = Object.keys(plant_data);
          for (var i = 0; i < keys.length; i++) {
            plant[keys[i]] = plant_data[keys[i]];
            // plant.id = plant_data.id etc, for each property
          }
          return plant;
        });
        store.dispatch(loadedPlants(plants));
      });
    })
    .catch(err => {
      console.log("ERROR: ", err);
      store.dispatch(loadingPlantsError("Failed to load plants data"));
    });
};

export const createNewPlant = async plant => {
  const request = new Request(`${PLANTS_API_HOST_ADDRESS}/plant`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(plant)
  });

  return await fetch(request)
    .then(response => {
      return {
        success: true
      };
    })
    .catch(err => {
      console.log("ERROR: ", err);
      return {
        success: false,
        errorMessage: "Failed to create new plant"
      };
    });
};

export const deletePlant = async plantId => {
  const request = new Request(`${PLANTS_API_HOST_ADDRESS}/plant/${plantId}`, {
    method: "DELETE"
  });

  return await fetch(request)
    .then(response => {
      getAllPlants();
    })
    .catch(err => {
      console.log("ERROR: ", err);
      store.dispatch(loadingPlantsError("Failed to delete plant"));
    });
};
