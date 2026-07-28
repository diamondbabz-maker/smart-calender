// ----------------------------
// Clock & Date
// ----------------------------

function updateClock() {

    const now = new Date();

    // Second Life Time (Pacific)
    const slTime = now.toLocaleTimeString("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });

    // Jamaica Time
    const jmTime = now.toLocaleTimeString("en-US", {
        timeZone: "America/Jamaica",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });

    const slt = document.getElementById("slt");
    const jamaica = document.getElementById("jamaica");
    const day = document.getElementById("day");
    const date = document.getElementById("date");

    if (slt) slt.textContent = slTime;
    if (jamaica) jamaica.textContent = jmTime;

    if (day) {
        day.textContent = now.toLocaleDateString("en-US", {
            weekday: "long"
        });
    }

    if (date) {
        date.textContent = now.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }
}
// ----------------------------
// Events
// ----------------------------

let events = [];

async function loadEvents() {

    try {

        const response = await fetch("events.json");
        events = await response.json();

        buildCalendar();
        showTodayEvents();

    } catch (error) {

        console.error("Unable to load events:", error);

    }

}

// ----------------------------
// Monthly Calendar
// ----------------------------

function buildCalendar() {

    const table = document.querySelector("#calendarTable tbody");
    const monthYear = document.getElementById("monthYear");

    if (!table || !monthYear) return;

    table.innerHTML = "";

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    monthYear.textContent = today.toLocaleString("en-US", {
        month: "long",
        year: "numeric"
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let dayNumber = 1;

    for (let row = 0; row < 6; row++) {

        const tr = document.createElement("tr");

        for (let col = 0; col < 7; col++) {

            const td = document.createElement("td");

            if (row === 0 && col < firstDay) {

                td.textContent = "";

            } else if (dayNumber <= daysInMonth) {

                td.textContent = dayNumber;

                if (dayNumber === today.getDate()) {
                    td.classList.add("today");
                }

                const monthString = String(month + 1).padStart(2, "0");
                const dayString = String(dayNumber).padStart(2, "0");

                const fullDate = `${year}-${monthString}-${dayString}`;

                if (events.some(event => event.date === fullDate)) {
                    td.classList.add("eventDay");
                }

                dayNumber++;
            }

            tr.appendChild(td);

        }

        table.appendChild(tr);

        if (dayNumber > daysInMonth) break;

    }

}

// ----------------------------
// Today's Events
// ----------------------------

function showTodayEvents() {

    const list = document.getElementById("eventList");

    if (!list) return;

    list.innerHTML = "";

    const today = new Date();

    const todayString =
        today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    const todaysEvents = events.filter(event => event.date === todayString);

    if (todaysEvents.length === 0) {

        list.innerHTML = "<li>No events today.</li>";
        return;

    }

    todaysEvents.forEach(event => {

        const li = document.createElement("li");
        li.textContent = `${event.time} - ${event.title}`;
        list.appendChild(li);

    });

}// ----------------------------
// Photos
// ----------------------------

let photos = [
    "photos/photo1.jpg",
    "photos/photo2.jpg",
    "photos/photo3.jpg",
    "photos/photo4.jpg"
];

let currentPhoto = 0;

// ----------------------------
// Page Loaded
// ----------------------------

window.addEventListener("DOMContentLoaded", () => {

    updateClock();
    setInterval(updateClock, 1000);

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

    const button = document.getElementById("playPause");

    if (slideShowRunning) {

        clearInterval(slideTimer);
        slideShowRunning = false;

        if (button) button.textContent = "Play";

    } else {

        slideTimer = setInterval(nextPhoto, 5000);
        slideShowRunning = true;

        if (button) button.textContent = "Pause";
    }
}
