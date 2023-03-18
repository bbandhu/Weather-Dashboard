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
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        displayWeather(data);
      });
    }
  });
};

var displayWeather = function (data) {
  if (data.length === 0) {
    weatherContainerEl.textContent = "No report";
    return;
  }
  for (var i = 0; i < 5; i++) {
    var hum = data.list[i].main.humidity;
    var temp = data.list[i].main.temp;
   // temp = tempConverter(temp);
  
    var wind = data.list[i].wind.speed;
    var date = data.list[i].dt_txt;
    date= date.split(' ')[0];
    var icon = data.list[i].weather.icon;
    var des = data.list[i].weather.description;
    //var city = data.list[i].city.name;
    console.log(hum, temp, wind);
    const weatherCardContainer = document.getElementById("weather-card-container");
    // Create a new weather card element
    const weatherCard = document.createElement("div");
    weatherCard.classList.add("card");
    
    // Add the card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    weatherCard.appendChild(cardBody);
    
    // Add the city name
    const cityName = document.createElement("h2");
    cityName.textContent = city.value;
    //cardBody.appendChild(cityName);

     //Add the date
     const dateField =document.createElement("p");
     dateField.textContent = "date:"+date
     cardBody.appendChild(dateField);
    
    // Add the temperature
    const temperature = document.createElement("p");
    temperature.textContent = "Temp: " +temp +" F"; 
    cardBody.appendChild(temperature);
    
    // // Add the weather icon
    // const weatherIcon = document.createElement("img");
    // weatherIcon = icon; 
    // cardBody.appendChild(weatherIcon);
    
    //Add the description
    // const description = document.createElement("p");
    // description.textContent = des; 
    // cardBody.appendChild(description);
    
    // Add the humidity
    const humidity = document.createElement("p");
    humidity.textContent = "Humidity: " +hum +" %"
    cardBody.appendChild(humidity);
    
    // Add the wind speed
    const windSpeed = document.createElement("p");
    windSpeed.textContent = "Wind: " +wind +" MPH"
    cardBody.appendChild(windSpeed);

   
    
    // Append the weather card to the container
    weatherCardContainer.appendChild(weatherCard);
  }
};

searchButton.addEventListener("click", formSubmitHandler);
//addToSearchHistory(city);


function tempConverter(temp) {
  temp=((temp-273.15)*1.8)+32;
  return temp.toString();

}