// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // importa o Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCK-LwCLGxqk79SX03EEXh5H51XK5UntJk",
  authDomain: "lolink-74f4f.firebaseapp.com",
  projectId: "lolink-74f4f",
  storageBucket: "lolink-74f4f.appspot.com", // Corrigido aqui!
  messagingSenderId: "944675288596",
  appId: "1:944675288596:web:7725244d393afc394c5901"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // conexão com o Firestore

export { db };
