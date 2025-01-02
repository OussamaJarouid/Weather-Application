const searchInp = document.querySelector(".searchInput");
const btn = document.querySelector("button");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");

const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const appKey = "66fdb79bd169cbaeaf35b8613934a2c5";
async function weather(citySelected = "Morocco") {
  try {
    const response = await fetch(apiURL + citySelected + `&appid=${appKey}`);
    let data = await response.json();

    if (data.cod !== 200) {
      showToast("Unable to fetch weather data");
    } else {
      temp.innerHTML = Math.floor(data.main.temp) + "°C";
      humidity.innerHTML = data.main.humidity + "%";
      city.innerHTML = data.name;
      wind.innerHTML = Math.round(data.wind.speed) + " km/h";
      if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      }
      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      }
      if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/dizzle.png";
      }
      if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      }
      if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      }
      if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
      }
    }
  } catch (error) {
    showToast("An unexpected error occurred. Please try again.", "red");
  }
}

searchInp.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    btn.click();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  weather();
});

btn.addEventListener("click", () => {
  if (!searchInp.value.trim()) {
    showToast("Please enter a city name", "red");
    return;
  }
  weather(searchInp.value);
});

function showToast(
  message,
  backgroundColor = "linear-gradient(to right, #ff5f6d, #ffc371)"
) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    backgroundColor,
  }).showToast();
}
