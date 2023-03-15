// need to grab value of input box and tie a function to the button to make the a call

var inputBox = document.querySelector("#username")

var inputButton = document.querySelector("#searcBtn")

var inputForm = document.querySelector("#user-form")



var boxValue = inputBox.value.trim()
// console.log(inputBox.value)

function weatherSearch(event) {
    event.preventDefault();
    console.log(inputBox.value.trim())


// this url will have three thing lat an dlog and my own api, must concat like
// lat=44.34&lon=10.99
var APIKey = "0ed67e384b6b6eefec8f0b720d30c576"
var lat = "44.34"
var lon = "10.99"
    var apiUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`

  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
           console.log(response.json)
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to GitHub');
      });
  
};

inputForm.addEventListener("submit", weatherSearch)

