import firebase from "firebase/app";
import "firebase/storage";

let firebaseConfig = {
  apiKey: "AIzaSyDFP1X2LchcjS4tNiGb0HzvCWaEfG-LvRY",
  authDomain: "socialnet-154203.firebaseapp.com",
  databaseURL: "https://socialnet-154203.firebaseio.com",
  projectId: "socialnet-154203",
  storageBucket: "socialnet-154203.appspot.com",
  messagingSenderId: "184561442441",
  appId: "1:184561442441:web:35c973d0bb1ad9b2b5f058",
};
// export default firebaseConfig
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
