'use strict';

var assert = require('assert');

var EARTH_RADIUS_MILES = 3960;
var EARTH_RADIUS_KILOMETERS = 6371;

/**
 * Convert degrees to radians.
 */
var degToRad = function(n) {
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

  var radius = (units === 'km') ? EARTH_RADIUS_KILOMETERS : EARTH_RADIUS_MILES;

  var dLat = degToRad(endLat - startLat);
  var dLng = degToRad(endLng - startLng);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) *
    Math.cos(degToRad(startLat)) * Math.cos(degToRad(endLat));

  return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};
