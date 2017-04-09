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
                var imgLink = response.data[i].link.slice(0, 4) + "s" + response.data[i].link.slice(4);
                console.log('imglink ' + imgLink)
                var height = response.data[i].height;
                var width = response.data[i].width;
                var ratio = width / height;
                // console.log('ratio '+ratio)
                //ignore albums, gifs, etc
                if ((imgLink.includes(".jpg") || imgLink.includes(".png")) && (height >= 500)) {
                    //push to imageLinkArr
                    imageLinkArr.push(imgLink);
                }
            }

            console.log(imageLinkArr);
            console.log(response);
            console.log('json url ' + queryURL);

            console.log("imgArr 2 " + imageLinkArr)
           
            for (var i = 0; i < imageLinkArr.length; i++) {
                $("#img" + i).attr("src", imageLinkArr[i]);
            }



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