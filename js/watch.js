// ==========================================
// Bot Pro Watch Page JS
// Firebase Like + Save + Comments
// ==========================================


// ==========================================
// Backend API
// ==========================================

const API_URL =
    "https://bot-pro-backend-production.up.railway.app";


// ==========================================
// Current User
// ==========================================

/*
   Temporary user ID.

   Later, when login/authentication is ready,
   this can be replaced with the real Firebase
   authenticated user ID.
*/

const USER_ID =
    localStorage.getItem(
        "botpro_user_id"
    ) ||
    "user_" +
    Math.random()
        .toString(36)
        .substring(2, 12);


localStorage.setItem(
    "botpro_user_id",
    USER_ID
);


const USER_NAME =
    localStorage.getItem(
        "botpro_user_name"
    ) ||
    "You";


// ==========================================
// Elements
// ==========================================

const backBtn =
    document.getElementById(
        "backBtn"
    );


const moreBtn =
    document.getElementById(
        "moreBtn"
    );


const moreMenu =
    document.getElementById(
        "moreMenu"
    );


const watchVideo =
    document.getElementById(
        "watchVideo"
    );


const videoLoading =
    document.getElementById(
        "videoLoading"
    );


const videoError =
    document.getElementById(
        "videoError"
    );


const videoTitle =
    document.getElementById(
        "videoTitle"
    );


const channelName =
    document.getElementById(
        "channelName"
    );


const channelAvatar =
    document.getElementById(
        "channelAvatar"
    );


const uploadTime =
    document.getElementById(
        "uploadTime"
    );


const videoUploaded =
    document.getElementById(
        "videoUploaded"
    );


const videoViews =
    document.getElementById(
        "videoViews"
    );


const likeBtn =
    document.getElementById(
        "likeBtn"
    );


const commentBtn =
    document.getElementById(
        "commentBtn"
    );


const shareBtn =
    document.getElementById(
        "shareBtn"
    );


const saveBtn =
    document.getElementById(
        "saveBtn"
    );


const commentInput =
    document.getElementById(
        "commentInput"
    );


const sendCommentBtn =
    document.getElementById(
        "sendCommentBtn"
    );


const commentsList =
    document.getElementById(
        "commentsList"
    );


const commentCount =
    document.getElementById(
        "commentCount"
    );


const commentsSection =
    document.getElementById(
        "commentsSection"
    );


const toast =
    document.getElementById(
        "toast"
    );


const copyLinkBtn =
    document.getElementById(
        "copyLinkBtn"
    );


const reportBtn =
    document.getElementById(
        "reportBtn"
    );


// ==========================================
// Current Video
// ==========================================

let currentVideo =
    null;


let currentComments =
    [];


// ==========================================
// Video ID
// ==========================================

const params =
    new URLSearchParams(
        window.location.search
    );


const videoId =
    params.get("id");


// ==========================================
// Toast
// ==========================================

function showToast(
    message
) {

    if (!toast) {

        return;

    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.botProToastTimer
    );


    window.botProToastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


// ==========================================
// Format Time
// ==========================================

function formatTime(
    timestamp
) {

    if (!timestamp) {

        return "Just now";

    }


    const difference =
        Date.now() -
        Number(timestamp);


    const seconds =
        Math.floor(
            difference / 1000
        );


    if (seconds < 60) {

        return "Just now";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    if (minutes < 60) {

        return (

            minutes +

            (
                minutes === 1
                    ? " minute ago"
                    : " minutes ago"
            )

        );

    }


    const hours =
        Math.floor(
            minutes / 60
        );


    if (hours < 24) {

        return (

            hours +

            (
                hours === 1
                    ? " hour ago"
                    : " hours ago"
            )

        );

    }


    const days =
        Math.floor(
            hours / 24
        );


    if (days < 30) {

        return (

            days +

            (
                days === 1
                    ? " day ago"
                    : " days ago"
            )

        );

    }


    return "Recently";

}


// ==========================================
// Load Video
// ==========================================

async function loadVideo() {

    if (!videoId) {

        showVideoError(
            "Video not found."
        );

        return;

    }


    try {

        if (videoLoading) {

            videoLoading.classList.remove(
                "hidden"
            );

        }


        const response =
            await fetch(

                API_URL +
                "/api/upload/posts",

                {

                    method:
                        "GET",

                    cache:
                        "no-store"

                }

            );


        const result =
            await response.json();


        if (
            !response.ok ||
            !result.success
        ) {

            throw new Error(
                "Unable to load videos"
            );

        }


        const posts =
            Array.isArray(
                result.posts
            )
                ? result.posts
                : [];


        currentVideo =
            posts.find(
                (post) =>
                    String(post.id) ===
                    String(videoId)
            );


        if (!currentVideo) {

            showVideoError(
                "Video not found."
            );

            return;

        }


        // ==================================
        // Video
        // ==================================

        if (watchVideo) {

            watchVideo.src =
                currentVideo.url;

            watchVideo.load();

        }


        // ==================================
        // Title
        // ==================================

        if (videoTitle) {

            videoTitle.textContent =
                currentVideo.caption ||
                "Uploaded Video";

        }


        // ==================================
        // Channel
        // ==================================

        const creatorName =
            currentVideo.channelName ||
            "Bot Pro";


        if (channelName) {

            channelName.textContent =
                creatorName;

        }


        if (channelAvatar) {

            channelAvatar.textContent =
                creatorName
                    .charAt(0)
                    .toUpperCase();

        }


        // ==================================
        // Upload Time
        // ==================================

        const time =
            formatTime(
                currentVideo.createdAt
            );


        if (uploadTime) {

            uploadTime.textContent =
                time;

        }


        if (videoUploaded) {

            videoUploaded.textContent =
                time;

        }


        // ==================================
        // Views
        // ==================================

        const views =
            Number(
                currentVideo.views || 0
            );


        if (videoViews) {

            videoViews.textContent =
                views +
                " views";

        }


        if (videoLoading) {

            videoLoading.classList.add(
                "hidden"
            );

        }


        // ==================================
        // Load Firebase State
        // ==================================

        await loadLikeState();

        await loadSaveState();

        await loadComments();

    }

    catch (error) {

        console.error(
            "Watch Page Error:",
            error
        );


        showVideoError(
            "Unable to load this video."
        );

    }

}


// ==========================================
// Video Error
// ==========================================

function showVideoError(
    message
) {

    if (videoLoading) {

        videoLoading.classList.add(
            "hidden"
        );

    }


    if (videoError) {

        videoError.textContent =
            message;

        videoError.classList.remove(
            "hidden"
        );

    }

}


// ==========================================
// Video Loaded
// ==========================================

if (watchVideo) {

    watchVideo.addEventListener(
        "loadeddata",
        () => {

            if (videoLoading) {

                videoLoading.classList.add(
                    "hidden"
                );

            }


            if (videoError) {

                videoError.classList.add(
                    "hidden"
                );

            }

        }
    );


    watchVideo.addEventListener(
        "error",
        () => {

            showVideoError(
                "Video could not be loaded."
            );

        }
    );

}


// ==========================================
// Auto Play
// ==========================================

if (watchVideo) {

    watchVideo.addEventListener(
        "canplay",
        () => {

            watchVideo
                .play()
                .catch(
                    () => {

                        console.log(
                            "Autoplay blocked by browser"
                        );

                    }
                );

        },
        {
            once: true
        }
    );

}


// ==========================================
// Back Button
// ==========================================

if (backBtn) {

    backBtn.addEventListener(
        "click",
        () => {

            if (
                window.history.length >
                1
            ) {

                window.history.back();

            }

            else {

                window.location.href =
                    "home.html";

            }

        }
    );

}


// ==========================================
// More Menu
// ==========================================

if (
    moreBtn &&
    moreMenu
) {

    moreBtn.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            moreMenu.classList.toggle(
                "hidden"
            );

        }
    );

}


document.addEventListener(
    "click",
    (event) => {

        if (
            moreMenu &&
            moreBtn &&
            !moreMenu.contains(
                event.target
            ) &&
            event.target !== moreBtn
        ) {

            moreMenu.classList.add(
                "hidden"
            );

        }

    }
);


// ==========================================
// SHARE
// ==========================================

if (shareBtn) {

    shareBtn.addEventListener(
        "click",
        async () => {

            if (!currentVideo) {

                return;

            }


            const shareUrl =
                window.location.href;


            const shareData = {

                title:
                    currentVideo.caption ||
                    "Bot Pro Video",

                text:
                    "Watch this video on Bot Pro",

                url:
                    shareUrl

            };


            if (
                navigator.share
            ) {

                try {

                    await navigator.share(
                        shareData
                    );


                    showToast(
                        "Shared"
                    );

                }

                catch (error) {

                    if (
                        error.name !==
                        "AbortError"
                    ) {

                        console.error(
                            "Share Error:",
                            error
                        );

                    }

                }

            }

            else {

                try {

                    await navigator.clipboard.writeText(
                        shareUrl
                    );


                    showToast(
                        "Video link copied"
                    );

                }

                catch (error) {

                    showToast(
                        "Unable to share"
                    );

                }

            }

        }
    );

}


// ==========================================
// COPY LINK
// ==========================================

if (copyLinkBtn) {

    copyLinkBtn.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    window.location.href
                );


                showToast(
                    "Video link copied"
                );


                if (moreMenu) {

                    moreMenu.classList.add(
                        "hidden"
                    );

                }

            }

            catch (error) {

                showToast(
                    "Unable to copy link"
                );

            }

        }
    );

}


// ==========================================
// REPORT
// ==========================================

if (reportBtn) {

    reportBtn.addEventListener(
        "click",
        () => {

            if (moreMenu) {

                moreMenu.classList.add(
                    "hidden"
                );

            }


            showToast(
                "Report feature coming soon"
            );

        }
    );

}


// ==========================================
// UPDATE LIKE UI
// ==========================================

function updateLikeUI(
    liked,
    likeCount
) {

    if (!likeBtn) {

        return;

    }


    likeBtn.classList.toggle(
        "active",
        liked
    );


    const span =
        likeBtn.querySelector(
            "span"
        );


    if (!span) {

        return;

    }


    if (
        Number.isFinite(
            Number(likeCount)
        )
    ) {

        span.textContent =
            liked
                ? "Liked " +
                    likeCount
                : "Like " +
                    likeCount;

    }

    else {

        span.textContent =
            liked
                ? "Liked"
                : "Like";

    }

}


// ==========================================
// LIKE VIDEO
// ==========================================

async function toggleLike() {

    if (!currentVideo) {

        return;

    }


    if (!likeBtn) {

        return;

    }


    likeBtn.disabled =
        true;


    try {

        const response =
            await fetch(

                API_URL +
                "/api/upload/like/" +
                encodeURIComponent(
                    currentVideo.id
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

                            userId:
                                USER_ID

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
                result.message ||
                "Like failed"
            );

        }


        updateLikeUI(

            result.liked === true,

            result.likeCount

        );


        showToast(

            result.liked
                ? "Liked"
                : "Like removed"

        );

    }

    catch (error) {

        console.error(
            "Like Error:",
            error
        );


        showToast(
            "Unable to update Like"
        );

    }

    finally {

        likeBtn.disabled =
            false;

    }

}


if (likeBtn) {

    likeBtn.addEventListener(
        "click",
        toggleLike
    );

}


// ==========================================
// LOAD LIKE STATE
// ==========================================

async function loadLikeState() {

    if (!currentVideo) {

        return;

    }


    try {

        const post =
            currentVideo;


        const likes =
            post.likes || {};


        const liked =
            Boolean(
                likes[USER_ID]
            );


        const likeCount =
            Object.keys(
                likes
            ).length;


        updateLikeUI(
            liked,
            likeCount
        );

    }

    catch (error) {

        console.error(
            "Load Like Error:",
            error
        );

    }

}


// ==========================================
// UPDATE SAVE UI
// ==========================================

function updateSaveUI(
    saved
) {

    if (!saveBtn) {

        return;

    }


    saveBtn.classList.toggle(
        "active",
        saved
    );


    const span =
        saveBtn.querySelector(
            "span"
        );


    if (span) {

        span.textContent =
            saved
                ? "Saved"
                : "Save";

    }

}


// ==========================================
// SAVE VIDEO
// ==========================================

async function toggleSave() {

    if (!currentVideo) {

        return;

    }


    if (!saveBtn) {

        return;

    }


    saveBtn.disabled =
        true;


    try {

        const response =
            await fetch(

                API_URL +
                "/api/upload/save/" +
                encodeURIComponent(
                    currentVideo.id
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

                            userId:
                                USER_ID

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
                result.message ||
                "Save failed"
            );

        }


        updateSaveUI(
            result.saved === true
        );


        showToast(

            result.saved
                ? "Saved"
                : "Removed from Saved"

        );

    }

    catch (error) {

        console.error(
            "Save Error:",
            error
        );


        showToast(
            "Unable to update Save"
        );

    }

    finally {

        saveBtn.disabled =
            false;

    }

}


if (saveBtn) {

    saveBtn.addEventListener(
        "click",
        toggleSave
    );

}


// ==========================================
// LOAD SAVE STATE
// ==========================================

async function loadSaveState() {

    if (!currentVideo) {

        return;

    }


    try {

        const saves =
            currentVideo.saves ||
            {};


        const saved =
            Boolean(
                saves[USER_ID]
            );


        updateSaveUI(
            saved
        );

    }

    catch (error) {

        console.error(
            "Load Save Error:",
            error
        );

    }

}


// ==========================================
// UPDATE COMMENT COUNT
// ==========================================

function updateCommentCount(
    count
) {

    if (commentCount) {

        commentCount.textContent =
            String(
                count
            );

    }

}


// ==========================================
// RENDER COMMENTS
// ==========================================

function renderComments() {

    if (!commentsList) {

        return;

    }


    commentsList.innerHTML =
        "";


    updateCommentCount(
        currentComments.length
    );


    currentComments.forEach(
        (comment) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "comment-item";


            const avatar =
                document.createElement(
                    "div"
                );


            avatar.className =
                "comment-user-avatar";


            avatar.textContent =
                (
                    comment.userName ||
                    "U"
                )
                .charAt(0)
                .toUpperCase();


            const content =
                document.createElement(
                    "div"
                );


            content.className =
                "comment-content";


            const name =
                document.createElement(
                    "div"
                );


            name.className =
                "comment-user-name";


            name.textContent =
                comment.userName ||
                "User";


            const text =
                document.createElement(
                    "div"
                );


            text.className =
                "comment-text";


            text.textContent =
                comment.text ||
                "";


            const time =
                document.createElement(
                    "div"
                );


            time.className =
                "comment-time";


            time.textContent =
                formatTime(
                    comment.createdAt
                );


            content.appendChild(
                name
            );


            content.appendChild(
                text
            );


            content.appendChild(
                time
            );


            item.appendChild(
                avatar
            );


            item.appendChild(
                content
            );


            commentsList.appendChild(
                item
            );

        }
    );

}


// ==========================================
// LOAD COMMENTS
// ==========================================

async function loadComments() {

    if (!currentVideo) {

        return;

    }


    try {

        const response =
            await fetch(

                API_URL +
                "/api/upload/comments/" +
                encodeURIComponent(
                    currentVideo.id
                ),

                {

                    method:
                        "GET",

                    cache:
                        "no-store"

                }

            );


        const result =
            await response.json();


        if (
            !response.ok ||
            !result.success
        ) {

            throw new Error(
                result.message ||
                "Unable to load comments"
            );

        }


        currentComments =
            Array.isArray(
                result.comments
            )
                ? result.comments
                : [];


        renderComments();

    }

    catch (error) {

        console.error(
            "Load Comments Error:",
            error
        );


        currentComments =
            [];


        renderComments();

    }

}


// ==========================================
// ADD COMMENT
// ==========================================

async function sendComment() {

    if (!currentVideo) {

        return;

    }


    if (!commentInput) {

        return;

    }


    const text =
        commentInput.value.trim();


    if (!text) {

        showToast(
            "Write a comment first"
        );

        return;

    }


    if (sendCommentBtn) {

        sendCommentBtn.disabled =
            true;

    }


    try {

        const response =
            await fetch(

                API_URL +
                "/api/upload/comment/" +
                encodeURIComponent(
                    currentVideo.id
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

                            userId:
                                USER_ID,

                            userName:
                                USER_NAME,

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
                result.message ||
                "Comment failed"
            );

        }


        commentInput.value =
            "";


        if (result.comment) {

            currentComments.push(
                result.comment
            );

        }


        renderComments();


        showToast(
            "Comment added"
        );

    }

    catch (error) {

        console.error(
            "Comment Error:",
            error
        );


        showToast(
            "Unable to add comment"
        );

    }

    finally {

        if (sendCommentBtn) {

            sendCommentBtn.disabled =
                false;

        }

    }

}


if (sendCommentBtn) {

    sendCommentBtn.addEventListener(
        "click",
        sendComment
    );

}


if (commentInput) {

    commentInput.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key ===
                "Enter"
            ) {

                event.preventDefault();

                sendComment();

            }

        }
    );

}


// ==========================================
// COMMENT BUTTON
// ==========================================

if (commentBtn) {

    commentBtn.addEventListener(
        "click",
        () => {

            if (
                commentsSection
            ) {

                commentsSection.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

            }


            setTimeout(
                () => {

                    if (commentInput) {

                        commentInput.focus();

                    }

                },
                450
            );

        }
    );

}


// ==========================================
// PAGE LOAD
// ==========================================

window.addEventListener(
    "load",
    () => {

        console.log(
            "🚀 Bot Pro Watch Page Loaded"
        );


        console.log(
            "👤 User ID:",
            USER_ID
        );


        loadVideo();

    }
);


// ==========================================
// CONSOLE
// ==========================================

console.log(
    "✅ Bot Pro Watch Firebase System Ready"
);
