import firebase from "firebase";

var firebaseConfig = {
  // config details
};
export const fire = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
