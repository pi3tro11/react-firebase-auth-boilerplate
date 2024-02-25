import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgQ4LfnDfC5zN2VMApVlvjpdv4TqXPRdw",
  authDomain: "esame-e479b.firebaseapp.com",
  projectId: "esame-e479b",
  storageBucket: "esame-e479b.appspot.com",
  messagingSenderId: "451122003709",
  appId: "1:451122003709:web:0f519ff7071551fe00c894",
  measurementId: "G-4LC2T39F29"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };

