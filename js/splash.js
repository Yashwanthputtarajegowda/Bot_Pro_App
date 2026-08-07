import { auth } from "../firebase/config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

setTimeout(() => {

    onAuthStateChanged(auth, (user) => {

        if (user) {

            window.location.href = "home.html";

        } else {

            window.location.href = "login.html";

        }

    });

}, 2500);
