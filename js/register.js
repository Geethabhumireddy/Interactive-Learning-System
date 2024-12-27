// /static/js/register.js
import { auth, database } from "./firebase_config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

document.getElementById('registerForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const userId = userCredential.user.uid;

            // Save user data to Realtime Database
            database.ref('users/' + userId).set({
                username: username,
                email: email
            });

            alert('Registration successful! Redirecting to login...');
            window.location.href = '/login';
        })
        .catch((error) => {
            console.error('Error:', error.message);
            alert(error.message);
        });
});
