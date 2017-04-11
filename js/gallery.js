function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

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
                var imgLink = response.data[i].link.slice(0, 4) + "s" + response.data[i].link.slice(4,-4)+ "h" + response.data[i].link.slice(response.data[i].link.length - 4);
                console.log('imglink ' + imgLink)
                var height = response.data[i].height;
                var width = response.data[i].width;
                var ratio = width / height;
                var nsfw = response.data[i].nsfw;
                console.log('ratio '+ratio)

                //ignore albums, gifs, etc
                //using indexOf() instead of includes() for more browser support

                if ((imgLink.indexOf(".jpg") !==-1 || imgLink.indexOf(".png")!==-1) && (height >= 500) && (ratio > 1) && (ratio <2.5) && (nsfw === false)) {
                    //push to imageLinkArr
                    imageLinkArr.push(imgLink);
                }
            }

            shuffle(imageLinkArr);
           
            //replace placeholder image src in gallery carousel
            for (var i = 0; i < imageLinkArr.length; i++) {
                $("#img" + i).attr("src", imageLinkArr[i]);
            }

        }); //end ajax
    }; //end of ajaxFunc

    //q=travel+destination > food+des > photography+des > ""+des hopefully pull 10 images by this point
    ajaxFunc("travel");

    if (imageLinkArr.length < 10) {
        ajaxFunc("food");
    }

    if (imageLinkArr.length < 10) {
        ajaxFunc("photography");
    }

    if (imageLinkArr.length < 10) {
        ajaxFunc("trip");
    }

    if (imageLinkArr.length < 10) {
        ajaxFunc("");
    }

    //reset image link array in case user puts in another destination and getImagesFunc refires
    imageLinkArr = [];

}; //end getImagesFunc