// =============================
// BOT PRO - HOME.JS
// =============================

// Upload Button
const uploadBtn = document.getElementById("uploadBtn");

if (uploadBtn) {
    uploadBtn.addEventListener("click", () => {

        window.location.href = "upload.html";

    });
}

// Notification Button
const notificationBtn = document.getElementById("notificationBtn");

if (notificationBtn) {

    notificationBtn.addEventListener("click", () => {

        alert("Notifications feature coming soon.");

    });

}

// AI Button

const aiBtn = document.getElementById("aiBtn");

if (aiBtn) {

    aiBtn.addEventListener("click", () => {

        alert("AI Assistant will be available soon.");

    });

}

// Category Buttons

const categoryButtons = document.querySelectorAll(".categories button");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

    });

});

// Search

const searchInput = document.querySelector(".search-box input");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        console.log("Searching:", this.value);

    });

}

// Video Cards

const videoCards = document.querySelectorAll(".video-card");

videoCards.forEach(card => {

    card.addEventListener("click", () => {

        alert("Video Player Coming Soon");

    });

});

// Bottom Navigation Highlight

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".bottom-nav a").forEach(link => {

    if (link.getAttribute("href") === currentPage) {

        link.classList.add("active");

    } else {

        link.classList.remove("active");

    }

});
