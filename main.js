const searchButton = document.querySelector(".search__field button");

const showWeather = () => {
  //api settings
  // https://openweathermap.org/current

  const cityName = document.querySelector(".search__field input").value;
  const apiKey = "82afe5df5537b84dcc1cf4cbe099cb0b";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      displayWeatherInfo(
        json.main.temp,
        json.weather[0].main,
        json.main.humidity,
        json.wind.speed
      );
    })
    .catch((err) => console.log(err));
};

function displayWeatherInfo(temp, desc, hum, wind) {
  const temperature = document.querySelector(".temperature");
  const description = document.querySelector(".description");
  const humidity = document.querySelector(".humidity--percent");
  const windSpeed = document.querySelector(".wind--speed");
  const weatherImg = document.querySelector(".weather__info img");

  //convert kelvin to celsius and fixed to 1 places after comma
  //display data
  temperature.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  description.textContent = desc;
  humidity.textContent = `${hum}%`;
  windSpeed.textContent = `${wind}km/h`;

  //display IMG
  weatherImg.src = `./images/${desc}.png`;

  const atmosphere = [
    "Mist",
    "Smoke",
    "Haze",
    "Dust",
    "Fog",
    "Sand",
    "Ash",
    "Squall",
    "Tornado",
  ];

  if (atmosphere.includes(desc)) {
    weatherImg.src = `./images/mist.png`;
  }

  const rain = ["Rain", "Drizzle"];
  if (rain.includes(desc)) {
    weatherImg.src = `./images/rain.png`;
  }

  // if (desc === "Rain") {
  //   weatherImg.innerHTML = `<img src="./images/${desc}.png" alt="" />`;
  // }
}

searchButton.addEventListener("click", showWeather);
