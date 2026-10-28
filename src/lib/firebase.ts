// Import the functions you need from the SDKs you need
console.log("Firebase project:", import.meta.env.VITE_FIREBASE_PROJECT_ID);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxeJX-rEYYVyqQtvd063L4_gf7Ox67pfc",
  authDomain: "pindropmiles-468a4.firebaseapp.com",
  projectId: "pindropmiles-468a4",
  storageBucket: "pindropmiles-468a4.firebasestorage.app",
  messagingSenderId: "511326807020",
  appId: "1:511326807020:web:64d79634836dea155b56c9",
  measurementId: "G-Z0ECF0784R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseReady = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;