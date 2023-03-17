// need to grab value of input box and tie a function to the button to make the a call

var inputBox = document.querySelector("#username")

var inputButton = document.querySelector("#searcBtn")

var inputForm = document.querySelector("#user-form") 

var todaysForecast = document.querySelector("#todaysForecast") 


// need to get the input value to bring up data from api, SEE BELOW
// var cityName = inputBox.value.trim()

function weatherSearch(event) {
    event.preventDefault();
    console.log(inputBox.value.trim())
var APIKey = "0ed67e384b6b6eefec8f0b720d30c576"
// var lat = "44.34"
// var lon = "10.99"
var cityAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${inputBox.value}&appid=${APIKey}`
console.log("city value", inputBox.value)


    fetch(cityAPI)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const lat = data.city.coord.lat
        const lon = data.city.coord.lon
        
        var valTemp = data.list[0].main.temp
        var temp = Math.round(((valTemp-273.15)*1.8)+32)
        var humi = data.list[0].main.humidity
        var date = data.list[0]

        todaysForecast.textContent = temp
        todaysForecast.textContent = humi
        // create HTML element to a vari and text content like above 
        // in the information there is a clear day icon that i must have rendered


        var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`
        fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log("data.list", date)    
        })
      })}


// do a city search function for buttons

inputForm.addEventListener("submit", (e) => weatherSearch(e))

