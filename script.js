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
