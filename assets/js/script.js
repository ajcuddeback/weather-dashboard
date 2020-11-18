var formEl = document.querySelector(".search-form")

var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = document.querySelector("#city").value.trim();
    if (cityName) {
        getCityWeather(cityName)
    } else {
        alert("Please input a city!")
    }
}

var getCityWeather = function(city) {
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=0938c05e8d987103f9ba5cb07b6b876e";
    fetch(weatherApiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
            console.log(data)
            })
        } else {
            alert("Please insert a valid city!")
        }
    });
    
}

formEl.addEventListener("submit", formSubmitHandler)