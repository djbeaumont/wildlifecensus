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
  // TODO
}

/**
 * Show a message if the location could not be found.
 */
function locationFailure(err) {
  // TODO
}

/**
 * 
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
 * 
 */
function getSightings() {
  $.getJSON("/sightings.json", addMarker);
}

/**
 * 
 */
function addMarker(data) {
  $.each(data, function(key, val) {
    var loc = new google.maps.LatLng(val.latitude, val.longitude);
    var marker = new google.maps.Marker({position: loc, map: map, title: val.description});
       
    var info = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function () {
      var content = '<p>' + val.description + '</p>';
      content += '<p>Date: ' + val.occasion + '</p>';
      info.setContent(content);
      info.open(map, this);
    });
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
  var topbarheight = document.getElementById("topbar").offsetHeight;
  var viewportheight = window.innerHeight;
  var contentsdiv = document.getElementById("contents");
  contentsdiv.style.height = (viewportheight - topbarheight) + "px";
}
  