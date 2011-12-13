/**
 * JavaScript automatically included by Rails in each page.
 */

// Default static location for the map (Bekesbourne)
var defaultLat = 51.26793;
var defaultLong = 1.108246;
var defaultZoom = 12;

var map;

/**
 * Ask the browser for the user's current location.
 */
function getLocation() {
  // Check if geolocation is supported by the browser
	if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locationFound, locationFailure);
  } else {
    positionError(-1);
  }
}

/**
 * If the location is found, centre the map on it.
 */
function locationFound(position) {
  // Centre the map on the new location
  var coords = position.coords || position.coordinate || position;
  var latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
  map.panTo(latLng);
  
  var marker = new google.maps.Marker({
    map: map,
    position: latLng,
    title: 'Current Location'
  });
  
  var info = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'click', function () {
    var content = '<p>' + "Current Location" + '</p>';
    info.setContent(content);
    info.open(map, this);
  });
}

/**
 * Show a message if the location could not be found.
 */
function locationFailure(err) {
  // TODO
}

/**
 * Create a new Google Map and put it on the page.
 */
function drawMap() {
  var bekesbourne = new google.maps.LatLng(defaultLat, defaultLong);
  var opts = {
    zoom: defaultZoom,
    center: bekesbourne,
    mapTypeId: google.maps.MapTypeId.HYBRID
  };
  map = new google.maps.Map(document.getElementById("map"), opts);
}

/**
 * Retrieve sightings from Wildlife Census' API.
 */
function getSightings() {
  $.getJSON("/sightings.json", function(data) {
    $.each(data, function(key, val) {
      addSightingMarker(val);
    });
  });
}

/**
 * 
 */
function addSightingMarker(val) {
  var loc = new google.maps.LatLng(val.latitude, val.longitude);
  var marker = new google.maps.Marker({position: loc, map: map, title: val.description});
       
  var info = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'click', function () {
    var content = '<p>' + val.description + '</p>';
    content += '<p>Date: ' + val.occasion + '</p>';
    info.setContent(content);
    info.open(map, this);
  });
}

/**
 * 
 */
function getMap() {
  return map;
}

/**
 * Set the height of the #contents div so that the map will fill
 * the rest of the viewport after the menu bar.
 */
function setMapHeight() {
  var topBarHeight = document.getElementById("topbar").offsetHeight;
  var viewportHeight = window.innerHeight;
  var contentsDiv = document.getElementById("contents");
  contentsDiv.style.height = (viewportHeight - topBarHeight) + "px";
}
  