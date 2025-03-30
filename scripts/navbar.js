document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".links");

    // Check if the screen size is smaller than a laptop/desktop
    function checkScreenSize() {
        if (window.innerWidth < 1024) {
            nav.style.display = "none"; // Hide menu for small screens
        } else {
            nav.style.display = "flex"; // Show menu for larger screens
        }
    }

    // Ensure nav is hidden on page load if the screen size is small
    checkScreenSize();

    menuToggle.addEventListener("click", function () {
        if (window.innerWidth < 1024) {
            if (nav.style.display === "none" || nav.style.display === "") {
                nav.style.display = "flex"; // Show menu
            } else {
                nav.style.display = "none"; // Hide menu
            }
        }
    });

    // Add event listener to check window size on resize
    window.addEventListener("resize", checkScreenSize);
});




