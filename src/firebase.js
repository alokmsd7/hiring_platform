import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

 

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyB0t07nKwmPoRiDBOb1qEqA9S9smPdhcpY",
  databaseURL:"https:console.firebase.google.com/project/hirist-92003/database/hirist-92003-default-rtdb/data/~2F",
  authDomain: "hirist-92003.firebaseapp.com",
  projectId: "hirist-92003",
  storageBucket: "hirist-92003.appspot.com",
  messagingSenderId: "845334184084",
  appId: "1:845334184084:web:ff764371caaf444b7bf481",
  measurementId: "G-PXBYSTZSPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbm = getFirestore(app);

export { app, auth, dbm };
