/**
 * JavaScript automatically included by Rails in each page.
 */

// Default static location for the map (Bekesbourne)
var defaults = {
  lat: 51.26793,
  lng: 1.108246,
  zoom: 12
};

// Instance variables
var map;

/**
 * Ask the browser for the user's current location, checking if geolocation
 * is supported.
 */
function getLocation() {
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
  
  // Add a marker
  var marker = new google.maps.Marker({
    map: map,
    position: latLng,
    title: 'Current Location'
  });
  
  // Add a listener to show an information window on marker clicks.
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
  var home = new google.maps.LatLng(defaults.lat, defaults.lng);
  var opts = {
    zoom: defaults.zoom, center: home, mapTypeId: google.maps.MapTypeId.HYBRID
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
 * Add a sighting marker to the map
 */
function addSightingMarker(sighting) {
  // Add the marker
  var loc = new google.maps.LatLng(sighting.latitude, sighting.longitude);
  var marker = new google.maps.Marker({position: loc, map: map, title: sighting.description});
       
  // Add an information window
  var info = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'click', function () {
    var content = '<p>' + sighting.description + '</p>';
    content += '<p>Date: ' + sighting.occasion + '</p>';
    info.setContent(content);
    info.open(map, this);
  });
}

/**
 * Get the main sightings map
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
  