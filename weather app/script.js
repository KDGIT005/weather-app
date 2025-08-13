async function getWeather() {
    const location = document.getElementById("location").value.trim();
    const resultDiv = document.getElementById("result");

    if (!location) {
        resultDiv.innerHTML = "⚠ Please enter a location.";
        return;
    }

    try {
        const apiKey = "4cbdd598a6e943739ca215156251308";
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = `❌ ${data.error.message}`;
            return;
        }

        const temp = data.current.temp_c;
        const feelsLike = data.current.feelslike_c;
        const condition = data.current.condition.text;
        const icon = data.current.condition.icon;
        const humidity = data.current.humidity;
        const time = data.location.localtime;

        resultDiv.innerHTML = `
            <div class="fade-in">
                <h2>${data.location.name}, ${data.location.country}</h2>
                <img src="${icon}" alt="Weather icon" class="weather-icon">
                <p><b>${condition}</b></p>
                <p>🌡 Temperature: <b>${temp}°C</b></p>
                <p>🤗 Feels Like: ${feelsLike}°C</p>
                <p>💧 Humidity: ${humidity}%</p>
                <p>🕒 Local Time: ${time}</p>
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = "❌ Failed to fetch weather data.";
    }
}
