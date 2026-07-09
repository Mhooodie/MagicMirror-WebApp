// Top Left Clock: uses new Date
function digitalClock() {
  const now = new Date();

  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[now.getDay()];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[now.getMonth()];

  const timeString = `${hour}:${minute}:${second}`;
  const dateString = `${dayName}\n${monthName} ${now.getDate()}, ${now.getFullYear()}`;

  document.getElementById("clockDate").innerText = dateString;
  document.getElementById("clockTime").innerText = timeString;
}

// Top Left Quote: Pulls from data/quotes.json
function loadQuote() {
  fetch("data/quotes.json")
    .then((response) => response.json())
    .then((data) => {
      const quotes = data.quotes;
      const quoteString = quotes[Math.floor(Math.random() * quotes.length)];
      document.getElementById("quoteText").innerText = quoteString;
    })
    .catch((err) => {
      console.error("Error loading quotes:", err);
      document.getElementById("quoteText").innerText = "No quote available.";
    });
}

// Decodes Weather Code
function pairWeatherCode(code) {
  let weatherText;

  switch (code) {
    case 0:
      weatherText = "Clear sky";
      document.getElementById("weatherImg").src = "img/weather/clear-day.png";
      break;
    case 1:
      weatherText = "Mainly clear";
      document.getElementById("weatherImg").src = "img/weather/clear-day.png";
      break;
    case 2:
      weatherText = "Partly cloudy";
      document.getElementById("weatherImg").src =
        "img/weather/partly-cloudy.png";
      break;
    case 3:
      weatherText = "Overcast";
      document.getElementById("weatherImg").src = "img/weather/cloudy.png";
      break;
    case 45:
      weatherText = "Fog";
      document.getElementById("weatherImg").src = "img/weather/fog.png";
      break;
    case 48:
      weatherText = "Depositing rime fog";
      document.getElementById("weatherImg").src = "img/weather/fog.png";
      break;
    case 51:
      weatherText = "Light drizzle";
      document.getElementById("weatherImg").src = "img/weather/drizzle.png";
      break;
    case 53:
      weatherText = "Moderate drizzle";
      document.getElementById("weatherImg").src = "img/weather/drizzle.png";
      break;
    case 55:
      weatherText = "Dense drizzle";
      document.getElementById("weatherImg").src = "img/weather/drizzle.png";
      break;
    case 56:
      weatherText = "Light freezing drizzle";
      document.getElementById("weatherImg").src = "img/weather/drizzle.png";
      break;
    case 57:
      weatherText = "Dense freezing drizzle";
      document.getElementById("weatherImg").src = "img/weather/drizzle.png";
      break;
    case 61:
      weatherText = "Slight rain";
      document.getElementById("weatherImg").src = "img/weather/rain.png";
      break;
    case 63:
      weatherText = "Moderate rain";
      document.getElementById("weatherImg").src = "img/weather/rain.png";
      break;
    case 65:
      weatherText = "Heavy rain";
      document.getElementById("weatherImg").src = "img/weather/rain.png";
      break;
    case 66:
      weatherText = "Light freezing rain";
      document.getElementById("weatherImg").src = "img/weather/rain.png";
      break;
    case 67:
      weatherText = "Heavy freezing rain";
      document.getElementById("weatherImg").src = "img/weather/rain.png";
      break;
    case 71:
      weatherText = "Slight snowfall";
      document.getElementById("weatherImg").src = "img/weather/snow.png";
      break;
    case 73:
      weatherText = "Moderate snowfall";
      document.getElementById("weatherImg").src = "img/weather/snow.png";
      break;
    case 75:
      weatherText = "Heavy snowfall";
      document.getElementById("weatherImg").src = "img/weather/snow.png";
      break;
    case 77:
      weatherText = "Snow grains";
      document.getElementById("weatherImg").src = "img/weather/snow.png";
      break;
    case 80:
      weatherText = "Slight rain showers";
      document.getElementById("weatherImg").src = "img/weather/rain.png";
      break;
    case 81:
      weatherText = "Moderate rain showers";
      document.getElementById("weatherImg").src = "img/weather/rain.png";
      break;
    case 82:
      weatherText = "Violent rain showers";
      document.getElementById("weatherImg").src = "img/weather/rain.png";
      break;
    case 85:
      weatherText = "Slight snow showers";
      document.getElementById("weatherImg").src = "img/weather/snow.png";
      break;
    case 86:
      weatherText = "Heavy snow showers";
      document.getElementById("weatherImg").src = "img/weather/snow.png";
      break;
    case 95:
      weatherText = "Thunderstorm";
      document.getElementById("weatherImg").src = "img/weather/thunder.png";
      break;
    case 96:
      weatherText = "Thunderstorm with slight hail";
      document.getElementById("weatherImg").src = "img/weather/thunder.png";
      break;
    case 99:
      weatherText = "Thunderstorm with heavy hail";
      document.getElementById("weatherImg").src = "img/weather/thunder.png";
      break;
    default:
      weatherText = "Unknown weather";
      document.getElementById("weatherImg").src = "img/weather/unknown.png";
      break;
  }

  console.log(weatherText);
  return weatherText;
}

// Gets Lat/Long: Fetches from API (Lat, Long)
// TODO: Error Handling
async function geoCode() {
  const city = "Rolla";
  document.getElementById("city").innerText = city;
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=10&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error("Could not load geocode data");
    return null;
  }
  const data = await res.json();
  console.log("location");
  console.log(data);

  const location = data.results[0];
  return location;
}

// Top Right Weather: Fetches from API (WeatherCode, Temp, Humidity)
// TODO: Error Handling
async function getWeather() {
  const location = await geoCode();
  if (!location) {
    console.error("Could not load location");
    return;
  }
  const lat = location.latitude;
  const lon = location.longitude;
  const timeZone = "America/Chicago";
  const tempUnit = "fahrenheit";
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,relative_humidity_2m&hourly=uv_index&temperature_unit=${tempUnit}&timezone=${timeZone}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log("weather");
  console.log(data);

  const temperature = data.current.temperature_2m + "°F";
  const humidity = data.current.relative_humidity_2m + "%";
  const weatherCode = data.current.weather_code;
  console.log("Temperature: " + temperature);
  console.log("Humidity: " + humidity);
  console.log("Weather Code: " + weatherCode);
  const weatherDesc = pairWeatherCode(weatherCode);

  document.getElementById("temp").innerText = temperature;
  document.getElementById("humidity").innerText = humidity;
  document.getElementById("weatherCode").innerText = weatherDesc;
}

// Bottom Right Todo List: Fetches
async function getTodo() {
  const res = await fetch("data/todo.json"); // SWAP WITH API

  if (!res.ok) {
    console.error("Could not load todo");
    return;
  }

  const data = await res.json();
  console.log(data);

  // Keep unfinished tasks
  const todo = data.items.filter((items) => items.status == "needsAction");
  const todoSort = todo.sort((a, b) => a.position.localeCompare(b.position));
  console.log(todoSort);

  todoListElement = document.getElementById("todoList");
  todoListElement.innerHTML = "";

  todoSort.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.classList.add("todoItem");

    const topLine = document.createElement("div");
    topLine.classList.add("todoTopLine");

    const circle = document.createElement("span");
    circle.classList.add("todoCircle");

    const title = document.createElement("span");
    title.classList.add("todoTitle");
    title.innerText = task.title;

    const description = document.createElement("div");
    description.classList.add("todoDescription");
    description.innerText = task.notes || task.title;

    topLine.appendChild(circle);
    topLine.appendChild(title);

    listItem.appendChild(topLine);
    listItem.appendChild(description);

    todoListElement.appendChild(listItem);
  });
}

async function getCalendar() {
  const res = await fetch("data/calendar.json");
  if (!res.ok) {
    console.error("Could not load calendar");
    return;
  }
  const data = await res.json();
  console.log(data);
  // Getting Date For Filter Check
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  console.log("Today:", formattedDate);

  const todayItem = data.items.filter(
    (days) => days.start.dateTime.search(formattedDate) !== -1,
  );
  console.log(todayItem);
  //your schedule
  // ----------------
  // 9 AM --- Task (M || H || L)
}

// TODO: Voice thing for later
function updateNow() {
  // ----- Mostly this function holds notes for voice integration -----
  // Voice activated later
  // how many times have I been active today | this week | this month | this year
  // Give option ALL | Weather | Quote | Todo or mix n match?
  // something silly - maybe say something activate then a gif and music pops up or something?
  // vocalize quotes
  // AI integration
  // what am I doing next monday, this week, maybe tie the color I set things on my calendaar to importants
  // add to calendar etc etc
  // spotify???
  getWeather();
  loadQuote();
  getTodo();
}

// add garmin api here

digitalClock();
setInterval(digitalClock, 1000); // Seconds

getTodo();
setInterval(getTodo, 600000); // 10 Minutes

getWeather();
setInterval(getWeather, 900000); // 15 Minutes

getCalendar();
setInterval(getCalendar, 900000); // 15 Minutes

loadQuote();
setInterval(loadQuote, 14400000); // 4 Hours
