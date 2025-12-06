import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAkM0dfgWwBS-NHU8WtXrYIlhQlTUF3kec",
    authDomain: "eslabones-fa740.firebaseapp.com",
    projectId: "eslabones-fa740",
    storageBucket: "eslabones-fa740.firebasestorage.app",
    messagingSenderId: "531227320746",
    appId: "1:531227320746:web:d380fb675b17dc93514bd3",
    measurementId: "G-ZC40K55WL3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth and Firestore
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export { analytics };
