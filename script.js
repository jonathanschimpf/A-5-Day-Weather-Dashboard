
// $(document).ready()makes the function available once the document is loaded

// $(document).ready(function () {
//     console.log("I'm ready..");


  var myOpenWeatherKey = "8efa203e02eb478afd5187cab049f3e8";


    function checkCurrentConditions(searchedCity) {

        var queryURL =

        "https://api.openweathermap.org/data/2.5/weather?" +  
        
        searchedCity + "&appid=" + myOpenWeatherKey;

    $.ajax({
        url: queryURL,
        method: "GET"

    }) 

    .then(function (searchedCityResults) {
        console.log(queryURL);

      var cityNameDisplayed =  $("#searched-city-nameanddate").html("<h2>" + searchedCityResults + "</h2>")
        

        });

        $("#submit-button").on("click", function(event) {

            event.preventDefault();

            var citySearchInput = $("#usersSearchInput").val();

            checkCurrentConditions(citySearchInput);

        });

    }

      


               



    // });


    // $("#search-button").on("click", function(event) {

    //     event.preventDefault();
    // });
    

