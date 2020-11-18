var formEl = document.querySelector(".search-form");
var citySearchEl = document.querySelector("#city");
var currentDayContainer = document.querySelector(".current-day-content")

var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = citySearchEl.value.trim();
    if (cityName) {
        getCurrentCityWeather(cityName)
        citySearchEl.value = "";
    } else {
        alert("Please input a city!")
    }
    
};

var getCurrentCityWeather = function(city) {
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=0938c05e8d987103f9ba5cb07b6b876e&units=imperial";
    fetch(weatherApiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
            displayCurrentCityWeather(data);
            getCurrentUvIndex(data)
            console.log(data)
            })
        } else {
            alert("Please insert a valid city!")
        }
    });
};
var getCurrentUvIndex = function(data) {
    var uvApiUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=0938c05e8d987103f9ba5cb07b6b876e";
    fetch(uvApiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayCurrentUvIndex(data);
                console.log(data)
            });
        } else {
            alert('There was a problem fetching UV Index!')
        }
    });
};

var displayCurrentCityWeather = function(data) {
    var currentCityEl = document.querySelector("#current-city");
    var weatherImg = document.querySelector(".weather-img")
    var tempEl = document.querySelector("#temp");
    var humidityEl = document.querySelector("#humidity");
    var windEl = document.querySelector("#wind");

    var currentCity = data.name;
    
    currentCityEl.textContent = currentCity + "    " + dayjs().format('MM/DD/YYYY');
    weatherImg.setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon +"@2x.png");
    tempEl.textContent = Math.floor(data.main.temp);
    humidityEl.textContent = data.main.humidity;
    windEl.textContent = data.wind.speed;
}

var displayCurrentUvIndex = function(data) {
    var uvEl = document.querySelector("#uv");

    uvEl.textContent = data.value;
    if (parseInt(uvEl.textContent) <= 2 ) {
        uvEl.className = "safe-index"
    } else if (3 >= parseInt(uvEl.textContent) <= 5) {
        uvEl.className = "moderate-index"
    } else if (6 >= parseInt(uvEl.textContent) <= 7) {
        uvEl.className = "high-index"
    } else if (8 >= parseInt(uvEl.textContent) <= 10) {
        uvEl.className = "very-high-index"
    } else if(parseInt(uvEl.textContent) > 11) {
        uvEl.className = "extreme-index"
    }
    
}

formEl.addEventListener("submit", formSubmitHandler);