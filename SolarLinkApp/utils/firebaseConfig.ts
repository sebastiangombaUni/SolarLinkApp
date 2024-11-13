// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfMCITsfqZTf4GJRcdl2w9b6EpO-RBXc0",
  authDomain: "solarlinkapp.firebaseapp.com",
  projectId: "solarlinkapp",
  storageBucket: "solarlinkapp.firebasestorage.app",
  messagingSenderId: "737431400908",
  appId: "1:737431400908:web:159ed08153a2a90386ad69"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app