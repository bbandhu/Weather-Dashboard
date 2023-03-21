# Weather Dashboard

## Name
Weather Dashboard that display weather forecast for 5 days for a given city and also saves serach history

## Installation
N/A -

## Usage
After Deployment, user should get the results in the search for a given city

## Tools used
CSS, Html , JS , Jquery
JS , Weather API  https://openweathermap.org/forecast5#data


## Credit
My Instructor, tutor, TA's

## Project 
This is a JavaScript code that uses the OpenWeatherMap API to get weather data for a specified city and display it on the webpage.

The code starts by defining several variables, including references to various HTML elements, the API key for OpenWeatherMap, and an array to store search history.

The formSubmitHandler function is called when the search button is clicked, which retrieves the user input city name, calls getWeatherDataCors function to get the latitude and longitude of the city, and then calls getWeatherData function to retrieve the weather data using the latitude and longitude. It also adds the city to the search history array and renders the updated search history.

The getWeatherDataCors function uses the OpenWeatherMap API to get the latitude and longitude of the city. It then calls the getWeatherData function to retrieve the weather data for the specified city.

The getWeatherData function retrieves the weather data using the latitude and longitude. It then calls the displayWeather function to display the weather data for the next five days in 3-hour intervals, and currentForecast function to display the current weather data.

The displayWeather function takes the weather data as an input, iterates through it, and creates HTML elements to display the weather information for each of the five days. It then appends the elements to the webpage.

The currentForecast function takes the weather data as an input and displays the current weather information in a separate HTML element.

The renderSearchHistory function retrieves the search history from localStorage and displays it on the webpage.

The saveToSearchHistory function saves the search history array to localStorage.

Finally, the code adds an event listener to the search button to call the formSubmitHandler function when the button is clicked, and also calls searchHis function to render the search history on the webpage.






