function fetchWeather(latitude, longitude) {
    const apiKey = '';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        document.getElementById('weather').innerText = `Weather: ${data.weather[0].description}, ${data.main.temp}C`;
    })
    .catch(() =>{
        document.getElementById('weather').innerText = "Weather info unavailable.";
    });
}

function fetchLocation() {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            const {
                latitude, longitude
            } = position.coords;
            document.getElementById('location').innerText = `Lat: ${latitude}, Lon: ${longitude}`;
            fetchWeather(latitude, longitude);
        }, () => {
            document.getElementById('location').innerText = "Location access denied.";
        });
    } else {
        document.getElementById('location').innerText = "Geolocation not supported.";
    }
}

fetchLocation()