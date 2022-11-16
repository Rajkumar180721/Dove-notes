// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvAP7z64OQmw9SukAm4H58W7WWxmL6xdU",
  authDomain: "dove-note.firebaseapp.com",
  projectId: "dove-note",
  storageBucket: "dove-note.appspot.com",
  messagingSenderId: "36419224184",
  appId: "1:36419224184:web:83d4206a320936a401a38d",
  measurementId: "G-5CMZKSQC34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);