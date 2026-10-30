// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDR8hpw6-anUBChWijskm8ZkzQipAy5mL0",
  authDomain: "devport-9480e.firebaseapp.com",
  projectId: "devport-9480e",
  storageBucket: "devport-9480e.firebasestorage.app",
  messagingSenderId: "287546270786",
  appId: "1:287546270786:web:087ff571efa779efc779db"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export default app;
