var searchInput = document.querySelector("#city");
var searchButton = document.querySelector("#submitButton");
var APIKey = "b91874a7b2e580ff5b02fdd3f2deab0c";
var userFormEl = document.querySelector(".form-row");
var lon;
var lat;

var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = searchInput.value.trim();
  console.log(city);
  getWeatherDataCors(city);
};
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
  for (var i = 0; i < data.list.length; i++) {
    var humidity = data.list[i].main.humidity;
    var temperature = data.list[i].main.temp;
    var wind = data.list[i].wind.speed;
    console.log(humidity, temperature, wind);
  }

  var weatherReport = document.createElement("div");
  weatherReport.classList =
    "list-item flex-row justify-space-between align-center card";

  var titleEl = document.createElement("span");
  titleEl.textContent = humidity;
  weatherReport.appendChild(titleEl);
};

//repoSearchTerm.textContent = searchTerm;

//   for (var i = 0; i < weather.length; i++) {
//     console.log(weather.data);
//     var lat = weather[i].coord.lon;
// var lon = weather.coord.lon;
// var lat = weather.coord.lat;
// console.log(lat);
// console.log(lon);

// var coordinates = document.createElement('a');
// issueEl.classList = 'list-item flex-row justify-space-between align-center';
// issueEl.setAttribute('href', issues[i].html_url);
// issueEl.setAttribute('target', '_blank');

// var titleEl = document.createElement('span');
// titleEl.textContent = issues[i].title;
// issueEl.appendChild(titleEl);

// var typeEl = document.createElement('span');

// if (weather[i].) {
//   typeEl.textContent = '(Pull request)';
// } else {
//   typeEl.textContent = '(Issue)';
// }

// issueEl.appendChild(typeEl);

// issueContainerEl.appendChild(issueEl);

// var reportEl = document.createElement('div');
// repoEl.classList = 'list-item flex-row justify-space-between align-center card';

// var titleEl = document.createElement('span');
// titleEl.textContent = repoName;

// reportEl.appendChild(titleEl);

// var statusEl = document.createElement('span');
// statusEl.classList = 'flex-row align-center';

// if (weather[i].open_issues_count > 0) {
//   statusEl.innerHTML =
//     "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
// } else {
//   statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
// }

// reportEl.appendChild(statusEl);

// repoContainerEl.appendChild(repoEl);

searchButton.addEventListener("click", formSubmitHandler);
