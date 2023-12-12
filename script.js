const apiKey = "e9fd9ccace6a138b544e9751941c8c93";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const forecastCards = document.querySelectorAll(".forecast-card");


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    console.log(data);

    // Update today's weather
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".feels_like").innerHTML = Math.round(data.main.feels_like) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "clear.png";
    }
    if(data.weather[0].main == "Rain"){
        weatherIcon.src = "rain.png";
    }
    if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "mist.png";
    }

    // Update forecast cards (next 3 days)
    const forecastData = await fetchForecast(city);
    updateForecastCards(forecastData);

}

async function fetchForecast(city) {
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=${apiKey}`;
    const forecastResponse = await fetch(forecastApiUrl);
    return await forecastResponse.json();
}

function updateForecastCards(forecastData) {
    // Assume forecastData.list contains forecast details for the next 3 days
    for (let i = 0; i < 3; i++) {
        const forecast = forecastData.list[i * 8]; // Adjust the index based on your data structure
        const forecastCard = forecastCards[i];

        // Update forecast card
        forecastCard.querySelector("h2").textContent = `Day ${i + 1}`;
        forecastCard.querySelector(".temp").textContent = `${Math.round(forecast.main.temp)}°C`;
        forecastCard.querySelector(".humidity").textContent = `${forecast.main.humidity}%`;
        forecastCard.querySelector(".wind").textContent = `${forecast.wind.speed} km/h`;
    }
}

function handleSearch() {
    checkWeather(searchBox.value);
}

searchButton.addEventListener("click", handleSearch);

// Handle "Enter" key press on the input field
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

// Initial weather check for Dhaka
checkWeather("Dhaka");
