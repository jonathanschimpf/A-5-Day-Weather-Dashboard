
// $(document).ready()makes the function available once the document is loaded

$(document).ready(function () {
    console.log("I'm ready..");


    // this is the search button on."click" feature


    $("#search-button").on("click", searchResults);


    // searchResults function takes the city search criteria after search
    // button is clicked and pairs it with the checkCurrentConditions function below.


    function searchResults(event) {

        event.preventDefault();

        var citySearchInput = $("#usersSearchInput").val();
        console.log(citySearchInput);

        checkCurrentConditions(citySearchInput);

    }



    // my openweathermap.org api key in variable format to be applied below



    var myOpenWeatherKey = "8efa203e02eb478afd5187cab049f3e8";



    // checkCurrentConditions function has been given the users search criteria
    // by the searchResults function, and it will now call on the openweathermap api
    // that is linked below  and paired with "myOpenWeatherKey" (current weather data api)
    // AJAX asynchronously retrieves JSON (and XML) information for the application use.



    function checkCurrentConditions(city) {

        var queryURL =

            "https://api.openweathermap.org/data/2.5/weather?q=" +

            city + "&appid=" + myOpenWeatherKey;


        $.ajax({
            url: queryURL,
            method: "GET"

        })

            .then(function (searchedCityResults) {
                console.log(searchedCityResults);

                $("#searched-city-nameanddate").html("<h2>" + searchedCityResults.name + "  " + " " + "(" + moment().format('l') + ")" + "</h2>");
                //"<img>" + "https://openweathermap.org/img/wn/" + searchedCityResults.weather[0].icon + "@2x.png" ICON

                var tempF = (searchedCityResults.main.temp - 273.15) * 1.80 + 32;
                
                $("#searched-city-temperature").html("<h4>" + "Temperature: ‎‏‏‎ ‎ " + " " + tempF.toFixed(1) + " " + "°F" + "</h4>");

                $("#searched-city-humidity").html("<h4>" + "Humidity: ‎‏‏‎ ‎ " + " " + searchedCityResults.main.humidity + " " + "%" + "</h4>");
                
                $("#searched-city-windspeed").html("<h4>" + "Windspeed: ‎‏‏‎ ‎ " + " " + searchedCityResults.wind.speed + " " + "mph" + "</h4>");

            });

    };



});



