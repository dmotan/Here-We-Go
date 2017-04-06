var city;
// alert('test');

function weatherFunc() {
    city = "rome";
    console.log('city ' + city)

    var APIKEY = "bdb324a30b314e7592c232435173003";
    var queryURL = "https://api.apixu.com/v1/current.json?key=" + APIKEY + "&q=" + city;
    console.log('queryURL ' + queryURL);

    //ajax request
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        var weather = response.current.condition.text;
        var weatherCode = response.current.condition.code;
        console.log("code " +weatherCode)
        var weatherImg = "https:"+response.current.condition.icon;
        var temp = response.current.temp_f;
        var tempC = response.current.temp_c;
        var humidity = response.current.humidity;
        var feelsLike = response.current.feelslike_f;
        var feelsLikeC = response.current.feelslike_c;
        city = response.location.name;

        console.log(response);
        console.log('json url ' + queryURL);

        var weatherDiv = $("<div>");
        weatherDiv.addClass("panel panel-default weather-display");
        var panelHeading = $("<div>");
        panelHeading.addClass("panel-heading panel-title weather-title");
        panelHeading.text(city+" Weather");
        var panelBody = $("<div>");
        panelBody.addClass("panel-body");
        var weatherIcon = $("<img>");
        weatherIcon.attr("src", weatherImg);
        var currentTemp =  $("<span>");
        currentTemp.addClass("temperature");
        currentTemp.attr({"data-tempf": temp, "data-tempc": tempC, "data-feelsLikef":feelsLike, "data-feelsLikeC":feelsLikeC, "data-state":"F"});
        currentTemp.html("Current Temperature: "+ temp + "°F<br>" +"Feels Like: " +feelsLike+"°F<br>");
        currentTemp.prepend("<span class=\"weather-tooltiptext\">Click to switch between Fahrenheit and Celsius.</span>");
        
        panelBody.append(weatherIcon);
        panelBody.append("<br>Current Weather: "+weather+"<br>");
        panelBody.append(currentTemp);
        panelBody.append("Humidity: "+humidity);

        weatherDiv.append(panelHeading);
        weatherDiv.append(panelBody);

        $("#weather-content").html(weatherDiv);

        if (weatherCode === 1000){
            //it's sunny
        } else if (weatherCode >1000 && weatherCode <= 1009){
            //it's cloudy
        } else if (weatherCode > 1009 && weatherCode <= 1063){
            //it's misty
        } else if (weatherCode > 1063 && weatherCode <= 1069){
            //it's patch snow/sleet
        } else if (weatherCode > 1069 && weatherCode <= 1087){
            //it's freezing mist/thunder outbreaks
        } else if (weatherCode > 1087 && weatherCode <= 1117){
            //it's snowing
        } else if (weatherCode > 1117 && weatherCode <= 1147){
            //it's foggy
        } else if (weatherCode > 1147 && weatherCode <= 1201){
            //it's raining
        } else if (weatherCode > 1201 && weatherCode <= 1237){
            //it's sleet/snowing
        } else if (weatherCode > 1237 && weatherCode <= 1246){
            //it's raining
        } else if (weatherCode > 1246 && weatherCode <= 1264){
            //it's snowing
        } else if (weatherCode > 1264 && weatherCode <= 1282){
            //it's thundering
        };


    });
}; //end weatherFunc

weatherFunc();

$("#weather").on("click", "span", function() {
    var state = $(this).attr("data-state");

    if (state === "F") {
        $(this).html("Current Temperature: "+ $(this).attr("data-tempc") + "°C<br>" +"Feels Like: " +$(this).attr("data-feelsLikeC")+"°C<br>");
        $(this).prepend("<span class=\"weather-tooltiptext\">Click to switch between Fahrenheit and Celsius.</span>");
        $(this).attr("data-state", "C");
    } else {
        $(this).html("Current Temperature: "+ $(this).attr("data-tempf") + "°F<br>" +"Feels Like: " +$(this).attr("data-feelsLikef")+"°F<br>");
        $(this).prepend("<span class=\"weather-tooltiptext\">Click to switch between Fahrenheit and Celsius.</span>");
        $(this).attr("data-state", "F");
    }
});

//-------------------------------------

// $(".destination-btn").on("click", function() {


//     city = $("#autocomplete").val();
//     console.log('city '+city)

//     var APIKEY = "bdb324a30b314e7592c232435173003";
//     var queryURL = "https://api.apixu.com/v1/current.json?key=" + APIKEY + "&q=" + city;
//     console.log('queryURL ' + queryURL);

//     //ajax request
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).done(function(response) {

//         var weather = response.current.condition.text;
//         var weatherImg = response.current.condition.icon;
//         var temp = response.current.temp_f;
//         var tempC = response.current.temp_c;
//         var humidity = response.current.humidity;
//         var feelsLike = response.current.feelslike_f;
//         var feelsLikeC = response.current.feelslike_c;
//         city = response.location.name;

//         console.log(response);
//         console.log('json url ' + queryURL);

//         var weatherDiv = $("<div>");
//         weatherDiv.addClass("panel panel-default weather-display");


//         weatherDiv.addClass("weather-display")




//         weatherDiv.html(

//             "<div class=\"panel panel-default weather-display\"><div class=\"panel-heading panel-title weather-title\">" +
//             city + " Weather</div>" +
//             "<div class=\"panel-body\">" +
//             "<img src=\"https:" + weatherImg + "\">" + "<br>" +
//             "Current Weather: " + weather + "<br>" +
//             "<span class=\"temperature\" data-category=\"Current Temperature: \" data-f=\"" + temp + "\" data-c=\"" + tempC + "\" data-state=\"fahrenheit\">Current Temperature: " + temp + "°F</span>" + "<br>" +
//             "<span class=\"temperature\" data-category=\"Feels Like: \" data-f=\"" + feelsLike + "\" data-c=\"" + feelsLikeC + "\" data-state=\"fahrenheit\">Feels Like: " + feelsLike + "°F</span>" + "<br>" +
//             "Humidity: " + humidity)

//         // $("#weather").append("bye");
//         $("#weather").html(weatherDiv);


//     });
//         // alert('hi');



// });




//---------------------------------------------------

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
