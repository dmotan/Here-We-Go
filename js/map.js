function initAutocomplete2() {

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -33.8688,
            lng: 151.2195
        },
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.HYBRID // 'roadmap'
    });

    var address = $("#autocomplete").val();

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        }
    });

    // Create the search box and link it to the UI element.
    if (!initialised) {
      $("#pac-input").text(address);
      var input = document.getElementById('pac-input');
      console.log('input');
      console.log(input);
      var searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
      });

      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function() {
console.log("places changed !!");
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
          });
          map.fitBounds(bounds);

      });
        initialised = true;
    }


}

var placeSearch, autocomplete, initialised = false;


function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (document.getElementById('autocomplete')), {
            types: ['geocode']
        });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', initAutocomplete2);
}
//
// function codeAddress() {
//   var geocoder = new google.maps.Geocoder();
//   var address = autocomplete.place;
//
//     geocoder.geocode( { 'address': address}, function(results, status) {
//       if (status == google.maps.GeocoderStatus.OK) {
//         console.log(results);
//         map.setCenter(results[0].geometry.location);
//         // map.setZoom(20);
//
//         var marker = new google.maps.Marker({
//             map: map,
//             position: results[0].geometry.location
//         });
//       }
//     });
//   }
