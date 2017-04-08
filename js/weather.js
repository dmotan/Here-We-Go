

    function weatherFunc() {

        var APIKEY = "bdb324a30b314e7592c232435173003";
        var queryURL = "https://api.apixu.com/v1/current.json?key=" + APIKEY + "&q=" + destination;

        //ajax request
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            var weather = response.current.condition.text;
            var weatherCode = response.current.condition.code;
            var weatherImg = "https:" + response.current.condition.icon;
            var temp = response.current.temp_f;
            var tempC = response.current.temp_c;
            var humidity = response.current.humidity;
            var feelsLike = response.current.feelslike_f;
            var feelsLikeC = response.current.feelslike_c;
            var city = response.location.name;

            console.log('json url ' + queryURL);

            var weatherDiv = $("<div>");
            weatherDiv.addClass("panel panel-default weather-display");
            var panelHeading = $("<div>");
            panelHeading.addClass("panel-heading panel-title weather-title");
            panelHeading.text(city + " Weather");
            var panelBody = $("<div>");
            panelBody.addClass("panel-body");
            var weatherIcon = $("<img>");
            weatherIcon.attr("src", weatherImg);
            var currentTemp = $("<span>");
            currentTemp.addClass("temperature");
            currentTemp.attr({ "data-tempf": temp, "data-tempc": tempC, "data-feelsLikef": feelsLike, "data-feelsLikeC": feelsLikeC, "data-state": "F" });
            currentTemp.html("Current Temperature: " + temp + "°F<br>" + "Feels Like: " + feelsLike + "°F<br>");
            currentTemp.prepend("<span class=\"weather-tooltiptext\">Click to switch between Fahrenheit and Celsius.</span>");

            panelBody.append(weatherIcon);
            panelBody.append("<br>Current Weather: " + weather + "<br>");
            panelBody.append(currentTemp);
            panelBody.append("Humidity: " + humidity + "%");

            weatherDiv.append(panelHeading);
            weatherDiv.append(panelBody);

            $("#weather-content").html(weatherDiv);

            //conditional backgrounds depending on weather code from api call
            if (weatherCode <= 1000) {
                //it's sunny
                $("#weather").css("background-image", "url('img/weather/sunny.jpg')");
            } else if (weatherCode > 1000 && weatherCode <= 1009) {
                //it's cloudy
                $("#weather").css("background-image", "url('img/weather/cloudy.jpg')");
            } else if (weatherCode > 1009 && weatherCode <= 1063) {
                //it's misty
                $("#weather").css("background-image", "url('img/weather/fog.jpg')");
            } else if (weatherCode > 1063 && weatherCode <= 1069) {
                //it's patch snow/sleet
                $("#weather").css("background-image", "url('img/weather/snow.jpg')");
            } else if (weatherCode > 1069 && weatherCode <= 1087) {
                //it's freezing mist/thunder outbreaks
                $("#weather").css("background-image", "url('img/weather/fog.jpg')");
            } else if (weatherCode > 1087 && weatherCode <= 1117) {
                //it's snowing
                $("#weather").css("background-image", "url('img/weather/snow.jpg')");
            } else if (weatherCode > 1117 && weatherCode <= 1147) {
                //it's foggy
                $("#weather").css("background-image", "url('img/weather/fog.jpg')");
            } else if (weatherCode > 1147 && weatherCode <= 1201) {
                //it's raining
                $("#weather").css("background-image", "url('img/weather/rain.jpg')");
            } else if (weatherCode > 1201 && weatherCode <= 1237) {
                //it's sleet/snowing
                $("#weather").css("background-image", "url('img/weather/snow.jpg')");
            } else if (weatherCode > 1237 && weatherCode <= 1246) {
                //it's raining
                $("#weather").css("background-image", "url('img/weather/rain.jpg')");
            } else if (weatherCode > 1246 && weatherCode <= 1264) {
                //it's snowing
                $("#weather").css("background-image", "url('img/weather/snow.jpg')");
            } else if (weatherCode > 1264 && weatherCode <= 1282) {
                //it's thundering
                $("#weather").css("background-image", "url('img/weather/thunder.jpg')");
            };
        });
    }; //end weatherFunc

    weatherFunc();

    //change Fahrenheit to Celcius
    $("#weather").on("click", "span", function() {
        var state = $(this).attr("data-state");

        if (state === "F") {
            $(this).html("Current Temperature: " + $(this).attr("data-tempc") + "°C<br>" + "Feels Like: " + $(this).attr("data-feelsLikeC") + "°C<br>");
            $(this).prepend("<span class=\"weather-tooltiptext\">Click to switch between Fahrenheit and Celsius.</span>");
            $(this).attr("data-state", "C");
        } else {
            $(this).html("Current Temperature: " + $(this).attr("data-tempf") + "°F<br>" + "Feels Like: " + $(this).attr("data-feelsLikef") + "°F<br>");
            $(this).prepend("<span class=\"weather-tooltiptext\">Click to switch between Fahrenheit and Celsius.</span>");
            $(this).attr("data-state", "F");
        }
    });

    //------------------------------------ imgur function


    function getImagesFunc() {

        var client_id = '3c0d3707ab11b70'; // oauth api key
        var imageLinkArr = []; //where we will throw the direct image links we parse from json

        var encodeDestination = encodeURIComponent(destination);

        function ajaxFunc(queryterm) {
            var queryURL = "https://api.imgur.com/3/gallery/search/top?q=" + queryterm + "+" + encodeDestination;
            //ajax request
            $.ajax({
                url: queryURL,
                headers: {
                    'Authorization': 'Client-ID ' + client_id
                },
                method: "GET"

            }).done(function(response) {

                //loop until it goes through full json or until our array has 10 img links. shorter of the 2
                for (var i = 0; i < response.data.length && imageLinkArr.length < 10; i++) {
                    var imgLink = response.data[i].link
                        //ignore albums, gifs, etc
                    if (imgLink.includes(".jpg") || imgLink.includes(".png") && (response.data[i].height >= 320)) {
                        //insert 'm' before file extension to get a 320x320 thumbnail from imgur
                        //push to imageLinkArr
                        imageLinkArr.push(response.data[i].link);
                    }
                }

                console.log(imageLinkArr);
                console.log(response);
                console.log('json url ' + queryURL);

                console.log("imgArr 2 " + imageLinkArr)
                    //empty .imgur-carousel div
                $(".imgur-carousel").empty();

                //make a div, put image elements for each value in imageLinkArr as src
                // var galleryDiv = $("<div>");
                // for (var i = 0; i < imageLinkArr.length; i++) {
                //     var imageDiv = $("<div>");
                //     imageDiv.addClass("item")
                //     if (i = 0) {
                //         imageDiv.addClass("active")
                //     }
                //     var image = $("<img>");
                //     image.addClass("d-block img-fluid")
                //     image.attr({ "src": imageLinkArr[i], "height": "320px", "width": "320px" });
                //     imageDiv.html(image);
                //     $(".imgur-carousel").append(imageDiv);

                    $(".carousel-inner").empty();
                    $(".carousel-indicators").empty();


                    for (var i = 0; i < imageLinkArr.length; i++) {
                        $('<div class="item"><img src="' + imageLinkArr[i] + '" class="carousel-image"><div class="carousel-caption"></div>   </div>').appendTo('.carousel-inner');
                        $('<li data-target="#carousel-example-generic" data-slide-to="' + i + '"></li>').appendTo('.carousel-indicators')
                    }
                    $('.item').first().addClass('active');
                    $('.carousel-indicators > li').first().addClass('active');
                    $('#carousel-example-generic').carousel();

                


            }); //end ajax
        }; //end of ajaxFunc

        ajaxFunc("travel");

        if (imageLinkArr.length < 10) {
            ajaxFunc("food");
        }

        if (imageLinkArr.length < 10) {
            ajaxFunc("");
        }

        imageLinkArr = [];

    }; //end getImagesFunc

    getImagesFunc();

    // $("#mapArea").on("click", function(){
    //     weatherFunc();
    //     getImagesFunc();
    // });


