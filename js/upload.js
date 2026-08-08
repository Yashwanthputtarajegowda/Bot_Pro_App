// ==========================================
// Bot Pro Upload JS
// Final Preview + Railway Version
// ==========================================


// ==========================================
// Backend API
// ==========================================

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

fileInput.style.display = "none";

document.body.appendChild(fileInput);


const thumbnailInput =
    document.createElement("input");

thumbnailInput.type = "file";

thumbnailInput.accept =
    "image/*";

thumbnailInput.style.display = "none";

document.body.appendChild(thumbnailInput);


// ==========================================
// Selected Files
// ==========================================

let selectedFile = null;

let selectedThumbnail = null;


// ==========================================
// Elements
// ==========================================

const uploadTypes =
    document.querySelectorAll(".type-card");

const chooseFileBtn =
    document.querySelector(".select-btn");

const uploadTitle =
    document.querySelector(".upload-select h3");

const uploadDescription =
    document.querySelector(".upload-select p");

const videoChooseArea =
    document.querySelector("#videoChooseArea");

const videoPreviewArea =
    document.querySelector("#videoPreviewArea");

const videoPreview =
    document.querySelector("#videoPreview");

const videoFileName =
    document.querySelector("#videoFileName");

const videoCancelBtn =
    document.querySelector("#videoCancelBtn");

const thumbnailButton =
    document.querySelector(".thumb-upload");

const thumbnailPreview =
    document.querySelector("#thumbnailPreview");

const thumbnailText =
    document.querySelector("#thumbnailText");

const thumbnailImage =
    document.querySelector("#thumbnailImage");

const thumbnailCancelBtn =
    document.querySelector("#thumbnailCancelBtn");

const uploadButton =
    document.querySelector(".upload-btn");

const progressFill =
    document.querySelector(".progress-fill");

const progressText =
    document.querySelector("#progressText");

const category =
    document.querySelector(".category-select");

const linkInput =
    document.querySelector(".link-input");

const tagsInput =
    document.querySelector(".tags-input");

const backButton =
    document.querySelector(".back-btn");


// ==========================================
// Upload Type
// ==========================================

uploadTypes.forEach((card) => {

    card.addEventListener("click", () => {

        uploadTypes.forEach((item) => {

            item.classList.remove("active");

        });

        card.classList.add("active");


        const type =
            card.querySelector("span")?.textContent?.trim();


        if (type === "Video") {

            uploadTitle.textContent =
                "Select Video";

            uploadDescription.textContent =
                "MP4 • MOV • AVI • Max 2GB";

            fileInput.accept =
                "video/*";

        }


        else if (type === "Reel") {

            uploadTitle.textContent =
                "Select Reel";

            uploadDescription.textContent =
                "MP4 • MOV • Max 2GB";

            fileInput.accept =
                "video/*";

        }


        else if (type === "Link") {

            uploadTitle.textContent =
                "Paste Link";

            uploadDescription.textContent =
                "YouTube • Website • Any URL";

            fileInput.accept =
                "video/*,image/*";

        }

    });

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

        if (!fileInput.files.length) {

            return;

        }


        const file =
            fileInput.files[0];


        selectedFile = file;


        console.log(
            "Selected file:",
            file.name
        );


        console.log(
            "File type:",
            file.type
        );


        // ======================================
        // VIDEO
        // ======================================

        if (
            file.type.startsWith("video/")
        ) {

            showVideoPreview(file);

        }


        // ======================================
        // IMAGE
        // ======================================

        else if (
            file.type.startsWith("image/")
        ) {

            showImagePreview(file);

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

function showVideoPreview(file) {

    const videoURL =
        URL.createObjectURL(file);


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


    videoPreview.load();


    console.log(
        "🎥 Video preview ready"
    );

}


// ==========================================
// Show Image Preview
// ==========================================

function showImagePreview(file) {

    const imageURL =
        URL.createObjectURL(file);


    /*
       Main upload box is designed
       for video preview.

       For an image upload,
       we still display it inside
       the same preview area.
    */


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
            document.createElement("img");

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
            "#000";

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
        "🖼️ Image preview ready"
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

    selectedFile = null;

    fileInput.value = "";


    videoPreview.pause();

    videoPreview.removeAttribute(
        "src"
    );

    videoPreview.load();


    videoPreview.style.display =
        "block";


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

        if (!thumbnailInput.files.length) {

            return;

        }


        const file =
            thumbnailInput.files[0];


        selectedThumbnail =
            file;


        showThumbnailPreview(file);

    }
);


// ==========================================
// Show Thumbnail
// ==========================================

function showThumbnailPreview(file) {

    const imageURL =
        URL.createObjectURL(file);


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

    selectedThumbnail = null;

    thumbnailInput.value = "";


    thumbnailImage.src = "";

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

function setProgress(value) {

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
                    "Please select a video first."
                );

                return;

            }


            // ==================================
            // Disable Button
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


            formData.append(
                "video",
                selectedFile
            );


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
            // Upload
            // ==================================

            try {


                console.log(
                    "Uploading to:",
                    API_URL +
                    "/api/upload/video"
                );


                setProgress(10);


                const response =
                    await fetch(
                        API_URL +
                        "/api/upload/video",
                        {

                            method: "POST",

                            body: formData

                        }
                    );


                setProgress(70);


                const result =
                    await response.json();


                console.log(
                    "Backend response:",
                    result
                );


                // ==================================
                // SUCCESS
                // ==================================

                if (response.ok &&
                    result.success) {


                    setProgress(100);


                    alert(
                        "✅ Video Uploaded Successfully!"
                    );


                    console.log(
                        "Video URL:",
                        result.videoUrl
                    );


                    console.log(
                        "Post ID:",
                        result.id
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


                alert(
                    "Unable to connect to the server."
                );

            }


            // ==================================
            // Restore Button
            // ==================================

            uploadButton.disabled =
                false;


            uploadButton.textContent =
                "Upload Now";

        }
    );

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
// Link Input
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
// Reset Complete Upload Form
// ==========================================

function resetUploadForm() {

    resetMainFile();

    resetThumbnail();


    const titleInput =
        document.querySelector(
            ".title-input"
        );


    const descriptionInput =
        document.querySelector(
            ".description-input"
        );


    if (titleInput) {

        titleInput.value = "";

    }


    if (descriptionInput) {

        descriptionInput.value = "";

    }


    if (category) {

        category.selectedIndex = 0;

    }


    if (linkInput) {

        linkInput.value = "";

    }


    if (tagsInput) {

        tagsInput.value = "";

    }


    setProgress(0);


    console.log(
        "🔄 Upload form reset"
    );

}


// ==========================================
// Page Ready
// ==========================================

window.addEventListener(
    "load",
    () => {

        console.log(
            "🚀 Bot Pro Upload Ready"
        );

        console.log(
            "✅ Railway Upload Integration Loaded"
        );

    }
);
