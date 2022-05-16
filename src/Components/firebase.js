// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3swJTKdOhnc6Hj2JAyesKFk_3Hf3djiU",
    authDomain: "whats-your-motto.firebaseapp.com",
    projectId: "whats-your-motto",
    storageBucket: "whats-your-motto.appspot.com",
    messagingSenderId: "61113708476",
    appId: "1:61113708476:web:c2f74b3e70e7af2baf05b9"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase;