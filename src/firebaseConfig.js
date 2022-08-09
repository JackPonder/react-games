import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBWQVPIoYkddeJ1ivTQaXOf6YeAWcRykLI",
  authDomain: "connect-four-9a87e.firebaseapp.com",
  projectId: "connect-four-9a87e",
  storageBucket: "connect-four-9a87e.appspot.com",
  messagingSenderId: "318177770000",
  appId: "1:318177770000:web:7963e044d52043c015a895",
  measurementId: "G-Q38KG1G4S4"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
