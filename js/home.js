// =========================================
// Bot Pro Home JS
// Final Clean Version
// Uploaded Video Feed
// Watch Page Connection
// Firebase Authenticated Feed
// =========================================


// =========================================
// Firebase API Helper
// =========================================

import { apiFetch } from "../firebase/api.js";


// =========================================
// Backend API
// =========================================

const API_URL =
    "https://bot-pro-backend-production.up.railway.app";


// =========================================
// Elements
// =========================================

const uploadBtn =
    document.getElementById(
        "uploadBtn"
    );


const notificationBtn =
    document.getElementById(
        "notificationBtn"
    );


const uploadMenu =
    document.getElementById(
        "uploadMenu"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


const aiBtn =
    document.querySelector(
        ".ai-btn"
    );


const categoryButtons =
    document.querySelectorAll(
        ".category"
    );


const videoContainer =
    document.getElementById(
        "videoContainer"
    );


// =========================================
// Upload Menu
// =========================================

if (
    uploadBtn &&
    uploadMenu
) {

    uploadBtn.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            uploadMenu.classList.toggle(
                "hidden"
            );

        }
    );

}


// =========================================
// Close Upload Menu
// =========================================

document.addEventListener(
    "click",
    (event) => {

        if (
            uploadMenu &&
            !uploadMenu.contains(
                event.target
            ) &&
            event.target !== uploadBtn
        ) {

            uploadMenu.classList.add(
                "hidden"
            );

        }

    }
);


// =========================================
// Notification
// =========================================

if (notificationBtn) {

    notificationBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "notifications.html";

        }
    );

}


// =========================================
// AI Button
// =========================================

if (aiBtn) {

    aiBtn.addEventListener(
        "click",
        () => {

            alert(
                "AI Assistant Coming Soon"
            );

        }
    );

}


// =========================================
// Format Time
// =========================================

function formatPostTime(
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
                    ? " Hour Ago"
                    : " Hours Ago"
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
                    ? " Day Ago"
                    : " Days Ago"
            )

        );

    }


    return "Recently";

}


// =========================================
// Format Video Duration
// =========================================

function formatDuration(
    seconds
) {

    if (
        !seconds ||
        !Number.isFinite(
            Number(seconds)
        )
    ) {

        return "";

    }


    const totalSeconds =
        Math.floor(
            Number(seconds)
        );


    const minutes =
        Math.floor(
            totalSeconds / 60
        );


    const remainingSeconds =
        totalSeconds % 60;


    return (

        String(minutes)
            .padStart(2, "0") +

        ":" +

        String(
            remainingSeconds
        ).padStart(
            2,
            "0"
        )

    );

}


// =========================================
// Open Watch Page
// =========================================

function openWatchPage(
    post
) {

    if (
        !post ||
        !post.id
    ) {

        console.error(
            "❌ Video ID missing:",
            post
        );

        return;

    }


    const watchUrl =
        "watch.html?id=" +
        encodeURIComponent(
            String(post.id)
        );


    console.log(
        "🎬 Opening Watch Page:",
        watchUrl
    );


    window.location.href =
        watchUrl;

}


// =========================================
// Create Uploaded Video Card
// =========================================

function createVideoCard(
    post
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "video-card uploaded-video-card";


    card.dataset.postId =
        post.id || "";


    card.dataset.title =
        (
            post.caption ||
            "Uploaded Video"
        ).toLowerCase();


    // =====================================
    // Thumbnail
    // =====================================

    const thumbnail =
        document.createElement(
            "div"
        );


    thumbnail.className =
        "thumbnail";


    thumbnail.style.position =
        "relative";


    // =====================================
    // Video
    // =====================================

    const video =
        document.createElement(
            "video"
        );


    video.src =
        post.url;


    video.controls =
        true;


    video.preload =
        "metadata";


    video.playsInline =
        true;


    video.setAttribute(
        "playsinline",
        ""
    );


    video.setAttribute(
        "webkit-playsinline",
        ""
    );


    video.setAttribute(
        "controlsList",
        "nodownload"
    );


    video.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

        }
    );


    // =====================================
    // Duration
    // =====================================

    const duration =
        document.createElement(
            "span"
        );


    duration.className =
        "duration";


    duration.textContent =
        "";


    video.addEventListener(
        "loadedmetadata",
        () => {

            duration.textContent =
                formatDuration(
                    video.duration
                );

        }
    );


    thumbnail.appendChild(
        video
    );


    // =====================================
    // Watch Page Overlay
    // =====================================

    const watchOverlay =
        document.createElement(
            "button"
        );


    watchOverlay.type =
        "button";


    watchOverlay.className =
        "watch-poster-overlay";


    watchOverlay.setAttribute(
        "aria-label",
        "Open video watch page"
    );


    watchOverlay.innerHTML =
        '<span class="watch-poster-play">▶</span>';


    watchOverlay.style.position =
        "absolute";


    watchOverlay.style.inset =
        "0";


    watchOverlay.style.display =
        "flex";


    watchOverlay.style.alignItems =
        "center";


    watchOverlay.style.justifyContent =
        "center";


    watchOverlay.style.border =
        "0";


    watchOverlay.style.background =
        "transparent";


    watchOverlay.style.cursor =
        "pointer";


    watchOverlay.style.zIndex =
        "2";


    watchOverlay.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();

            openWatchPage(
                post
            );

        }
    );


    thumbnail.appendChild(
        watchOverlay
    );


    // =====================================
    // Hide Overlay After Play
    // =====================================

    video.addEventListener(
        "play",
        () => {

            watchOverlay.style.display =
                "none";

        }
    );


    video.addEventListener(
        "pause",
        () => {

            if (
                video.currentTime === 0
            ) {

                watchOverlay.style.display =
                    "flex";

            }

        }
    );


    thumbnail.appendChild(
        duration
    );


    // =====================================
    // Video Details
    // =====================================

    const details =
        document.createElement(
            "div"
        );


    details.className =
        "video-details";


    const avatar =
        document.createElement(
            "div"
        );


    avatar.className =
        "channel-avatar";


    avatar.textContent =
        "BP";


    const info =
        document.createElement(
            "div"
        );


    info.className =
        "video-info";


    const title =
        document.createElement(
            "h3"
        );


    title.textContent =
        post.caption ||
        "Uploaded Video";


    const meta =
        document.createElement(
            "p"
        );


    meta.textContent =
        "Bot Pro • " +
        formatPostTime(
            post.createdAt
        );


    info.appendChild(
        title
    );


    info.appendChild(
        meta
    );


    details.appendChild(
        avatar
    );


    details.appendChild(
        info
    );


    // =====================================
    // Details → Watch Page
    // =====================================

    details.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();

            openWatchPage(
                post
            );

        }
    );


    // =====================================
    // Title → Watch Page
    // =====================================

    title.style.cursor =
        "pointer";


    title.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();

            openWatchPage(
                post
            );

        }
    );
        // =====================================
    // Action Buttons
    // =====================================

    const actions =
        document.createElement(
            "div"
        );


    actions.className =
        "video-actions";


    actions.innerHTML = `

        <button
            type="button">

            <span>
                Like
            </span>

        </button>


        <button
            type="button">

            <span>
                Comment
            </span>

        </button>


        <button
            type="button"
            class="share-video-btn">

            <span>
                Share
            </span>

        </button>


        <button
            type="button">

            <span>
                Save
            </span>

        </button>

    `;


    // =====================================
    // Share Button
    // =====================================

    const shareButton =
        actions.querySelector(
            ".share-video-btn"
        );


    if (shareButton) {

        shareButton.addEventListener(
            "click",
            async (event) => {

                event.preventDefault();

                event.stopPropagation();


                const watchUrl =
                    new URL(
                        "watch.html",
                        window.location.href
                    );


                watchUrl.searchParams.set(
                    "id",
                    post.id
                );


                if (
                    navigator.share
                ) {

                    try {

                        await navigator.share({

                            title:
                                post.caption ||
                                "Bot Pro Video",

                            text:
                                "Watch this video on Bot Pro",

                            url:
                                watchUrl.href

                        });

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
                            watchUrl.href
                        );


                        alert(
                            "Video link copied"
                        );

                    }

                    catch (error) {

                        alert(
                            "Unable to share video"
                        );

                    }

                }

            }
        );

    }


    // =====================================
    // Build Card
    // =====================================

    card.appendChild(
        thumbnail
    );


    card.appendChild(
        details
    );


    card.appendChild(
        actions
    );


    return card;

}


// =========================================
// Load Uploaded Videos
// =========================================

async function loadUploadedVideos() {

    if (!videoContainer) {

        console.error(
            "❌ videoContainer not found"
        );

        return;

    }


    try {

        console.log(
            "📡 Loading uploaded videos..."
        );


        // =====================================
        // Authenticated API Request
        // =====================================

        const result =
            await apiFetch(
                "/api/upload/posts",
                {
                    method:
                        "GET"
                }
            );


        console.log(
            "📦 Posts API response:",
            result
        );


        if (
            !result ||
            !result.success
        ) {

            console.error(
                "❌ Posts API failed:",
                result
            );

            return;

        }


        const posts =
            Array.isArray(
                result.posts
            )
                ? result.posts
                : [];


        console.log(
            "📚 Total posts:",
            posts.length
        );


        // =====================================
        // Only Videos
        // =====================================

        const videos =
            posts.filter(
                (post) =>

                    post &&
                    post.type ===
                        "video" &&
                    post.url

            );


        console.log(
            "🎬 Videos found:",
            videos.length
        );


        // =====================================
        // Remove Old Dynamic Videos
        // =====================================

        videoContainer
            .querySelectorAll(
                ".uploaded-video-card"
            )
            .forEach(
                (card) => {

                    card.remove();

                }
            );


        // =====================================
        // Empty Feed
        // =====================================

        if (
            videos.length === 0
        ) {

            console.log(
                "ℹ️ No uploaded videos found"
            );

            return;

        }


        // =====================================
        // Add Videos
        // =====================================

        videos.forEach(
            (post, index) => {

                const card =
                    createVideoCard(
                        post
                    );


                card.style.opacity =
                    "0";


                videoContainer.appendChild(
                    card
                );


                setTimeout(
                    () => {

                        card.style.transition =
                            "opacity .35s ease";


                        card.style.opacity =
                            "1";

                    },
                    index * 100
                );

            }
        );


        setupVideoSearch();

    }

    catch (error) {

        console.error(
            "❌ Unable to load videos:",
            error
        );

    }

}


// =========================================
// Search Videos
// =========================================

function setupVideoSearch() {

    if (!searchInput) {

        return;

    }


    searchInput.oninput =
        () => {

            const value =
                searchInput.value
                    .toLowerCase()
                    .trim();


            const cards =
                document.querySelectorAll(
                    ".uploaded-video-card"
                );


            cards.forEach(
                (card) => {

                    const title =
                        card.querySelector(
                            "h3"
                        )
                            ?.textContent
                            ?.toLowerCase() ||
                        "";


                    if (
                        title.includes(
                            value
                        )
                    ) {

                        card.style.display =
                            "";

                    }

                    else {

                        card.style.display =
                            "none";

                    }

                }
            );

        };

}


// =========================================
// Search Reset
// =========================================

if (searchInput) {

    searchInput.addEventListener(
        "search",
        () => {

            document
                .querySelectorAll(
                    ".uploaded-video-card"
                )
                .forEach(
                    (card) => {

                        card.style.display =
                            "";

                    }
                );

        }
    );

}
// =========================================
// Categories
// =========================================

categoryButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                categoryButtons.forEach(
                    (item) => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );

            }
        );

    }
);


// =========================================
// Upload Menu Buttons
// =========================================

const videoUpload =
    document.getElementById(
        "videoUpload"
    );


if (videoUpload) {

    videoUpload.addEventListener(
        "click",
        () => {

            window.location.href =
                "upload.html";

        }
    );

}


const reelUpload =
    document.getElementById(
        "reelUpload"
    );


if (reelUpload) {

    reelUpload.addEventListener(
        "click",
        () => {

            window.location.href =
                "upload.html#reel";

        }
    );

}


const photoUpload =
    document.getElementById(
        "photoUpload"
    );


if (photoUpload) {

    photoUpload.addEventListener(
        "click",
        () => {

            alert(
                "Photo Upload Coming Soon"
            );

        }
    );

}


const linkUpload =
    document.getElementById(
        "linkUpload"
    );


if (linkUpload) {

    linkUpload.addEventListener(
        "click",
        () => {

            alert(
                "Import Link Coming Soon"
            );

        }
    );

}


const aiCreate =
    document.getElementById(
        "aiCreate"
    );


if (aiCreate) {

    aiCreate.addEventListener(
        "click",
        () => {

            alert(
                "AI Generator Coming Soon"
            );

        }
    );

}


// =========================================
// Bottom Navigation
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
// ESC Key
// =========================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key ===
            "Escape"
        ) {

            if (uploadMenu) {

                uploadMenu.classList.add(
                    "hidden"
                );

            }

        }

    }
);


// =========================================
// PAGE LOAD
// =========================================

window.addEventListener(
    "load",
    async () => {

        console.log(
            "🚀 Bot Pro Home Loaded"
        );


        console.log(
            "🔐 Authenticated Feed Starting..."
        );


        try {

            await loadUploadedVideos();

        }

        catch (error) {

            console.error(
                "❌ Home Feed Error:",
                error
            );

        }

    }
);


// =========================================
// Console
// =========================================

console.log(
    "✅ Bot Pro Home Ready"
);


console.log(
    "🎬 Video Feed System Ready"
);


console.log(
    "🎥 Watch Page Connection Ready"
);


console.log(
    "🔐 Firebase Authenticated Feed Ready"
);


// =========================================
// END
// =========================================
