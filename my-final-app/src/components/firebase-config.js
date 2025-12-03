// src/firebase-config.js

import { initializeApp } from "firebase/app";
// *** ADD THESE TWO CRITICAL IMPORTS ***
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXyOD9O1KV3wQuqzRNKxCYWhgutqI3N0U",
  authDomain: "final-web-app-d24f9.firebaseapp.com",
  projectId: "final-web-app-d24f9",
  storageBucket: "final-web-app-d24f9.firebasestorage.app",
  messagingSenderId: "92953898928",
  appId: "1:92953898928:web:0db7ff4bcfa56b26517075"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and Export Services (Now correctly defined)
export const auth = getAuth(app);      
export const db = getFirestore(app);