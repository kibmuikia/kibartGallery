// contains initialization of firebase admin

import * as admin from "firebase-admin";

// kibart-gallery-firebase-adminsdk-ev95j-31bd488a52.json

const serviceAccount = require("@/serviceAccountKey/kibart-gallery-firebase-adminsdk-ev95j-31bd488a52.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kibart-gallery.firebaseio.com"
});

export default { admin };
// export default { db, storage, auth };
