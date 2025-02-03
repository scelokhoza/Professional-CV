function fetchWeather(latitude, longitude) {
    const apiKey = '8185dab8d28022fc9db915fb4a6fc6e3';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        document.getElementById('Weather').innerText = `Weather: ${data.weather[0].description}, ${data.main.temp}C`;
    })
    .catch(() =>{ 
        document.getElementById('Weather').innerText = "Weather info unavailable.";
    });
}

function fetchLocation() {
    if (navigator.geolocation){
        fetch('https://ipinfo.io/json?token=0eda6b5e4ee85f')
        .then(response => response.json())
        .then(data => {
            const [latitude, longitude] = data.loc.split(',');
            document.getElementById('location').innerText = `Country: ${data.country}, City: ${data.city}`;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            console.log(`Country: ${data.country}, City: ${data.city}`)
            document.addEventListener('DOMContentLoaded', (event) => {
                fetchWeather(latitude, longitude);
            });
            
        })
        .catch(error => console.error('Error fetching location:', error));
    } else {
        document.getElementById('location').innerText = "Geolocation not supported.";
    }
}

fetchLocation()