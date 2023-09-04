
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
//------------------------------------------------------------------------
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQiBXaz9ltqQMb_aHWKzWqXWYUpqEuvyU",
  authDomain: "react-social-media-f8028.firebaseapp.com",
  projectId: "react-social-media-f8028",
  storageBucket: "react-social-media-f8028.appspot.com",
  messagingSenderId: "819283928386",
  appId: "1:819283928386:web:34bf01cf0f48a7c99ad4db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//------------------------------------------------------------------------
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);