const cityInput = document.querySelector("#city-name");
const searchBtn = document.querySelector(".search-img");  // Fixed incorrect class name

async function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=58fba2b4345ced9f417ff17451d94b75&units=metric`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        console.log(data);

        // Update UI with weather data
        document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
        document.querySelector(".city").innerText = data.name;
        document.querySelector(".percent").innerText = data.main.humidity + "%";
        document.querySelector(".speed").innerText = data.wind.speed + " km/hr";

        // Update weather image
        const weatherImg = document.querySelector(".weather-img img");
        const weatherCondition = data.weather[0].main.toLowerCase();

        if (weatherCondition.includes("clear")) weatherImg.src = "images/clear.png";
        else if (weatherCondition.includes("clouds")) weatherImg.src = "images/clouds.png";
        else if (weatherCondition.includes("drizzle")) weatherImg.src = "images/drizzle.png";
        else if (weatherCondition.includes("mist")) weatherImg.src = "images/mist.png";
        else if (weatherCondition.includes("rain")) weatherImg.src = "images/rain.png";
        else if (weatherCondition.includes("snow")) weatherImg.src = "images/snow.png";
        else weatherImg.src = "images/default.png";  // Fallback image

    } catch (error) {
        alert("City not found! Please enter a valid city name.");
    }
}

// 🔹 Click event to fetch weather
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter the city name!");
    } else {
        fetchWeather(city);
    }
});

// 🔹 Press Enter to trigger search
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
