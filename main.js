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
      displayWeatherInfo(json.main.temp, json.weather[0].description);
    })
    .catch((err) => console.log(err));
};

function displayWeatherInfo(temp, desc) {
  const temperature = document.querySelector(".temperature");
  const description = document.querySelector(".description");
  temperature.textContent = temp;
  description.textContent = desc;
}

searchButton.addEventListener("click", showWeather);
