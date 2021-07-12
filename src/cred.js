// file storing firebase database
import firebase from 'firebase';

//  firebase database configuration
var firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "videochat-a7cc9.firebaseapp.com",
  projectId: "videochat-a7cc9",
  storageBucket: "videochat-a7cc9.appspot.com",
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

var cred = firebase.initializeApp(firebaseConfig);
export default cred;