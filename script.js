function updateClock(){

let now = new Date();

let day = now.toLocaleDateString("en-US", {
weekday: "long"
});

let date = now.toLocaleDateString("en-US", {
month: "long",
day: "numeric",
year: "numeric"
});

let time = now.toLocaleTimeString("en-US");

document.getElementById("day").innerHTML = day;
document.getElementById("date").innerHTML = date;
document.getElementById("clock").innerHTML = time;

}

setInterval(updateClock,1000);

updateClock();


let photos = [
"photos/photo1.jpg",
"photos/photo2.jpg",
"photos/photo3.jpg",
"photos/photo4.jpg"
];

let current = 0;

setInterval(function(){

current++;

if(current >= photos.length){
current = 0;
}

document.getElementById("photo").src = photos[current];

},5000);
