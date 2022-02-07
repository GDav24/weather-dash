var userFormElem = document.querySelector("#user-form");

var cityInputElem = document.querySelector("#city")

var cityCurrentWeatherEl = document.querySelector("#weather-container")

var apiKey = "77b28197bb72ab7635a0dc025c9427d0";

var weatherSearchTerm = document.querySelector("#city-search-term")

var cityLat = null;

var cityLon = null;

var cityCurrentWeather = null;

var cityWindSpeed = null;

var cityHumidity = null;

var cityUv = null;

var getCityCoord = function(city, state) {
    console.log("function was called")

    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + "US" + "&limit=" + 5 + "&appid=" + apiKey;
    console.log("function was called")

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                console.log(response)
                response.json().then(function(data) {
                    console.log ("it works", data)
                    cityLat = data[0].lat
                    console.log("mmg", cityLat)
                    cityLon = data[0].lon
                    console.log("mmg", cityLon)
                    getCityWeather(cityLat, cityLon)
                })
            }
        })

};

getCityCoord("Maitland", "FL")

var getCityWeather = function(cityLat, cityLon) {
    console.log("cityweather")

    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + apiKey;    

    fetch(weatherUrl)
        .then(function(response) {
            if (response.ok) {
                console.log(response)
                response.json().then(function(data) {
                    console.log ("success", data)
                    cityCurrentWeather = Math.round((data.main.temp - 273.15) * 1.8 + 32)
                    console.log("yes", cityCurrentWeather)
                    cityCurrentWind = data.wind.speed
                    displayCurrentWeather(cityCurrentWeather)
                    
                    var tempEl = document.createElement("div");
                    tempEl.innerHTML = "Temp:" + " " + cityCurrentWeather + "F°"

                    var windEl = document.createElement("div");
                    windEl.innerHTML = "Wind Speed:" + " " + cityCurrentWind + "MPH"
                    console.log(cityCurrentWind)

                    cityCurrentWeatherEl.appendChild(tempEl)
                    cityCurrentWeatherEl.appendChild(windEl)
                    console.log("appended")
                })
            }   
        })   

};   



var formSubmitListener = function(event) {
    event.preventDefault();
    var city =cityInputElem.value.trim();

    if (city) {
        getCityCoord(city);
        cityInputElem.value = "";
    } else {
        alert("Please enter valid city name")
    }
    console.log(event);
};

var displayCurrentWeather = function(cityCurrentWeather, searchCity) {
    console.log(cityCurrentWeather)
    // clear old content
    cityCurrentWeatherEl.textContent = "";
    weatherSearchTerm.textContent = searchCity;
    console.log(searchCity)
}
userFormElem.addEventListener("submit", formSubmitListener);