
// $(document).ready()makes the function available once the document is loaded

$(document).ready(function () {
    console.log("I'm ready..");


    var citiesArray = JSON.parse(localStorage.getItem("cities")) || [];


    // pull previous search results from the cities array 
    // append each search to it's own button for quick searches.

    for (var i = 0; i < citiesArray.length; i++) {
        var previousSearchButtons = $("<button>");
        previousSearchButtons.addClass("btn btn-secondary my-2 searchHistoryButton");
        previousSearchButtons.text(citiesArray[i]); 
        $("#previousCitiesButton").append(previousSearchButtons);
    }
 
    
    $(document).on("click", ".searchHistoryButton", function(event) {
        event.preventDefault();
        checkCurrentCity($(this).text());
    })

    // adding citySearchInput to the global scope


    var citySearchInput = " ";


    // this is the search button on."click" feature


    $("#search-button").on("click", searchResults);


    // searchResults function takes the city search criteria (#usersSearchInput) after
    // search button is clicked and pairs it with the checkCurrentConditions function below.


    function searchResults(event) {

        event.preventDefault();

        citySearchInput = $("#usersSearchInput").val();
        console.log(citySearchInput);

        citiesArray.push(citySearchInput);
        localStorage.setItem("cities", JSON.stringify(citiesArray));

        checkCurrentCity(citySearchInput);
        var previousSearchButtons = $("<button>");
        previousSearchButtons.addClass("btn btn-secondary my-2 searchHistoryButton");
        previousSearchButtons.text(citySearchInput);
        $("#previousCitiesButton").append(previousSearchButtons);

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

                $("#searched-city-nameanddate").html("<h3>" + data.name + " ‎‏‏‎ ‎ " + "("

                    + moment().format('l') + ")" + "<img src=" + "https://openweathermap.org/img/wn/"

                    + data.weather[0].icon + "@2x.png" + ">" + "</h3>");


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

                $("#searched-city-temperature").html("<h5>" + "Temperature: ‎‏‏‎ ‎ " + " " + tempF.toFixed(1) + " " + "‏‏‎ ‎°F" + "</h5>");

                $("#searched-city-humidity").html("<h5>" + "Humidity: ‎‏‏‎ ‎ " + " " + data.current.humidity + " " + "‏‏‎ ‎%" + "</h5>");

                $("#searched-city-windspeed").html("<h5>" + "Wind Speed: ‎‏‏‎ ‎ " + " " + data.current.wind_speed + " " + " ‎‏‏‎ ‎MPH" + "</h5>");

                $("#searched-city-uvindex").html("<h5>" + "UV Index: ‎‏‏‎ ‎ " + '<span class="uviColor">' + data.current.uvi + "</span>" + "</h5>");



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



                nextFiveDays(data.daily);

            });

    };

// this function creates the five day forecast via template literals
// this information has been passed from the one call api above


    function nextFiveDays(dailyData) {

        $("#fiveDayRow").empty();


        console.log(dailyData);


        let html = " ";


        dailyData.forEach((fiveDay, i) => {

            if (i > 4) return;


            var tempFahrenheit = (fiveDay.temp.day - 273.15) * 1.80 + 32;


            html += `<div class="col-m-2">
        <div class="card border-light mb-3" style="max-width: 20rem;">
            <div class="card-header">Date:‏‏‎ ‎‏‏‎ ‎${moment().add(i + 1, "days").format('l')} </div>
            <div class="card-body">
            <img src="https://openweathermap.org/img/wn/${fiveDay.weather[0].icon}@2x.png" >

                <p class="card-text">Temp:‏‏‎ ‎‏‏‎ ‎${tempFahrenheit.toFixed(1)}‎‏‏‎ ‎°F</p>
                <p class="card-text">Humidity:‏‏‎ ‎‏‏‎ ‎${fiveDay.humidity}‎‏‏‎ ‎%</p>
            </div>
        </div>
    </div>`

        });


        $("#fiveDayRow").append(html);


    }



});



