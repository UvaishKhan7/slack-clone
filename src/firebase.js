import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB_3zxci6lZqZQgMWhTAAs1S22SF_Ltnac",
    authDomain: "slack-clone-b7c0b.firebaseapp.com",
    databaseURL: "https://slack-clone-b7c0b-default-rtdb.firebaseio.com",
    projectId: "slack-clone-b7c0b",
    storageBucket: "slack-clone-b7c0b.appspot.com",
    messagingSenderId: "1094064018516",
    appId: "1:1094064018516:web:4d4901d093f507121c49c1"
};


//initialize firebase app
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

//initialize services
const db = getFirestore(app);

export { auth, provider, signOut };
export default db;
