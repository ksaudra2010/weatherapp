
// This is our API key
var APIKey = "&APPID=9a46a84b2a424abb7120b7923fe838aa";

$('#searchButton').on('click', function () {
    var city = $('#Search').val()
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + APIKey;
    var forecast = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + APIKey;


    $.ajax({
        url: queryURL,
        method: "GET",
    })
        .then(function (data) {
            console.log(data)
            var temperature = data.main.temp;
            var humidity = data.main.humidity;
            var wind = data.wind.speed;
            var clouds = data.clouds.all;
            var iconURL = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
            
            $('#temp').text(temperature)
            // $("#temp").html("Search" + data.main.temp + " Weather Details");
            $("#wind").text("Wind Speed: " + data.wind.speed);
            $("#humidity").text("Humidity: " + data.main.humidity);
            $("#clouds").text("Cloud Cover " + data.clouds.all);
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $("#tempF").text("temperature (Kelvin) " + (response.main.temp));
            append(city)
        });

    $.ajax({
        url: forecast,
        method: "GET",
    })
        .then(function (data) {
            console.log(data)
            var forecastList = data.list
            for (var i = 0; i < forecastList.length; i++) {
                var weather = forecastList[i];
                var temperature = weather.main.temp;
                var humidity = weather.main.humidity;
                var wind = weather.wind.speed;
                var clouds = weather.clouds.all;
                var iconURL = "https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"
                $('#temp2').text(temperature)
                // $("#temp").html("<#Search>" + weather.main.temp + " Weather Details</#Search>");
                $("#wind2").text("Wind Speed: " + weather.wind.speed);
                $("#humidity2").text("Humidity: " + weather.main.humidity);
                $("#clouds2").text("Cloud Cover " + weather.clouds.all);
                var tempF = (response.main.temp - 273.15) * 1.80 + 32;
                $("#tempF").text("temperature (Kelvin) " + tempF);
             }
        });
});