// =========================================
// Bot Pro Message JS
// Real Firebase Message System
// Part 1
// =========================================

const API_URL =
    "https://bot-pro-backend-production.up.railway.app";


// =========================================
// Current User
// =========================================

const CURRENT_USER_ID = "Yashu";

let currentChatId = "";
let currentReceiverId = "";


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
                        ?.textContent
                        .toLowerCase() || "";

                const message =
                    chat.querySelector("p")
                        ?.textContent
                        .toLowerCase() || "";

                if (
                    name.includes(value) ||
                    message.includes(value)
                ) {

                    chat.style.display =
                        "flex";

                } else {

                    chat.style.display =
                        "none";

                }

            });

        }
    );

}


// =========================================
// Create Chat ID
// =========================================

function createChatId(user1, user2) {

    return [
        user1,
        user2
    ]
        .sort()
        .join("_")
        .replace(/\s+/g, "-");

}
// =========================================
// Open Chat
// Fixed Version
// =========================================

chatItems.forEach((chat) => {

    chat.addEventListener("click", () => {

        console.log("Chat clicked");

        const nameElement =
            chat.querySelector("h3");

        const avatarElement =
            chat.querySelector(".chat-avatar");

        const userName =
            nameElement
                ? nameElement.textContent.trim()
                : "User";

        const avatar =
            avatarElement
                ? avatarElement.textContent.trim().charAt(0)
                : userName.charAt(0);

        console.log(
            "Opening chat:",
            userName
        );

        openChat(
            userName,
            avatar
        );

    });

});


// =========================================
// Open Chat Function
// =========================================

function openChat(
    userName,
    avatar
) {

    console.log(
        "openChat()",
        userName
    );


    // =====================================
    // Check Chat Screen
    // =====================================

    if (!chatScreen) {

        console.error(
            "chatScreen element not found"
        );

        return;

    }


    // =====================================
    // Hide Message List
    // =====================================

    if (messagePage) {

        messagePage.style.display =
            "none";

    }


    // =====================================
    // Show Chat Screen
    // =====================================

    chatScreen.style.display =
        "flex";


    // =====================================
    // Current Chat
    // =====================================

    currentReceiverId =
        userName;

    currentChatId =
        createChatId(
            CURRENT_USER_ID,
            currentReceiverId
        );


    console.log(
        "Chat ID:",
        currentChatId
    );


    // =====================================
    // Header
    // =====================================

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


    // =====================================
    // Clear Input
    // =====================================

    if (chatInput) {

        chatInput.value = "";

    }


    // =====================================
    // Clear Old Messages
    // =====================================

    if (chatMessages) {

        chatMessages.innerHTML = "";

    }


    // =====================================
    // Load Messages
    // =====================================

    loadMessages();


    // =====================================
    // Focus Input
    // =====================================

    setTimeout(() => {

        if (chatInput) {

            chatInput.focus();

        }

    }, 150);


    // =====================================
    // Scroll
    // =====================================

    scrollChatToBottom();

}


// =========================================
// Load Messages
// =========================================

async function loadMessages() {

    if (!currentChatId || !chatMessages) {
        return;
    }


    try {

        const response =
            await fetch(
                API_URL +
                "/api/messages/" +
                encodeURIComponent(
                    currentChatId
                )
            );


        const result =
            await response.json();


        if (!result.success) {

            console.error(
                "Message Load Failed:",
                result
            );

            return;

        }


        chatMessages.innerHTML = "";


        result.messages.forEach(
            (message) => {

                addMessageToScreen(
                    message
                );

            }
        );


        scrollChatToBottom();


    }
    catch (error) {

        console.error(
            "Message Load Error:",
            error
        );

    }

}


// =========================================
// Add Message To Screen
// =========================================

function addMessageToScreen(message) {

    if (!chatMessages) {
        return;
    }


    const messageRow =
        document.createElement("div");


    if (
        message.senderId ===
        CURRENT_USER_ID
    ) {

        messageRow.className =
            "message-row sent";

    } else {

        messageRow.className =
            "message-row received";

    }


    const messageBubble =
        document.createElement("div");


    messageBubble.className =
        "message-bubble";


    messageBubble.textContent =
        message.text;


    messageRow.appendChild(
        messageBubble
    );


    chatMessages.appendChild(
        messageRow
    );

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

            currentChatId = "";

            currentReceiverId = "";

            if (searchInput) {

                searchInput.focus();

            }

        }
    );

// =========================================
// Send Button
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
// Send Message
// =========================================

async function sendMessage() {

    if (
        !chatInput ||
        !chatMessages
    ) {

        return;

    }


    const text =
        chatInput.value.trim();


    if (!text) {
        return;
    }


    if (
        !currentChatId ||
        !currentReceiverId
    ) {

        alert(
            "Please open a chat first."
        );

        return;

    }


    // Disable button

    if (chatSendBtn) {

        chatSendBtn.disabled =
            true;

    }


    try {

        const response =
            await fetch(
                API_URL +
                "/api/messages/send",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        chatId:
                            currentChatId,

                        senderId:
                            CURRENT_USER_ID,

                        receiverId:
                            currentReceiverId,

                        text:
                            text

                    })

                }
            );


        const result =
            await response.json();


        if (!response.ok || !result.success) {

            throw new Error(
                result.error ||
                result.message ||
                "Message send failed"
            );

        }


        // Add saved message to screen

        addMessageToScreen(
            result.data
        );


        // Clear input

        chatInput.value = "";


        scrollChatToBottom();


        console.log(
            "✅ Message saved to Firebase",
            result.data
        );


    }
    catch (error) {

        console.error(
            "Message Send Error:",
            error
        );


        alert(
            "Unable to send message."
        );

    }
    finally {

        if (chatSendBtn) {

            chatSendBtn.disabled =
                false;

        }

    }

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
// Page Ready
// =========================================

window.addEventListener(
    "load",
    () => {

        console.log(
            "🚀 Bot Pro Real-time Messages Ready"
        );

    }
);
