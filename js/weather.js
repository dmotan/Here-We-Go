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
            var humidity = response.current.humidity;
            var feelsLike = response.current.feelslike_f;
            city = response.location.name;

            console.log(response);
            console.log('json url ' + queryURL);



            // $("#weather").append("bye");
                $("#weather").html(
                "<div class=\"panel panel-default\"><div class=\"panel-heading panel-title\">"+
                city+" Weather</div>" +
                "<div class=\"panel-body\">" + 
                "<img src=\"https:"+weatherImg+"\">"+ "<br>"+
                "Current Weather: " + weather + "<br>" +
                "Current Temperature: " + temp + "°F / " +
                "Feels Like: " + feelsLike + "°F<br>" +
                "Humidity: " + humidity + "</div></div>");

        });
    };
    weatherFunc();

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
