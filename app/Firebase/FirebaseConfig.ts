import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_O6cDAVjccdTMSO8KpJZBn858YK1Clkg",
  authDomain: "effishiensea.firebaseapp.com",
  projectId: "effishiensea",
  storageBucket: "effishiensea.appspot.com",
  messagingSenderId: "737786134233",
  appId: "1:737786134233:web:5d1e9bd2dd19cf7ad7c8c8",
  measurementId: "G-QDG4RFEFQ6"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
