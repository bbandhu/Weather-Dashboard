var searchInput = document.querySelector("#city");
var searchButton = document.querySelector("#submitButton");
var APIKey = "b91874a7b2e580ff5b02fdd3f2deab0c";
var userFormEl = document.querySelector(".form-row");
var weatherContainerEl = document.querySelector("#weather-container");
var weatherSearchTerm = document.querySelector("#city-search-term");
//var currentForecastContainter = document.getElementById("current-weather");

var lon;
var lat;
var searchHistory = [];
var formSubmitHandler = function (event) {
  event.preventDefault();
  city = searchInput.value.trim();
 // console.log(city);
  getWeatherDataCors(city);


  // Return from function early if submitted city is blank
  if (city == "") {
    return;
  }
  // Add city to searchHistory array, clear the input
  searchHistory.push(city);
  searchInput.value = "";
  // Store updated search in localStorage, re-render the list
  saveToSearchHistory(city);
  renderSearchHistory();
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
    APIKey +
    "&units=imperial";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (weatherData) {
        console.log(weatherData);
        displayWeather(weatherData);
        currentForecast(weatherData);
      });
    }
  });
};

var displayWeather = function (data) {
  if (data.length === 0) {
    weatherContainerEl.textContent = "No report";
    return;
  }

  const weatherCardContainer = document.getElementById("weather-card-container");
  weatherCardContainer.innerHTML = "";

  for (var i = 1; i < 40; i = i + 8) {
    let humidity = data.list[i].main.humidity;

    //let temp = kelvinToFahrenheit(data.list[i].main.temp);

    let temp = data.list[i].main.temp;
    let wind = data.list[i].wind.speed;
    let dateFromAPI = data.list[i].dt_txt;

    let timestamp = new Date(dateFromAPI).getTime();
    let Day = new Date(timestamp).getDate();
    let Month = new Date(timestamp).getMonth() + 1;
    let Year = new Date(timestamp).getFullYear();
    let date = `${Month}/${Day}/${Year}`;

    var icon = data.list[i].weather[0].icon;
    var des = data.list[i].weather[0].description;

    console.log(humidity, temp, date);
    const weatherCard = document.createElement("div");
    weatherCard.classList.add("col-sm-8");
    weatherCard.classList.add("card");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    weatherCard.appendChild(cardBody);

    const cityName = document.createElement("h2");
    cityName.textContent = city.value;

    const dateField = document.createElement("p");
    dateField.textContent = date;
    cardBody.appendChild(dateField);

    const temperature = document.createElement("p");
    temperature.textContent = "Temp: " + temp + " °F";
    cardBody.appendChild(temperature);

    const weatherIcon = document.createElement("img");
    weatherIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/w/${icon}.png`
    );
    cardBody.appendChild(weatherIcon);

    const humid = document.createElement("p");
    humid.textContent = "Humidity: " + humidity + " %";
    cardBody.appendChild(humid);

    const windSpeed = document.createElement("p");
    windSpeed.textContent = "Wind: " + wind + " MPH";
    cardBody.appendChild(windSpeed);

    weatherCardContainer.append(weatherCard);
  }
};

searchButton.addEventListener("click", formSubmitHandler);

//convert the temeparture from Kelvin to Fahreinheit
//commenting as I we are adding units = imperial param in the ur;
// function kelvinToFahrenheit(kelvin) {
//   return (kelvin - 273.15) * 9 / 5 + 32;
// }

function currentForecast(data) {
  if (data.length === 0) {
    weatherContainerEl.textContent = "No report";
    return;
  }
  let humidity = data.list[0].main.humidity;
  let temp = data.list[0].main.temp;
  let cityName = data.city.name;

  let wind = data.list[0].wind.speed;
  let dateFromAPI = data.list[0].dt_txt;

  let timestamp = new Date(dateFromAPI).getTime();
  let Day = new Date(timestamp).getDate();
  let Month = new Date(timestamp).getMonth() + 1;
  let Year = new Date(timestamp).getFullYear();
  let date = `${Month}/${Day}/${Year}`;
  


  var icon = data.list[0].weather[0].icon;
  var des = data.list[0].weather[0].description;

  const currentForecastContainter = document.getElementById("current-weather");
  currentForecastContainter.innerHTML = "";

  const currentForecastCard = document.createElement("div");
  currentForecastCard.style.backgroundColor = "lightblue";
  currentForecastCard.style.padding = "10px";
  currentForecastCard.style.border = "1px solid black";

  // currentForecastCard.classList.add("d-flex flex-row bd-highlight mb-3");
  currentForecastCard.classList.add("card");

  const currentForecastCardBody = document.createElement("div");
  currentForecastCardBody.classList.add("forecast-body");
  currentForecastCard.appendChild(currentForecastCardBody);
  // const weatherIcon = document.createElement("img");

  // const cityName = document.createElement("h3");
  // cityName.textContent = city.value;
  // currentForecastCardBody.appendChild(cityName);


  const today = document.createElement("h3");
  today.textContent = cityName + "(" + date + ")";
  currentForecastCardBody.appendChild(today);

  const temperature = document.createElement("p");
  temperature.textContent = "Temp: " + temp + "°F";
  currentForecastCardBody.appendChild(temperature);

  const weatherIcon = document.createElement("img");

  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/w/${icon}.png`
  );
  currentForecastCardBody.appendChild(weatherIcon);

  //cardBody.appendChild(weatherIcon);

  const humid = document.createElement("p");
  humid.textContent = "Humidity: " + humidity + " %";
  currentForecastCardBody.appendChild(humid);

  const windSpeed = document.createElement("p");
  windSpeed.textContent = "Wind: " + wind + " MPH";
  currentForecastCardBody.appendChild(windSpeed);

  currentForecastContainter.append(currentForecastCard);
}

function renderSearchHistory() {
  // Retrieve the search history from localStorage //TODO
  var searchCardContainer = document.getElementById("search-history");
  searchCardContainer.innerHTML = "";

  for (var i = 0; i < searchHistory.length; i++) {
    var search = searchHistory[i];

    var li = document.createElement("li");
    li.textContent = search;
    li.setAttribute("data-index", i);
    searchCardContainer.appendChild(li);
  }
}

function searchHis() {
  var storedSearchHistory = JSON.parse(localStorage.getItem("searchHistory"));

  if (storedSearchHistory != null) {
    searchHistory = storedSearchHistory;
  }
  renderSearchHistory();
}

function saveToSearchHistory() {
  // Stringify and set key in localStorage to searchHistory array
  localStorage.setItem("serchHistory", JSON.stringify(searchHistory));
}

// Add submit event to form

searchButton.addEventListener("click", formSubmitHandler);
