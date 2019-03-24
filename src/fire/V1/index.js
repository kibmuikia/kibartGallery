import firebase from "firebase/app";
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

const storage = firebase.storage();

export default { db, storage };
