// =========================================
// Bot Pro Upload JS
// Railway Version - Part 1
// =========================================

// =========================================
// Backend API
// =========================================

const API_URL =
"https://bot-pro-backend-production.up.railway.app";

// =========================================
// File Input
// =========================================

const fileInput =
document.createElement("input");

fileInput.type = "file";

fileInput.accept =
"video/*,image/*";

let selectedFile = null;

// =========================================
// Elements
// =========================================

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

    fileInput.click();

});

// =========================================
// File Selected
// =========================================

fileInput.addEventListener("change",()=>{

    if(fileInput.files.length===0){

        return;

    }

    selectedFile =
    fileInput.files[0];

    uploadPreview.textContent =
    selectedFile.name;

});

// =========================================
// Remove File
// =========================================

removeBtn.addEventListener("click",()=>{

    selectedFile = null;

    fileInput.value = "";

    uploadPreview.textContent =
    "Preview";

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
        "Thumbnail Upload Coming Soon"
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

// =========================================
// Upload Button
// =========================================

uploadButton.addEventListener("click",async()=>{

    if(!selectedFile){

        alert("Please select a file.");

        return;

    }

    uploadButton.disabled = true;

    uploadButton.textContent = "Uploading...";

    progressFill.style.width = "0%";

    progressText.textContent = "0%";

    const formData = new FormData();

    formData.append(

        "video",

        selectedFile

    );

    try{

        let progress = 0;

        const animation = setInterval(()=>{

            if(progress < 90){

                progress += 5;

                progressFill.style.width =
                progress + "%";

                progressText.textContent =
                progress + "%";

            }

        },150);

        console.log(API_URL + "/api/upload/video");

        const response = await fetch(

            API_URL + "/api/upload/video",

            {

                method:"POST",

                body:formData

            }

        );

        clearInterval(animation);

        const result =
        await response.json();

        if(result.success){

            progressFill.style.width =
            "100%";

            progressText.textContent =
            "100%";

            alert(

                "Video Uploaded Successfully!"

            );

        }

        else{

            alert(

                result.error ||

                "Upload Failed"

            );

        }

    }

    catch(error){

        console.error(error);

        alert(

            "Unable to connect to the server."

        );

    }

    uploadButton.disabled = false;

    uploadButton.textContent = "Upload";

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
// Back Button
// =========================================

const backButton =
document.querySelector(".back-btn");

if(backButton){

    backButton.addEventListener("click",()=>{

        window.history.back();

    });

}

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
// Reset Upload Form
// =========================================

function resetUploadForm(){

    selectedFile = null;

    fileInput.value = "";

    uploadPreview.textContent = "Preview";

    progressFill.style.width = "0%";

    progressText.textContent = "0%";

}

// =========================================
// Upload Success
// =========================================

function uploadSuccess(){

    alert("✅ Upload completed successfully!");

    resetUploadForm();

}

// =========================================
// Future Firebase Integration
// =========================================

// Save Telegram file_id
// Save Upload Details
// Save Caption
// Save Category
// Save Tags
// Save Thumbnail

// =========================================
// Future Home Feed
// =========================================

// Load Uploaded Videos
// Load Uploaded Reels
// Load Uploaded Images

// =========================================
// Future Profile
// =========================================

// Show User Uploads
// Show Total Uploads
// Show Analytics

// =========================================
// Future AI
// =========================================

// AI Caption Generator
// AI Thumbnail Generator
// AI Hashtag Generator

// =========================================
// Page Ready
// =========================================

window.addEventListener("load",()=>{

    console.log(

        "🚀 Bot Pro Upload Ready"

    );

});

// =========================================
// Console
// =========================================

console.log(

    "✅ Railway Upload Integration Loaded"

);
