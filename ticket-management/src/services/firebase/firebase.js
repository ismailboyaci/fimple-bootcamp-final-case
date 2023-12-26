import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7XHbAeRxrdCHrYbn3En5d5G8OAxmmW_4",
  authDomain: "ticket-management-65448.firebaseapp.com",
  databaseURL: "https://ticket-management-65448-default-rtdb.firebaseio.com",
  projectId: "ticket-management-65448",
  storageBucket: "ticket-management-65448.appspot.com",
  messagingSenderId: "566094003071",
  appId: "1:566094003071:web:1c38e79a26e6acb74db84a",
  measurementId: "G-DKQMD35BTQ"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
