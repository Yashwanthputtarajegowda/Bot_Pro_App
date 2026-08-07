// =========================================
// Bot Pro Reels JS
// Final Version - Part 1
// =========================================

// Elements

const followButton =
document.querySelector(".follow");

const followIcon =
document.querySelector(".follow-btn");

const likeButton =
document.querySelectorAll(".action-btn")[0];

const commentButton =
document.querySelectorAll(".action-btn")[1];

const shareButton =
document.querySelectorAll(".action-btn")[2];

const saveButton =
document.querySelectorAll(".action-btn")[3];

const moreButton =
document.querySelectorAll(".action-btn")[4];

// =========================================
// Follow
// =========================================

let following = false;

function toggleFollow(){

    following = !following;

    if(following){

        followButton.textContent = "Following";

        followButton.style.background =
        "#00C853";

        followIcon.textContent = "✓";

    }

    else{

        followButton.textContent = "Follow";

        followButton.style.background =
        "#8A2BE2";

        followIcon.textContent = "+";

    }

}

followButton.addEventListener(
    "click",
    toggleFollow
);

followIcon.addEventListener(
    "click",
    toggleFollow
);

// =========================================
// Like
// =========================================

let liked = false;

likeButton.addEventListener("click",()=>{

    liked = !liked;

    if(liked){

        likeButton.style.color =
        "#FF3D57";

    }

    else{

        likeButton.style.color =
        "#FFFFFF";

    }

});

// =========================================
// Page Loaded
// =========================================

window.addEventListener("load",()=>{

    console.log(
        "Bot Pro Reels Loaded"
    );

});
// =========================================
// Comment
// =========================================

commentButton.addEventListener("click",()=>{

    alert("Comments Coming Soon");

});

// =========================================
// Share
// =========================================

shareButton.addEventListener("click",()=>{

    if(navigator.share){

        navigator.share({

            title:"Bot Pro Reel",

            text:"Watch this amazing reel on Bot Pro!",

            url:window.location.href

        });

    }

    else{

        alert("Sharing is not supported on this device.");

    }

});

// =========================================
// Save
// =========================================

let saved = false;

saveButton.addEventListener("click",()=>{

    saved = !saved;

    if(saved){

        saveButton.style.color="#FFD600";

    }

    else{

        saveButton.style.color="#FFFFFF";

    }

});

// =========================================
// More
// =========================================

moreButton.addEventListener("click",()=>{

    alert("More Options Coming Soon");

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
// Bot Pro Reels JS
// Final Version - Part 3
// =========================================

// Reel Animation

const reelCard =
document.querySelector(".reel-card");

reelCard.style.opacity = "0";

window.addEventListener("load",()=>{

    setTimeout(()=>{

        reelCard.style.transition =
        "opacity .4s ease";

        reelCard.style.opacity = "1";

    },200);

});

// =========================================
// Camera Button
// =========================================

const cameraButton =
document.querySelector(".camera-btn");

cameraButton.addEventListener("click",()=>{

    alert("Camera Coming Soon");

});

// =========================================
// Tabs
// =========================================

const tabs =
document.querySelectorAll(".top-tabs button");

tabs.forEach((tab)=>{

    tab.addEventListener("click",()=>{

        tabs.forEach((item)=>{

            item.classList.remove("active");

        });

        tab.classList.add("active");

    });

});

// =========================================
// Future Features
// =========================================

// Firebase Reel Feed
// Infinite Scroll
// Auto Play
// Pause / Resume
// Double Tap Like
// Swipe Up / Down
// Report Reel
// Download Reel
// Follow Creator
// Deep Link Share

// =========================================
// Ready
// =========================================

console.log("Bot Pro Reels Ready");
