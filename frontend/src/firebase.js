// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "for-testing-a33dd.firebaseapp.com",
  projectId: "for-testing-a33dd",
  storageBucket: "for-testing-a33dd.appspot.com",
  messagingSenderId: "151872008279",
  appId: "1:151872008279:web:b7bcbcb9d6d348b02b7312"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);