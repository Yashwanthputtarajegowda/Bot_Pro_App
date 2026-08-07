const uploadBtn = document.getElementById("uploadBtn");
const status = document.getElementById("status");

uploadBtn.addEventListener("click", async () => {

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const category = document.getElementById("category").value;
    const visibility = document.getElementById("visibility").value;
    const video = document.getElementById("video").files[0];
    const thumbnail = document.getElementById("thumbnail").files[0];

    if (!title || !description || !video) {

        status.innerHTML = "⚠ Please fill all required fields.";
        return;

    }

    uploadBtn.disabled = true;
    uploadBtn.innerHTML = "Uploading...";

    status.innerHTML = "Uploading to server...";

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("visibility", visibility);

    formData.append("video", video);

    if (thumbnail) {

        formData.append("thumbnail", thumbnail);

    }

    try {

        const response = await fetch("/api/upload", {

            method: "POST",
            body: formData

        });

        const result = await response.json();

        if (result.success) {

            status.innerHTML = "✅ Upload Successful";

            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
            document.getElementById("video").value = "";
            document.getElementById("thumbnail").value = "";

        } else {

            status.innerHTML = "❌ " + result.message;

        }

    } catch (error) {

        status.innerHTML = "❌ Upload Failed.";

    }

    uploadBtn.disabled = false;
    uploadBtn.innerHTML = "Upload Video";

});
