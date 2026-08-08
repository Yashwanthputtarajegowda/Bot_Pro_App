// =========================================
// ADD MESSAGE TO SCREEN
// With Seen + Delete Support
// =========================================

function addMessageToScreen(
    message
) {

    if (!chatMessages) {

        return;

    }


    // =====================================
    // Check Deleted For Current User
    // =====================================

    const deletedFor =
        message.deletedFor || {};


    if (
        deletedFor[CURRENT_USER_ID] ===
        true
    ) {

        return;

    }


    // =====================================
    // Message Row
    // =====================================

    const messageRow =
        document.createElement(
            "div"
        );


    messageRow.className =
        "message-row";


    // =====================================
    // Sent / Received
    // =====================================

    const isSent =
        message.senderId ===
        CURRENT_USER_ID;


    if (isSent) {

        messageRow.classList.add(
            "sent"
        );

    }

    else {

        messageRow.classList.add(
            "received"
        );

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
    // ✓ / 👁 Status
    // Only Sent Messages
    // =====================================

    if (isSent) {

        const messageStatus =
            document.createElement(
                "span"
            );


        messageStatus.className =
            "message-status";


        if (
            message.seen ===
            true
        ) {

            messageStatus.textContent =
                "👁";


            messageStatus.classList.add(
                "seen"
            );


            messageStatus.title =
                "Seen";

        }

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
    // Message ID
    // =====================================

    messageRow.dataset.messageId =
        message.id;


    // =====================================
    // Add To Chat
    // =====================================

    chatMessages.appendChild(
        messageRow
    );


    // =====================================
    // Delete Menu Support
    // =====================================

    setupMessageDeleteMenu(
        messageRow,
        message
    );

}
// =========================================
// DELETE MENU STYLE
// =========================================

const deleteMenuStyle =
    document.createElement(
        "style"
    );


deleteMenuStyle.textContent = `

.message-delete-menu {

    position:fixed;

    z-index:99999;

    min-width:190px;

    padding:8px;

    background:#1B1B1B;

    border:1px solid #333;

    border-radius:14px;

    box-shadow:
        0 10px 35px
        rgba(0,0,0,.55);

    display:none;

}

.message-delete-menu button {

    width:100%;

    border:none;

    background:transparent;

    color:#FFFFFF;

    padding:12px;

    text-align:left;

    border-radius:10px;

    cursor:pointer;

    font-size:14px;

}

.message-delete-menu button:hover {

    background:#292929;

}

.message-delete-menu .delete-everyone {

    color:#FF5C5C;

}

.message-delete-menu .cancel-delete {

    color:#AAAAAA;

}

`;

document.head.appendChild(
    deleteMenuStyle
);


// =========================================
// CREATE DELETE MENU
// =========================================

const deleteMenu =
    document.createElement(
        "div"
    );


deleteMenu.className =
    "message-delete-menu";


deleteMenu.innerHTML = `

    <button
        class="delete-for-me">
        Delete for me
    </button>

    <button
        class="delete-for-everyone">
        Delete for everyone
    </button>

    <button
        class="cancel-delete">
        Cancel
    </button>

`;


document.body.appendChild(
    deleteMenu
);


// =========================================
// Current Delete Message
// =========================================

let selectedDeleteMessage =
    null;


// =========================================
// Setup Delete Menu
// =========================================

function setupMessageDeleteMenu(
    messageRow,
    message
) {


    // =====================================
    // Right Click
    // =====================================

    messageRow.addEventListener(
        "contextmenu",
        (event) => {

            event.preventDefault();


            openDeleteMenu(
                event.clientX,
                event.clientY,
                message
            );

        }
    );


    // =====================================
    // Long Press
    // =====================================

    let pressTimer =
        null;


    messageRow.addEventListener(
        "touchstart",
        (event) => {

            const touch =
                event.touches[0];


            pressTimer =
                setTimeout(
                    () => {

                        openDeleteMenu(
                            touch.clientX,
                            touch.clientY,
                            message
                        );

                    },
                    600
                );

        },
        {
            passive:true
        }
    );


    messageRow.addEventListener(
        "touchend",
        () => {

            clearTimeout(
                pressTimer
            );

        }
    );


    messageRow.addEventListener(
        "touchmove",
        () => {

            clearTimeout(
                pressTimer
            );

        }
    );

}


// =========================================
// Open Delete Menu
// =========================================

function openDeleteMenu(
    x,
    y,
    message
) {

    selectedDeleteMessage =
        message;


    // =====================================
    // Delete For Everyone
    // Only Sender
    // =====================================

    const deleteEveryoneBtn =
        deleteMenu.querySelector(
            ".delete-for-everyone"
        );


    if (
        message.senderId ===
        CURRENT_USER_ID
    ) {

        deleteEveryoneBtn.style.display =
            "block";

    }

    else {

        deleteEveryoneBtn.style.display =
            "none";

    }


    // =====================================
    // Position
    // =====================================

    deleteMenu.style.display =
        "block";


    const menuWidth =
        190;


    const menuHeight =
        150;


    let left =
        x;


    let top =
        y;


    if (
        left + menuWidth >
        window.innerWidth
    ) {

        left =
            window.innerWidth -
            menuWidth -
            10;

    }


    if (
        top + menuHeight >
        window.innerHeight
    ) {

        top =
            window.innerHeight -
            menuHeight -
            10;

    }


    deleteMenu.style.left =
        Math.max(
            10,
            left
        ) + "px";


    deleteMenu.style.top =
        Math.max(
            10,
            top
        ) + "px";

}


// =========================================
// Close Delete Menu
// =========================================

function closeDeleteMenu() {

    deleteMenu.style.display =
        "none";


    selectedDeleteMessage =
        null;

}
// =========================================
// DELETE FOR ME
// =========================================

async function deleteMessageForMe() {

    if (
        !selectedDeleteMessage ||
        !currentChatId
    ) {

        closeDeleteMenu();

        return;

    }


    const message =
        selectedDeleteMessage;


    try {

        const response =
            await fetch(

                API_URL +
                "/api/messages/delete-for-me",

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

                            messageId:
                                message.id,

                            userId:
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

            throw new Error(

                result.error ||
                result.message ||
                "Delete failed"

            );

        }


        console.log(
            "🗑️ Message deleted for me"
        );


        closeDeleteMenu();


        // =================================
        // Refresh Current Messages
        // =================================

        await loadMessages();


    }

    catch (error) {

        console.error(
            "Delete For Me Error:",
            error
        );


        alert(
            "Unable to delete message."
        );


        closeDeleteMenu();

    }

}


// =========================================
// DELETE FOR EVERYONE
// =========================================

async function deleteMessageForEveryone() {

    if (
        !selectedDeleteMessage ||
        !currentChatId
    ) {

        closeDeleteMenu();

        return;

    }


    const message =
        selectedDeleteMessage;


    // =====================================
    // Sender Check
    // =====================================

    if (
        message.senderId !==
        CURRENT_USER_ID
    ) {

        alert(
            "Only your messages can be deleted for everyone."
        );


        closeDeleteMenu();

        return;

    }


    try {

        const response =
            await fetch(

                API_URL +
                "/api/messages/delete-for-everyone",

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

                            messageId:
                                message.id,

                            userId:
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

            throw new Error(

                result.error ||
                result.message ||
                "Delete failed"

            );

        }


        console.log(
            "🗑️ Message deleted for everyone"
        );


        closeDeleteMenu();


    }

    catch (error) {

        console.error(
            "Delete For Everyone Error:",
            error
        );


        alert(
            "Unable to delete message."
        );


        closeDeleteMenu();

    }

}
// =========================================
// DELETE MENU BUTTON ACTIONS
// =========================================


// =========================================
// Delete For Me Button
// =========================================

const deleteForMeButton =
    deleteMenu.querySelector(
        ".delete-for-me"
    );


if (deleteForMeButton) {

    deleteForMeButton.addEventListener(
        "click",
        async () => {

            await deleteMessageForMe();

        }
    );

}


// =========================================
// Delete For Everyone Button
// =========================================

const deleteForEveryoneButton =
    deleteMenu.querySelector(
        ".delete-for-everyone"
    );


if (deleteForEveryoneButton) {

    deleteForEveryoneButton.addEventListener(
        "click",
        async () => {

            await deleteMessageForEveryone();

        }
    );

}


// =========================================
// Cancel Button
// =========================================

const cancelDeleteButton =
    deleteMenu.querySelector(
        ".cancel-delete"
    );


if (cancelDeleteButton) {

    cancelDeleteButton.addEventListener(
        "click",
        () => {

            closeDeleteMenu();

        }
    );

}


// =========================================
// Close Menu Outside
// =========================================

document.addEventListener(
    "click",
    (event) => {

        if (
            !deleteMenu.contains(
                event.target
            )
        ) {

            closeDeleteMenu();

        }

    }
);


// =========================================
// Close Menu On Scroll
// =========================================

window.addEventListener(
    "scroll",
    () => {

        closeDeleteMenu();

    },
    true
);


// =========================================
// Close Menu On Resize
// =========================================

window.addEventListener(
    "resize",
    () => {

        closeDeleteMenu();

    }
);


// =========================================
// Escape To Close Menu
// =========================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key ===
            "Escape"
        ) {

            closeDeleteMenu();

        }

    }
);
// =========================================
// DELETE SYSTEM FINAL CLEANUP
// =========================================


// =========================================
// Refresh Messages After Delete
// =========================================

async function refreshMessagesAfterDelete() {

    if (!currentChatId) {

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
                "Refresh Messages Failed:",
                result
            );

            return;

        }


        // =====================================
        // Clear Current Messages
        // =====================================

        if (chatMessages) {

            chatMessages.innerHTML =
                "";

        }


        // =====================================
        // Render Again
        // =====================================

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
            "Refresh After Delete Error:",
            error
        );

    }

}


// =========================================
// Delete Menu Protection
// =========================================

document.addEventListener(
    "contextmenu",
    (event) => {

        const messageRow =
            event.target.closest(
                ".message-row"
            );


        if (!messageRow) {

            return;

        }


        // Prevent browser menu
        event.preventDefault();

    }
);


// =========================================
// Prevent Text Selection On Long Press
// =========================================

document.addEventListener(
    "selectstart",
    (event) => {

        const messageRow =
            event.target.closest(
                ".message-row"
            );


        if (messageRow) {

            event.preventDefault();

        }

    }
);


// =========================================
// Delete Menu On Chat Close
// =========================================

function closeChatDeleteSystem() {

    closeDeleteMenu();

}


// =========================================
// Back Button Cleanup
// =========================================

document.addEventListener(
    "click",
    (event) => {

        const backButton =
            event.target.closest(
                "#chatBackBtn"
            );


        if (!backButton) {

            return;

        }


        closeChatDeleteSystem();

    },
    true
);


// =========================================
// Page Change Cleanup
// =========================================

window.addEventListener(
    "beforeunload",
    () => {

        closeDeleteMenu();

    }
);


// =========================================
// Delete System Ready
// =========================================

console.log(
    "🗑️ Delete Message System Ready"
);

console.log(
    "👤 Delete For Me Ready"
);

console.log(
    "🌎 Delete For Everyone Ready"
);
