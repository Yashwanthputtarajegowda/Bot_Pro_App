// =========================================
// Bot Pro Message JS
// Final Full Version
// Firebase Message System
// =========================================


// =========================================
// Backend API
// =========================================

const API_URL =
    "https://bot-pro-backend-production.up.railway.app";


// =========================================
// Current User
// =========================================

const CURRENT_USER_ID =
    "Yashu";

let currentChatId =
    "";

let currentReceiverId =
    "";


// =========================================
// Elements
// =========================================

const messagePage =
    document.getElementById(
        "messagePage"
    );

const chatScreen =
    document.getElementById(
        "chatScreen"
    );

const searchInput =
    document.getElementById(
        "messageSearch"
    );

const chatItems =
    document.querySelectorAll(
        ".chat-item"
    );

const stories =
    document.querySelectorAll(
        ".story"
    );

const chatBackBtn =
    document.getElementById(
        "chatBackBtn"
    );

const chatUserName =
    document.getElementById(
        "chatUserName"
    );

const chatUserAvatar =
    document.getElementById(
        "chatUserAvatar"
    );

const chatUserStatus =
    document.getElementById(
        "chatUserStatus"
    );

const chatMessages =
    document.getElementById(
        "chatMessages"
    );

const chatInput =
    document.getElementById(
        "chatInput"
    );

const chatSendBtn =
    document.getElementById(
        "chatSendBtn"
    );


// =========================================
// Create Chat ID
// =========================================

function createChatId(
    user1,
    user2
) {

    return [

        user1,

        user2

    ]

        .sort()

        .join("_")

        .replace(
            /\s+/g,
            "-"
        );

}


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


            chatItems.forEach(
                (chat) => {

                    const name =
                        chat.querySelector(
                            "h3"
                        )
                            ?.textContent
                            .toLowerCase() ||
                        "";


                    const message =
                        chat.querySelector(
                            "p"
                        )
                            ?.textContent
                            .toLowerCase() ||
                        "";


                    if (

                        name.includes(
                            value
                        )

                        ||

                        message.includes(
                            value
                        )

                    ) {

                        chat.style.display =
                            "flex";

                    }

                    else {

                        chat.style.display =
                            "none";

                    }

                }
            );

        }
    );

}


// =========================================
// OPEN CHAT
// Event Delegation
// =========================================

document.addEventListener(
    "click",
    function (event) {


        const chat =
            event.target.closest(
                ".chat-item"
            );


        if (!chat) {

            return;

        }


        console.log(
            "✅ Chat Item Clicked"
        );


        // =================================
        // User Name
        // =================================

        const nameElement =
            chat.querySelector(
                "h3"
            );


        const userName =
            nameElement
                ? nameElement.textContent.trim()
                : "";


        if (!userName) {

            console.error(
                "❌ User name not found"
            );

            return;

        }


        // =================================
        // Avatar
        // =================================

        const avatarElement =
            chat.querySelector(
                ".chat-avatar"
            );


        let avatar =
            "";


        if (avatarElement) {

            avatar =
                avatarElement.textContent
                    .trim()
                    .charAt(0);

        }


        if (!avatar) {

            avatar =
                userName.charAt(0);

        }


        console.log(
            "Opening chat:",
            userName
        );


        openChat(
            userName,
            avatar
        );

    },
    true
);


// =========================================
// OPEN CHAT FUNCTION
// =========================================

function openChat(
    userName,
    avatar
) {

    console.log(
        "🚀 openChat:",
        userName
    );


    // =====================================
    // Get Elements Again
    // =====================================

    const page =
        document.getElementById(
            "messagePage"
        );


    const screen =
        document.getElementById(
            "chatScreen"
        );


    const name =
        document.getElementById(
            "chatUserName"
        );


    const userAvatar =
        document.getElementById(
            "chatUserAvatar"
        );


    const status =
        document.getElementById(
            "chatUserStatus"
        );


    const messages =
        document.getElementById(
            "chatMessages"
        );


    const input =
        document.getElementById(
            "chatInput"
        );


    // =====================================
    // Check Chat Screen
    // =====================================

    if (!screen) {

        console.error(
            "❌ chatScreen NOT FOUND"
        );

        alert(
            "Chat screen not found."
        );

        return;

    }


    // =====================================
    // Hide Message Page
    // =====================================

    if (page) {

        page.style.display =
            "none";

    }


    // =====================================
    // Show Chat Screen
    // =====================================

    screen.style.display =
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
        "Firebase Chat ID:",
        currentChatId
    );


    // =====================================
    // Header
    // =====================================

    if (name) {

        name.textContent =
            userName;

    }


    if (userAvatar) {

        userAvatar.textContent =
            avatar;

    }


    if (status) {

        status.textContent =
            "Online";

    }


    // =====================================
    // Clear Input
    // =====================================

    if (input) {

        input.value =
            "";

    }


    // =====================================
    // Clear Old Messages
    // =====================================

    if (messages) {

        messages.innerHTML =
            "";

    }


    // =====================================
    // Load Messages
    // =====================================

    loadMessages();


    // =====================================
    // Focus Input
    // =====================================

    setTimeout(
        () => {

            const currentInput =
                document.getElementById(
                    "chatInput"
                );


            if (currentInput) {

                currentInput.focus();

            }

        },
        200
    );


    // =====================================
    // Scroll
    // =====================================

    scrollChatToBottom();


    console.log(
        "✅ Chat Opened Successfully"
    );

}


// =========================================
// LOAD MESSAGES
// =========================================

async function loadMessages() {

    if (

        !currentChatId

        ||

        !chatMessages

    ) {

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


        if (
            !response.ok
            ||
            !result.success
        ) {

            console.error(
                "Message Load Failed:",
                result
            );

            return;

        }


        chatMessages.innerHTML =
            "";


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
// ADD MESSAGE TO SCREEN
// =========================================

function addMessageToScreen(
    message
) {

    if (!chatMessages) {

        return;

    }


    const messageRow =
        document.createElement(
            "div"
        );


    if (

        message.senderId ===
        CURRENT_USER_ID

    ) {

        messageRow.className =
            "message-row sent";

    }

    else {

        messageRow.className =
            "message-row received";

    }


    const messageBubble =
        document.createElement(
            "div"
        );


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
// BACK TO MESSAGE LIST
// =========================================

document.addEventListener(
    "click",
    function (event) {


        const button =
            event.target.closest(
                "#chatBackBtn"
            );


        if (!button) {

            return;

        }


        const page =
            document.getElementById(
                "messagePage"
            );


        const screen =
            document.getElementById(
                "chatScreen"
            );


        if (screen) {

            screen.style.display =
                "none";

        }


        if (page) {

            page.style.display =
                "block";

        }


        currentChatId =
            "";

        currentReceiverId =
            "";


        console.log(
            "⬅️ Back to Messages"
        );

    },
    true
);


// =========================================
// SEND MESSAGE
// =========================================

async function sendMessage() {

    if (

        !chatInput

        ||

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

        !currentChatId

        ||

        !currentReceiverId

    ) {

        alert(
            "Please open a chat first."
        );

        return;

    }


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

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

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


        if (

            !response.ok

            ||

            !result.success

        ) {

            throw new Error(

                result.error

                ||

                result.message

                ||

                "Message send failed"

            );

        }


        addMessageToScreen(
            result.data
        );


        chatInput.value =
            "";


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
// SEND BUTTON
// =========================================

document.addEventListener(
    "click",
    function (event) {


        const button =
            event.target.closest(
                "#chatSendBtn"
            );


        if (!button) {

            return;

        }


        sendMessage();

    },
    true
);


// =========================================
// ENTER TO SEND
// =========================================

if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        (event) => {


            if (

                event.key ===
                "Enter"

                &&

                !event.shiftKey

            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );

}


// =========================================
// SCROLL CHAT
// =========================================

function scrollChatToBottom() {

    if (!chatMessages) {

        return;

    }


    setTimeout(
        () => {

            chatMessages.scrollTop =
                chatMessages.scrollHeight;

        },
        50
    );

}


// =========================================
// STORIES
// =========================================

stories.forEach(
    (story) => {

        story.addEventListener(
            "click",
            () => {


                const storyName =
                    story.querySelector(
                        "p"
                    )
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

    }
);


// =========================================
// CHAT PRESS EFFECT
// =========================================

chatItems.forEach(
    (chat) => {


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

    }
);


// =========================================
// BOTTOM NAVIGATION
// =========================================

const navLinks =
    document.querySelectorAll(
        ".bottom-nav a"
    );


navLinks.forEach(
    (link) => {

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

    }
);


// =========================================
// SEARCH RESET
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
// ESC KEY
// =========================================

document.addEventListener(
    "keydown",
    (event) => {


        if (
            event.key ===
            "Escape"
        ) {


            if (

                chatScreen

                &&

                chatScreen.style.display !==
                    "none"

            ) {

                const backButton =
                    document.getElementById(
                        "chatBackBtn"
                    );


                if (backButton) {

                    backButton.click();

                }

            }

            else {

                if (searchInput) {

                    searchInput.blur();

                }

            }

        }

    }
);


// =========================================
// ONLINE DOT ANIMATION
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
// CHAT FADE ANIMATION
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
// PAGE READY
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
// CONSOLE
// =========================================

console.log(
    "✅ Bot Pro Message JS Loaded"
);
