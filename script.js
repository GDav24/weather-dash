var userFormElem = document.querySelector("#user-btn");

var cityInputElem = document.querySelector("#city")

var cityCurrentWeatherEl = document.querySelector("#weather-container")

var apiKey = "d4b90e8410e1e6340fdef8cb4dc8c977";

var weatherSearchTerm = document.querySelector("#city-search-term")

var cityLat = null;

var cityLon = null;

var cityCurrentWeather = null;

var cityWindSpeed = null;

var cityHumidity = null;

var cityUv = null;

var cityName = null;

let today = new Date().toLocaleDateString()

console.log(today)

var getCityCoord = function(city) {
    console.log("function was called")

    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + "US" + "&limit=" + 5 + "&appid=" + apiKey;
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
                    cityName = data[0].name
                })
            }
        })

};

// getCityCoord("Maitland", "FL")

var getCityWeather = function(cityLat, cityLon) {
    console.log("cityweather")

    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=" + "minutely,hourly,daily,alerts" + "&appid=" + apiKey;    

    fetch(weatherUrl)
        .then(function(response) {
            if (response.ok) {
                console.log(response)
                response.json().then(function(data) {
                    console.log ("success", data)
                    cityCurrentWeather = Math.round((data.current.temp - 273.15) * 1.8 + 32)
                    console.log("yes", cityCurrentWeather)
                    cityCurrentWind = Math.round((data.current.wind_speed) * 2.2369)
                    cityCurrentHumidity = data.current.humidity
                    cityCurrentUv = data.current.uvi
                    // displayCurrentWeather(cityCurrentWeather)
                    

                    var nameEl = document.createElement("div");
                    nameEl.innerHTML = cityName + "  " + today
                    
                    var tempEl = document.createElement("div");
                    tempEl.innerHTML = "Temp:" + " " + cityCurrentWeather + "F°"

                    var windEl = document.createElement("div");
                    windEl.innerHTML = "Wind Speed:" + " " + cityCurrentWind + " " + "MPH"
                    console.log(cityCurrentWind)

                    var humidityEl = document.createElement("div");
                    humidityEl.innerHTML = "Humidity" + " " + cityCurrentHumidity + " " + "%"
                    
                    var uvEl = document.createElement("div");
                    uvEl.innerHTML = "UV Index" + " " + cityCurrentUv 
                    if (cityCurrentUv >= 11) {
                        uvEl.classList.add("extreme")
                    }
                    if (cityCurrentUv == 9 || cityCurrentUv == 10 || cityCurrentUv == 8) {
                        uvEl.classList.add("very-high")
                    }
                    if (cityCurrentUv == 6 || cityCurrentUv == 7) {
                        uvEl.classList.add("high")
                    }
                    if (cityCurrentUv == 5 | cityCurrentUv == 4 | cityCurrentUv == 3) {
                        uvEl.classList.add("moderate")
                    }
                    if (cityCurrentUv == 1 || cityCurrentUv == 2 || cityCurrentUv == 0) {
                        uvEl.classList.add("low")
                    }


                    cityCurrentWeatherEl.appendChild(nameEl)
                    cityCurrentWeatherEl.appendChild(tempEl)
                    cityCurrentWeatherEl.appendChild(windEl)
                    cityCurrentWeatherEl.appendChild(humidityEl)
                    cityCurrentWeatherEl.appendChild(uvEl)
                    console.log("appended")
                })
            }    
        })   

};   



var formSubmitListener = function(event) {
    event.preventDefault();
    var city = cityInputElem.value;

    if (city) {
        getCityCoord(city);
        cityInputElem.value = "";
    } else {
        alert("Please enter valid city name")
    }
    console.log(event);
};

// var displayCurrentWeather = function(cityCurrentWeather, searchCity) {
//     console.log(cityCurrentWeather)
//     // clear old content
//     cityCurrentWeatherEl.textContent = "";
//     weatherSearchTerm.textContent = searchCity;
//     console.log(searchCity)
// }
userFormElem.addEventListener("click", formSubmitListener);