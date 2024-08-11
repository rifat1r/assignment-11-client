// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvvEh38XQv7aE8TLIVf5u2mbELDhuQb-s",
  authDomain: "assignment-11-c2ece.firebaseapp.com",
  projectId: "assignment-11-c2ece",
  storageBucket: "assignment-11-c2ece.appspot.com",
  messagingSenderId: "727742607351",
  appId: "1:727742607351:web:02e6900a093c16941cc8f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
