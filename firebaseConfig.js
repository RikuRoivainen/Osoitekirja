// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH7W9ZG4F8P-B_5FlXH4eVanC0bbunNPk",
  authDomain: "osoitekirja-e0058.firebaseapp.com",
  databaseURL: "https://osoitekirja-e0058-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "osoitekirja-e0058",
  storageBucket: "osoitekirja-e0058.appspot.com",
  messagingSenderId: "732442220448",
  appId: "1:732442220448:web:b8c131354b9ef59bacf6c5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);