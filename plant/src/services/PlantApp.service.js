import store from "../store/store";
import { loadingPlants, loadingPlantsError, loadedPlants } from "../actions/actions";
import { PLANTS_API_HOST_ADDRESS } from "../config";

// Object Property Constants
class Plant {
  setId(newId) {
    this.id = newId;
  }
  setName(newName) {
    this.name = newName;
  }
  setSpecies(newSpecies) {
    this.species = newSpecies;
  }
  setLocation(newLocation) {
    this.location = newLocation;
  }
  setDescription(newDescription) {
    this.description = newDescription;
  }
  setWateringPreference(newWateringPreference) {
    this.waterPreference = newWateringPreference;
  }
  setSunPreference(newSunPreference) {
    this.sunPreference = newSunPreference;
  }
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

export const createNewPlant = async () => {};
