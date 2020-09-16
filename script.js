
// $(document).ready()makes the function available once the document is loaded

$(document).ready(function () {
    console.log("I'm ready..");


    // this is the search button on."click" feature

    var citySearchInput = " ";


    $("#search-button").on("click", searchResults);


    // searchResults function takes the city search criteria (#usersSearchInput) after
    // search button is clicked and pairs it with the checkCurrentConditions function below.


    function searchResults(event) {

        event.preventDefault();

        citySearchInput = $("#usersSearchInput").val();
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


    function checkCurrentCity(citySearchInput) {

        var queryURL =

            "https://api.openweathermap.org/data/2.5/weather?q=" +


            citySearchInput + "&appid=" + myOpenWeatherKey;


        $.ajax({
            url: queryURL,
            method: "GET"

        })

            .then(function (data) {

                console.log(data);

                $("#searched-city-nameanddate").html("<h2>" + data.name + " ‎‏‏‎ ‎ " + "("

                    + moment().format('l') + ")" + "<img src=" + "https://openweathermap.org/img/wn/"

                    + data.weather[0].icon + "@2x.png" + ">" + "</h2>");


                var longitude = data.coord.lon;
                var latitude = data.coord.lat;

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

        })

            .then(function (data) {

                console.log(data);



                var tempF = (data.current.temp - 273.15) * 1.80 + 32;

                $("#searched-city-temperature").html("<h4>" + "Temperature: ‎‏‏‎ ‎ " + " " + tempF.toFixed(1) + " " + "°F" + "</h4>");

                $("#searched-city-humidity").html("<h4>" + "Humidity: ‎‏‏‎ ‎ " + " " + data.current.humidity + " " + "%" + "</h4>");

                $("#searched-city-windspeed").html("<h4>" + "Wind Speed: ‎‏‏‎ ‎ " + " " + data.current.wind_speed + " " + " ‎‏‏‎ ‎MPH" + "</h4>");

                $("#searched-city-uvindex").html("<h4>" + "UV Index: ‎‏‏‎ ‎ " + '<span class="uviColor">' + data.current.uvi + "</span>" + "</h4>");



                var oneCallResultsCurrentUvi = data.current.uvi;



                if (oneCallResultsCurrentUvi < 2) {
                    $(".uviColor").addClass("lowUV");


                } else if (oneCallResultsCurrentUvi >= 2 && oneCallResultsCurrentUvi <= 5) {
                    $(".uviColor").addClass("moderateUV");


                } else if (oneCallResultsCurrentUvi >= 5 && oneCallResultsCurrentUvi <= 7) {
                    $(".uviColor").addClass("mediumUV");


                } else {
                    $(".uviColor").addClass("highUV");
                }



                nextFiveDays(citySearchInput);

            });

    };



    function nextFiveDays(citySearchInput) {



        var queryURL =

            "https://api.openweathermap.org/data/2.5/forecast?q=" +

            + citySearchInput + "&appid=" + myOpenWeatherKey;


        $.ajax({
            url: queryURL,
            method: "GET"

        })

            .then(function (data) {

                console.log(data);

            });
    }


});



