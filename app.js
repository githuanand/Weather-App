function getWeatherData(location) {
  const apiKey = "9dd15a4b1cda27726ace390128d14f27";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Location not found");
      }
      return response.json();
    })
    .then(data => {
      const weatherData = {
        temperature: data.main.temp,
        condition: data.weather[0].main,
        location: data.name,
      };
      return weatherData;
    });
}

function updateUI(weatherData) {
  const temperature = document.querySelector("#temperature");
  const condition = document.querySelector("#condition");
  const location = document.querySelector("#location");
  const weatherBox = document.querySelector(".weather-box");

  temperature.textContent = `${weatherData.temperature}°C`;
  condition.textContent = weatherData.condition;
  location.textContent = weatherData.location;

  // Change background based on weather condition
  document.body.style.background = getBackground(weatherData.condition);

  // Add fade-in effect for weather box
  weatherBox.style.opacity = 0;
  setTimeout(() => {
      weatherBox.style.opacity = 1;
  }, 100);
}

function getBackground(condition) {
  switch (condition.toLowerCase()) {
      case 'clear':
          return 'linear-gradient(135deg, #FFD700, #FF8C00)';
      case 'clouds':
          return 'linear-gradient(135deg, #B0C4DE, #708090)';
      case 'rain':
          return 'linear-gradient(135deg, #00c6ff, #0072ff)';
      case 'snow':
          return 'linear-gradient(135deg, #E0FFFF, #4682B4)';
      case 'thunderstorm':
          return 'linear-gradient(135deg, #2f4f4f, #000000)';
      default:
          return 'linear-gradient(135deg, #87CEEB, #4682B4)';
  }
}

function showError(message) {
  const weatherBox = document.querySelector(".weather-box");
  weatherBox.innerHTML = `<p style="color: red;">${message}</p>`;
}

const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#search-bar");

searchBtn.addEventListener("click", () => {
  const location = searchBar.value.trim();
  if (location) {
      getWeatherData(location)
        .then(weatherData => {
          updateUI(weatherData);
        })
        .catch(error => {
          showError(error.message);
        });
  } else {
      showError("Please enter a location.");
  }
});
