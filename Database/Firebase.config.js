// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyJY5wtYoigGXScp1Et09Lg9U9TYITsYo",
  authDomain: "mern2403.firebaseapp.com",
  databaseURL: "https://mern2403-default-rtdb.firebaseio.com",
  projectId: "mern2403",
  storageBucket: "mern2403.firebasestorage.app",
  messagingSenderId: "367422183268",
  appId: "1:367422183268:web:8c3e7267092a17f6308c71",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
console.log("database connected")