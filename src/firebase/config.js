import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBjy4c1Ydi7fEYy_Ra2dG4yKpXF3yblFLk",
    authDomain: "blockstore-1.firebaseapp.com",
    projectId: "blockstore-1",
    storageBucket: "blockstore-1.appspot.com",
    messagingSenderId: "1087293310275",
    appId: "1:1087293310275:web:9e877233289da67c265bf6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const fbStorage = firebase.storage();
const fbFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { fbStorage, fbFireStore, timestamp };
