// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const btnAuth = document.getElementById("authbtn");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFzg2aJRfaJIM4TEUe9Dd5FTTsSXyk7G0",
  authDomain: "theworld-fa06c.firebaseapp.com",
  databaseURL: "https://theworld-fa06c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "theworld-fa06c",
  storageBucket: "theworld-fa06c.firebasestorage.app",
  messagingSenderId: "1029549453276",
  appId: "1:1029549453276:web:77145e476dc9f6fdc42919",
  measurementId: "G-ZG4DV4TCV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();



btnAuth.addEventListener("click", (e) => {
    if (btnAuth) {
        createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    }
});