// =========================================
// Bot Pro Message JS
// Chat Screen - Part 2
// =========================================


// =========================================
// Elements
// =========================================

const messagePage =
    document.getElementById("messagePage");

const chatScreen =
    document.getElementById("chatScreen");

const searchInput =
    document.getElementById("messageSearch");

const chatItems =
    document.querySelectorAll(".chat-item");

const stories =
    document.querySelectorAll(".story");

const chatBackBtn =
    document.getElementById("chatBackBtn");

const chatUserName =
    document.getElementById("chatUserName");

const chatUserAvatar =
    document.getElementById("chatUserAvatar");

const chatUserStatus =
    document.getElementById("chatUserStatus");

const chatMessages =
    document.getElementById("chatMessages");

const chatInput =
    document.getElementById("chatInput");

const chatSendBtn =
    document.getElementById("chatSendBtn");


// =========================================
// Search Messages
// =========================================

if (searchInput) {

    searchInput.addEventListener(
        "keyup",
        () => {

            const value =
                searchInput.value
                    .toLowerCase()
                    .trim();


            chatItems.forEach((chat) => {

                const name =
                    chat.querySelector("h3")
                        .textContent
                        .toLowerCase();


                const message =
                    chat.querySelector("p")
                        .textContent
                        .toLowerCase();


                if (
                    name.includes(value) ||
                    message.includes(value)
                ) {

                    chat.style.display = "flex";

                } else {

                    chat.style.display = "none";

                }

            });

        }
    );

}


// =========================================
// Open Chat
// =========================================

chatItems.forEach((chat) => {

    chat.addEventListener(
        "click",
        () => {

            const userName =
                chat.querySelector("h3")
                    .textContent
                    .trim();


            const avatar =
                chat.querySelector(".chat-avatar")
                    .textContent
                    .trim()
                    .charAt(0);


            openChat(
                userName,
                avatar
            );

        }
    );

});


// =========================================
// Open Chat Function
// =========================================

function openChat(
    userName,
    avatar
) {

    if (!messagePage || !chatScreen) {
        return;
    }


    messagePage.style.display =
        "none";


    chatScreen.style.display =
        "flex";


    if (chatUserName) {

        chatUserName.textContent =
            userName;

    }


    if (chatUserAvatar) {

        chatUserAvatar.textContent =
            avatar;

    }


    if (chatUserStatus) {

        chatUserStatus.textContent =
            "Online";

    }


    if (chatInput) {

        chatInput.value = "";

    }


    setTimeout(() => {

        if (chatInput) {

            chatInput.focus();

        }

    }, 100);


    scrollChatToBottom();

}


// =========================================
// Back To Message List
// =========================================

if (chatBackBtn) {

    chatBackBtn.addEventListener(
        "click",
        () => {

            chatScreen.style.display =
                "none";


            messagePage.style.display =
                "block";


            if (searchInput) {

                searchInput.focus();

            }

        }
    );

}


// =========================================
// Send Message
// =========================================

if (chatSendBtn) {

    chatSendBtn.addEventListener(
        "click",
        sendMessage
    );

}


// =========================================
// Enter Key Send
// =========================================

if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );

}


// =========================================
// Send Message Function
// =========================================

function sendMessage() {

    if (!chatInput || !chatMessages) {
        return;
    }


    const text =
        chatInput.value.trim();


    if (!text) {
        return;
    }


    const messageRow =
        document.createElement("div");


    messageRow.className =
        "message-row sent";


    const messageBubble =
        document.createElement("div");


    messageBubble.className =
        "message-bubble";


    messageBubble.textContent =
        text;


    messageRow.appendChild(
        messageBubble
    );


    chatMessages.appendChild(
        messageRow
    );


    chatInput.value = "";


    scrollChatToBottom();


    // =====================================
    // Demo Reply
    // =====================================

    setTimeout(() => {

        addDemoReply();

    }, 700);

}


// =========================================
// Demo Reply
// =========================================

function addDemoReply() {

    if (!chatMessages) {
        return;
    }


    const messageRow =
        document.createElement("div");


    messageRow.className =
        "message-row received";


    const messageBubble =
        document.createElement("div");


    messageBubble.className =
        "message-bubble";


    messageBubble.textContent =
        "Message received 👍";


    messageRow.appendChild(
        messageBubble
    );


    chatMessages.appendChild(
        messageRow
    );


    scrollChatToBottom();

}


// =========================================
// Scroll Chat Bottom
// =========================================

function scrollChatToBottom() {

    if (!chatMessages) {
        return;
    }


    setTimeout(() => {

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }, 50);

}


// =========================================
// Stories
// =========================================

stories.forEach((story) => {

    story.addEventListener(
        "click",
        () => {

            const storyName =
                story.querySelector("p")
                    ?.textContent
                    ?.trim();


            if (!storyName) {
                return;
            }


            if (
                storyName ===
                "Your Story"
            ) {

                alert(
                    "Add your story"
                );

                return;

            }


            alert(
                storyName +
                " Story"
            );

        }
    );

});


// =========================================
// Chat Press Effect
// =========================================

chatItems.forEach((chat) => {

    chat.addEventListener(
        "mousedown",
        () => {

            chat.style.transform =
                "scale(.98)";

        }
    );


    chat.addEventListener(
        "mouseup",
        () => {

            chat.style.transform =
                "scale(1)";

        }
    );


    chat.addEventListener(
        "mouseleave",
        () => {

            chat.style.transform =
                "scale(1)";

        }
    );

});


// =========================================
// Bottom Navigation
// =========================================

const navLinks =
    document.querySelectorAll(
        ".bottom-nav a"
    );


navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            navLinks.forEach(
                (item) => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            link.classList.add(
                "active"
            );

        }
    );

});


// =========================================
// Search Reset
// =========================================

if (searchInput) {

    searchInput.addEventListener(
        "search",
        () => {

            chatItems.forEach(
                (chat) => {

                    chat.style.display =
                        "flex";

                }
            );

        }
    );

}


// =========================================
// ESC Key
// =========================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            if (
                chatScreen &&
                chatScreen.style.display !==
                "none"
            ) {

                chatBackBtn?.click();

            } else {

                searchInput?.blur();

            }

        }

    }
);


// =========================================
// Page Load
// =========================================

window.addEventListener(
    "load",
    () => {

        console.log(
            "🚀 Bot Pro Messages Ready"
        );

    }
);


// =========================================
// Online Dot Animation
// =========================================

const onlineDots =
    document.querySelectorAll(
        ".online-dot"
    );


setInterval(
    () => {

        onlineDots.forEach(
            (dot) => {

                dot.style.opacity =
                    "0.4";


                setTimeout(
                    () => {

                        dot.style.opacity =
                            "1";

                    },
                    500
                );

            }
        );

    },
    1000
);


// =========================================
// Chat Fade Animation
// =========================================

chatItems.forEach(
    (chat, index) => {

        chat.style.opacity =
            "0";


        setTimeout(
            () => {

                chat.style.transition =
                    "opacity .35s ease";


                chat.style.opacity =
                    "1";

            },
            index * 80
        );

    }
);


// =========================================
// Console
// =========================================

console.log(
    "✅ Bot Pro Message JS Loaded"
);
