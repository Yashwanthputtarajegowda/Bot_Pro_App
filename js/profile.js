// =========================================
// Bot Pro Profile JS
// Final Version - Part 1
// =========================================

// Elements

const editProfileBtn =
document.querySelector(".edit-profile");

const shareProfileBtn =
document.querySelector(".share-profile");

const managePlanBtn =
document.querySelector(".premium-card button");

const dashboardCards =
document.querySelectorAll(".dashboard-card");

// =========================================
// Edit Profile
// =========================================

editProfileBtn.addEventListener("click",()=>{

    alert(
        "Edit Profile Coming Soon"
    );

});

// =========================================
// Share Profile
// =========================================

shareProfileBtn.addEventListener("click",()=>{

    if(navigator.share){

        navigator.share({

            title:"Bot Pro Profile",

            text:"Check out my Bot Pro profile!",

            url:window.location.href

        });

    }

    else{

        alert(
            "Sharing is not supported on this device."
        );

    }

});

// =========================================
// Premium
// =========================================

managePlanBtn.addEventListener("click",()=>{

    alert(
        "Premium Plans Coming Soon"
    );

});

// =========================================
// Dashboard Cards
// =========================================

dashboardCards.forEach((card)=>{

    card.addEventListener("click",()=>{

        const title =
        card.querySelector("h4").textContent;

        alert(
            title + " Page Coming Soon"
        );

    });

});

// =========================================
// Page Loaded
// =========================================

window.addEventListener("load",()=>{

    console.log(
        "Bot Pro Profile Loaded"
    );

});
// =========================================
// Content Tabs
// =========================================

const tabs =
document.querySelectorAll(".content-tabs button");

tabs.forEach((tab)=>{

    tab.addEventListener("click",()=>{

        tabs.forEach((item)=>{

            item.classList.remove("active");

        });

        tab.classList.add("active");

    });

});

// =========================================
// Video Cards
// =========================================

const videoCards =
document.querySelectorAll(".video-card");

videoCards.forEach((card,index)=>{

    card.addEventListener("click",()=>{

        alert(
            "Opening Video " + (index + 1)
        );

    });

});

// =========================================
// Settings
// =========================================

const settingsButtons =
document.querySelectorAll(".settings-card button");

settingsButtons.forEach((button)=>{

    button.addEventListener("click",()=>{

        const title =
        button.textContent.trim();

        if(title !== "Log Out"){

            alert(
                title + " Coming Soon"
            );

        }

    });

});

// =========================================
// Logout
// =========================================

const logoutButton =
document.querySelector(".logout-btn");

logoutButton.addEventListener("click",()=>{

    const confirmLogout =
    confirm(
        "Are you sure you want to log out?"
    );

    if(confirmLogout){

        alert(
            "Logged Out Successfully"
        );

    }

});
// =========================================
// Bot Pro Profile JS
// Final Version - Part 3
// =========================================

// Bottom Navigation

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
// Fade Animation
// =========================================

const animatedItems =
document.querySelectorAll(

    ".profile-card, .premium-card, .dashboard-card, .video-card"

);

animatedItems.forEach((item,index)=>{

    item.style.opacity="0";

    setTimeout(()=>{

        item.style.transition="opacity .4s ease";

        item.style.opacity="1";

    },index*80);

});

// =========================================
// Future Firebase Features
// =========================================

// Load User Profile
// Load Followers
// Load Following
// Load User Videos
// Load User Reels
// Load Saved Items
// Load Earnings
// Update Profile
// Upload Profile Photo

// =========================================
// Future Features
// =========================================

// Creator Verification
// Referral System
// Wallet
// Analytics
// Monetization
// Deep Link Share

// =========================================
// Ready
// =========================================

console.log("Bot Pro Profile Ready");
