const express = require("express");
const Firestore = require("@google-cloud/firestore");
const bodyParser = require("body-parser"); // turns request body into a json object
const Ajv = require("ajv"); // Validate body contents

const plantSchema = {
  type: "object",
  properties: {
    "name": { "type": "string" },
    "species": { "type": "string"},
    "nickname": { "type": "string"},
    "watering": { "type": "string"},
    "species": { "type": "string"},

  }
};



const db = new Firestore({
  projectId: "plant-app-266923",
  keyFilename: "./plant-app-firebase-sa-creds.json"
});
const PLANT_COLLECTION = "plants";
const plantsCollection = db.collection(PLANT_COLLECTION);

const app = express();
app.use(bodyParser());

const NOT_FOUND_STATUS_CODE = 404;
const NOT_FOUND_MESSAGE = "The specified document does not exist";
const APPLICATION_FAILURE = 500;
function makeErrorResponse(messageIn) {
  return {
    error: messageIn
  };
}

app.get("/", (req, res) => {
  res.send("This is the plant app api!");
});

// GET

// Gets all plants
app.get("/plants", (req, res) => {
  // Get all documents in collection plants
  plantsCollection
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
});

// Get a plant by ID
app.get("/plant/:plantid", (req, res) => {
  const plantid = req.params.plantid;
  const plantRef = plantsCollection.doc(plantid);
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
  const plantRef = plantsCollection.doc(req.params.plantid);
  plantRef
    .update(req.body)
    .then(doc => {
      res.send();
    })
    .catch(err => {
      res.status(APPLICATION_FAILURE);
      res.send(makeErrorResponse("Failed to update plant document, " + err));
    });
});

// POST

// Create a plant
app.post("/plant", (req, res) => {
  newPlant = req.body;
  plantsCollection
    .add(newPlant)
    .then(ref => {
      res.send();
    })
    .catch(err => {
      res.status(APPLICATION_FAILURE);
      res.send(makeErrorResponse("Failed to create plant document, " + err));
    });
});

// DELETE

// Delete a plant by ID
app.delete("/plant/:plantid", (req, res) => {
  const plantRef = plantsCollection.doc(req.params.plantid);
  plantRef
    .delete(req.body)
    .then(doc => {
      res.send();
    })
    .catch(err => {
      res.status(APPLICATION_FAILURE);
      res.send(makeErrorResponse("Failed to delete plant document, " + err));
    });
});

const port = 3550;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
