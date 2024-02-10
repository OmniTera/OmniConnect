import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCMI0rIE2io4g4_oa0qiNWroCgFRjw-CBw",
  authDomain: "vendor-abc16.firebaseapp.com",
  projectId: "vendor-abc16",
  storageBucket: "vendor-abc16.appspot.com",
  messagingSenderId: "533051117861",
  appId: "1:533051117861:web:d85674f4784c86e253cacc",
  measurementId: "G-B9J2ZWN5F8"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);