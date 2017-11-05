
var map, infoWindow;

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
           createMarker(results[i]);
           //createPhotoMarker(results[i]);
        }
        randomPick = results[Math.floor(Math.random() * results.length)];
        displayMainLocation(randomPick);
    }
}

function generateLink(place) {
    name = encodeURIComponent(place.name);
    return "https://www.google.com/maps/search/?api=1&query=" + name + "&query_place_id=ChIJKxjxuaNqkFQR3CK6O1HNNqY" + place.id;
}

function displayMainLocation(place) {
    console.log(place.name);
    console.log(place.vicinity);
    console.log(place.photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500}));
    console.log(generateLink(place));
    $("#resultsContainer").append("<div id='results'></div>")
    $("#results").append("<h1>" + place.name + "</h1>");
    $("#results").append("<p>" + place.vicinity + "</p>");
    $("#results").append("<img src='" + place.photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500}) + "'>");
    $("#resultsContainer").wrap('<a href="' + generateLink(place) + '" />')
}

function createPhotoMarker(place) {
    var photos = place.photos;
    if (!photos) {
      return;
    }
  
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name,
      icon: photos[0].getUrl({'maxWidth': 50, 'maxHeight': 50})
    });
}
  
function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
    });
}
  
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function initMap() {
    var styledMapType = new google.maps.StyledMapType(
        [
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#888888"
              },
              {
                "weight": 3
              }
            ]
          },
          {
            "featureType": "landscape.man_made",
            "stylers": [
              {
                "color": "#c5c5c5"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "stylers": [
              {
                "color": "#dddddd"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#fcfcfc"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#888888"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#bacbba"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#b9b8d3"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#b9b8d3"
              }
            ]
          },
          {
            "featureType": "water",
            "stylers": [
              {
                "color": "#2703f1"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#c6fbfb"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#888888"
              }
            ]
          }
        ],
        {name: 'Go Map'}
    );    

    var center = {lat: 0, lng: 0};
    infoWindow = new google.maps.InfoWindow();

    //Try HTML% geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(center);
            map = new google.maps.Map(document.getElementById('map'), {
                center: center,
                zoom: 15,
                mapTypeControlOptions:{
                    mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
                }
            });
            //Associate the styled map with the MapTypeId and set it to display.
            map.mapTypes.set('styled_map', styledMapType);
            map.setMapTypeId('styled_map');
            var places = ['amusement_park', 'aquarium', 'art_gallery', 'bar', 'bicycle_store', 'book_store', 'bowling_alley', 'campground', 'casino', 'clothing_store', 'department_store', 'library', 'movie_theater', 'museum', 'night_club'];
            randomPlace = places[Math.floor(Math.random() * places.length)];
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: center,
                radius: 2000,
                type: [randomPlace]
            }, callback);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}
  


