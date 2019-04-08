const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// import fireAdmin from "./fireAdmin/V1";
// const admin = require('firebase-admin');
// const admin = fireAdmin.admin;

// import * as admin from "firebase-admin";
const admin = require("firebase-admin");

// kibart-gallery-firebase-adminsdk-ev95j-31bd488a52.json

const serviceAccount = require("./serviceAccountKey/kibart-gallery-firebase-adminsdk-ev95j-31bd488a52.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kibart-gallery.firebaseio.com"
});

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  return admin
    .database()
    .ref("/messages")
    .push({ original: original })
    .then(snapshot => {
      // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
      return res.redirect(303, snapshot.ref.toString());
    });
});
