var countryName = "spain";

$(".about-link").on("click", function(){
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
    $(".country-language").html(response[0].languages[0].name);
    $(".country-capital").html(response[0].capital);
    $(".country-currency").html(response[0].currencies[0].name);
    $(".country-population").html(response[0].population);
    $(".country-timezone").html(response[0].timezones[0]);

  	// $("#current-currency").html(response[0].name + "<br>" + "Currency is " + response[0].currencies[0].name + " " + response[0].currencies[0].symbol + "<br>" + 
  	// 	"Capital is " + response[0].capital + "<br>" + 
  	// 	"Language is " + response[0].languages[0].name + "<br>" + 
  	// 	"TimeZone is " + response[0].timezones[0] + "<br>" + 
  	// 	"Population is " + response[0].population);

  });
});