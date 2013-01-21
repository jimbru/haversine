var haversine = require('../haversine');

var start = {
  latitude: 50.03,
  longitude: 5
};

var end = {
  latitude: 58.38,
  longitude: 3
};

// inserting values directly
console.log(
  haversine({latitude: 12, longitude: 11}, {latitude: 10, longitude: 10})
);

// using objects
console.log(haversine(start, end));

// using objects with unit conversion
console.log(haversine(start, end, {unit: 'km'}));
