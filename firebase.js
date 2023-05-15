// Import the functions you need from the SDKs you need 
import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh79eyINiIKMhNj5SIT_2v85-dOEG4Qhg",
  authDomain: "tinder-clone-d9c49.firebaseapp.com",
  projectId: "tinder-clone-d9c49",
  storageBucket: "tinder-clone-d9c49.appspot.com",
  messagingSenderId: "1016653517588",
  appId: "1:1016653517588:web:d9a81bd911624f0a1be801"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const auth = getAuth(); 
const db = getFirestore(); 

export { auth, db }; 