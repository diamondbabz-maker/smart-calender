// ----------------------------
// Photos
// ----------------------------

let photos = [
    "photos/photo1.jpg",
    "photos/photo2.jpg",
    "photos/photo3.jpg",
    "photos/photo4.jpg"
];

let currentPhoto = 0;

// Wait until the page has loaded before showing the first photo
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("photo").src = photos[currentPhoto];
});

// ----------------------------
// Slideshow
// ----------------------------

let slideShowRunning = true;

let slideTimer = setInterval(nextPhoto, 5000);

function nextPhoto() {
    currentPhoto++;

    if (currentPhoto >= photos.length) {
        currentPhoto = 0;
    }

    document.getElementById("photo").src = photos[currentPhoto];
}

function previousPhoto() {
    currentPhoto--;

    if (currentPhoto < 0) {
        currentPhoto = photos.length - 1;
    }

    document.getElementById("photo").src = photos[currentPhoto];
}

function toggleSlideshow() {
    if (slideShowRunning) {
        clearInterval(slideTimer);
        slideShowRunning = false;
        document.getElementById("playPause").textContent = "Play";
    } else {
        slideTimer = setInterval(nextPhoto, 5000);
        slideShowRunning = true;
        document.getElementById("playPause").textContent = "Pause";
    }
}

// Slideshow starts automatically.
// No second timer needed here.
   
   
