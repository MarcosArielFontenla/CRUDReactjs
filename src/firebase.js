import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCvYjF46fEjwvCDNyZuxB06nOWAImAe3h4",
    authDomain: "react-crud-21b49.firebaseapp.com",
    projectId: "react-crud-21b49",
    storageBucket: "react-crud-21b49.appspot.com",
    messagingSenderId: "948065747711",
    appId: "1:948065747711:web:c6bb1326c852f82d47c2ca"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();