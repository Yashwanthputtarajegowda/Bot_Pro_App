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
function imagePreview(input, preview){

    preview.innerHTML="";

    if(input.files.length===0) return;

    const img=document.createElement("img");

    img.src=URL.createObjectURL(input.files[0]);

    preview.appendChild(img);

}

function videoPreviewShow(input, preview){

    preview.innerHTML="";

    if(input.files.length===0) return;

    const video=document.createElement("video");

    video.src=URL.createObjectURL(input.files[0]);

    video.controls=true;

    preview.appendChild(video);

}

thumbnailInput.addEventListener("change",()=>{

    imagePreview(thumbnailInput,thumbnailPreview);

});

videoInput.addEventListener("change",()=>{

    videoPreviewShow(videoInput,videoPreview);

});

reelCover.addEventListener("change",()=>{

    imagePreview(reelCover,coverPreview);

});

reelVideo.addEventListener("change",()=>{

    videoPreviewShow(reelVideo,reelPreview);

});

const progressFill=document.getElementById("progressFill");
const progressText=document.getElementById("progressText");
const status=document.getElementById("status");

function updateProgress(percent,text){

    progressFill.style.width=percent+"%";

    progressText.innerHTML=text;

}
const uploadBtn=document.getElementById("uploadBtn");

if(uploadBtn){

uploadBtn.addEventListener("click",async()=>{

    const title=document.getElementById("title").value.trim();
    const description=document.getElementById("description").value.trim();
    const category=document.getElementById("category").value;
    const visibility=document.getElementById("visibility").value;
    const video=document.getElementById("video").files[0];
    const thumbnail=document.getElementById("thumbnail").files[0];

    if(!title || !description || !video){

        status.innerHTML="⚠ Please fill all required fields.";
        return;

    }

    uploadBtn.disabled=true;

    updateProgress(10,"Preparing Upload...");

    const formData=new FormData();

    formData.append("title",title);
    formData.append("description",description);
    formData.append("category",category);
    formData.append("visibility",visibility);
    formData.append("video",video);

    if(thumbnail){

        formData.append("thumbnail",thumbnail);

    }

    try{

        updateProgress(50,"Uploading...");

        const response=await fetch("/api/upload",{

            method:"POST",
            body:formData

        });

        const result=await response.json();

        if(result.success){

            updateProgress(100,"Upload Complete");

            status.innerHTML="✅ Video Uploaded Successfully";

        }else{

            updateProgress(0,"Upload Failed");

            status.innerHTML=result.message || "Upload Failed";

        }

    }catch(error){

        updateProgress(0,"Network Error");

        status.innerHTML="❌ Network Error";

    }

    uploadBtn.disabled=false;

});

}

const fetchLinkBtn=document.getElementById("fetchLinkBtn");

if(fetchLinkBtn){

fetchLinkBtn.addEventListener("click",()=>{

    alert("Link Import will be connected with backend.");

});

}

const aiVideoBtn=document.getElementById("aiVideoBtn");

if(aiVideoBtn){

aiVideoBtn.addEventListener("click",()=>{

    alert("AI Title & Description feature coming soon.");

});

}

const aiReelBtn=document.getElementById("aiReelBtn");

if(aiReelBtn){

aiReelBtn.addEventListener("click",()=>{

    alert("AI Caption feature coming soon.");

});

}
