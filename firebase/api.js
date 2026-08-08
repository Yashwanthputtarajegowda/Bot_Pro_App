// ==========================================
// Bot Pro - Backend API Helper
// Firebase ID Token → Railway Backend
// ==========================================

import { auth } from "./config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Railway backend URL
const API_BASE_URL =  "https://bot-pro-backend-production.up.railway.app";

// ------------------------------------------
// Get current Firebase ID token
// ------------------------------------------
export async function getAuthToken() {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("User is not logged in.");
    }

    return await user.getIdToken();
}


// ------------------------------------------
// Authenticated API request
// ------------------------------------------
export async function apiFetch(endpoint, options = {}) {

    const token = await getAuthToken();

    const headers = {
        ...(options.headers || {}),
        "Authorization": `Bearer ${token}`
    };

    // JSON body ಇದ್ದರೆ content type
    if (
        options.body &&
        !(options.body instanceof FormData)
    ) {
        headers["Content-Type"] =
            headers["Content-Type"] || "application/json";
    }

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );

    let data;

    try {
        data = await response.json();
    } catch {
        data = {
            success: false,
            error: "Invalid server response."
        };
    }

    if (!response.ok) {
        throw new Error(
            data.error ||
            data.message ||
            `Request failed (${response.status})`
        );
    }

    return data;
}


// ------------------------------------------
// Check login state
// ------------------------------------------
export function waitForAuth() {

    return new Promise((resolve) => {

        const unsubscribe =
            onAuthStateChanged(auth, (user) => {

                unsubscribe();

                resolve(user);

            });

    });

}
