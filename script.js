// ----------------------------
// EVENTS
// ----------------------------

let events = [];

async function loadEvents() {

    try {

        const response = await fetch("events.json");
        events = await response.json();

        showTodayEvents();
        markCalendarEvents();

    } catch (error) {

        console.log("Unable to load events.");

    }

}

function showTodayEvents() {

    const list = document.getElementById("eventList");

    list.innerHTML = "";

    const today = new Date().toISOString().split("T")[0];

    const todayEvents = events.filter(e => e.date === today);

    if (todayEvents.length === 0) {

        list.innerHTML = "<li>No events today.</li>";
        return;

    }

    todayEvents.forEach(event => {

        const li = document.createElement("li");

        li.textContent = event.title;

        list.appendChild(li);

    });

}

function markCalendarEvents() {

    const cells = document.querySelectorAll("#calendarTable td");

    cells.forEach(cell => {

        const day = parseInt(cell.textContent);

        if (!day) return;

        const today = new Date();

        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();

        const fullDate =
            year + "-" +
            month + "-" +
            String(day).padStart(2, "0");

        const found =
            events.find(e => e.date === fullDate);

        if (found) {

            cell.style.position = "relative";

            const dot =
                document.createElement("div");

            dot.style.width = "8px";
            dot.style.height = "8px";
            dot.style.background = "#FFD700";
            dot.style.borderRadius = "50%";
            dot.style.position = "absolute";
            dot.style.bottom = "3px";
            dot.style.left = "50%";
            dot.style.transform = "translateX(-50%)";

            cell.appendChild(dot);

        }

    });

}

// Load events after the calendar is drawn

updateClock();

drawCalendar();

loadEvents();

setInterval(updateClock, 1000);

setInterval(nextPhoto, 5000);
