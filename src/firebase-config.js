// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCTymoWr5jLLpMHq5WJHGmF8bwxtCjBuQ",
  authDomain: "resume-parse-group.firebaseapp.com",
  projectId: "resume-parse-group",
  storageBucket: "resume-parse-group.appspot.com",
  messagingSenderId: "923694999582",
  appId: "1:923694999582:web:349ba6e4b5343504ec260f",
  measurementId: "G-ZW63MRFCC5"
};

// Initialize Firebase
export const db = getFirestore(app);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
