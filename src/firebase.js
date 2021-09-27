// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD3yOpGTNsVzBQSXhlooIx14b4mANKl9M8",
  authDomain: "slack-clone-27840.firebaseapp.com",
  projectId: "slack-clone-27840",
  storageBucket: "slack-clone-27840.appspot.com",
  messagingSenderId: "90232953067",
  appId: "1:90232953067:web:cc01e4cdcd13db7507c6ae",
  measurementId: "G-9PM60ZYRLB",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
