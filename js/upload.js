const videoTab = document.getElementById("videoTab");
const reelTab = document.getElementById("reelTab");
const linkTab = document.getElementById("linkTab");

const videoSection = document.getElementById("videoSection");
const reelSection = document.getElementById("reelSection");
const linkSection = document.getElementById("linkSection");

const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", () => {

    window.location.href = "home.html";

});

function hideAllSections(){

    videoSection.classList.add("hidden");
    reelSection.classList.add("hidden");
    linkSection.classList.add("hidden");

    videoTab.classList.remove("active");
    reelTab.classList.remove("active");
    linkTab.classList.remove("active");

}

videoTab.addEventListener("click",()=>{

    hideAllSections();

    videoSection.classList.remove("hidden");

    videoTab.classList.add("active");

});

reelTab.addEventListener("click",()=>{

    hideAllSections();

    reelSection.classList.remove("hidden");

    reelTab.classList.add("active");

});

linkTab.addEventListener("click",()=>{

    hideAllSections();

    linkSection.classList.remove("hidden");

    linkTab.classList.add("active");

});

const thumbnailInput=document.getElementById("thumbnail");
const videoInput=document.getElementById("video");

const reelCover=document.getElementById("reelCover");
const reelVideo=document.getElementById("reelVideo");

const thumbnailPreview=document.getElementById("thumbnailPreview");
const videoPreview=document.getElementById("videoPreview");

const coverPreview=document.getElementById("coverPreview");
const reelPreview=document.getElementById("reelPreview");
