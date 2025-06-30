// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn3qK2LTTb_ZoIIPMvqVxE4ID3goG4n9I",
  authDomain: "kluyuran-2bdd7.firebaseapp.com",
  projectId: "kluyuran-2bdd7",
  storageBucket: "kluyuran-2bdd7.firebasestorage.app",
  messagingSenderId: "56171507881",
  appId: "1:56171507881:web:d440ec8ea75ce00159b9b8",
  measurementId: "G-ZJHCGM78S4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);