const weatherMain = document.querySelector(".weather__main");
const searchButton = document.querySelector(".search__field button");
const weatherImg = document.querySelector(".weather__info img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity--percent");
const windSpeed = document.querySelector(".wind--speed");
const weatherOther = document.querySelector(".weather__other");
const contentDiv = document.querySelector(".content");

const showWeather = () => {
  //api settings
  // https://openweathermap.org/current

  const cityName = document.querySelector(".search__field input").value;
  const apiKey = "82afe5df5537b84dcc1cf4cbe099cb0b";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        error404();
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
  weatherOther.style.display = "flex";
  weatherMain.classList.add("weather__main--active");
  weatherMain.classList.remove("weather__main--notFound");
  contentDiv.style.transform = "translateY(0)";
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
}

//display IMG err404 (incorrectly entered town in searching)
function error404() {
  weatherMain.classList.add("weather__main--notFound");
  weatherMain.classList.remove("weather__main--active");
  weatherImg.src = `./images/404.png`;
  weatherOther.style.display = "none";
  temperature.textContent = "";
  description.textContent = "Location Not Found";
  contentDiv.style.transform = "translateY(0)";
}

searchButton.addEventListener("click", showWeather);
