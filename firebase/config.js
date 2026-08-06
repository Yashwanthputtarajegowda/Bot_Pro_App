// Firebase SDK

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";


// =========================
// PASTE YOUR FIREBASE CONFIG BELOW
// =========================

const firebaseConfig = {

  apiKey: "AIzaSyBVdHl__mmKoyIrREd2fdOAhWXFdiVoz-A",

  authDomain: "bot-pro-67147.firebaseapp.com",

  databaseURL: "https://bot-pro-67147-default-rtdb.firebaseio.com",

  projectId: "bot-pro-67147",

  storageBucket: "bot-pro-67147.firebasestorage.app",

  messagingSenderId: "686182539853",

  appId: "1:686182539853:web:482d0c323e702161aeb204"

};


// =========================

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const database = getDatabase(app);
