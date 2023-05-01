const getWeather = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6c375a9dcfc6af1ff2fe5c2411c5605e`
  );
  const JSONData = await response.json();
  if (JSONData) {
    generateWeather(JSONData);
  }
};

document.getElementById("search").addEventListener("keypress", (e) => {
  if (e.key == "Enter" && e.target.value) {
    getWeather(e.target.value);
  }
});

const generateWeather = (weather) => {
  const temp = (weather.main.temp - 273.15).toFixed(1);
  document.getElementById("weather").innerHTML = `
    <div class="weather">
      <div class="name">${weather.name}</div>
      <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png">
      <div class="temp">${temp}°C</div>
      <div>${weather.weather[0].main}</div>
    </div>
  `;
};
