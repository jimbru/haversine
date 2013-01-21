# Haversine

    var haversine = require('haversine')

    var distance = haversine(
      {latitude: 12, longitude: 34},
      {latitude: 23, longitude: 45}
    );

    var distance2 = haversine({lat: 34, lng: 45}, {lat: 56, lng: 67});

    var distance2 = haversine({lat: 34, lng: 45}, {lat: 56, lng: 67}, 'km');
