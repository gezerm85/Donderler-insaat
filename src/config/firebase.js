// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGH6WoC5FiKUodiFnE8GlHXw9TgvkqF88",
  authDomain: "donderler-80962.firebaseapp.com",
  projectId: "donderler-80962",
  storageBucket: "donderler-80962.firebasestorage.app",
  messagingSenderId: "884892439975",
  appId: "1:884892439975:web:abc86d18e62608812a9282",
  measurementId: "G-KKS2PE894F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };
export default app;
