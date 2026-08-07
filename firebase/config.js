// ==========================================
// Bot Pro Firebase Configuration
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

// ==========================================
// Firebase Config
// ==========================================

const firebaseConfig = {

    apiKey: "AIzaSyBVdHl__mmKoyIrREd2fdOAhWXFdiVoz-A",

    authDomain: "bot-pro-67147.firebaseapp.com",

    databaseURL: "https://bot-pro-67147-default-rtdb.firebaseio.com",

    projectId: "bot-pro-67147",

    storageBucket: "bot-pro-67147.firebasestorage.app",

    messagingSenderId: "686182539853",

    appId: "1:686182539853:web:f1fed3b816f69c97aeb204"

};

// ==========================================
// Initialize Firebase
// ==========================================

const app = initializeApp(firebaseConfig);

// ==========================================
// Services
// ==========================================

export const auth = getAuth(app);

export const database = getDatabase(app);

export default app;
