function digitalClock() {
    const now = new Date();

    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    const timeString = `${hour}:${minute}:${second}`;

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const dayName = days[now.getDay()];

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const monthName = months[now.getMonth()];

    const dateString = `${dayName}\n ${monthName} ${now.getDate()}, ${now.getFullYear()}`;

    document.getElementById("clockDate").innerText = dateString;
    document.getElementById("clockTime").innerText = timeString;
}

digitalClock();
setInterval(digitalClock, 1000);