// =========================================
// Bot Pro Message JS
// Final Version - Part 1
// =========================================

// Search

const searchInput =
document.getElementById("messageSearch");

// Chat List

const chatItems =
document.querySelectorAll(".chat-item");

// =========================================
// Search Messages
// =========================================

searchInput.addEventListener("keyup",()=>{

    const value =
    searchInput.value.toLowerCase();

    chatItems.forEach((chat)=>{

        const name =
        chat.querySelector("h3")
        .textContent
        .toLowerCase();

        const message =
        chat.querySelector("p")
        .textContent
        .toLowerCase();

        if(
            name.includes(value)
            ||
            message.includes(value)
        ){

            chat.style.display="flex";

        }

        else{

            chat.style.display="none";

        }

    });

});

// =========================================
// Chat Click
// =========================================

chatItems.forEach((chat)=>{

    chat.addEventListener("click",()=>{

        const userName =
        chat.querySelector("h3").textContent;

        alert(
            "Opening chat with " + userName
        );

    });

});

// =========================================
// Page Load
// =========================================

window.addEventListener("load",()=>{

    console.log(
        "Bot Pro Messages Loaded"
    );

});
// =========================================
// Story Click
// =========================================

const stories =
document.querySelectorAll(".story");

stories.forEach((story)=>{

    story.addEventListener("click",()=>{

        const storyName =
        story.querySelector("p").textContent;

        alert(
            storyName + " Story"
        );

    });

});

// =========================================
// Chat Active Effect
// =========================================

chatItems.forEach((chat)=>{

    chat.addEventListener("mousedown",()=>{

        chat.style.transform="scale(.98)";

    });

    chat.addEventListener("mouseup",()=>{

        chat.style.transform="scale(1)";

    });

    chat.addEventListener("mouseleave",()=>{

        chat.style.transform="scale(1)";

    });

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
// Search Reset
// =========================================

searchInput.addEventListener("search",()=>{

    chatItems.forEach((chat)=>{

        chat.style.display="flex";

    });

});

// =========================================
// ESC Key
// =========================================

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        searchInput.blur();

    }

});
// =========================================
// Bot Pro Message JS
// Final Version - Part 3
// =========================================

// Fade Animation

chatItems.forEach((chat,index)=>{

    chat.style.opacity="0";

    setTimeout(()=>{

        chat.style.transition="opacity .35s ease";

        chat.style.opacity="1";

    },index*80);

});

// =========================================
// Online Stories Animation
// =========================================

const onlineDots =
document.querySelectorAll(".online-dot");

setInterval(()=>{

    onlineDots.forEach((dot)=>{

        dot.style.opacity="0.4";

        setTimeout(()=>{

            dot.style.opacity="1";

        },500);

    });

},1000);

// =========================================
// Future Firebase
// =========================================

// Load Messages
// Load Story List
// Load Online Users
// Load Chat History

// =========================================
// Future Notifications
// =========================================

// Typing Status
// Read Receipts
// Push Notifications

// =========================================
// Console
// =========================================

console.log("Bot Pro Messages Ready");
