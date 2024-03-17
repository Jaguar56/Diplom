import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsCssYOfliqkOnBpqB0-eJQnEPth_CN6E",
  authDomain: "database-1-a51f0.firebaseapp.com",
  projectId: "database-1-a51f0",
  storageBucket: "database-1-a51f0.appspot.com",
  messagingSenderId: "811082524467",
  appId: "1:811082524467:web:5d18cb6bff004c1040c046",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
