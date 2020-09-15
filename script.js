
// $(document).ready()makes the function available once the document is loaded

$(document).ready(function () {
    console.log("I'm ready..");


    // this is the search button on."click" feature


    $("#search-button").on("click", searchResults);


    // searchResults function takes the city search criteria (#usersSearchInput) after
    // search button is clicked and pairs it with the checkCurrentConditions function below.


    function searchResults(event) {

        event.preventDefault();

        var citySearchInput = $("#usersSearchInput").val();
        console.log(citySearchInput);

        checkCurrentCity(citySearchInput);

    }


    // my openweathermap.org api key in variable format to be applied below


    var myOpenWeatherKey = "8efa203e02eb478afd5187cab049f3e8";


    // checkCurrentConditions function has been given the users search criteria..
    // ..by the searchResults function, and it will now call on the openweathermap api..
    // ..which is linked below and paired with "myOpenWeatherKey" (current weather data api)
    // AJAX asynchronously retrieves JSON information for the application to use.
    // this API CALL strictly targets the city name and retrieves an icon.


    function checkCurrentCity(city) {

        var queryURL =

            "https://api.openweathermap.org/data/2.5/weather?q=" +


            city + "&appid=" + myOpenWeatherKey;


        $.ajax({
            url: queryURL,
            method: "GET"

        })

            .then(function (searchedCityResults) {

                console.log(searchedCityResults);

                $("#searched-city-nameanddate").html("<h2>" + searchedCityResults.name + " ‎‏‏‎ ‎ " + "("

                    + moment().format('l') + ")" + "<img src=" + "https://openweathermap.org/img/wn/"

                    + searchedCityResults.weather[0].icon + "@2x.png" + ">" + "</h2>");

                var longitude = searchedCityResults.coord.lon;
                var latitude = searchedCityResults.coord.lat;

                getCurrentConditions(longitude, latitude);

            });


    };

    // getCurrentConditions:
    // AJAX asynchronously retrieves JSON information for the application to use.
    // this is the ONE CALL API CALL. retrieves temperature, humidity, wind speed, uv index.


    function getCurrentConditions(longitude, latitude) {

        var queryURL =

            "https://api.openweathermap.org/data/2.5/onecall?lat=" +

            + latitude + "&lon=" + longitude + "&exclude=" + "&appid=" + myOpenWeatherKey;



        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (oneCallResults) {

            console.log(oneCallResults);



            var tempF = (oneCallResults.current.temp - 273.15) * 1.80 + 32;

            $("#searched-city-temperature").html("<h4>" + "Temperature: ‎‏‏‎ ‎ " + " " + tempF.toFixed(1) + " " + "°F" + "</h4>");

            $("#searched-city-humidity").html("<h4>" + "Humidity: ‎‏‏‎ ‎ " + " " + oneCallResults.current.humidity + " " + "%" + "</h4>");

            $("#searched-city-windspeed").html("<h4>" + "Wind Speed: ‎‏‏‎ ‎ " + " " + oneCallResults.current.wind_speed + " " + " ‎‏‏‎ ‎ mph" + "</h4>");

            $("#searched-city-uvindex").html("<h4>" + "UV Index: ‎‏‏‎ ‎ " + '<span class="uviColor">' + oneCallResults.current.uvi + "</span>" + "</h4>");



            var oneCallResultsCurrentUvi = oneCallResults.current.uvi;



            if (oneCallResultsCurrentUvi < 3) {
                $(".uviColor").addClass("lowUV");

            } else if (oneCallResultsCurrentUvi >= 3 && oneCallResultsCurrentUvi <= 7) {
                $(".uviColor").addClass("mediumUV");

            } else {
                $(".uviColor").addClass("highUV");
            }

        });

    };



});



