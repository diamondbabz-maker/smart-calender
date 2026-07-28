// ----------------------------
// SMART CALENDAR v1.0
// ----------------------------

// Photo slideshow
const photos = [
    "photos/photo1.jpg",
    "photos/photo2.jpg",
    "photos/photo3.jpg",
    "photos/photo4.jpg"
];

let currentPhoto = 0;

// ----------------------------
// Update clocks and date
// ----------------------------

function updateClock() {

    const now = new Date();

    // Day
    document.getElementById("day").textContent =
        now.toLocaleDateString("en-US", {
            weekday: "long"
        });

    // Date
    document.getElementById("date").textContent =
        now.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        });

    // Jamaica Time
    document.getElementById("jamaica").textContent =
        now.toLocaleTimeString("en-US", {
            timeZone: "America/Jamaica",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        });

    // Second Life Time (Pacific)
    document.getElementById("slt").textContent =
        now.toLocaleTimeString("en-US", {
            timeZone: "America/Los_Angeles",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        });

}

// ----------------------------
// Monthly Calendar
// ----------------------------

function drawCalendar() {

    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay =
        new Date(year, month, 1).getDay();

    const lastDate =
        new Date(year, month + 1, 0).getDate();

    document.getElementById("monthYear").textContent =
        today.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
        });

    const tbody =
        document.querySelector("#calendarTable tbody");

    tbody.innerHTML = "";

    let date = 1;

    for (let row = 0; row < 6; row++) {

        const tr = document.createElement("tr");

        for (let col = 0; col < 7; col++) {

            const td = document.createElement("td");

            if (row === 0 && col < firstDay) {

                td.textContent = "";

            }
            else if (date > lastDate) {

                td.textContent = "";

            }
            else {

                td.textContent = date;

                if (date === today.getDate()) {

                    td.classList.add("today");

                }

                date++;

            }

            tr.appendChild(td);

        }

        tbody.appendChild(tr);

    }

}

// ----------------------------
// Slideshow
// ----------------------------

function nextPhoto() {

    currentPhoto++;

    if (currentPhoto >= photos.length) {

        currentPhoto = 0;

    }

    const img =
        document.getElementById("photo");

    img.style.opacity = 0;

    setTimeout(() => {

        img.src = photos[currentPhoto];

        img.style.opacity = 1;

    }, 400);

}

// ----------------------------
// Start Everything
// ----------------------------

updateClock();

drawCalendar();

setInterval(updateClock, 1000);

setInterval(nextPhoto, 5000);
