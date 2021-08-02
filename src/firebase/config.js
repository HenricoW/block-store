import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: "blockstore-1.firebaseapp.com",
    projectId: "blockstore-1",
    storageBucket: "blockstore-1.appspot.com",
    messagingSenderId: process.env.REACT_APP_FB_MESSENGER_ID,
    appId: process.env.REACT_APP_FB_APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const fbStorage = firebase.storage();
const fbFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { fbStorage, fbFireStore, timestamp };
