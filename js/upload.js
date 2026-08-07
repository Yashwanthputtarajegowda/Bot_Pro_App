// =========================================
// Bot Pro Upload JS
// Final Version - Part 1
// =========================================

// Elements

const uploadTypes =
document.querySelectorAll(".type-card");

const chooseFileBtn =
document.querySelector(".select-btn");

const removeBtn =
document.querySelector(".remove-btn");

const uploadPreview =
document.querySelector(".preview-image");

const uploadTitle =
document.querySelector(".upload-select h3");

// =========================================
// Upload Type
// =========================================

uploadTypes.forEach((card)=>{

    card.addEventListener("click",()=>{

        uploadTypes.forEach((item)=>{

            item.classList.remove("active");

        });

        card.classList.add("active");

        const type =
        card.querySelector("span").textContent;

        uploadTitle.textContent =
        "Select " + type;

    });

});

// =========================================
// Choose File
// =========================================

chooseFileBtn.addEventListener("click",()=>{

    alert(
        "File Picker Coming Soon"
    );

});

// =========================================
// Remove Preview
// =========================================

removeBtn.addEventListener("click",()=>{

    uploadPreview.textContent =
    "Preview";

    alert(
        "Preview Removed"
    );

});

// =========================================
// Page Ready
// =========================================

window.addEventListener("load",()=>{

    console.log(
        "Bot Pro Upload Loaded"
    );

});
// =========================================
// Thumbnail
// =========================================

const thumbnailButton =
document.querySelector(".thumb-upload");

const thumbnailPreview =
document.querySelector(".thumb-preview");

thumbnailButton.addEventListener("click",()=>{

    alert(
        "Thumbnail Picker Coming Soon"
    );

});

// =========================================
// Upload Progress
// =========================================

const uploadButton =
document.querySelector(".upload-btn");

const progressFill =
document.querySelector(".progress-fill");

const progressText =
document.querySelector("#progressText");

uploadButton.addEventListener("click",()=>{

    let progress = 0;

    progressFill.style.width = "0%";

    progressText.textContent = "0%";

    const uploadInterval = setInterval(()=>{

        progress += 5;

        progressFill.style.width =
        progress + "%";

        progressText.textContent =
        progress + "%";

        if(progress >= 100){

            clearInterval(uploadInterval);

            alert(
                "Upload Complete (Demo)"
            );

        }

    },120);

});

// =========================================
// Category
// =========================================

const category =
document.querySelector(".category-select");

category.addEventListener("change",()=>{

    console.log(

        "Category :",

        category.value

    );

});

// =========================================
// Link Input
// =========================================

const linkInput =
document.querySelector(".link-input");

linkInput.addEventListener("input",()=>{

    console.log(

        "Link :", 

        linkInput.value

    );

});

// =========================================
// Tags
// =========================================

const tagsInput =
document.querySelector(".tags-input");

tagsInput.addEventListener("change",()=>{

    console.log(

        "Tags :",

        tagsInput.value

    );

});
// =========================================
// Bot Pro Upload JS
// Final Version - Part 3
// =========================================

// Back Button

const backButton =
document.querySelector(".back-btn");

backButton.addEventListener("click",()=>{

    window.history.back();

});

// =========================================
// Bottom Navigation
// =========================================

const navLinks =
document.querySelectorAll(".bottom-nav a");

navLinks.forEach((link)=>{

    link.addEventListener("click",()=>{

        navLinks.forEach((item)=>{

            item.classList.remove("active");

        });

        link.classList.add("active");

    });

});

// =========================================
// Future Integrations
// =========================================

// Firebase Upload
// Telegram Storage Upload
// Video Compression
// Reel Processing
// Thumbnail Generation
// Link Preview Generation
// Upload Resume
// Upload History
// Content Moderation
// Creator Analytics

// =========================================
// Ready
// =========================================

console.log(

    "Bot Pro Upload Ready"

);
