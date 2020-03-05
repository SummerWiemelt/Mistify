import store from "../globals/store";
import axios from "axios";
import { loadingPlants, loadingPlantsError, loadedPlants } from "../actions/actions";
import { PLANTS_API_HOST_ADDRESS } from "../config";

import firebase from "firebase";

// Manage images for users
var storageRef = null;
const getStorageRef = uid => {
  if (!storageRef) {
    storageRef = firebase.storage().ref();
  }
  return storageRef;
};
const getImageRef = async (uid, imageId) => {
  const imageRef = getStorageRef(uid).child(`/users/${uid}/${imageId}`);
  return imageRef;
};
const uploadImage = async (uid, imageId, file) => {
  const imageRef = await getImageRef(uid, imageId);
  imageRef
    .put(file)
    .then(async snapshot => {
      console.log("snapshot");
      console.log(snapshot);
      const downloadUrl = await imageRef.getDownloadURL();
      console.log(downloadUrl);
      await updatePlant({
        id: imageId,
        main_img_url: downloadUrl
      });
      return true;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
};
// Authentication
store.subscribe(storeAxiosListener); // Everytime store changes, execute listener function

// authenticate each session by idToken
const plantAppApi = axios.create({
  baseURL: PLANTS_API_HOST_ADDRESS,
  headers: {
    "Content-Type": "application/json"
  }
});

let idToken = null;
let uid = null;
function storeAxiosListener() {
  const state = store.getState();
  if (state.user.loggedIn) {
    uid = state.user.currentUser.uid;
    state.user.currentUser.getIdToken().then(function(newIdToken) {
      idToken = newIdToken;
    });
  }
}

// auth idToken before sending a response
plantAppApi.interceptors.request.use(
  req => {
    if (!req.params) {
      req.params = {};
    }
    req.params["idToken"] = idToken;
    return req;
  },
  error => {
    console.log("Error:", error);
  }
);

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

// Get all plants from api
export const getAllPlants = async () => {
  store.dispatch(loadingPlants());
  await plantAppApi
    .get("/plants")
    .then(response => {
      let plants = response.data.map(plant_data => {
        let plant = new Plant();
        let keys = Object.keys(plant_data);
        for (var i = 0; i < keys.length; i++) {
          plant[keys[i]] = plant_data[keys[i]];
          // plant.id = plant_data.id etc, for each property
        }
        return plant;
      });
      store.dispatch(loadedPlants(plants));
    })
    .catch(err => {
      console.log("ERROR: ", err);
      store.dispatch(loadingPlantsError("Failed to load plants data"));
    });
};

// Create new plant
export const createNewPlant = async (plant, newImageFile) => {
  return await plantAppApi
    .post("/plant", plant)
    .then(async response => {
      await uploadImage(uid, response.data, newImageFile, plant);
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

// Update plant
export const updatePlant = async plant => {
  console.log("plant");
  console.log(plant);
  return await plantAppApi
    .put(`/plant/${plant.id}`, plant)
    .then(async response => {
      await getAllPlants();
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

// Delete plant
export const deletePlant = async plantId => {
  return await plantAppApi
    .delete(`/plant/${plantId}`)
    .then(response => {
      getAllPlants();
    })
    .catch(err => {
      console.log("ERROR: ", err);
      store.dispatch(loadingPlantsError("Failed to delete plant"));
    });
};
