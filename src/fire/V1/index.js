// firebase configuration

import * as firebase from "firebase/app";

import "firebase/firestore";
import "firebase/storage";
// import "firebase/auth";

const { FIREBASECONFIG } = require("./config.js");

firebase.initializeApp(FIREBASECONFIG);

const db = firebase.firestore();
const storage = firebase.storage();
// const auth = firebase.auth();

// export default { db, storage, auth };
export default { db, storage };
