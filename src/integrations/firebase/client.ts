import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_2y3bQTIGqZ4H6UXewigrOhkRwgTCEwE",
  authDomain: "commarilia-4b2fe.firebaseapp.com",
  projectId: "commarilia-4b2fe",
  storageBucket: "commarilia-4b2fe.firebasestorage.app",
  messagingSenderId: "830914787082",
  appId: "1:830914787082:web:cfdc83f14c10c11c2a6cf3",
  measurementId: "G-H5G9MR0CR4",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
