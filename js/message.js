// =========================================
// Bot Pro Message JS
// Full Version
// Real-Time + Seen + Eye Status
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

let currentChatId = "";

let currentReceiverId = "";

let messageStream = null;


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
// Message Status Style
// =========================================

const messageStatusStyle =
    document.createElement("style");

messageStatusStyle.textContent = `

.message-status {

    display:inline-flex;

    align-items:center;

    justify-content:center;

    margin-left:7px;

    font-size:13px;

    line-height:1;

    vertical-align:middle;

    user-select:none;

}

.message-status.not-seen {

    color:#BDBDBD;

    font-size:15px;

    font-weight:bold;

}

.message-status.seen {

    color:#A020F0;

    font-size:14px;

    filter:
        drop-shadow(
            0 0 3px
            rgba(160,32,240,.45)
        );

}

`;

document.head.appendChild(
    messageStatusStyle
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
        .replace(/\s+/g, "-");

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
// Open Chat
// Event Delegation
// =========================================

document.addEventListener(
    "click",
    (event) => {

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


        const nameElement =
            chat.querySelector("h3");


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


        const avatarElement =
            chat.querySelector(
                ".chat-avatar"
            );


        let avatar = "";


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


        openChat(
            userName,
            avatar
        );

    },
    true
);


// =========================================
// Open Chat
// =========================================

function openChat(
    userName,
    avatar
) {

    console.log(
        "🚀 Opening:",
        userName
    );


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
    // Stop Previous Stream
    // =====================================

    stopRealtimeMessages();


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
    // Clear Messages
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
    // Start Real-Time
    // =====================================

    startRealtimeMessages();


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


    scrollChatToBottom();

}


// =========================================
// Load Existing Messages
// =========================================

async function loadMessages() {

    if (
        !currentChatId ||
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
            !response.ok ||
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


        // =================================
        // Mark Incoming Messages Seen
        // =================================

        await markMessagesAsSeen();

    }

    catch (error) {

        console.error(
            "Message Load Error:",
            error
        );

    }

}
// =========================================
// MARK MESSAGES AS SEEN
// =========================================

async function markMessagesAsSeen() {

    if (!currentChatId) {

        return;

    }


    if (!CURRENT_USER_ID) {

        return;

    }


    try {

        const response =
            await fetch(

                API_URL +
                "/api/messages/seen/" +
                encodeURIComponent(
                    currentChatId
                ),

                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            receiverId:
                                CURRENT_USER_ID

                        })

                }

            );


        const result =
            await response.json();


        if (
            !response.ok ||
            !result.success
        ) {

            console.error(
                "❌ Mark Seen Failed:",
                result
            );

            return;

        }


        console.log(
            "👁️ Messages marked as seen:",
            result.updated
        );

    }

    catch (error) {

        console.error(
            "Mark Seen Error:",
            error
        );

    }

}


// =========================================
// REAL-TIME MESSAGE STREAM
// =========================================

function startRealtimeMessages() {

    // =====================================
    // Close Old Stream
    // =====================================

    stopRealtimeMessages();


    if (!currentChatId) {

        console.log(
            "❌ No chat selected"
        );

        return;

    }


    // =====================================
    // Stream URL
    // =====================================

    const streamUrl =
        API_URL +
        "/api/messages/stream/" +
        encodeURIComponent(
            currentChatId
        );


    console.log(
        "🟢 Starting stream:",
        streamUrl
    );


    // =====================================
    // EventSource
    // =====================================

    messageStream =
        new EventSource(
            streamUrl
        );


    // =====================================
    // Connected
    // =====================================

    messageStream.addEventListener(
        "connected",
        (event) => {

            try {

                const data =
                    JSON.parse(
                        event.data
                    );


                console.log(
                    "🟢 Real-time connected:",
                    data.chatId
                );

            }

            catch (error) {

                console.error(
                    "Stream data error:",
                    error
                );

            }

        }
    );


    // =====================================
    // Messages Updated
    // =====================================

    messageStream.addEventListener(
        "messages",
        async (event) => {

            try {

                const data =
                    JSON.parse(
                        event.data
                    );


                if (!data.success) {

                    return;

                }


                if (
                    data.chatId !==
                    currentChatId
                ) {

                    return;

                }


                // =============================
                // Render Messages
                // =============================

                renderRealtimeMessages(
                    data.messages || []
                );


                // =============================
                // Mark Incoming As Seen
                // =============================

                await markMessagesAsSeen();

            }

            catch (error) {

                console.error(
                    "Real-time error:",
                    error
                );

            }

        }
    );


    // =====================================
    // Connection Open
    // =====================================

    messageStream.onopen =
        () => {

            console.log(
                "✅ Real-time connection active"
            );

        };


    // =====================================
    // Connection Error
    // =====================================

    messageStream.onerror =
        () => {

            console.log(
                "⚠️ Real-time connection error"
            );

        };

}


// =========================================
// Render Real-Time Messages
// =========================================

function renderRealtimeMessages(
    messages
) {

    if (!chatMessages) {

        return;

    }


    chatMessages.innerHTML =
        "";


    messages.sort(
        (a, b) =>
            a.createdAt -
            b.createdAt
    );


    messages.forEach(
        (message) => {

            addMessageToScreen(
                message
            );

        }
    );


    scrollChatToBottom();

}


// =========================================
// Stop Real-Time Messages
// =========================================

function stopRealtimeMessages() {

    if (messageStream) {

        console.log(
            "🔴 Closing message stream"
        );


        messageStream.close();


        messageStream =
            null;

    }

}


// =========================================
// ADD MESSAGE TO SCREEN
// With ✓ / 👁 Status
// =========================================

function addMessageToScreen(
    message
) {

    if (!chatMessages) {

        return;

    }


    // =====================================
    // Message Row
    // =====================================

    const messageRow =
        document.createElement(
            "div"
        );


    // =====================================
    // Check Sent / Received
    // =====================================

    const isSent =
        message.senderId ===
        CURRENT_USER_ID;


    if (isSent) {

        messageRow.className =
            "message-row sent";

    }

    else {

        messageRow.className =
            "message-row received";

    }


    // =====================================
    // Message Bubble
    // =====================================

    const messageBubble =
        document.createElement(
            "div"
        );


    messageBubble.className =
        "message-bubble";


    // =====================================
    // Message Text
    // =====================================

    const messageText =
        document.createElement(
            "span"
        );


    messageText.className =
        "message-text";


    messageText.textContent =
        message.text;


    messageBubble.appendChild(
        messageText
    );


    // =====================================
    // Sent Message Status
    // =====================================

    if (isSent) {

        const messageStatus =
            document.createElement(
                "span"
            );


        messageStatus.className =
            "message-status";


        // =================================
        // Seen
        // =================================

        if (
            message.seen === true
        ) {

            messageStatus.textContent =
                "👁";


            messageStatus.classList.add(
                "seen"
            );


            messageStatus.title =
                "Seen";

        }


        // =================================
        // Not Seen
        // =================================

        else {

            messageStatus.textContent =
                "✓";


            messageStatus.classList.add(
                "not-seen"
            );


            messageStatus.title =
                "Sent";

        }


        messageBubble.appendChild(
            messageStatus
        );

    }


    // =====================================
    // Add Bubble
    // =====================================

    messageRow.appendChild(
        messageBubble
    );


    // =====================================
    // Add To Chat
    // =====================================

    chatMessages.appendChild(
        messageRow
    );

}


// =========================================
// Back To Messages
// =========================================

document.addEventListener(
    "click",
    (event) => {

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


        // =====================================
        // Stop Stream
        // =====================================

        stopRealtimeMessages();


        // =====================================
        // Hide Chat
        // =====================================

        if (screen) {

            screen.style.display =
                "none";

        }


        // =====================================
        // Show Message List
        // =====================================

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
            !response.ok ||
            !result.success
        ) {

            throw new Error(

                result.error ||
                result.message ||
                "Message send failed"

            );

        }


        // =================================
        // Clear Input
        // =================================

        chatInput.value =
            "";


        console.log(
            "✅ Message saved:",
            result.data
        );


        /*
         * Real-time stream automatically
         * updates the message screen.
         */

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
    (event) => {

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
// Scroll Chat
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
            event.key !==
            "Escape"
        ) {

            return;

        }


        if (
            chatScreen &&
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
// PAGE LOAD
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


console.log(
    "🟢 Real-Time Message System Ready"
);


console.log(
    "👁️ Seen / Read System Ready"
);


console.log(
    "✓ / 👁 Message Status Ready"
);
