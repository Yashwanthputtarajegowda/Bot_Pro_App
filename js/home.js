// =========================================
// Bot Pro Home JS
// Final Version - Part 1
// =========================================

// Header Buttons

const uploadBtn = document.getElementById("uploadBtn");

const notificationBtn = document.getElementById("notificationBtn");

const uploadMenu = document.getElementById("uploadMenu");

// Search

const searchInput = document.getElementById("searchInput");

// AI Button

const aiBtn = document.querySelector(".ai-btn");

// Categories

const categoryButtons =
document.querySelectorAll(".category");

// Video Cards

const videoCards =
document.querySelectorAll(".video-card");

// =========================================
// Upload Menu
// =========================================

uploadBtn.addEventListener("click",(event)=>{

    event.stopPropagation();

    uploadMenu.classList.toggle("hidden");

});

// Close Upload Menu

document.addEventListener("click",(event)=>{

    if(
        !uploadMenu.contains(event.target)
        &&
        event.target!==uploadBtn
    ){

        uploadMenu.classList.add("hidden");

    }

});

// =========================================
// Notification
// =========================================

notificationButton.addEventListener("click",()=>{

    window.location.href = "notifications.html";

});

});

// =========================================
// AI
// =========================================

aiBtn.addEventListener("click",()=>{

    alert("AI Assistant Coming Soon");

});

// =========================================
// Search
// =========================================

searchInput.addEventListener("keyup",()=>{

    const value =
    searchInput.value.toLowerCase();

    videoCards.forEach((card)=>{

        const title =
        card.querySelector("h3")
        .textContent
        .toLowerCase();

        if(title.includes(value)){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

});
// =========================================
// Categories
// =========================================

categoryButtons.forEach((button)=>{

    button.addEventListener("click",()=>{

        categoryButtons.forEach((item)=>{

            item.classList.remove("active");

        });

        button.classList.add("active");

    });

});

// =========================================
// Upload Menu Buttons
// =========================================

document
.getElementById("videoUpload")
.addEventListener("click",()=>{

    window.location.href="upload.html";

});

document
.getElementById("reelUpload")
.addEventListener("click",()=>{

    window.location.href="upload.html#reel";

});

document
.getElementById("photoUpload")
.addEventListener("click",()=>{

    alert("Photo Upload Coming Soon");

});

document
.getElementById("linkUpload")
.addEventListener("click",()=>{

    alert("Import Link Coming Soon");

});

document
.getElementById("aiCreate")
.addEventListener("click",()=>{

    alert("AI Generator Coming Soon");

});

// =========================================
// Bottom Navigation
// =========================================

const navLinks =
document.querySelectorAll(".bottom-nav a");

navLinks.forEach((link)=>{

    link.addEventListener("click",()=>{

        navLinks.forEach((item)=>{

            item.classList.remove("active");

        });

        link.classList.add("active");

    });

});

// =========================================
// ESC Key Close Upload Menu
// =========================================

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        uploadMenu.classList.add("hidden");

    }

});
// =========================================
// Bot Pro Home JS
// Final Version - Part 3
// =========================================

// Page Load

window.addEventListener("load",()=>{

    console.log("Bot Pro Home Loaded");

});

// =========================================
// Upload Menu Auto Close
// =========================================

const uploadButtons =
document.querySelectorAll("#uploadMenu button");

uploadButtons.forEach((button)=>{

    button.addEventListener("click",()=>{

        uploadMenu.classList.add("hidden");

    });

});

// =========================================
// Search Reset
// =========================================

searchInput.addEventListener("search",()=>{

    videoCards.forEach((card)=>{

        card.style.display="block";

    });

});

// =========================================
// Simple Fade Animation
// =========================================

videoCards.forEach((card,index)=>{

    card.style.opacity="0";

    setTimeout(()=>{

        card.style.transition="opacity .35s ease";

        card.style.opacity="1";

    },index*120);

});

// =========================================
// Future Firebase
// =========================================

// Load User
// Load Feed
// Load Notifications
// Load Messages

// =========================================
// Future AI
// =========================================

// AI Search
// AI Recommendations
// AI Assistant

// =========================================
// Console
// =========================================

console.log("Bot Pro Home Ready");
