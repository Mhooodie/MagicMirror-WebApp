
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

// Decodes Weather Code
function pairWeatherCode(code) {
    let weatherText;

    switch(code) {
        case 0:
            weatherText = "Clear sky";
            break;

        case 1:
            weatherText = "Mainly clear";
            break;

        case 2:
            weatherText = "Partly cloudy";
            break;

        case 3:
            weatherText = "Overcast";
            break;

        case 45:
            weatherText = "Fog";
            break;

        case 48:
            weatherText = "Depositing rime fog";
            break;

        case 51:
            weatherText = "Light drizzle";
            break;

        case 53:
            weatherText = "Moderate drizzle";
            break;

        case 55:
            weatherText = "Dense drizzle";
            break;

        case 56:
            weatherText = "Light freezing drizzle";
            break;

        case 57:
            weatherText = "Dense freezing drizzle";
            break;

        case 61:
            weatherText = "Slight rain";
            break;

        case 63:
            weatherText = "Moderate rain";
            break;

        case 65:
            weatherText = "Heavy rain";
            break;

        case 66:
            weatherText = "Light freezing rain";
            break;

        case 67:
            weatherText = "Heavy freezing rain";
            break;

        case 71:
            weatherText = "Slight snowfall";
            break;

        case 73:
            weatherText = "Moderate snowfall";
            break;

        case 75:
            weatherText = "Heavy snowfall";
            break;

        case 77:
            weatherText = "Snow grains";
            break;

        case 80:
            weatherText = "Slight rain showers";
            break;

        case 81:
            weatherText = "Moderate rain showers";
            break;

        case 82:
            weatherText = "Violent rain showers";
            break;

        case 85:
            weatherText = "Slight snow showers";
            break;

        case 86:
            weatherText = "Heavy snow showers";
            break;

        case 95:
            weatherText = "Thunderstorm";
            break;

        case 96:
            weatherText = "Thunderstorm with slight hail";
            break;

        case 99:
            weatherText = "Thunderstorm with heavy hail";
            break;

        default:
            weatherText = "Unknown weather";
            break;
    }

    console.log(weatherText);
    // return weatherText;
}

// Gets Lat/Long: Fetches from API
// TODO: Error Handling
async function geoCode() {
    const city = "ROLLA"
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=10&language=en&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    console.log('location');
    console.log(data);

    const location = data.results[0];
    return location;
}

// Top Right Weather: blahblahblah
// TODO: Error Handling
async function getWeather() {
    const location = await geoCode();
    const lat = location.latitude;
    const lon = location.longitude;
    const timeZone = 'America/Chicago';
    const tempUnit = 'fahrenheit';
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,relative_humidity_2m&hourly=uv_index&temperature_unit=${tempUnit}&timezone=${timeZone}`;
    const res = await fetch(url);
    const data = await res.json()
    console.log('weather');
    console.log(data);
    
    const temperature = data.current.temperature_2m;
    const humidity = data.current.relative_humidity_2m;
    const weatherCode = data.current.weather_code;
    console.log("Temperature:", temperature);
    console.log("Humidity:", humidity);
    console.log("Weather Code:", weatherCode);

    pairWeatherCode(weatherCode);

}

getWeather();
setInterval(getWeather, 900000); // 15 Minutes
digitalClock();
setInterval(digitalClock, 1000); // Seconds
loadQuote();
setInterval(loadQuote, 14400000); // 4 Hours