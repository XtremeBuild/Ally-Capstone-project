// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBq5S47IowGzzjcz79M1fQCHtjPJOOxFME",

  authDomain: "agentic-collaborator.firebaseapp.com",

  projectId: "agentic-collaborator",

  storageBucket: "agentic-collaborator.appspot.com",

  messagingSenderId: "488014855455",

  appId: "1:488014855455:web:449d3ff3827269665b842a",

  measurementId: "G-KB50W6DSLX"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);


export const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const logIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const logOut = () => {
  return signOut(auth);
}