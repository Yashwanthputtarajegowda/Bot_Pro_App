// =========================================
// Bot Pro Home JS
// Final Version
// Existing Design + Uploaded Video Feed
// Watch Page Connection
// =========================================


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
    // Thumbnail / Video Area
    // =====================================

    const thumbnail =
        document.createElement(
            "div"
        );


    thumbnail.className =
        "thumbnail";


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


    // =====================================
    // Video Click
    // =====================================

    video.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            /*
                Do not open Watch Page when
                user is using the video controls.
            */

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


    thumbnail.appendChild(
        duration
    );


    // =====================================
    // OPEN WATCH PAGE WHEN THUMBNAIL
    // AREA IS CLICKED
    // =====================================

    thumbnail.addEventListener(
        "click",
        (event) => {

            /*
                If actual video element was
                clicked, browser video controls
                should remain usable.
            */

            if (
                event.target ===
                video
            ) {

                return;

            }


            openWatchPage(
                post
            );

        }
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


    // =====================================
    // Avatar
    // =====================================

    const avatar =
        document.createElement(
            "div"
        );


    avatar.className =
        "channel-avatar";


    avatar.textContent =
        "BP";


    // =====================================
    // Info
    // =====================================

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

            <svg
                class="action-icon"
                viewBox="0 0 24 24">

                <path
                    d="M7 10V21H3V10H7ZM22 11C22 9.9 21.1 9 20 9H14.3L15.2 4.7V4.4C15.2 4 15 3.6 14.7 3.3L13.6 2L7.6 8C7.2 8.4 7 8.9 7 9.4V19C7 20.1 7.9 21 9 21H18C18.8 21 19.5 20.5 19.8 19.8L22 12.5V11Z"
                    fill="currentColor"/>

            </svg>

            <span>
                Like
            </span>

        </button>


        <button
            type="button">

            <svg
                class="action-icon"
                viewBox="0 0 24 24">

                <path
                    d="M4 4H20V16H6L4 18V4Z"
                    fill="currentColor"/>

            </svg>

            <span>
                Comment
            </span>

        </button>


        <button
            type="button"
            class="share-video-btn">

            <svg
                class="action-icon"
                viewBox="0 0 24 24">

                <path
                    d="M4 12L20 4L16 20L11 13L4 12Z"
                    fill="currentColor"/>

            </svg>

            <span>
                Share
            </span>

        </button>


        <button
            type="button">

            <svg
                class="action-icon"
                viewBox="0 0 24 24">

                <path
                    d="M6 3H18V21L12 17L6 21V3Z"
                    fill="currentColor"/>

            </svg>

            <span>
                Save
            </span>

        </button>

    `;


    // =====================================
    // Share
    // =====================================

    const shareButton =
        actions.querySelector(
            ".share-video-btn"
        );


    if (shareButton) {

        shareButton.addEventListener(
            "click",
            async (event) => {

                event.stopPropagation();


                /*
                    IMPORTANT:
                    Share the WATCH PAGE URL,
                    not the Cloudinary direct URL.
                */

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

                            console.log(
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
    // Open Watch Page From Details
    // =====================================

    details.addEventListener(
        "click",
        () => {

            openWatchPage(
                post
            );

        }
    );


    // =====================================
    // Open Watch Page From Title
    // =====================================

    title.style.cursor =
        "pointer";


    title.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            openWatchPage(
                post
            );

        }
    );


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

        return;

    }


    try {

        console.log(
            "📡 Loading uploaded videos..."
        );


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

            console.error(
                "Video Feed Error:",
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


        const videos =
            posts.filter(
                (post) =>
                    post &&
                    post.type ===
                        "video" &&
                    post.url
            );


        console.log(
            "🎬 Uploaded videos:",
            videos.length
        );


        // =====================================
        // Remove Previous Dynamic Cards
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
        // Add Uploaded Videos
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


    searchInput.onkeyup =
        () => {

            const value =
                searchInput.value
                    .toLowerCase()
                    .trim();


            const cards =
                document.querySelectorAll(
                    ".video-card"
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


                    const description =
                        card.querySelector(
                            "p"
                        )
                        ?.textContent
                        ?.toLowerCase() ||
                        "";


                    if (
                        title.includes(
                            value
                        ) ||
                        description.includes(
                            value
                        )
                    ) {

                        card.style.display =
                            "block";

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
                    ".video-card"
                )
                .forEach(
                    (card) => {

                        card.style.display =
                            "block";

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
// Page Load
// =========================================

window.addEventListener(
    "load",
    () => {

        console.log(
            "🚀 Bot Pro Home Loaded"
        );


        loadUploadedVideos();

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
