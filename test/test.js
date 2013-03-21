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
var empty = {latitude: null, longitude: null};

var assertAssertion = function(f) {
  var err = null;
  try {
    f();
  } catch(caught) {
    err = caught;
  }
  if (!err || err.name !== 'AssertionError') {
    assert.fail(err ? err.name : '', 'AssertionError');
  }
};

describe('Haversine', function() {
  it('should require correct lat/lng inputs', function() {
    assertAssertion(function() { haversine(); });
    assertAssertion(function() { haversine({}); });
    assertAssertion(function() { haversine({}, {}); });
    haversine(sf, nyc);
    haversine(
      {lat: sf.latitude, lng: sf.longitude},
      {lat: nyc.latitude, lng: nyc.longitude}
    );
  });

  it('should not assert failure because keys exist', function() {
    haversine(sf, empty);
    haversine(empty, sf);
    haversine(empty, empty);
  });

  it('should return zero when start equals end', function() {
    var point = {latitude: 54.321, longitude: 123.45};
    assert.strictEqual(haversine(point, point), 0);
  });

  it('should satisfy the commutative property', function() {
    assert.strictEqual(haversine(sf, nyc), haversine(nyc, sf));
  });

  it('should allow only miles or kilometers', function() {
    haversine(sf, nyc);
    haversine(sf, nyc, 'miles');
    haversine(sf, nyc, 'km');
    assertAssertion(function() { haversine(sf, nyc, 'foobars'); });
  });

  it('should use miles by default', function() {
    assert.strictEqual(haversine(sf, nyc), haversine(sf, nyc, 'miles'));
  });

  it('should return the correct distance from SF to NYC', function() {
    assert.strictEqual(Math.floor(haversine(sf, nyc)), 2570);
    assert.strictEqual(Math.floor(haversine(sf, nyc, 'km')), 4135);
  });

  it('should return the correct distance from SF to SYD', function() {
    assert.strictEqual(Math.floor(haversine(sf, syd)), 7426);
    assert.strictEqual(Math.floor(haversine(sf, syd, 'km')), 11947);
  });
});
