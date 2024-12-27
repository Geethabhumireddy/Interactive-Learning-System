// /static/js/firebase_config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-N-cj3bcyEirrz-FCWdPnqf7rtfc5N0Q",
    authDomain: "learn-10a08.firebaseapp.com",
    databaseURL: "https://learn-10a08-default-rtdb.firebaseio.com/ ",
    projectId: "learn-10a08",
    storageBucket: "learn-10a08.appspot.com",
    messagingSenderId: "647664695039",
    appId: "1:647664695039:web:3152ca13ac6612a727beca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
