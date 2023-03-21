// need to grab value of input box and tie a function to the button to make the a call

var inputBox = document.querySelector("#username");

var inputButton = document.querySelector("#searcBtn");

var inputForm = document.querySelector("#user-form");

var todaysForecast = document.querySelector("#todaysForecast");

var forecast = document.querySelectorAll(".forecast");

// need to get the input value to bring up data from api, SEE BELOW
// var cityName = inputBox.value.trim()

function weatherSearch(event) {
  event.preventDefault();
  //   console.log(inputBox.value.trim());
  var APIKey = "0ed67e384b6b6eefec8f0b720d30c576";
  // var lat = "44.34"
  // var lon = "10.99"
  var cityAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${inputBox.value}&appid=${APIKey}`;
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

    //   var dayImg = document.createElement("img");
    //         dayImg.setAttribute(
    //           "src",
    //           `https://openweathermap.org/img/wn/${data.list.weather[0].icon}@2x.png`
    //         );
    //         todaysForecast[i].append(dayImg);
      // doing a double search and want breaks in between

      todaysForecast.textContent = 
      "Current Weather: " +
        "City: " +
          name +
          "\n" +
          "  Current Temp: " +
          temp +
          "  Humidity:" +
          humi +
          "  Wind :" +
          cityWind +
          " mile/hr" +
          " Date & Time: " +
          currentDate;
      //   var todaysImg = document.createElement("img");
      //         todaysImg.setAttribute(
      //           "src",
      //           `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`
      //         );

      // create HTML element to a vari and text content like above
      // in the information there is a clear day icon that i must have rendered

      var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data);
          console.log("data.list", date);
          for (var i = 0; i < forecast.length; i++) {
            forecast[i].innerHTML = "";
            var index = i * 8 + 4;
            var forecastImg = document.createElement("img");
            forecastImg.setAttribute(
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
            // var forecastDate = document.createElement("p");
            // forecastDate.innerHTML = "Date: " + dayjs().format("dddd, h:mA MM-DD-YYYY");
            var forecastWind = document.createElement("p");
            forecastWind.innerHTML = "Wind Speed: " + data.list[index].wind.speed + " miles/hr";
            var fiveDay = document.createElement("p");
            fiveDay.innerHTML =
              "5-day Forecast";
            forecast[i].append(fiveDay);
            forecast[i].append(forecastImg);
            forecast[i].append(forecastTemp);
            forecast[i].append(forecastWind);
            forecast[i].append(forecastCity);
            // forecast[i].append(forecastDate);

          }
        });
    });
}

// do a city search function for buttons
var cityArr = [];
inputForm.addEventListener("submit", (e) => {
  weatherSearch(e);
  cityArr.push(inputBox.value.trim());
  localStorage.setItem("city", JSON.stringify(cityArr));
  renderSearches();
});


// weather search is being called twice line 110 and 126
var searchedCities = JSON.parse(localStorage.getItem("city"));

function renderSearches() {
  var cityLi = document.createElement("li");
  cityLi.innerHTML = inputBox.value.trim();
  inputForm.append(cityLi);
  cityLi.addEventListener("click", function () {
    var searchValue = cityLi.innerHTML;
    weatherSearch(searchValue);
  });
}
