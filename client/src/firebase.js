// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "orange-estate.firebaseapp.com",
  projectId: "orange-estate",
  storageBucket: "orange-estate.appspot.com",
  messagingSenderId: "708659434053",
  appId: "1:708659434053:web:48c04d7c6dbbcfbf3c892c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);