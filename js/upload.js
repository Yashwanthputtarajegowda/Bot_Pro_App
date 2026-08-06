const uploadBtn = document.getElementById("uploadBtn");

uploadBtn.addEventListener("click", async () => {

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const category = document.getElementById("category").value;
    const video = document.getElementById("video").files[0];
    const status = document.getElementById("status");

    if (!title || !description || !video) {
        status.innerHTML = "Please fill all fields.";
        return;
    }

    status.innerHTML = "Uploading...";

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("video", video);

    try {

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        status.innerHTML = result.message;

    } catch (err) {

        status.innerHTML = "Upload Failed.";

    }

});
