var city = "";
// alert('test');

// $(".mydiv").text(bye);

function weatherFunc() {
    city = "miami";

    var APIKEY = "bdb324a30b314e7592c232435173003";
    var queryURL = "https://api.apixu.com/v1/current.json?key=" + APIKEY + "&q=" + city;
    console.log('queryURL ' + queryURL);

    //ajax request
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

            var weather = response.current.condition.text;
            var weatherImg = response.current.condition.icon;
            var temp = response.current.temp_f;
            var tempC = response.current.temp_c;
            var humidity = response.current.humidity;
            var feelsLike = response.current.feelslike_f;
            var feelsLikeC = response.current.feelslike_c;
            city = response.location.name;

            console.log(response);
            console.log('json url ' + queryURL);

            var weatherDiv = $("<div>");
            weatherDiv.addClass("weather-display")
            weatherDiv.html(
                
                "<div class=\"panel panel-default weather-display\"><div class=\"panel-heading panel-title weather-title\">"+
                city+" Weather</div>" +
                "<div class=\"panel-body\">" + 
                "<img src=\"https:"+weatherImg+"\">"+ "<br>"+
                "Current Weather: " + weather + "<br>" +
                "<span class=\"temperature\" data-category=\"Current Temperature: \" data-f=\""+temp+"\" data-c=\""+tempC+"\" data-state=\"fahrenheit\">Current Temperature: " + temp + "°F</span>" + "<br>"+
                "<span class=\"temperature\" data-category=\"Feels Like: \" data-f=\""+feelsLike+"\" data-c=\""+feelsLikeC+"\" data-state=\"fahrenheit\">Feels Like: " + feelsLike + "°F</span>" + "<br>"+
                "Humidity: " + humidity)

            // $("#weather").append("bye");
                $("#weather").html(weatherDiv);

        });
    };
    weatherFunc();

$("#weather").on("click", "span", function() {
    var state = $(this).attr("data-state");
    console.log(state);

     if (state === "fahrenheit") {
        $(this).text($(this).attr("data-category")+$(this).attr("data-c")+"°C");
        $(this).attr("data-state", "celcius");
      } else {
        $(this).text($(this).attr("data-category")+$(this).attr("data-f")+"°F");
        $(this).attr("data-state", "fahrenheit");
      }
});

    // $("#destination-submit").on("click", function(event) {
    //     event.preventDefault();
    //     //get city from input field
    //     city = $("#destination-input").val().trim();
    //     console.log(city)
    //     console.log('destination input ' + $("#destination-input").val().trim())
    //     $("#places").append("<script> (function() {var cx = '010441184624122803236:ok5olagjb20'; var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true; gcse.src = 'https://cse.google.com/cse.js?cx=' + cx; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s); })(); </script>" + "<gcse:search webSearchQueryAddition=\""+city+"\"></gcse:search>")
    //     // $("#places").append();

    //     var APIKEY = "bdb324a30b314e7592c232435173003";
    //     var queryURL = "https://api.apixu.com/v1/current.json?key=" + APIKEY+
    //         "&q=" + city;
    //     console.log('queryURL ' +queryURL);

    //     //ajax request
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).done(function(response) {

    //         var weather = response.current.condition.text
    //         var weatherImg = response.current.condition.icon
    //         var temp = response.current.temp_f
    //         var humidity = response.current.humidity
    //         var feelsLike = response.current.feelslike_f
    //         city = response.location.name

    //         console.log(response)
    //         console.log('json url ' + queryURL)



            // $("#weather").html(
            //     "<div class=\"panel panel-default\"><div class=\"panel-heading panel-title\">"+
            //     city+" Weather</div>" +
            //     "<div class=\"panel-body\">" + 
            //     "<img src=\"https:"+weatherImg+"\">"+ "<br>"+
            //     "Current Weather: " + weather + "<br>" +
            //     "Current Temperature: " + temp + "°F / " +
            //     "Feels Like: " + feelsLike + "°F<br>" +
            //     "Humidity: " + humidity + "</div></div>");

    //         //maps

    //         var mapsKey = "AIzaSyBkYPa5VxJ6FXEVeg9o24-a5fGBUu0Ma9A";
    //     });
    // });
