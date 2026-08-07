import { auth } from "./config.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Elements
const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

// Password Show / Hide
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
if (loginBtn) {

    loginBtn.addEventListener("click", async () => {

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {

            alert("Please enter Email and Password.");
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

            alert("Login Successful");

            window.location.href = "home.html";

        } catch (error) {

            alert(error.message);

        } finally {

            loginBtn.disabled = false;
            loginBtn.textContent = "Login";

        }

    });

}

// Enter Key Support
document.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        if (loginBtn) {

            loginBtn.click();

        }

    }

});
