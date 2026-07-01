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

// TODO: Weather bellow
// const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`; for geocode
// https://open-meteo.com/en/docs
async function geoCode() {
    const city = "ROLLA"
    const url = `https://geocoding-api.open-meteo.com/v1/search?
    name=${encodeURIComponent(city)}&count=10&language=en&format=json`;
    const res = await fetch(url);
}

digitalClock();
setInterval(digitalClock, 1000);
loadQuote();
setInterval(loadQuote, 14400000);