import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey:
    "AIzaSyAZ1tPhxNayzE43Rz_8kvTxVF_Zzcgujio",

  authDomain:
    "eastern-ceiling-484315-i8.firebaseapp.com",

  projectId:
    "eastern-ceiling-484315-i8",

  storageBucket:
    "eastern-ceiling-484315-i8.appspot.com",

  messagingSenderId:
    "57874039611",

  appId:
    "1:57874039611:web:98e2d996d02091badc6d1e",
};

const app =
  initializeApp(
    firebaseConfig
  );

export const auth =
  getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();