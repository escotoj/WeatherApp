var inputBox = document.querySelector("#username");
var inputButton = document.querySelector("#searcBtn");
var inputForm = document.querySelector("#user-form");
var todaysForecast = document.querySelector("#todaysForecast");
var forecast = document.querySelectorAll(".forecast");

function weatherSearch(event, cityName) {
  event.preventDefault();
  todaysForecast.innerHTML = "";
  var APIKey = "0ed67e384b6b6eefec8f0b720d30c576";
  var cityAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;
  console.log("city value", inputBox.value);

  fetch(cityAPI)
    .then((res) => res.json())
    .then((data) => {
      console.log();
      const lat = data.city.coord.lat;
      const lon = data.city.coord.lon;
      var valTemp = data.list[0].main.temp;
      var temp = Math.round((valTemp - 273.15) * 1.8 + 32);
      var humi = data.list[0].main.humidity;
      var date = data.list[0];
      var name = data.city.name;
      var cityWind = data.list[0].wind.speed;
      const currentDate = dayjs().format("dddd, h:mA MM-DD-YYYY");
      var todaysforecastImg = document.createElement("img");
      todaysforecastImg.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
      );
      var todaysforecastTemp = document.createElement("p");
      todaysforecastTemp.innerHTML = "Temp: " + temp;
      var todaysforecastWind = document.createElement("p");
      todaysforecastWind.innerHTML = "Humidity: " + humi;
      var todaysforecastCity = document.createElement("p");
      todaysforecastCity.innerHTML = "City: " + name;
      var todaysforecastWind = document.createElement("p");
      todaysforecastWind.innerHTML = "Wind Speed: " + cityWind + " miles/hr";
      var todayDay = document.createElement("p");
      todayDay.innerHTML = "Current Forecast for " + currentDate;
      todaysForecast.append(todayDay);
      todaysForecast.append(todaysforecastImg);
      todaysForecast.append(todaysforecastTemp);
      todaysForecast.append(todaysforecastWind);
      todaysForecast.append(todaysforecastCity);
      var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          console.log("data.list", date);
          for (var i = 0; i < forecast.length; i++) {
            forecast[i].innerHTML = "";
            var index = i * 8 + 4;
            var forecastImg = document.createElement("img");
            forecastImg.setAttribute(
              "src",
              `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`
            );
            var todaysforecastImg = document.createElement("img");
            todaysforecastImg.setAttribute(
              "src",
              `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`
            );
            var forecastTemp = document.createElement("p");
            forecastTemp.innerHTML =
              "Temp: " + Math.floor(data.list[index].main.temp) + "&#176F";
            var forecastWind = document.createElement("p");
            forecastWind.innerHTML =
              "Humidity: " + data.list[index].main.humidity;
            var forecastCity = document.createElement("p");
            forecastCity.innerHTML = "City: " + data.city.name;
            var forecastWind = document.createElement("p");
            forecastWind.innerHTML =
              "Wind Speed: " + data.list[index].wind.speed + " miles/hr";
            var fiveDay = document.createElement("p");
            fiveDay.innerHTML = "5-day Forecast";
            forecast[i].append(fiveDay);
            forecast[i].append(forecastImg);
            forecast[i].append(forecastTemp);
            forecast[i].append(forecastWind);
            forecast[i].append(forecastCity);
          }
        });
    });
}
var cityArr = [];
inputForm.addEventListener("submit", (e) => {
  var cityName = inputBox.value;
  weatherSearch(e, cityName);
  cityArr.push(inputBox.value.trim());
  localStorage.setItem("city", JSON.stringify(cityArr));
  renderSearches();
});

var searchedCities = JSON.parse(localStorage.getItem("city"));

function renderSearches() {
  var cityLi = document.createElement("li");
  cityLi.innerHTML = inputBox.value.trim();
  inputForm.append(cityLi);
  cityLi.addEventListener("click", function (e) {
    var searchValue = cityLi.innerHTML;
    weatherSearch(e, searchValue);
  });
}


    
            