import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVaaYZumeqXxSlbG65-74Lhxrlmh5JE6Q",
  authDomain: "recipeapp-f357f.firebaseapp.com",
  projectId: "recipeapp-f357f",
  storageBucket: "recipeapp-f357f.appspot.com",
  messagingSenderId: "967964268565",
  appId: "1:967964268565:web:1477623bc92bf6c0e3161c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
