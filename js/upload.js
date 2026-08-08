// ==========================================
// Bot Pro Upload JS
// Video + Photo + Settings
// ==========================================


// ==========================================
// Backend API
// ==========================================

import { apiFetch } from "../firebase/api.js";

const API_URL =
    "https://bot-pro-backend-production.up.railway.app";


// ==========================================
// File Inputs
// ==========================================

const fileInput =
    document.createElement("input");

fileInput.type = "file";

fileInput.accept =
    "video/*,image/*";

fileInput.style.display =
    "none";

document.body.appendChild(
    fileInput
);


const thumbnailInput =
    document.createElement("input");

thumbnailInput.type = "file";

thumbnailInput.accept =
    "image/*";

thumbnailInput.style.display =
    "none";

document.body.appendChild(
    thumbnailInput
);


// ==========================================
// Selected Files
// ==========================================

let selectedFile = null;

let selectedThumbnail = null;

let selectedUploadType = "video";


// ==========================================
// Elements
// ==========================================

const uploadTypes =
    document.querySelectorAll(
        ".type-card"
    );


const chooseFileBtn =
    document.querySelector(
        ".select-btn"
    );


const uploadTitle =
    document.querySelector(
        ".upload-select h3"
    );


const uploadDescription =
    document.querySelector(
        ".upload-select p"
    );


const videoChooseArea =
    document.querySelector(
        "#videoChooseArea"
    );


const videoPreviewArea =
    document.querySelector(
        "#videoPreviewArea"
    );


const videoPreview =
    document.querySelector(
        "#videoPreview"
    );


const videoFileName =
    document.querySelector(
        "#videoFileName"
    );


const videoCancelBtn =
    document.querySelector(
        "#videoCancelBtn"
    );


const thumbnailButton =
    document.querySelector(
        ".thumb-upload"
    );


const thumbnailText =
    document.querySelector(
        "#thumbnailText"
    );


const thumbnailImage =
    document.querySelector(
        "#thumbnailImage"
    );


const thumbnailCancelBtn =
    document.querySelector(
        "#thumbnailCancelBtn"
    );


const uploadButton =
    document.querySelector(
        ".upload-btn"
    );


const progressFill =
    document.querySelector(
        ".progress-fill"
    );


const progressText =
    document.querySelector(
        "#progressText"
    );


const category =
    document.querySelector(
        ".category-select"
    );


const linkInput =
    document.querySelector(
        ".link-input"
    );


const tagsInput =
    document.querySelector(
        ".tags-input"
    );


const backButton =
    document.querySelector(
        ".back-btn"
    );


// ==========================================
// Upload Settings
// ==========================================

const uploadSettingsBtn =
    document.querySelector(
        "#uploadSettingsBtn"
    );


const uploadSettingsPanel =
    document.querySelector(
        "#uploadSettingsPanel"
    );


const uploadSettingsClose =
    document.querySelector(
        "#uploadSettingsClose"
    );


const saveUploadSettings =
    document.querySelector(
        "#saveUploadSettings"
    );


const uploadQuality =
    document.querySelector(
        "#uploadQuality"
    );


const defaultPrivacy =
    document.querySelector(
        "#defaultPrivacy"
    );


const defaultComments =
    document.querySelector(
        "#defaultComments"
    );


const customThumbnailSetting =
    document.querySelector(
        "#customThumbnailSetting"
    );


// ==========================================
// Upload Type Selection
// ==========================================

uploadTypes.forEach((card) => {

    card.addEventListener(
        "click",
        () => {

            uploadTypes.forEach(
                (item) => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            card.classList.add(
                "active"
            );


            const type =
                card
                    .querySelector("span")
                    ?.textContent
                    ?.trim();


            // ==================================
            // VIDEO
            // ==================================

            if (type === "Video") {

                selectedUploadType =
                    "video";


                uploadTitle.textContent =
                    "Select Video";


                uploadDescription.textContent =
                    "MP4 • MOV • AVI • Max 2GB";


                fileInput.accept =
                    "video/*";


                resetMainFile();

            }


            // ==================================
            // REEL
            // ==================================

            else if (
                type === "Reel"
            ) {

                selectedUploadType =
                    "reel";


                uploadTitle.textContent =
                    "Select Reel";


                uploadDescription.textContent =
                    "MP4 • MOV • Max 2GB";


                fileInput.accept =
                    "video/*";


                resetMainFile();

            }


            // ==================================
            // LINK
            // ==================================

            else if (
                type === "Link"
            ) {

                selectedUploadType =
                    "link";


                uploadTitle.textContent =
                    "Select File";


                uploadDescription.textContent =
                    "Choose a video or image";


                fileInput.accept =
                    "video/*,image/*";


                resetMainFile();

            }

        }
    );

});


// ==========================================
// Choose Main File
// ==========================================

if (chooseFileBtn) {

    chooseFileBtn.addEventListener(
        "click",
        () => {

            fileInput.click();

        }
    );

}


// ==========================================
// Main File Selected
// ==========================================

fileInput.addEventListener(
    "change",
    () => {

        if (
            !fileInput.files.length
        ) {

            return;

        }


        const file =
            fileInput.files[0];


        selectedFile =
            file;


        console.log(
            "Selected file:",
            file.name
        );


        console.log(
            "File type:",
            file.type
        );


        // ==================================
        // VIDEO
        // ==================================

        if (
            file.type.startsWith(
                "video/"
            )
        ) {

            selectedUploadType =
                "video";


            showVideoPreview(
                file
            );

        }


        // ==================================
        // IMAGE / PHOTO
        // ==================================

        else if (
            file.type.startsWith(
                "image/"
            )
        ) {

            selectedUploadType =
                "photo";


            showPhotoPreview(
                file
            );

        }


        else {

            alert(
                "Please select a video or image."
            );


            resetMainFile();

        }

    }
);


// ==========================================
// Show Video Preview
// ==========================================

function showVideoPreview(
    file
) {

    const videoURL =
        URL.createObjectURL(
            file
        );


    videoPreview.src =
        videoURL;


    videoPreviewArea.style.display =
        "flex";


    videoChooseArea.style.display =
        "none";


    videoCancelBtn.style.display =
        "flex";


    videoFileName.textContent =
        file.name;


    videoPreview.style.display =
        "block";


    const imagePreview =
        document.querySelector(
            "#mainImagePreview"
        );


    if (imagePreview) {

        imagePreview.remove();

    }


    videoPreview.load();


    console.log(
        "🎥 Video preview ready"
    );

}


// ==========================================
// Show Photo Preview
// ==========================================

function showPhotoPreview(
    file
) {

    const imageURL =
        URL.createObjectURL(
            file
        );


    videoChooseArea.style.display =
        "none";


    videoPreviewArea.style.display =
        "flex";


    videoCancelBtn.style.display =
        "flex";


    videoFileName.textContent =
        file.name;


    videoPreview.style.display =
        "none";


    let imagePreview =
        document.querySelector(
            "#mainImagePreview"
        );


    if (!imagePreview) {

        imagePreview =
            document.createElement(
                "img"
            );


        imagePreview.id =
            "mainImagePreview";


        imagePreview.style.width =
            "100%";


        imagePreview.style.maxHeight =
            "420px";


        imagePreview.style.objectFit =
            "contain";


        imagePreview.style.borderRadius =
            "14px";


        imagePreview.style.background =
            "#000000";


        videoPreviewArea.insertBefore(
            imagePreview,
            videoFileName
        );

    }


    imagePreview.src =
        imageURL;


    imagePreview.style.display =
        "block";


    console.log(
        "🖼️ Photo preview ready"
    );

}


// ==========================================
// Cancel Main File
// ==========================================

if (videoCancelBtn) {

    videoCancelBtn.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();

            resetMainFile();

        }
    );

}


// ==========================================
// Reset Main File
// ==========================================

function resetMainFile() {

    selectedFile =
        null;


    fileInput.value =
        "";


    if (videoPreview) {

        videoPreview.pause();

        videoPreview.removeAttribute(
            "src"
        );

        videoPreview.load();

        videoPreview.style.display =
            "block";

    }


    videoPreviewArea.style.display =
        "none";


    videoChooseArea.style.display =
        "flex";


    videoCancelBtn.style.display =
        "none";


    videoFileName.textContent =
        "";


    const imagePreview =
        document.querySelector(
            "#mainImagePreview"
        );


    if (imagePreview) {

        imagePreview.remove();

    }


    console.log(
        "❌ Main file cancelled"
    );

}


// ==========================================
// Thumbnail Button
// ==========================================

if (thumbnailButton) {

    thumbnailButton.addEventListener(
        "click",
        () => {

            thumbnailInput.click();

        }
    );

}


// ==========================================
// Thumbnail Selected
// ==========================================

thumbnailInput.addEventListener(
    "change",
    () => {

        if (
            !thumbnailInput.files.length
        ) {

            return;

        }


        const file =
            thumbnailInput.files[0];


        selectedThumbnail =
            file;


        showThumbnailPreview(
            file
        );

    }
);


// ==========================================
// Show Thumbnail
// ==========================================

function showThumbnailPreview(
    file
) {

    const imageURL =
        URL.createObjectURL(
            file
        );


    thumbnailImage.src =
        imageURL;


    thumbnailImage.style.display =
        "block";


    thumbnailText.style.display =
        "none";


    thumbnailCancelBtn.style.display =
        "flex";


    console.log(
        "🖼️ Thumbnail selected:",
        file.name
    );

}


// ==========================================
// Cancel Thumbnail
// ==========================================

if (thumbnailCancelBtn) {

    thumbnailCancelBtn.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();

            resetThumbnail();

        }
    );

}


// ==========================================
// Reset Thumbnail
// ==========================================

function resetThumbnail() {

    selectedThumbnail =
        null;


    thumbnailInput.value =
        "";


    thumbnailImage.src =
        "";


    thumbnailImage.style.display =
        "none";


    thumbnailText.style.display =
        "block";


    thumbnailCancelBtn.style.display =
        "none";


    console.log(
        "❌ Thumbnail removed"
    );

}


// ==========================================
// Upload Progress
// ==========================================

function setProgress(
    value
) {

    progressFill.style.width =
        value + "%";


    progressText.textContent =
        value + "%";

}
// ==========================================
// Upload Button
// ==========================================

if (uploadButton) {

    uploadButton.addEventListener(
        "click",
        async () => {

            // ==================================
            // Check File
            // ==================================

            if (!selectedFile) {

                alert(
                    "Please select a video or photo first."
                );

                return;

            }


            // ==================================
            // Disable
            // ==================================

            uploadButton.disabled =
                true;


            uploadButton.textContent =
                "Uploading...";


            setProgress(0);


            // ==================================
            // Form Data
            // ==================================

            const formData =
                new FormData();


            // ==================================
            // Correct Field
            // ==================================

            if (
                selectedUploadType ===
                "photo"
            ) {

                formData.append(
                    "photo",
                    selectedFile
                );

            }

            else {

                formData.append(
                    "video",
                    selectedFile
                );

            }


            // ==================================
            // Details
            // ==================================

            const titleInput =
                document.querySelector(
                    ".title-input"
                );


            const descriptionInput =
                document.querySelector(
                    ".description-input"
                );


            if (titleInput) {

                formData.append(
                    "title",
                    titleInput.value
                );

            }


            if (descriptionInput) {

                formData.append(
                    "description",
                    descriptionInput.value
                );


                formData.append(
                    "caption",
                    descriptionInput.value
                );

            }


            if (category) {

                formData.append(
                    "category",
                    category.value
                );

            }


            if (linkInput) {

                formData.append(
                    "link",
                    linkInput.value
                );

            }


            if (tagsInput) {

                formData.append(
                    "tags",
                    tagsInput.value
                );

            }


            // ==================================
            // Upload Settings
            // ==================================

            if (uploadQuality) {

                formData.append(
                    "uploadQuality",
                    uploadQuality.value
                );

            }


            if (defaultPrivacy) {

                formData.append(
                    "privacy",
                    defaultPrivacy.value
                );

            }


            if (defaultComments) {

                formData.append(
                    "comments",
                    defaultComments.value
                );

            }


            if (
                customThumbnailSetting
            ) {

                formData.append(
                    "customThumbnail",
                    customThumbnailSetting.checked
                );

            }


            // ==================================
            // Custom Thumbnail
            // ==================================

            if (selectedThumbnail) {

                formData.append(
                    "thumbnail",
                    selectedThumbnail
                );

            }


            // ==================================
            // Upload URL
            // ==================================

            const uploadRoute =
                selectedUploadType ===
                "photo"

                    ? "/api/upload/photo"

                    : "/api/upload/video";


            try {

                console.log(
                    "Uploading to:",
                    API_URL +
                    uploadRoute
                );


                setProgress(10);


                // ==================================
                // AUTHENTICATED UPLOAD
                // Firebase ID Token will be
                // automatically added by apiFetch()
                // ==================================

                const result =
                    await apiFetch(
                        uploadRoute,
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                setProgress(70);


                console.log(
                    "Backend response:",
                    result
                );


                // ==================================
                // SUCCESS
                // ==================================

                if (result.success) {

                    setProgress(100);


                    if (
                        selectedUploadType ===
                        "photo"
                    ) {

                        alert(
                            "✅ Photo Uploaded Successfully!"
                        );

                    }

                    else {

                        alert(
                            "✅ Video Uploaded Successfully!"
                        );

                    }


                    console.log(
                        "Post ID:",
                        result.id
                    );


                    console.log(
                        "Media URL:",
                        result.photoUrl ||
                        result.videoUrl
                    );


                    resetUploadForm();

                }


                // ==================================
                // ERROR
                // ==================================

                else {

                    alert(
                        result.error ||
                        result.message ||
                        "Upload Failed"
                    );

                }

            }


            catch (error) {

                console.error(
                    "Upload error:",
                    error
                );


                // ==================================
                // Authentication Error
                // ==================================

                if (
                    error.message &&
                    (
                        error.message
                            .toLowerCase()
                            .includes("logged in")
                        ||
                        error.message
                            .toLowerCase()
                            .includes("authentication")
                    )
                ) {

                    alert(
                        "Please login again before uploading."
                    );

                    return;

                }


                // ==================================
                // Normal Error
                // ==================================

                alert(
                    error.message ||
                    "Unable to connect to the server."
                );

            }


            // ==================================
            // Restore Button
            // ==================================

            finally {

                uploadButton.disabled =
                    false;


                uploadButton.textContent =
                    "Upload Now";

            }

        }
    );

}
// ==========================================
// UPLOAD SETTINGS
// ==========================================


// ==========================================
// Open / Close Settings
// ==========================================

if (uploadSettingsBtn) {

    uploadSettingsBtn.addEventListener(
        "click",
        () => {

            if (
                uploadSettingsPanel.style.display ===
                "none"
            ) {

                uploadSettingsPanel.style.display =
                    "block";


                uploadSettingsBtn.textContent =
                    "⚙ Settings";

            }

            else {

                uploadSettingsPanel.style.display =
                    "none";


                uploadSettingsBtn.textContent =
                    "⚙ Upload Settings";

            }

        }
    );

}


// ==========================================
// Close Settings
// ==========================================

if (uploadSettingsClose) {

    uploadSettingsClose.addEventListener(
        "click",
        () => {

            uploadSettingsPanel.style.display =
                "none";


            uploadSettingsBtn.textContent =
                "⚙ Upload Settings";

        }
    );

}


// ==========================================
// Save Settings
// ==========================================

if (saveUploadSettings) {

    saveUploadSettings.addEventListener(
        "click",
        () => {

            const quality =
                uploadQuality?.value ||
                "auto";


            const privacy =
                defaultPrivacy?.value ||
                "public";


            const comments =
                defaultComments?.value ||
                "allow";


            const customThumbnail =
                customThumbnailSetting
                    ?.checked ??
                true;


            // ==================================
            // Save to Local Storage
            // ==================================

            localStorage.setItem(
                "botProUploadQuality",
                quality
            );


            localStorage.setItem(
                "botProUploadPrivacy",
                privacy
            );


            localStorage.setItem(
                "botProUploadComments",
                comments
            );


            localStorage.setItem(
                "botProCustomThumbnail",
                customThumbnail
            );


            alert(
                "✅ Upload Settings Saved"
            );


            uploadSettingsPanel.style.display =
                "none";


            uploadSettingsBtn.textContent =
                "⚙ Upload Settings";

        }
    );

}


// ==========================================
// Load Settings
// ==========================================

function loadUploadSettings() {

    const quality =
        localStorage.getItem(
            "botProUploadQuality"
        );


    const privacy =
        localStorage.getItem(
            "botProUploadPrivacy"
        );


    const comments =
        localStorage.getItem(
            "botProUploadComments"
        );


    const customThumbnail =
        localStorage.getItem(
            "botProCustomThumbnail"
        );


    // ==================================
    // Quality
    // ==================================

    if (
        quality &&
        uploadQuality
    ) {

        uploadQuality.value =
            quality;

    }


    // ==================================
    // Privacy
    // ==================================

    if (
        privacy &&
        defaultPrivacy
    ) {

        defaultPrivacy.value =
            privacy;

    }


    // ==================================
    // Comments
    // ==================================

    if (
        comments &&
        defaultComments
    ) {

        defaultComments.value =
            comments;

    }


    // ==================================
    // Custom Thumbnail
    // ==================================

    if (
        customThumbnail !== null &&
        customThumbnailSetting
    ) {

        customThumbnailSetting.checked =
            customThumbnail ===
            "true";

    }

}


// ==========================================
// Category
// ==========================================

if (category) {

    category.addEventListener(
        "change",
        () => {

            console.log(
                "Category:",
                category.value
            );

        }
    );

}


// ==========================================
// Link
// ==========================================

if (linkInput) {

    linkInput.addEventListener(
        "input",
        () => {

            console.log(
                "Link:",
                linkInput.value
            );

        }
    );

}


// ==========================================
// Tags
// ==========================================

if (tagsInput) {

    tagsInput.addEventListener(
        "input",
        () => {

            console.log(
                "Tags:",
                tagsInput.value
            );

        }
    );

}


// ==========================================
// Back Button
// ==========================================

if (backButton) {

    backButton.addEventListener(
        "click",
        () => {

            window.history.back();

        }
    );

}
// ==========================================
// Bottom Navigation
// ==========================================

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


// ==========================================
// Reset Complete Form
// ==========================================

function resetUploadForm() {

    // ==================================
    // Reset Main File
    // ==================================

    resetMainFile();


    // ==================================
    // Reset Thumbnail
    // ==================================

    resetThumbnail();


    // ==================================
    // Reset Title
    // ==================================

    const titleInput =
        document.querySelector(
            ".title-input"
        );


    // ==================================
    // Reset Description
    // ==================================

    const descriptionInput =
        document.querySelector(
            ".description-input"
        );


    if (titleInput) {

        titleInput.value =
            "";

    }


    if (descriptionInput) {

        descriptionInput.value =
            "";

    }


    // ==================================
    // Reset Category
    // ==================================

    if (category) {

        category.selectedIndex =
            0;

    }


    // ==================================
    // Reset Link
    // ==================================

    if (linkInput) {

        linkInput.value =
            "";

    }


    // ==================================
    // Reset Tags
    // ==================================

    if (tagsInput) {

        tagsInput.value =
            "";

    }


    // ==================================
    // Reset Progress
    // ==================================

    setProgress(0);

}


// ==========================================
// Page Ready
// ==========================================

window.addEventListener(
    "load",
    () => {

        loadUploadSettings();


        console.log(
            "🚀 Bot Pro Upload Ready"
        );


        console.log(
            "🖼️ Photo Upload Ready"
        );


        console.log(
            "⚙️ Upload Settings Ready"
        );


        console.log(
            "🔐 Firebase Authentication Ready"
        );


        console.log(
            "🚂 Railway Integration Ready"
        );

    }
);
