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

window.addEventListener("DOMContentLoaded", () => {
    const photo = document.getElementById("photo");

    if (photo) {
        photo.src = photos[currentPhoto];
    }
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

    const photo = document.getElementById("photo");
    if (photo) {
        photo.src = photos[currentPhoto];
    }
}

function previousPhoto() {
    currentPhoto--;

    if (currentPhoto < 0) {
        currentPhoto = photos.length - 1;
    }

    const photo = document.getElementById("photo");
    if (photo) {
        photo.src = photos[currentPhoto];
    }
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
   
