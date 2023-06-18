// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX2hUbK_rKHUjlzwzo5zsHHqJmztYq3r4",
  authDomain: "warped-c5266.firebaseapp.com",
  projectId: "warped-c5266",
  storageBucket: "warped-c5266.appspot.com",
  messagingSenderId: "959745865167",
  appId: "1:959745865167:web:a90ba8d6dfb25b2a098eba",
  measurementId: "G-TESN1LQ8C7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);