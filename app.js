// need to grab value of input box and tie a function to the button to make the a call

var inputBox = document.querySelector("#username")

var inputButton = document.querySelector("#searcBtn")

var inputForm = document.querySelector("#user-form")

// var boxValue = inputBox.value.trim()
// fix value 
var cityName = "napa"

function weatherSearch(event) {
    event.preventDefault();
    console.log(inputBox.value.trim())
var APIKey = "0ed67e384b6b6eefec8f0b720d30c576"
// var lat = "44.34"
// var lon = "10.99"
var cityAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`



    fetch(cityAPI)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const lat = data.city.coord.lat
        const lon = data.city.coord.lon
        var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`
        fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            
        })
      })}
    //     if (response.ok) {
    //       response.json().then(function (data) {
    //     //    console.log(response.json)
    //     console.log(data)
    //       });
    //     } else {
    //       alert('Error: ' + response.statusText);
    //     }
    //   })
    //   .catch(function (error) {
    //     alert('Unable to connect to GitHub');
    //   });
  
// };


// do a city search function for buttons

inputForm.addEventListener("submit", (e) => weatherSearch(e))

