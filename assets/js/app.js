// here we select the elements from the dom we want to use

var inputBox = document.querySelector("#username");
var inputButton = document.querySelector("#searcBtn");
var inputForm = document.querySelector("#user-form");
var todaysForecast = document.querySelector("#todaysForecast");
var forecast = document.querySelectorAll(".forecast");
var daysforFiveDayForecast = document.querySelector(".subtitle");

// main function of this app, handles the fetch call and has the for-loop
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
      const currentDate = dayjs().format("dddd, h:mmA (MM-DD-YYYY) ");
      var todaysforecastImg = document.createElement("img");
      todaysforecastImg.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
      );
      var todaysforecastTemp = document.createElement("p");
      todaysforecastTemp.innerHTML = "Temp: " + temp + "°F";
      var todaysforecastHumi = document.createElement("p");
      todaysforecastHumi.innerHTML = "Humidity: " + humi + "%";
      var todaysforecastCity = document.createElement("p");
      todaysforecastCity.innerHTML = "City: " + name;
      var todaysforecastWind = document.createElement("p");
      todaysforecastWind.innerHTML = "Wind: " + cityWind + " MPH";
      var todayDay = document.createElement("p");
      todayDay.innerHTML = "" + currentDate;
      todaysForecast.append(todayDay);
      todaysForecast.append(todaysforecastCity);
      todaysForecast.append(todaysforecastImg);
      todaysForecast.append(todaysforecastTemp);
      todaysForecast.append(todaysforecastHumi);
      todaysForecast.append(todaysforecastWind);
      var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          var day = new Date();
          var week = new Array(
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          );
          // here is where i combined the for-loops to make one by following an online example
          for (i = 0, ind = 0; i < forecast.length && ind < 6; i++, ind++) {
            var fivedayForecastDay = document.createElement("p");
            var dayIndex = (day.getDay() + ind + 1) % 7;
            var dayFormula = week[dayIndex];
            fivedayForecastDay.innerHTML = dayFormula;
            console.log("data.list", dayFormula);
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
            var forecastHumi = document.createElement("p");
            forecastHumi.innerHTML =
              "Humidity: " + data.list[index].main.humidity + "%";
            var forecastCity = document.createElement("p");
            forecastCity.innerHTML = "City: " + data.city.name;
            var forecastWind = document.createElement("p");
            forecastWind.innerHTML =
              "Wind: " + data.list[index].wind.speed + " MPH";

          // we append one for-loop to the other to render the forcast days
            forecast[i].append(fivedayForecastDay);
            forecast[i].append(forecastImg);
            forecast[i].append(forecastCity);
            forecast[i].append(forecastTemp);
            forecast[i].append(forecastHumi);
            forecast[i].append(forecastWind);
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
// this next funtion is for the seacrh history
function renderSearches() {
  var cityLi = document.createElement("button");
  cityLi.innerHTML = inputBox.value.trim();
  inputForm.append(cityLi);
  cityLi.addEventListener("click", function (e) {
    var searchValue = cityLi.innerHTML;
    weatherSearch(e, searchValue);
  });
}
