'use strict';

var assert = require('assert');

var EARTH_RADIUS_MILES = 3960;
var EARTH_RADIUS_KILOMETERS = 6371;

/**
 * Convert degrees to radians.
 */
var toRad = function(n) {
  return n * Math.PI / 180;
};

/**
 * Haversine.
 */
module.exports = function(start, end, units) {
  assert(
    units === undefined || units === 'miles' || units === 'km',
    'Only miles and kilometers are supported (not ' + units + ').'
  );
  assert(start && end, 'Start and end parameters are required.');
  assert(
    (start.latitude && start.longitude) || (start.lat && start.lng),
    'Start must have keys latitude/longitude or lat/lng.'
  );
  assert(
    (end.latitude && end.longitude) || (end.lat && end.lng),
    'End must have keys latitude/longitude or lat/lng.'
  );

  var startLat = start.latitude || start.lat;
  var startLng = start.longitude || start.lng;
  var endLat = end.latitude || end.lat;
  var endLng = end.longitude || end.lng;

  var R = (units === 'km') ? EARTH_RADIUS_KILOMETERS : EARTH_RADIUS_MILES;

  var dLat = toRad(endLat - startLat);
  var dLon = toRad(endLng - startLng);
  var lat1 = toRad(startLat);
  var lat2 = toRad(endLat);

  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
};
