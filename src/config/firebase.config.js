import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOnD5EgYl49QI_Xw05qjkk__vkdUhzEdc",
  authDomain: "galaxy-hotel-e2efd.firebaseapp.com",
  projectId: "galaxy-hotel-e2efd",
  storageBucket: "galaxy-hotel-e2efd.appspot.com",
  messagingSenderId: "271325571831",
  appId: "1:271325571831:web:19e216ecc52906e91181f2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
