'use strict';

/**
 * Haversine Test
 * Designed to be run under Mocha.
 */
var assert = require('assert');
var haversine = require('../haversine');

var sf = {latitude: 37.783333, longitude: -122.416667};
var nyc = {latitude: 40.664167, longitude: -73.938611};
var syd = {latitude: -33.859972, longitude: 151.211111};

describe('Haversine', function() {
  it('should return zero when start equals end', function() {
    var point = {latitude: 54.321, longitude: 123.45};
    assert.strictEqual(haversine(point, point), 0);
  });

  it('should satisfy the commutative property', function() {
    assert.strictEqual(haversine(sf, nyc), haversine(nyc, sf));
  });

  it('should use miles by default', function() {
    assert.strictEqual(haversine(sf, nyc), haversine(sf, nyc, {unit: 'mile'}));
  });

  it('should return the correct distance from SF to NYC', function() {
    assert.strictEqual(Math.floor(haversine(sf, nyc)), 2570);
    assert.strictEqual(Math.floor(haversine(sf, nyc, {unit: 'km'})), 4135);
  });

  it('should return the correct distance from SF to SYD', function() {
    assert.strictEqual(Math.floor(haversine(sf, syd)), 7426);
    assert.strictEqual(Math.floor(haversine(sf, syd, {unit: 'km'})), 11947);
  });
});
