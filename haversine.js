'use strict';

var assert = require('assert');

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

  var miles = 3960;
  var km    = 6371;

  var R = (units === 'km') ? km : miles;

  var dLat = toRad(end.latitude - start.latitude);
  var dLon = toRad(end.longitude - start.longitude);
  var lat1 = toRad(start.latitude);
  var lat2 = toRad(end.latitude);

  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
};
