// =========================================
// Bot Pro Profile JS
// Firebase Version - Part 1
// =========================================

import { auth, database } from "../firebase/config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    ref,
    get
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

// =========================================
// Elements
// =========================================

const profileName =
document.getElementById("profileName");

const profileUsername =
document.getElementById("profileUsername");

const profileBio =
document.getElementById("profileBio");

const profileAvatar =
document.getElementById("profileAvatar");

const postCount =
document.getElementById("postCount");

const followersCount =
document.getElementById("followersCount");

const followingCount =
document.getElementById("followingCount");

const videoCount =
document.getElementById("videoCount");

const reelCount =
document.getElementById("reelCount");

const savedCount =
document.getElementById("savedCount");

const likesCount =
document.getElementById("likesCount");

const earningsCount =
document.getElementById("earningsCount");

const logoutButton =
document.querySelector(".logout-btn");

// =========================================
// Load Current User
// =========================================

onAuthStateChanged(auth, async (user)=>{

    if(!user){

        window.location.href = "login.html";

        return;

    }

    try{

        const snapshot = await get(

            ref(database,"users/" + user.uid)

        );

        if(snapshot.exists()){

            const data = snapshot.val();

            profileName.textContent =
            data.fullName || "Bot Pro User";

            profileUsername.textContent =
            "@" + (data.username || "user");

            profileBio.textContent =
            data.bio ||
            "Welcome to Bot Pro 🚀";

            profileAvatar.textContent =
            data.fullName
            ? data.fullName.charAt(0).toUpperCase()
            : "B";

        }

    }

    catch(error){

        console.error(error);

    }

});
// =========================================
// Dashboard Default Values
// =========================================

postCount.textContent = "0";

followersCount.textContent = "0";

followingCount.textContent = "0";

videoCount.textContent = "0";

reelCount.textContent = "0";

savedCount.textContent = "0";

likesCount.textContent = "0";

earningsCount.textContent = "₹0.00";

// =========================================
// Edit Profile
// =========================================

const editProfileBtn =
document.querySelector(".edit-profile");

if(editProfileBtn){

    editProfileBtn.addEventListener("click",()=>{

        alert(
            "Edit Profile Feature Coming Soon"
        );

    });

}

// =========================================
// Share Profile
// =========================================

const shareProfileBtn =
document.querySelector(".share-profile");

if(shareProfileBtn){

    shareProfileBtn.addEventListener("click",async()=>{

        if(navigator.share){

            try{

                await navigator.share({

                    title:"Bot Pro",

                    text:"Check out my Bot Pro profile!",

                    url:window.location.href

                });

            }

            catch(error){

                console.log(error);

            }

        }

        else{

            alert(
                "Sharing is not supported on this device."
            );

        }

    });

}

// =========================================
// Premium Button
// =========================================

const premiumButton =
document.querySelector(".premium-card button");

if(premiumButton){

    premiumButton.addEventListener("click",()=>{

        alert(
            "Premium Plans Coming Soon"
        );

    });

}

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

        console.log(

            "Open Video",

            index + 1

        );

    });

});
// =========================================
// Firebase Logout
// =========================================

if(logoutButton){

    logoutButton.addEventListener("click",async()=>{

        const confirmLogout = confirm(

            "Are you sure you want to log out?"

        );

        if(!confirmLogout){

            return;

        }

        try{

            await signOut(auth);

            alert(

                "Logged Out Successfully"

            );

            window.location.href = "login.html";

        }

        catch(error){

            alert(

                error.message

            );

        }

    });

}

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
// Fade Animation
// =========================================

const animatedItems =
document.querySelectorAll(

".profile-card,.premium-card,.dashboard-card,.video-card"

);

animatedItems.forEach((item,index)=>{

    item.style.opacity = "0";

    setTimeout(()=>{

        item.style.transition =

        "opacity .4s ease";

        item.style.opacity = "1";

    },index * 80);

});

// =========================================
// Future Telegram Integration
// =========================================

// Load Telegram Profile Photo
// Load User Videos
// Load User Reels
// Load Saved Posts
// Load Followers
// Load Following
// Load Earnings
// Update Profile
// Upload Avatar

// =========================================
// Ready
// =========================================

console.log(

    "Bot Pro Firebase Profile Ready"

);
