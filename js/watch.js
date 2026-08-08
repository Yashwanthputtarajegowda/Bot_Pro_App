// ==========================================
// Bot Pro Watch Page JS
// Part 3
// Video + Share + Like + Save + Comments
// ==========================================


// ==========================================
// Backend
// ==========================================

const API_URL =
    "https://bot-pro-backend-production.up.railway.app";


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

let currentVideo = null;


// ==========================================
// Get Video ID
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


        if (
            !currentVideo
        ) {

            showVideoError(
                "Video not found."
            );

            return;

        }


        // ==================================
        // Video URL
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

        if (channelName) {

            channelName.textContent =
                currentVideo.channelName ||
                "Bot Pro";

        }


        if (channelAvatar) {

            const name =
                currentVideo.channelName ||
                "Bot Pro";

            channelAvatar.textContent =
                name
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

        if (videoViews) {

            videoViews.textContent =
                (
                    Number(
                        currentVideo.views || 0
                    )
                ) +
                " views";

        }


        // ==================================
        // Hide Loading
        // ==================================

        if (videoLoading) {

            videoLoading.classList.add(
                "hidden"
            );

        }


        // ==================================
        // Restore Local State
        // ==================================

        restoreLocalState();

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

            watchVideo.play()
                .catch(
                    () => {

                        // Browser may block
                        // autoplay with sound.

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

if (moreBtn && moreMenu) {

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
// Share
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


            // ==============================
            // Native Share
            // ==============================

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

            // ==============================
            // Clipboard Fallback
            // ==============================

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
// Copy Link
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
// Report
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
// Like - Local UI State
// ==========================================

function getLikeKey() {

    return (
        "botpro_like_" +
        videoId
    );

}


function updateLikeUI(
    liked
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


    if (span) {

        span.textContent =
            liked
                ? "Liked"
                : "Like";

    }

}


if (likeBtn) {

    likeBtn.addEventListener(
        "click",
        () => {

            const key =
                getLikeKey();


            const current =
                localStorage.getItem(
                    key
                ) === "true";


            const next =
                !current;


            localStorage.setItem(
                key,
                String(next)
            );


            updateLikeUI(
                next
            );


            showToast(
                next
                    ? "Liked"
                    : "Like removed"
            );

        }
    );

}


// ==========================================
// Save - Local UI State
// ==========================================

function getSaveKey() {

    return (
        "botpro_save_" +
        videoId
    );

}


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


if (saveBtn) {

    saveBtn.addEventListener(
        "click",
        () => {

            const key =
                getSaveKey();


            const current =
                localStorage.getItem(
                    key
                ) === "true";


            const next =
                !current;


            localStorage.setItem(
                key,
                String(next)
            );


            updateSaveUI(
                next
            );


            showToast(
                next
                    ? "Saved"
                    : "Removed from saved"
            );

        }
    );

}


// ==========================================
// Comment Storage
// ==========================================

function getCommentKey() {

    return (
        "botpro_comments_" +
        videoId
    );

}


function getLocalComments() {

    try {

        return JSON.parse(
            localStorage.getItem(
                getCommentKey()
            ) || "[]"
        );

    }

    catch (error) {

        return [];

    }

}


function saveLocalComments(
    comments
) {

    localStorage.setItem(

        getCommentKey(),

        JSON.stringify(
            comments
        )

    );

}


// ==========================================
// Render Comments
// ==========================================

function renderComments() {

    if (!commentsList) {

        return;

    }


    const comments =
        getLocalComments();


    commentsList.innerHTML =
        "";


    if (commentCount) {

        commentCount.textContent =
            comments.length;

    }


    comments.forEach(
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
                    comment.name ||
                    "Y"
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
                comment.name ||
                "You";


            const text =
                document.createElement(
                    "div"
                );


            text.className =
                "comment-text";


            text.textContent =
                comment.text;


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
// Send Comment
// ==========================================

function sendComment() {

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


    const comments =
        getLocalComments();


    comments.push({

        name:
            "You",

        text:
            text,

        createdAt:
            Date.now()

    });


    saveLocalComments(
        comments
    );


    commentInput.value =
        "";


    renderComments();


    showToast(
        "Comment added"
    );

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
// Comment Button
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
                500
            );

        }
    );

}


// ==========================================
// Restore Local State
// ==========================================

function restoreLocalState() {

    const liked =
        localStorage.getItem(
            getLikeKey()
        ) === "true";


    const saved =
        localStorage.getItem(
            getSaveKey()
        ) === "true";


    updateLikeUI(
        liked
    );


    updateSaveUI(
        saved
    );


    renderComments();

}


// ==========================================
// Page Load
// ==========================================

window.addEventListener(
    "load",
    () => {

        console.log(
            "🚀 Bot Pro Watch Page Loaded"
        );


        loadVideo();

    }
);


// ==========================================
// Console
// ==========================================

console.log(
    "✅ Bot Pro Watch JS Ready"
);
