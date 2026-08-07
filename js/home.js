// ==========================================
// Bot Pro Home JS
// Part 1
// ==========================================

const uploadBtn = document.getElementById("uploadBtn");
const uploadMenu = document.getElementById("uploadMenu");

const notificationBtn = document.getElementById("notificationBtn");

const aiBtn = document.querySelector(".ai-btn");

const categories = document.querySelectorAll(".category");

const searchInput = document.getElementById("searchInput");

// ==========================================
// Upload Menu
// ==========================================

uploadBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    uploadMenu.classList.toggle("hidden");

});

// Close Upload Menu

document.addEventListener("click", (e) => {

    if (!uploadMenu.contains(e.target) &&
        e.target !== uploadBtn) {

        uploadMenu.classList.add("hidden");

    }

});

// ==========================================
// Notification
// ==========================================

notificationBtn.addEventListener("click", () => {

    alert("Notifications feature coming soon.");

});

// ==========================================
// AI Button
// ==========================================

aiBtn.addEventListener("click", () => {

    alert("AI Assistant will be available soon.");

});

// ==========================================
// Search
// ==========================================

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const videos = document.querySelectorAll(".video-card");

    videos.forEach((video) => {

        const title = video
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if (title.includes(value)) {

            video.style.display = "block";

        } else {

            video.style.display = "none";

        }

    });

});
// ==========================================
// Bot Pro Home JS
// Part 1
// ==========================================

const uploadBtn = document.getElementById("uploadBtn");
const uploadMenu = document.getElementById("uploadMenu");

const notificationBtn = document.getElementById("notificationBtn");

const aiBtn = document.querySelector(".ai-btn");

const categories = document.querySelectorAll(".category");

const searchInput = document.getElementById("searchInput");

// ==========================================
// Upload Menu
// ==========================================

uploadBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    uploadMenu.classList.toggle("hidden");

});

// Close Upload Menu

document.addEventListener("click", (e) => {

    if (!uploadMenu.contains(e.target) &&
        e.target !== uploadBtn) {

        uploadMenu.classList.add("hidden");

    }

});

// ==========================================
// Notification
// ==========================================

notificationBtn.addEventListener("click", () => {

    alert("Notifications feature coming soon.");

});

// ==========================================
// AI Button
// ==========================================

aiBtn.addEventListener("click", () => {

    alert("AI Assistant will be available soon.");

});

// ==========================================
// Search
// ==========================================

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const videos = document.querySelectorAll(".video-card");

    videos.forEach((video) => {

        const title = video
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if (title.includes(value)) {

            video.style.display = "block";

        } else {

            video.style.display = "none";

        }

    });

});
// ==========================================
// Bot Pro Home JS
// Part 3
// ==========================================

// Page Loaded

window.addEventListener("load", () => {

    console.log("Bot Pro Home Loaded");

});

// ==========================================
// Firebase Ready
// ==========================================

// Future Firebase Video Feed
// Future Firebase User Profile
// Future Firebase Notifications
// Future Firebase Search

// ==========================================
// Upload Menu Auto Close
// ==========================================

const uploadButtons = document.querySelectorAll("#uploadMenu button");

uploadButtons.forEach((button) => {

    button.addEventListener("click", () => {

        uploadMenu.classList.add("hidden");

    });

});

// ==========================================
// ESC Key Close
// ==========================================

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        uploadMenu.classList.add("hidden");

    }

});

// ==========================================
// Search Clear
// ==========================================

searchInput.addEventListener("search", () => {

    const videos = document.querySelectorAll(".video-card");

    videos.forEach((video) => {

        video.style.display = "block";

    });

});

// ==========================================
// Temporary Loading Effect
// ==========================================

const cards = document.querySelectorAll(".video-card");

cards.forEach((card, index) => {

    card.style.opacity = "0";

    setTimeout(() => {

        card.style.transition = "0.4s ease";

        card.style.opacity = "1";

    }, index * 150);

});

// ==========================================
// Console
// ==========================================

console.log("Bot Pro Home Ready");
