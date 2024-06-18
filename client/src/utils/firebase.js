import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  uthDomain: "stack-blog.firebaseapp.com",
  projectId: "stack-blog",
  storageBucket: "stack-blog.appspot.com",
  messagingSenderId: "785642045413",
  appId: "1:785642045413:web:90c6dfaf39a01eb7d2790c",
  measurementId: "G-TNN35G4V4G"
};

export const app = initializeApp(firebaseConfig);
