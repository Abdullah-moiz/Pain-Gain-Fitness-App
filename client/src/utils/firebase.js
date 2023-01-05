import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDNBNJx0zc2VDyCH4SDOVwugRdH16XqlnQ",
    authDomain: "universityproject-4954f.firebaseapp.com",
    projectId: "universityproject-4954f",
    storageBucket: "universityproject-4954f.appspot.com",
    messagingSenderId: "444228734879",
    appId: "1:444228734879:web:beb198bb49cb4c8f0f37aa",
    measurementId: "G-Z0ZZS756Q4"
};
const app = initializeApp(firebaseConfig);


export const Authentication = getAuth(app)