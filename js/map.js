var placeSearch, autocomplete,


    map, searchBox, destination = "Sydney",
    country = "Australia";



function updateSearchBox() {
    searchBox.set('places', [autocomplete.getPlace()]);
}

function showSearchMap() {
    console.log("Inside showSearchMap");

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -33.8688,
            lng: 151.2195
        },
        zoom: 15,
        mapTypeId: 'roadmap'
    });


    var input = document.getElementById('pac-input');

    searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        console.log("search box places changed !!");
        console.log(arguments);
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location,
                animation: google.maps.Animation.BOUNCE

            });
            google.maps.event.addListener(marker, 'click', function() {
                map.setZoom(9);
                map.setCenter(marker.getPosition());
            });
            markers.push(marker);



            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }

            $('html, body').stop().animate({
                scrollTop: ($("#mapArea").offset().top - 50)
            }, 1250, 'easeInOutExpo');

            destination = place.name;
            weatherFunc();
            getImagesFunc();
            console.log("Current Destination:" + destination);
            console.log(place);
            getCountryName(place);
            fillInfo();

        });
        map.fitBounds(bounds);

    });
}

function getCountryName(place) {
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (addressType == 'country') {
            country = place.address_components[i]['long_name'];
        }
    }
    console.log("Current country" + country);
}

function initAutocomplete() {
    console.log("Initializing auto complete and search boxes");
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    showSearchMap();

    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (document.getElementById('autocomplete')), {
            types: ['geocode']
        });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', updateSearchBox);

}

$("form").submit(function(e) {
    e.preventDefault();
});
