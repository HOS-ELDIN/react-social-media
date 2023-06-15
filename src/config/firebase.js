// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCBmCunENslDjrK7NHRzgulfeazIPuGxMQ",
	authDomain: "social-media-react-8cdaa.firebaseapp.com",
	projectId: "social-media-react-8cdaa",
	storageBucket: "social-media-react-8cdaa.appspot.com",
	messagingSenderId: "676571146695",
	appId: "1:676571146695:web:8ac405c64f531d24cb51e2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
