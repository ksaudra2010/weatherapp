
// This is our API key & variables
var APIKey = "&APPID=9a46a84b2a424abb7120b7923fe838aa";
var searchedcities = [];
var savedcities = localStorage.getItem('searchedcities');
if (savedcities){
    searchedcities=JSON.parse(savedcities)
    searchedcities.forEach(function(city){
        $("#history").append("<button class = 'historybutton'>" + city + "</button>")
    })
}

$('#searchButton').on('click', function () {
    var city = $('#Search').val()
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + APIKey;
    var forecast = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + APIKey;
    $("#Search").keypress(function(event) { 
        if (event.keyCode === 13) { 
            $("#searchButton").click(); 
        } 
    }); 

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
            var tempF = (data.main.temp - 273.15) * 1.80 + 32;
            $('#temp').text("Temperature: " + temperature + ' degrees Fahrenheit');
            // $("#temp").html("Search" + data.main.temp + " Weather Details");
            $("#wind").text("Wind Speed: " + data.wind.speed + " mph");
            $("#humidity").text("Humidity: " + data.main.humidity + '%');
            $("#clouds").html(`<img src = '${iconURL}'>`);
            
            // $("#tempF").text("temperature (Kelvin) " + (response.main.temp));
            if (searchedcities.indexOf(city.toLowerCase())==-1){
                   $("#history").append("<button class = 'historybutton'>" + city + "</button>")
                   searchedcities.push(city.toLowerCase())
                   localStorage.setItem('searchedcities',JSON.stringify(searchedcities))
                //    console.log(searchedcities);
            }
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
                var tempF = (weather.main.temp - 273.15) * 1.80 + 32;
                $('#forecasttemp' + i).text("Temperature: " + temperature + ' degrees Fahrenheit')
                // $("#temp").html("<#Search>" + weather.main.temp + " Weather Details</#Search>");
                $("#forecastwind" + i).text("Wind Speed: " + weather.wind.speed + " mph");
                $("#forecasthumidity" + i).text("Humidity: " + weather.main.humidity + ' %');
                $("#forecastclouds" + i).html(`<img src = '${iconURL}'>`);
             }
        });
});
$('#history').on('click', '.historybutton', function (event) {
    var city = event.target.innerText;
    $('#Search').val(city)
    $('#searchButton').click()
})
