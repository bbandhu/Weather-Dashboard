var searchInput = document.querySelector("#city");
var searchButton = document.querySelector("#submitButton");
var APIKey = "b91874a7b2e580ff5b02fdd3f2deab0c";
var userFormEl = document.querySelector(".form-row");
var weatherContainerEl = document.querySelector('#weather-container');
var weatherSearchTerm = document.querySelector('#city-search-term');
var lon;
var lat;


var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = searchInput.value.trim();
  console.log(city);
  getWeatherDataCors(city);
};


//function to get the latitute and longitude for a given city
//API-1
var getWeatherDataCors = function (city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        lon = data.coord.lon;
        lat = data.coord.lat;
        console.log(lon, lat);
        getWeatherData(lat, lon);
      });
    }
  });
};


var getWeatherData = function (lat, lon) {
  console.log(lon, lat);
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    `${lat}` +
    "&lon=" +
    `${lon}` +
    "&appid=" +
    APIKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (weatherData) {
        console.log(weatherData);
        displayWeather(weatherData);
      });
    }
  });
};

var displayWeather = function (data) {
  if (data.length === 0) {
    weatherContainerEl.textContent = "No report";
    return;
  }

  for (var i = 0; i < 5 ; i++) {
    
    let humidity = data.list[i].main.humidity;
    let temp = kelvinToFahrenheit(data.list[i].main.temp);
  
    let wind = data.list[i].wind.speed;
    let dateFromAPI = data.list[i].dt_txt;

    let timestamp = new Date(dateFromAPI).getTime();
    let Day = new Date(timestamp).getDate();
    let Month = new Date(timestamp).getMonth() + 1;
    let Year = new Date(timestamp).getFullYear();
    let date = `${Month}/${Day}/${Year}`;

    var icon = data.list[i].weather[0].icon;
    var des = data.list[i].weather[0].description;

    const weatherCardContainer = document.getElementById("weather-card-container");
    const weatherCard = document.createElement("div");
    weatherCard.classList.add("col-sm-8")
    weatherCard.classList.add("card");
    
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    weatherCard.appendChild(cardBody);
    
    const cityName = document.createElement("h2");
    cityName.textContent = city.value;

    const dateField =document.createElement("p");
    dateField.textContent = date;
    cardBody.appendChild(dateField);
    
    const temperature = document.createElement("p");
    temperature.textContent = "Temp: " +temp +" F"; 
    cardBody.appendChild(temperature);
    
    const weatherIcon = document.createElement("img");
    weatherIcon.setAttribute('src', `http://openweathermap.org/img/w/${icon}.png`);
    cardBody.appendChild(weatherIcon);
    
    const humid = document.createElement("p");
    humid.textContent = "Humidity: " +humidity +" %"
    cardBody.appendChild(humid);
    
    const windSpeed = document.createElement("p");
    windSpeed.textContent = "Wind: " +wind +" MPH"
    cardBody.appendChild(windSpeed);

    weatherCardContainer.appendChild(weatherCard);
  }
};

searchButton.addEventListener("click", formSubmitHandler);


function kelvinToFahrenheit(kelvin) {
  return (kelvin - 273.15) * 9/5 + 32;
}







