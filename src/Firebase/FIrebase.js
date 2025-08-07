import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAcZmqoXhOirk6Gwm5JnH_mzu5qxyGvdNI",
  authDomain: "teste-ong.firebaseapp.com",
  projectId: "teste-ong",
  storageBucket: "teste-ong.firebasestorage.app",
  messagingSenderId: "314699499565",
  appId: "1:314699499565:web:59d86d3536a7e9ca4b50a4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };