import { auth } from "./config.js";

import {
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// User already logged in?
onAuthStateChanged(auth, (user) => {

    if (user) {

        window.location.href = "home.html";

    }

});

const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

// Password show / hide
if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            togglePassword.textContent = "visibility_off";

        } else {

            passwordInput.type = "password";
            togglePassword.textContent = "visibility";

        }

    });

}

// Login
loginBtn.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {

        alert("Enter Email and Password");
        return;

    }

    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        window.location.href = "home.html";

    } catch (error) {

        alert(error.message);

    }

    loginBtn.disabled = false;
    loginBtn.textContent = "Login";

});
