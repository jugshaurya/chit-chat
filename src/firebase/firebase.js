// This import loads the firebase namespace.
import firebase from "firebase/app";
// These imports load individual services into the firebase namespace.
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGjV_koO5EQ_Vabs7n88s3BQz8ou07n-E",
  authDomain: "chit-chat-d0eca.firebaseapp.com",
  databaseURL: "https://chit-chat-d0eca.firebaseio.com",
  projectId: "chit-chat-d0eca",
  storageBucket: "chit-chat-d0eca.appspot.com",
  messagingSenderId: "1060365130957",
  appId: "1:1060365130957:web:d6fcdf1a26c5dc8a655d84",
  measurementId: "G-B9511W0YCM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
export default firebase;
