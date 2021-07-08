import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDp17xjF5hRT56Y5m3j3oiHLtz4808Kp00",
    authDomain: "videochat-a7cc9.firebaseapp.com",
    projectId: "videochat-a7cc9",
    storageBucket: "videochat-a7cc9.appspot.com",
    messagingSenderId: "981345755330",
    appId: "1:981345755330:web:f2e45a10a5538af3229b5b",
    measurementId: "G-K03EMV6T4S"
  };

var cred = firebase.initializeApp(firebaseConfig);
export default cred;