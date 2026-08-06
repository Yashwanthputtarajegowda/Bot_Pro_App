// Bottom Navigation

const navItems = document.querySelectorAll(".bottom-nav div");

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        navItems.forEach((nav) => {
            nav.style.color = "#444";
        });

        item.style.color = "#1976D2";

    });

});

// Search

const search = document.querySelector(".search-box input");

search.addEventListener("focus", () => {

    console.log("Search Opened");

});

// Notifications

document.querySelectorAll(".material-icons")[1].addEventListener("click", () => {

    alert("Notifications Coming Soon");

});

// Messenger

document.querySelectorAll(".material-icons")[0].addEventListener("click", () => {

    alert("Messenger Coming Soon");

});
