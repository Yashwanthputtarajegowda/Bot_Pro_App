// =========================================
// Bot Pro Notifications JS
// Final Version - Part 1
// =========================================

// Elements

const filterTabs =
document.querySelectorAll(".filter-tabs button");

const followButtons =
document.querySelectorAll(".follow-back");

const settingsButton =
document.querySelector(".settings-btn");

// =========================================
// Filter Tabs
// =========================================

filterTabs.forEach((tab)=>{

    tab.addEventListener("click",()=>{

        filterTabs.forEach((item)=>{

            item.classList.remove("active");

        });

        tab.classList.add("active");

        console.log(

            "Selected :",

            tab.textContent

        );

    });

});

// =========================================
// Follow Back
// =========================================

followButtons.forEach((button)=>{

    button.addEventListener("click",()=>{

        button.textContent = "Following";

        button.style.background = "#00C853";

    });

});

// =========================================
// Settings
// =========================================

settingsButton.addEventListener("click",()=>{

    alert(

        "Notification Settings Coming Soon"

    );

});

// =========================================
// Page Ready
// =========================================

window.addEventListener("load",()=>{

    console.log(

        "Bot Pro Notifications Loaded"

    );

});
// =========================================
// Notification Cards
// =========================================

const notificationCards =
document.querySelectorAll(".notification-card");

notificationCards.forEach((card,index)=>{

    card.addEventListener("click",()=>{

        card.style.borderColor = "#8A2BE2";

        card.style.background = "#202020";

        console.log(

            "Notification Opened :",

            index + 1

        );

    });

});

// =========================================
// View Buttons
// =========================================

const viewButtons =
document.querySelectorAll(".view-btn");

viewButtons.forEach((button)=>{

    button.addEventListener("click",(event)=>{

        event.stopPropagation();

        alert(

            "Opening Notification Details"

        );

    });

});

// =========================================
// Notification Thumbnails
// =========================================

const thumbnails =
document.querySelectorAll(".notification-thumb");

thumbnails.forEach((thumb)=>{

    thumb.addEventListener("click",(event)=>{

        event.stopPropagation();

        alert(

            "Opening Related Content"

        );

    });

});

// =========================================
// Read / Unread
// =========================================

notificationCards.forEach((card)=>{

    card.addEventListener("click",()=>{

        card.classList.add("read");

    });

});

// =========================================
// Counter
// =========================================

console.log(

    "Notifications :",

    notificationCards.length

);
// =========================================
// Bot Pro Notifications JS
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

notificationCards.forEach((card,index)=>{

    card.style.opacity = "0";

    setTimeout(()=>{

        card.style.transition =
        "opacity .4s ease";

        card.style.opacity = "1";

    },index * 80);

});

// =========================================
// Future Firebase Integration
// =========================================

// Real-Time Notifications
// Push Notifications
// Like Notifications
// Comment Notifications
// Follow Notifications
// Mention Notifications
// Share Notifications
// Video Notifications
// Reel Notifications
// Notification Settings Sync

// =========================================
// Ready
// =========================================

console.log(

    "Bot Pro Notifications Ready"

);
