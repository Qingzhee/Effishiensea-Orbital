import { initializeApp } from "firebase/app";
//Please let us know if the app doesn't work because of this import
//We imported this to remove a warning but now there's a red line but the app works fine for me?
//Lmk if we missed something and your app authentication is messed up
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP); 