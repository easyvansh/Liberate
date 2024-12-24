"use client";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4OnfknYENC3xb11mhpsawXM5H2Nik-QY",
  authDomain: "easyvansh-liberate.firebaseapp.com",
  projectId: "easyvansh-liberate",
  storageBucket: "easyvansh-liberate.firebasestorage.app",
  messagingSenderId: "240713609160",
  appId: "1:240713609160:web:1c7b2426c709f0b4b5dafd",
  measurementId: "G-4XK30Z2FR6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
