const express = require("express");
const Firestore = require("@google-cloud/firestore");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./plant-app-firebase-sa-creds.json");
const fileUpload = require("express-fileupload");

// config firestore db
const db = new Firestore({
  projectId: "plant-app-266923",
  keyFilename: "./plant-app-firebase-sa-creds.json"
});

// define collections in db
const USER_COLLECTION = "users";
const PLANT_COLLECTION = "plants";
const DatabaseNavigator = (function() {
  this.baseUserCollection = db.collection(USER_COLLECTION);
  this.getUserCollection = async uid => {
    const userRef = await this.baseUserCollection.doc(uid);
    const item = await userRef.get();
    if (item.exists) {
      // user exists
      return userRef;
    } else {
      // If user doesn't exist, create them and return
      userRef
        .set({})
        .then(async res => {
          const newUserRef = await this.baseUserCollection.doc(uid);
          return newUserRef;
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  };
  this.getPlantsCollection = async uid => {
    const userCollection = await this.getUserCollection(uid);
    return await userCollection.collection(PLANT_COLLECTION);
  };

  return this;
})();

// Manage images for users
const StorageNavigator = (function() {
  this.storageRef = null;
  this.getStorageRef = uid => {
    if (!this.storageRef) {
      this.storageRef = admin.storage().ref();
    }
    return this.storageRef;
  };
  this.getImageRef = async (uid, imageId) => {
    const storageRef = this.getStorageRef(uid);
    const imageRef = storageRef.child(`/users/${uid}/${imageId}`);
    return imageRef;
  };
  this.uploadImage = async (uid, imageId, unitArray) => {
    const imageRef = await this.getImageRef(uid, imageId);
    imageRef
      .put(unitArray)
      .then(snapshot => {
        return true;
      })
      .catch(error => {
        return false;
      });
  };
  return this;
})();

// const serviceAccount = require("./service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// api protection
const app = express();
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }
  })
);

// Error patterns
const RESOURCE_CREATED = 201;
const MALFORMED_BODY = 400;
const NOT_FOUND_STATUS_CODE = 404;
const FORBIDDEN_STATUS_CODE = 403;
const FORBIDDEN_MESSAGE =
  "Forbidden, please append your idtoken as a query parameter.";
const NOT_FOUND_MESSAGE = "The specified document does not exist";
const APPLICATION_FAILURE = 500;
function makeErrorResponse(messageIn) {
  return {
    error: messageIn
  };
}

// Utility functions
function cleanInputBody(plant) {
  if ("id" in plant) {
    delete plant.id;
  }
  return plant;
}

// Middleware - to authenticate via idToken
function check_and_append_user(req, res, next) {
  // post, get, put, delete
  if (req && req.query && req.query.idToken) {
    // Parse id token, create user object, append to req, call next
    admin
      .auth()
      .verifyIdToken(req.query.idToken)
      // Parsed and decoded by firebase
      .then(function(decodedToken) {
        req.user = decodedToken;
        next();
      })
      .catch(function(error) {
        res.status(FORBIDDEN_STATUS_CODE);
        res.send(makeErrorResponse(error));
      });
  } else {
    res.status(FORBIDDEN_STATUS_CODE);
    res.send(makeErrorResponse(FORBIDDEN_MESSAGE));
  }
}
app.use(check_and_append_user);

// Routes
app.get("/", (req, res) => {
  res.send("This is the plant app api!");
});

// HTTP Methods

// GET

// Gets all plants
app.get("/plants", (req, res) => {
  // Get all documents in collection plants
  DatabaseNavigator.getPlantsCollection(req.user.uid)
    .then(collection => {
      collection
        .get()
        .then(snapshot => {
          plantsInCollection = [];
          // In the "get" snapshot
          // Iterate over each document in the collection
          snapshot.forEach(doc => {
            // Doc represents the document in firestore
            // But it has metadata on it, so to get the plant data
            // We have to call doc.data()
            plantDocument = {
              id: doc.id,
              ...doc.data()
            };
            plantsInCollection.push(plantDocument);
          });
          res.send(plantsInCollection);
        })
        .catch(err => {
          res.status(APPLICATION_FAILURE);
          res.send(makeErrorResponse("Failed to get all plant documents, " + err));
        });
    })
    .catch(err => {
      res.status(APPLICATION_FAILURE);
      res.send(makeErrorResponse("Failed to get all plant documents, " + err));
    });
});

// Get a plant by ID
app.get("/plant/:plantid", (req, res) => {
  const plantid = req.params.plantid;
  const plantRef = DatabaseNavigator.getPlantsCollection.doc(plantid);

  plantRef
    .get()
    .then(doc => {
      if (!doc.exists) {
        res.status(NOT_FOUND_STATUS_CODE);
        res.send(makeErrorResponse(NOT_FOUND_MESSAGE));
      } else {
        // Spread document data into new object and assign id, so returned doc contains id
        resDoc = {
          id: doc.id,
          ...doc.data() // Pull data out of returned document
        };
        res.send(resDoc);
      }
    })
    .catch(err => {
      res.status(APPLICATION_FAILURE);
      res.send(makeErrorResponse("Failed to get plant document, " + err));
    });
});

// PUT

// Update a plant by ID
app.put("/plant/:plantid", (req, res) => {
  const modifiedPlant = cleanInputBody(req.body);
  DatabaseNavigator.getPlantsCollection(req.user.uid).then(collection => {
    collection
      .doc(req.params.plantid)
      .update(modifiedPlant)
      .then(docRef => {
        res.send(docRef.id);
      })
      .catch(err => {
        res.status(APPLICATION_FAILURE);
        res.send(makeErrorResponse("Failed to update plant document, " + err));
      });
  });
});

// POST

// Create a plant
app.post("/plant", (req, res) => {
  if (req.body && Object.keys(req.body) > 0) {
    res.status(MALFORMED_BODY);
    res.send(makeErrorResponse("Body must contain plant information"));
  }
  const newPlant = cleanInputBody(req.body);
  DatabaseNavigator.getPlantsCollection(req.user.uid).then(collection => {
    collection
      .add(newPlant)
      .then(async docRef => {
        res.status(RESOURCE_CREATED);
        res.send(docRef.id);
      })
      .catch(err => {
        res.status(APPLICATION_FAILURE);
        res.send(makeErrorResponse("Failed to create plant document, " + err));
      });
  });
});

// DELETE

// Delete a plant by ID
app.delete("/plant/:plantid", (req, res) => {
  DatabaseNavigator.getPlantsCollection(req.user.uid).then(collection => {
    collection
      .doc(req.params.plantid)
      .delete(req.body)
      .then(writeResult => {
        // {writeResult} Delete doesn't return doc ref
        res.send(req.params.plantid);
      })
      .catch(err => {
        res.status(APPLICATION_FAILURE);
        res.send(makeErrorResponse("Failed to delete plant document, " + err));
      });
  });
});

const port = 3550;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
