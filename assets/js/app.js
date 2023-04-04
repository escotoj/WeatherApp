// here are the variables to select different elements in the DOM
var inputBox = document.querySelector("#username");
var inputButton = document.querySelector("#searcBtn");
var inputForm = document.querySelector("#user-form");
var todaysForecast = document.querySelector("#todaysForecast");
var forecast = document.querySelectorAll(".forecast");

// creating the main function in the app which has the API call, that we will later use it to call it 
function weatherSearch(event) {
  event.preventDefault(); //since we are workign with a form this is needed in order for it to not reload automaticly
  var APIKey = "0ed67e384b6b6eefec8f0b720d30c576";
  var cityAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${inputBox.value}&appid=${APIKey}`;
  console.log("city value", inputBox.value);

  // this fetch call is using arrow notation 
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
      // using dayjs to create the date variable with slected format
      const currentDate = dayjs().format("dddd, h:mA MM-DD-YYYY")
      // const b = currentDate.add(1, 'day')
      // const c = b.format("dddd");


      // originally wanted to use this to display the DOM but the styling was ugly and could not get it to work so switch to the below option
      // ----------------------------
      // todaysForecast.textContent = 
      // "Current Weather: " +
      //   "City: " +
      //     name +
      //     "  Current Temp: " +
      //     temp +
      //     "  Humidity:" +
      //     humi +
      //     "  Wind :" +
      //     cityWind +
      //     " mile/hr" +
      //     " Date & Time: " +
      //     currentDate;
// -------------------------------
// here we create an elelment and then target the DOM to append the eleent we created.

      var todaysforecastImg = document.createElement("img");
      todaysforecastImg.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`);
      var todaysforecastTemp = document.createElement("p");
            todaysforecastTemp.innerHTML =
              "Temp: " + temp;
            //   dayjs().weekday(index) + trying to add 5 day dates
      var todaysforecastWind = document.createElement("p");
            todaysforecastWind.innerHTML =
              "Humidity: " + humi;
      var todaysforecastCity = document.createElement("p");
            todaysforecastCity.innerHTML = "City: " + name;
      var todaysforecastWind = document.createElement("p");
            todaysforecastWind.innerHTML = "Wind Speed: " + cityWind + " miles/hr";
      var todayDay = document.createElement("p");
            todayDay.innerHTML =
              "Current Forecast for " + currentDate;
            todaysForecast.append(todayDay);
            todaysForecast.append(todaysforecastImg);
            todaysForecast.append(todaysforecastTemp);
            todaysForecast.append(todaysforecastWind);
            todaysForecast.append(todaysforecastCity);
          
      
// API provided by weatherAPI for icons to render uses a fetch call with variabke from above like lat lot and APIKey
      var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data);
          console.log("data.list", data.list[0].dt_txt);
        //   var weekday = require('dayjs/plugin/weekday')
        //   dayjs.extend(weekday)

        // for-loop for the 5-day forcast - that hast element created out of thin air. 
          for (var i = 0; i < forecast.length; i++) {
            forecast[i].innerHTML = "";
            var index = i * 8 + 4;
            var forecastImg = document.createElement("img");
            forecastImg.setAttribute(
              "src",
              `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`);
            
            var todaysforecastImg = document.createElement("img");
            todaysforecastImg.setAttribute(
              "src",
              `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`,
            );
            var forecastTemp = document.createElement("p");
            forecastTemp.innerHTML =
              "Temp: " + Math.floor(data.list[index].main.temp) + "&#176F";
            //   dayjs().weekday(index) + trying to add 5 day dates
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
              data.list[index].dt_txt;
            forecast[i].append(fiveDay);
            forecast[i].append(forecastImg);
            forecast[i].append(forecastTemp);
            forecast[i].append(forecastWind);
            forecast[i].append(forecastCity);
}
        });
    });
}

// do a city search function for buttons
// var cityArr = [];
// inputForm.addEventListener("submit", (e) => {
//   weatherSearch(e);
//   cityArr.push(inputBox.value.trim());
//   localStorage.setItem("city", JSON.stringify(cityArr));
//   renderSearches();
// });


// weather search is being called twice line 110 and 126

// this last function is for the search history, creating elements from thin air,  i cant seem to get the right data for when cicking on the button

function renderSearches() {
  var cityLi = document.createElement("button");
  cityLi.innerHTML = inputBox.value.trim();
  inputForm.append(cityLi);
  inputBox.value = '';
  
  cityLi.addEventListener("click", function () {
    var searchValue = cityLi.innerHTML;
    var searchedCities = JSON.parse(localStorage.getItem("city")); // needs JSON.parse maybe
    console.log(searchedCities);
    weatherSearch(searchedCities);


  });
}
