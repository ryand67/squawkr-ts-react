import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB14SeWAGYhZL4_OKVLwcolNoSGEYBYuY0",
    authDomain: "squawkr-ts-react.firebaseapp.com",
    projectId: "squawkr-ts-react",
    storageBucket: "squawkr-ts-react.appspot.com",
    messagingSenderId: "1034254422492",
    appId: "1:1034254422492:web:bbfcca8b1dcf4f0f45bf19"
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.EmailAuthProvider();

export { db, auth, provider };