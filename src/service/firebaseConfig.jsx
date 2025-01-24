// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7ZWyz7UVBmBrrqrRcV_Rg_FSqGXFFClU",
  authDomain: "ai-trip-planner-625fa.firebaseapp.com",
  projectId: "ai-trip-planner-625fa",
  storageBucket: "ai-trip-planner-625fa.firebasestorage.app",
  messagingSenderId: "479535303115",
  appId: "1:479535303115:web:29ed159846a82733d3ce4e",
  measurementId: "G-CFH06N7GVF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
// const analytics = getAnalytics(app);