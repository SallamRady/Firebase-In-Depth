// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyATKMgDw1XawG21fCK6_OdMt-aTRUygR1o",
  authDomain: "fir-basics-4f30e.firebaseapp.com",
  projectId: "fir-basics-4f30e",
  storageBucket: "fir-basics-4f30e.appspot.com",
  messagingSenderId: "883588995101",
  appId: "1:883588995101:web:a7766c741706435602cef4",
  measurementId: "G-5JMR720YRH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// initialize google auth provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const googleProvider = provider;

const analytics = getAnalytics(app);
