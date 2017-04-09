var countryName = "united states of america";

$("#info").on("click", function() {
    //countryName = $("#destination").val().trim();
    var queryURL4 = " https://restcountries.eu/rest/v2/name/" + countryName;
    console.log(countryName);
    $.ajax({
        url: queryURL4,
        method: "GET"
    }).done(function(response) {
        console.log(response);


        $("#country-flag").attr("src", response[0].flag);
        $(".country-name").html(response[0].name);
        $(".country-region").html("Region : " + response[0].region);
        $(".country-language").html("Language : " + response[0].languages[0].name);
        $(".country-capital").html("Capital : " + response[0].capital);
        $(".country-currency").html("Currency : " + response[0].currencies[0].name);
        $(".country-population").html("Population : " + response[0].population);
        console.log(response[0].currencies.length);
        if (response[0].timezones.length > 1)
            $(".country-timezone").html("TimeZone : " + response[0].timezones[1]);
        else
            $(".country-timezone").html("TimeZone : " + response[0].timezones[0]);

        // $("#current-currency").html(response[0].name + "<br>" + "Currency is " + response[0].currencies[0].name + " " + response[0].currencies[0].symbol + "<br>" +
        //  "Capital is " + response[0].capital + "<br>" +
        //  "Language is " + response[0].languages[0].name + "<br>" +
        //  "TimeZone is " + response[0].timezones[0] + "<br>" +
        //  "Population is " + response[0].population);

    });
    var newsSource="";
    var newsAPI = "65068dcb32b5464285ed0456bec9bdf8";
    var queryURL2 = "https://newsapi.org/v1/sources?country=us&apiKey=" + newsAPI;
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        newsSource = response.sources[0].id;

        // $("#news-sources").html(response.sources[0].name + "<br>" + "<br>" + response.sources[0].description);

    });
    var newsAPI = "65068dcb32b5464285ed0456bec9bdf8";
    var queryURL3 = "https://newsapi.org/v1/articles?source=" + newsSource + "&apiKey=" + newsAPI;
    $.ajax({
        url: queryURL3,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        // $("#news-img-1").attr("src", response.articles[0].urlToImage);
        $("#news-title").html(response.articles[0].title);
        $("#news-link").attr("href", response.articles[0].url)

    });
});
