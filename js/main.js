
// Top Left Clock: uses new Date
function digitalClock() {
    const now = new Date();

    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const dayName = days[now.getDay()];

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const monthName = months[now.getMonth()];
    
    const timeString = `${hour}:${minute}:${second}`;
    const dateString = `${dayName}\n${monthName} ${now.getDate()}, ${now.getFullYear()}`;

    document.getElementById("clockDate").innerText = dateString;
    document.getElementById("clockTime").innerText = timeString;
}

// Top Left Quote: Pulls from data/quotes.json
function loadQuote() {
    fetch("data/quotes.json")
        .then(response => response.json())
        .then(data => {
            const quotes = data.quotes;
            const quoteString = quotes[Math.floor(Math.random() * quotes.length)];
            document.getElementById("quoteText").innerText = quoteString;
        })
        .catch(err => {
            console.error("Error loading quotes:", err);
            document.getElementById("quoteText").innerText = "No quote available.";
        });
}

// Gets Lat/Long: Fetches from API
async function geoCode() {
    const city = "ROLLA"
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=10&language=en&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    const location = data.results[0];
    return location;
}

// Top Right Weather: blahblahblah
async function getWeather() {
    const location = await geoCode();
    const lat = location.latitude;
    const lon = location.longitude;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=uv_index&minutely_15=temperature_2m,weather_code,relative_humidity_2m`;

    const res = await fetch(url);
    const data = await res.json()
    console.log(data);
    
}

getWeather();
setInterval(getWeather, 900001); // 15 Minutes
digitalClock();
setInterval(digitalClock, 1000); // Seconds
loadQuote();
setInterval(loadQuote, 14400000); // Days