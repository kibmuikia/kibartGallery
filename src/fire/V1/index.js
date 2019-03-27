import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyB11yEc9nPCDzXH8tvBrMKdZbocRt1TLXI",
  authDomain: "kibart-gallery.firebaseapp.com",
  databaseURL: "https://kibart-gallery.firebaseio.com",
  projectId: "kibart-gallery",
  storageBucket: "kibart-gallery.appspot.com",
  messagingSenderId: "84237026232"
};

firebase.initializeApp(config);

const db = firebase.firestore();
// db.enableLogging(true);
// firebase.database.enableLogging(true);

const storage = firebase.storage();

const auth = firebase.auth();

export default { db, storage, auth };
