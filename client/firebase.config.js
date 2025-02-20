// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLWL8oTcfoe3MNP2RDgY42TkHyzs0x4Xw",
  authDomain: "scic-job-task-22d20.firebaseapp.com",
  projectId: "scic-job-task-22d20",
  storageBucket: "scic-job-task-22d20.firebasestorage.app",
  messagingSenderId: "1084698859439",
  appId: "1:1084698859439:web:a119493ebb7780ab6a015a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;